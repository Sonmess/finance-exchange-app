import { describe, expect, it } from 'vitest'
import { convert, crossRate, rateFor } from '@/domain/exchange'

const rates = { USD: 1.08, CZK: 25.2, JPY: 170.5 }

describe('rateFor', () => {
  it('returns 1 for the EUR base itself', () => {
    expect(rateFor(rates, 'EUR')).toBe(1)
  })

  it('returns the quoted rate for a known currency', () => {
    expect(rateFor(rates, 'USD')).toBe(1.08)
  })

  it('throws for an unknown currency', () => {
    expect(() => rateFor(rates, 'XXX')).toThrow('Unknown or invalid currency: XXX')
  })

  it('throws for a non-positive rate', () => {
    expect(() => rateFor({ BAD: 0 }, 'BAD')).toThrow()
  })
})

describe('crossRate', () => {
  it('returns the quoted rate from EUR', () => {
    expect(crossRate(rates, 'EUR', 'USD')).toBe(1.08)
  })

  it('inverts the rate towards EUR', () => {
    expect(crossRate(rates, 'USD', 'EUR')).toBeCloseTo(1 / 1.08, 10)
  })

  it('computes cross rates via EUR', () => {
    expect(crossRate(rates, 'USD', 'CZK')).toBeCloseTo(25.2 / 1.08, 10)
  })

  it('is 1 for the same currency', () => {
    expect(crossRate(rates, 'USD', 'USD')).toBe(1)
  })

  it('round-trips back to the original rate', () => {
    expect(crossRate(rates, 'USD', 'CZK') * crossRate(rates, 'CZK', 'USD')).toBeCloseTo(1, 10)
  })
})

describe('convert', () => {
  it('converts EUR to a foreign currency', () => {
    expect(convert(rates, 100, 'EUR', 'USD')).toBeCloseTo(108, 10)
  })

  it('converts a foreign currency to EUR', () => {
    expect(convert(rates, 108, 'USD', 'EUR')).toBeCloseTo(100, 10)
  })

  it('converts between two foreign currencies via EUR', () => {
    expect(convert(rates, 10, 'USD', 'CZK')).toBeCloseTo((10 / 1.08) * 25.2, 10)
  })

  it('returns 0 for a zero amount', () => {
    expect(convert(rates, 0, 'USD', 'CZK')).toBe(0)
  })
})
