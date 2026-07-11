import { BASE_CURRENCY } from './currency'

/** Rates quoted as: 1 EUR = rates[code] units of the currency. */
export type EurRates = Record<string, number>

export function rateFor(rates: EurRates, code: string): number {
  if (code === BASE_CURRENCY) return 1
  const rate = rates[code]
  if (rate === undefined || rate <= 0) {
    throw new Error(`Unknown or invalid currency: ${code}`)
  }
  return rate
}

/** Exchange rate from `from` to `to`, cross-computed via EUR. */
export function crossRate(rates: EurRates, from: string, to: string): number {
  return rateFor(rates, to) / rateFor(rates, from)
}

/** Converts an amount between any two currencies. Rounding is left to the presentation layer. */
export function convert(rates: EurRates, amount: number, from: string, to: string): number {
  return amount * crossRate(rates, from, to)
}
