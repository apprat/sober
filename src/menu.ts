import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface,#1d1b20);
}
`

const name = 's-menu'
const props = {
}

export default class Component extends builder({
  name, props,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <div class="wrapper">
          <div class="container">
            <slot></slot>
          </div>
        </div>
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