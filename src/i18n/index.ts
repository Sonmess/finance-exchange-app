import { createI18n } from 'vue-i18n'
import { messages, type AppLocale } from './messages'

const STORAGE_KEY = 'finance-exchange-app.locale'
const DEFAULT_LOCALE: AppLocale = 'sk'

export function storedLocale(): AppLocale {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value && value in messages ? (value as AppLocale) : DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export function persistLocale(value: AppLocale): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage unavailable — the choice just won't survive a reload.
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale(),
  fallbackLocale: 'en',
  messages,
})
