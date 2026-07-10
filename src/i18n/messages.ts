export const messages = {
  sk: {
    app: {
      title: 'Kurzy mien',
      subtitle: 'Referenčné výmenné kurzy Európskej centrálnej banky',
    },
    calculator: {
      title: 'Prevodník mien',
      amount: 'Suma',
      from: 'Z meny',
      to: 'Na menu',
      swap: 'Vymeniť meny',
      invalidAmount: 'Zadajte platnú sumu.',
    },
    rates: {
      code: 'Kód',
      currency: 'Mena',
      rate: '1 EUR =',
      asOf: 'Kurzy zo dňa {date}',
      loading: 'Načítavam kurzy…',
      error: 'Kurzy sa nepodarilo načítať.',
      retry: 'Skúsiť znova',
    },
    footer: {
      disclaimer:
        'Referenčné kurzy ECB majú informatívny charakter a nie sú určené na obchodovanie.',
      source: 'Zdroj údajov',
    },
  },
  en: {
    app: {
      title: 'Exchange Rates',
      subtitle: 'European Central Bank reference exchange rates',
    },
    calculator: {
      title: 'Currency Converter',
      amount: 'Amount',
      from: 'From',
      to: 'To',
      swap: 'Swap currencies',
      invalidAmount: 'Enter a valid amount.',
    },
    rates: {
      code: 'Code',
      currency: 'Currency',
      rate: '1 EUR =',
      asOf: 'Rates as of {date}',
      loading: 'Loading rates…',
      error: 'Failed to load exchange rates.',
      retry: 'Try again',
    },
    footer: {
      disclaimer: 'ECB reference rates are indicative and not intended for trading.',
      source: 'Data source',
    },
  },
}

export type AppLocale = keyof typeof messages
