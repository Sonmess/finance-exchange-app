import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useCalculator } from '@/composables/useCalculator'
import type { EurRates } from '@/domain/exchange'

const rates = { USD: 1.08, CZK: 25.2 }

function setup(initialRates: EurRates | null = rates) {
  return useCalculator(ref(initialRates))
}

describe('useCalculator', () => {
  it('defaults to converting 100 EUR to USD', () => {
    const calc = setup()
    expect(calc.result.value).toBeCloseTo(108, 10)
    expect(calc.rate.value).toBe(1.08)
  })

  it('converts between two foreign currencies via EUR', () => {
    const calc = setup()
    calc.from.value = 'USD'
    calc.to.value = 'CZK'
    calc.amount.value = 10
    expect(calc.result.value).toBeCloseTo((10 / 1.08) * 25.2, 10)
  })

  it('swaps the currencies', () => {
    const calc = setup()
    calc.swap()
    expect(calc.from.value).toBe('USD')
    expect(calc.to.value).toBe('EUR')
    expect(calc.result.value).toBeCloseTo(100 / 1.08, 10)
  })

  it('returns null while rates are unavailable', () => {
    const calc = setup(null)
    expect(calc.rate.value).toBeNull()
    expect(calc.result.value).toBeNull()
  })

  it('returns null for an empty amount', () => {
    const calc = setup()
    calc.amount.value = null
    expect(calc.result.value).toBeNull()
  })

  it('returns null for a negative amount', () => {
    const calc = setup()
    calc.amount.value = -5
    expect(calc.result.value).toBeNull()
  })

  it('returns null for a currency missing from the rates', () => {
    const calc = setup()
    calc.to.value = 'XXX'
    expect(calc.rate.value).toBeNull()
    expect(calc.result.value).toBeNull()
  })

  it('reacts to rates arriving later', () => {
    const ratesRef = ref<EurRates | null>(null)
    const calc = useCalculator(ratesRef)
    expect(calc.result.value).toBeNull()
    ratesRef.value = rates
    expect(calc.result.value).toBeCloseTo(108, 10)
  })
})
