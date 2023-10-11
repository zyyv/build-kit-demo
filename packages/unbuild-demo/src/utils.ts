export type Arrayable<T> = T | Array<T>

export function toArray<T>(value: Arrayable<T>): Array<T> {
  return Array.isArray(value) ? value : [value]
}
