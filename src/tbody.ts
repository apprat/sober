import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface,#1d1b20);
  position: relative;
}
::slotted(s-tr){
  border-top: solid 1px var(--s-color-surface-variant, #49454f);
}
`

const name = 's-tbody'
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