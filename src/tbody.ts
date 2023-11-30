import { builder, html } from './core/element'

const style = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface,#191c1e);
}
::slotted(*){
  border-top: solid 1px color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 16%, transparent);
}
`

const name = 's-tbody'
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