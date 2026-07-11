import type { RatesApi, RatesResult, RatesSnapshot } from './RatesApi'

const CACHE_KEY = 'finance-exchange-app.rates'

/**
 * Decorator that keeps the last successful response in storage and serves it,
 * flagged as stale, when the live source fails.
 */
export class CachedRatesApi implements RatesApi {
  constructor(
    private readonly inner: RatesApi,
    private readonly storage: Storage = localStorage,
  ) {}

  async getRecentRates(days: number): Promise<RatesResult> {
    try {
      const result = await this.inner.getRecentRates(days)
      this.write(result.snapshots)
      return result
    } catch (error) {
      const cached = this.read()
      if (cached) return { snapshots: cached, stale: true }
      throw error
    }
  }

  private write(snapshots: RatesSnapshot[]): void {
    try {
      this.storage.setItem(CACHE_KEY, JSON.stringify(snapshots))
    } catch {
      // Storage full or unavailable — caching is best-effort.
    }
  }

  private read(): RatesSnapshot[] | null {
    try {
      const raw = this.storage.getItem(CACHE_KEY)
      if (!raw) return null
      const parsed: unknown = JSON.parse(raw)
      return Array.isArray(parsed) && parsed.length > 0 ? (parsed as RatesSnapshot[]) : null
    } catch {
      return null
    }
  }
}
