import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: block;
  height: 1px;
  background: var(--s-color-outline-variant, #c1c7ce);
  margin: 0 16px;
}
`

const name = 's-divider'
const props = {
}

export default class Divider extends builder({
  name, style, props,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

Divider.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Divider
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}