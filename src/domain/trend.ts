export type Trend = 'up' | 'down' | 'flat'

/** Relative changes below this are floating-point noise, not market movement. */
const EPSILON = 1e-9

/** Direction of the quoted rate (1 EUR = X) between two consecutive working days. */
export function trend(current: number, previous: number): Trend {
  const delta = current - previous
  if (Math.abs(delta) <= Math.abs(previous) * EPSILON) return 'flat'
  return delta > 0 ? 'up' : 'down'
}
