import type { RatesApi, RatesSnapshot } from './RatesApi'

interface TimeSeriesResponse {
  base: string
  rates: Record<string, Record<string, number>>
}

/** ECB reference rates via the free, CORS-enabled Frankfurter API. */
export class FrankfurterApi implements RatesApi {
  constructor(private readonly baseUrl = 'https://api.frankfurter.dev/v1') {}

  async getRecentRates(days: number): Promise<RatesSnapshot[]> {
    const end = new Date()
    const start = new Date(end)
    start.setDate(start.getDate() - days)

    const response = await fetch(`${this.baseUrl}/${toIsoDate(start)}..${toIsoDate(end)}`)
    if (!response.ok) {
      throw new Error(`Rates request failed: HTTP ${response.status}`)
    }
    const body = (await response.json()) as TimeSeriesResponse

    return Object.entries(body.rates)
      .map(([date, rates]) => ({ date, base: body.base, rates }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}
