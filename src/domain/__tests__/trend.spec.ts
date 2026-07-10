import { describe, expect, it } from 'vitest'
import { trend } from '@/domain/trend'

describe('trend', () => {
  it('is up when the rate increased', () => {
    expect(trend(1.09, 1.08)).toBe('up')
  })

  it('is down when the rate decreased', () => {
    expect(trend(1.07, 1.08)).toBe('down')
  })

  it('is flat when the rate is unchanged', () => {
    expect(trend(1.08, 1.08)).toBe('flat')
  })

  it('is flat for floating-point noise', () => {
    expect(trend(1.08 + 1e-12, 1.08)).toBe('flat')
  })

  it('detects real movement on small rates', () => {
    expect(trend(0.8563, 0.8561)).toBe('up')
  })
})
