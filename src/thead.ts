import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  color: var(--s-color-on-surface-variant);
}
`

const name = 's-thead'
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