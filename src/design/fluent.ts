import { Ripple } from './fluent/ripple.js'
import { Button } from './fluent/button.js'
import { Page } from './fluent/page.js'

type Component = {
  setStyle(style?: string): void
} & typeof HTMLElement

const all: { [key: string]: string } = {
  Page, Button, Ripple
}

/**
 * # example
 * ```js
 * import * as sober from 'sober'
 * import { fluent } from 'sober/design/fluent'
 * 
 * fluent(sober)
 * ```
 */
export const fluent = (components: { [key: string]: Component }) => {
  for (const key in components) {
    const component = components[key]
    if (key in all) {
      component?.setStyle(all[key])
    }
  }
}