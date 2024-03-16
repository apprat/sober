import { builder, html, ref } from './core/element.js'

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
    const td = ref<HTMLTableCellElement>()
    return {
      watches: {
        colspan: (value) => td.target.colSpan = value,
        rowspan: (value) => td.target.rowSpan = value
      },
      render: () => html`
        <td ref="${td}" rowspan="${this.rowspan}" colspan="${this.colspan}">
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
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}