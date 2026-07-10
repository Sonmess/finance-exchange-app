/** All rates in the app are quoted against this base, as published by the ECB. */
export const BASE_CURRENCY = 'EUR'

/** Currencies most relevant to a Slovak audience, shown at the top of the list. */
export const PINNED_CURRENCIES = ['USD', 'GBP', 'CZK', 'HUF', 'PLN', 'CHF']

const displayNamesCache = new Map<string, Intl.DisplayNames>()

/** Localized currency name (e.g. "americký dolár" / "US Dollar"), provided by the browser. */
export function currencyDisplayName(code: string, locale: string): string {
  let displayNames = displayNamesCache.get(locale)
  if (!displayNames) {
    displayNames = new Intl.DisplayNames([locale], { type: 'currency' })
    displayNamesCache.set(locale, displayNames)
  }
  return displayNames.of(code) ?? code
}

/** Pinned currencies first (in pinned order), the rest alphabetically. */
export function sortCurrencies(codes: string[]): string[] {
  const pinned = PINNED_CURRENCIES.filter((code) => codes.includes(code))
  const rest = codes.filter((code) => !PINNED_CURRENCIES.includes(code)).sort()
  return [...pinned, ...rest]
}
