import { computed, ref } from 'vue'
import { sortCurrencies } from '@/domain/currency'
import { trend, type Trend } from '@/domain/trend'
import type { RatesApi, RatesSnapshot } from '@/services/RatesApi'

export interface CurrencyRate {
  code: string
  rate: number
  trend: Trend
}

/** Enough calendar days to always contain two working days (covers long weekends/holidays). */
const HISTORY_DAYS = 7

export function useRates(api: RatesApi) {
  const status = ref<'loading' | 'ready' | 'error'>('loading')
  const latest = ref<RatesSnapshot | null>(null)
  const previous = ref<RatesSnapshot | null>(null)

  async function load(): Promise<void> {
    status.value = 'loading'
    try {
      const snapshots = await api.getRecentRates(HISTORY_DAYS)
      if (snapshots.length === 0) throw new Error('No rates available')
      latest.value = snapshots[snapshots.length - 1]
      previous.value = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  const rows = computed<CurrencyRate[]>(() => {
    const current = latest.value
    if (!current) return []
    return sortCurrencies(Object.keys(current.rates)).map((code) => {
      const rate = current.rates[code]
      const previousRate = previous.value?.rates[code]
      return {
        code,
        rate,
        trend: previousRate === undefined ? 'flat' : trend(rate, previousRate),
      }
    })
  })

  const asOfDate = computed(() => latest.value?.date ?? null)

  void load()

  return { status, rows, asOfDate, reload: load }
}
