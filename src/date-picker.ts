import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: block;
}
`

const name = 's-date-picker'
const props = {
}

export default class DatePicker extends builder({
  name, style, props,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

DatePicker.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: DatePicker
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}