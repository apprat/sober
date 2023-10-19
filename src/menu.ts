import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface);
}
::slotted(*){
  border-top: solid 1px color-mix(in srgb ,var(--s-color-on-surface) 16%, transparent);
}
`

const name = 's-menu'
const props = {
}

export default class Component extends defineElement({
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