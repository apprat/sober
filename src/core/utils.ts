export type KebabToCamel<T extends string> = T extends `${infer L}-${infer R}` ? `${Capitalize<L>}${KebabToCamel<Capitalize<R>>}` : Capitalize<T>
export const kebabToCamel = <T extends string>(value: T): KebabToCamel<T> => value.replace(/-([a-z])/g, (substring, item: string) => item.toUpperCase()) as never
export const camelToKebab = (value: string) => value.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())

export const device = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:coarse)')
  device.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => device.touched = matches)
}