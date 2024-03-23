import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: contents;
  user-select: text;
  padding: 18px 12px;
}
td{
  padding: inherit;
  vertical-align: middle;
}
::slotted(s-checkbox){
  margin: -18px 8px -18px 0;
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