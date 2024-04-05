import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: table-cell;
  padding: 16px;
}
:host(:not(:first-child)){
  width: 0;
  text-align: right;
}
`

const name = 's-th'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}