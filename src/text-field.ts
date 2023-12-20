import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: inline-block;
  height: 56px;
  min-width: 240px;
  border: solid 1px var(--s-color-outline,#79747e);
  border-radius: 4px;
}
`

const name = 's-text-field'
const props = {
  disabled: false,
  singled: true,
  placeholder: '',
  value: '',
  label: '',
  max: -1
}

export default class Component extends builder({
  name, props,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <div class="container">
        </div>
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