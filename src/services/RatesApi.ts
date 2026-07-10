/** Rates published for one ECB working day. */
export interface RatesSnapshot {
  /** ISO date (YYYY-MM-DD) the rates were published for. */
  date: string
  base: string
  /** 1 unit of base = rates[code] units of the currency. */
  rates: Record<string, number>
}

export interface RatesResult {
  /** Snapshots oldest first. Weekends and holidays have no snapshot. */
  snapshots: RatesSnapshot[]
  /** True when the data comes from a local fallback because the live source was unavailable. */
  stale: boolean
}

export interface RatesApi {
  /** Rates covering roughly the last `days` calendar days. */
  getRecentRates(days: number): Promise<RatesResult>
}
