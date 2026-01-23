type Component = {
  setStyle(style?: string): void
} & typeof HTMLElement

/**
 * # example
 * ```js
 * import * as sober from 'sober'
 * import { material } from 'sober/design/material'
 * 
 * material(sober)
 * ```
 */
export const material = (components: { [key: string]: Component }) => {
  for (const key in components) {
    const component = components[key]
    component?.setStyle()
  }
}