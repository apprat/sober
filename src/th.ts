import { builder, html } from './core/element'

const style = /*css*/`
:host{
  display: table-cell;
  padding: 20px 12px;
  white-space: nowrap;
}
::slotted(s-checkbox){
  margin: -20px 8px -20px 0;
}
`

const name = 's-th'
const props = {
}

export default class Component extends builder({
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

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}