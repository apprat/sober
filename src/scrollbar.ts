import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: block;
  overflow: auto;
  overflow: overlay;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 4px;
    height: 4px;
    background: none;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant);
    border-radius: 4px;
  }
  :host::-webkit-scrollbar{
    width: 6px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant);
  }
}
`

const name = 's-scrollbar'
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