import type { Noop } from './types'
export * from './types'

export function diff(a: number, b: number) {
  return a - b
}

export const noop: Noop = () => { }


