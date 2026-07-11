import { computed, ref, type Ref } from 'vue'
import { crossRate, type EurRates } from '@/domain/exchange'
import { BASE_CURRENCY } from '@/domain/currency'

export function useCalculator(rates: Ref<EurRates | null>) {
  const amount = ref<number | null>(100)
  const from = ref(BASE_CURRENCY)
  const to = ref('USD')

  function swap(): void {
    ;[from.value, to.value] = [to.value, from.value]
  }

  /** Rate for 1 unit of `from` in `to`, or null while rates are unavailable. */
  const rate = computed<number | null>(() => {
    if (!rates.value) return null
    try {
      return crossRate(rates.value, from.value, to.value)
    } catch {
      return null
    }
  })

  /** Converted amount, or null when the input is empty/invalid or rates are unavailable. */
  const result = computed<number | null>(() => {
    if (rate.value === null || amount.value === null || amount.value < 0) return null
    return amount.value * rate.value
  })

  return { amount, from, to, rate, result, swap }
}
