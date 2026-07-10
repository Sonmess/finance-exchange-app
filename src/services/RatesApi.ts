/** Rates published for one ECB working day. */
export interface RatesSnapshot {
  /** ISO date (YYYY-MM-DD) the rates were published for. */
  date: string
  base: string
  /** 1 unit of base = rates[code] units of the currency. */
  rates: Record<string, number>
}

export interface RatesApi {
  /**
   * Snapshots covering roughly the last `days` calendar days, oldest first.
   * Weekends and holidays have no snapshot, so the result is shorter than `days`.
   */
  getRecentRates(days: number): Promise<RatesSnapshot[]>
}
