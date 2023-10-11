/**
 * Convert to Number
 *
 * @param val any
 * @returns number
 */
export function toNumber(val: any): number {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

export const isObject = (val: any): val is Record<any, any> => val !== null && typeof val === 'object'

export const isArray = Array.isArray

/**
 * A simple deep clone method
 *
 * @param origin any complex type of object
 * @returns a deep clone object
 */
export function deepClone(origin: unknown): unknown {
  if (isArray(origin))
    return origin.map(child => deepClone(child))

  if (isObject(origin)) {
    return Object.fromEntries(
      Object.entries(origin).map(([k, v]) => [k, deepClone(v)]),
    )
  }

  return origin
}
