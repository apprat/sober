import { builder, html } from './core/element.js'

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