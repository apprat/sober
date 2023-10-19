import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: table-cell;
  padding: 18px 12px;
  text-align: right;
}
::slotted(s-checkbox){
  margin: -18px 8px -18px 0;
}
`

const name = 's-td'
const props = {
}

export default class Component extends defineElement({
  name, props,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot></slot>
      `
    }
  }
}) { }

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

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}