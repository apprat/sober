import Ripple from './fluent/ripple.js'
import Button from './fluent/button.js'
import Page from './fluent/page.js'

type Components = {
  [key: string]: {
    addStyle(css: string): number
    removeStyle(index?: number): void
  } & typeof HTMLElement
}

const all = {
  Page,
  Button,
  Ripple
}

/**
 * # example
 * ```js
 * import * as sober from 'sober'
 * import { Fluent } from 'sober/design/fluent'
 * 
 * Fluent.add(sober)
 * Fluent.remove(sober)
 * Fluent.toggle(sober)
 * ```
 */
export class Fluent {
  static indexes: { [key: string]: number } = {}
  static add(components: Components) {
    for (const key in components) {
      if (this.indexes[key]) continue
      const component = components[key]
      const css = all[key as keyof typeof all]
      if (!css) continue
      const index = component.addStyle(css)
      this.indexes[key] = index
    }
  }
  static remove(components: Components) {
    for (const key in components) {
      const index = this.indexes[key]
      if (index === undefined) continue
      const component = components[key]
      component.removeStyle(index)
      delete this.indexes[key]
    }
  }
  static toggle(components: Components) {
    Object.keys(this.indexes).length === 0 ? this.add(components) : this.remove(components)
  }
}