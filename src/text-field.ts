import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: inline-block;
  height: 56px;
  min-width: 240px;
  border: solid 1px var(--s-color-outline);
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

export default class Component extends defineElement({
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