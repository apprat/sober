import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: contents;
  user-select: text;
  padding: 12px 16px;
}
:host(:not(:first-child)){
  text-align: right;
}
td{
  padding: inherit;
  vertical-align: middle;
}
`

const name = 's-td'
const props = {
  colspan: 1,
  rowspan: 1
}

export default class Component extends builder({
  name, style, props,
  setup() {
    let td: HTMLTableCellElement
    return {
      watches: {
        colspan: (value) => td.colSpan = value,
        rowspan: (value) => td.rowSpan = value
      },
      render: () => html`
        <td ref="${(el: HTMLTableCellElement) => td = el}" rowspan="${this.rowspan}" colspan="${this.colspan}">
          <slot></slot>
        </td>
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