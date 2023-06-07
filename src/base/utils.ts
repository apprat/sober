import { VNode } from './core'

export type KebabToCamel<T extends string> = T extends `${infer L}-${infer R}` ? `${Capitalize<L>}${KebabToCamel<Capitalize<R>>}` : Capitalize<T>
// export const kebabToCamel = <T extends string>(value: T): KebabToCamel<T> => {
//   return value.replace(/-([a-z])/g, (substring, item: string) => item.toUpperCase()) as never
// }
//const camelToKebab = (value: string) => value.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())

const ripple = () => {
  return new VNode('div', {})
}