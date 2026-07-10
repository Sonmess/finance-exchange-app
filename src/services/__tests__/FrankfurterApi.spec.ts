import { afterEach, describe, expect, it, vi } from 'vitest'
import { FrankfurterApi } from '@/services/FrankfurterApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('FrankfurterApi', () => {
  it('maps a time-series response to snapshots sorted oldest first', async () => {
    const body = {
      base: 'EUR',
      rates: {
        '2026-07-09': { USD: 1.08, CZK: 25.2 },
        '2026-07-08': { USD: 1.07, CZK: 25.1 },
      },
    }
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(body))),
    )

    const snapshots = await new FrankfurterApi().getRecentRates(7)

    expect(snapshots.map((s) => s.date)).toEqual(['2026-07-08', '2026-07-09'])
    expect(snapshots[1]).toEqual({
      date: '2026-07-09',
      base: 'EUR',
      rates: { USD: 1.08, CZK: 25.2 },
    })
  })

  it('requests a date range ending today', async () => {
    const fetchMock = vi.fn(
      async (_url: string) => new Response(JSON.stringify({ base: 'EUR', rates: {} })),
    )
    vi.stubGlobal('fetch', fetchMock)

    await new FrankfurterApi().getRecentRates(7)

    const url = fetchMock.mock.calls[0]?.[0] ?? ''
    expect(url).toMatch(/^https:\/\/api\.frankfurter\.dev\/v1\/\d{4}-\d{2}-\d{2}\.\.\d{4}-\d{2}-\d{2}$/)
  })

  it('throws on an HTTP error response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('oops', { status: 503 })),
    )

    await expect(new FrankfurterApi().getRecentRates(7)).rejects.toThrow('HTTP 503')
  })
})
