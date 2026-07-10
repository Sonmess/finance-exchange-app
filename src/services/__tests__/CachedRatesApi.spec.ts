import { describe, expect, it } from 'vitest'
import { CachedRatesApi } from '@/services/CachedRatesApi'
import type { RatesApi, RatesResult, RatesSnapshot } from '@/services/RatesApi'

const snapshot: RatesSnapshot = { date: '2026-07-09', base: 'EUR', rates: { USD: 1.08 } }

function fakeStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial))
  return {
    get length() {
      return data.size
    },
    key: (index: number) => [...data.keys()][index] ?? null,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
    clear: () => data.clear(),
  }
}

function liveApi(): RatesApi {
  return { getRecentRates: async () => ({ snapshots: [snapshot], stale: false }) }
}

function failingApi(): RatesApi {
  return {
    getRecentRates: async (): Promise<RatesResult> => {
      throw new Error('network down')
    },
  }
}

describe('CachedRatesApi', () => {
  it('passes live data through and stores it', async () => {
    const storage = fakeStorage()
    const api = new CachedRatesApi(liveApi(), storage)

    const result = await api.getRecentRates(7)

    expect(result).toEqual({ snapshots: [snapshot], stale: false })
    expect(storage.getItem('finance-exchange-app.rates')).toBe(JSON.stringify([snapshot]))
  })

  it('serves the cache flagged as stale when the live source fails', async () => {
    const storage = fakeStorage({
      'finance-exchange-app.rates': JSON.stringify([snapshot]),
    })
    const api = new CachedRatesApi(failingApi(), storage)

    const result = await api.getRecentRates(7)

    expect(result).toEqual({ snapshots: [snapshot], stale: true })
  })

  it('rethrows when the live source fails and there is no cache', async () => {
    const api = new CachedRatesApi(failingApi(), fakeStorage())

    await expect(api.getRecentRates(7)).rejects.toThrow('network down')
  })

  it('ignores a corrupt cache entry', async () => {
    const storage = fakeStorage({ 'finance-exchange-app.rates': 'not-json{' })
    const api = new CachedRatesApi(failingApi(), storage)

    await expect(api.getRecentRates(7)).rejects.toThrow('network down')
  })

  it('survives after a full end-to-end round trip: live success then live failure', async () => {
    const storage = fakeStorage()
    await new CachedRatesApi(liveApi(), storage).getRecentRates(7)

    const result = await new CachedRatesApi(failingApi(), storage).getRecentRates(7)

    expect(result).toEqual({ snapshots: [snapshot], stale: true })
  })
})
