import { builder, html } from './core/element'

const style = /*css*/`
:host{
  display: block;
  overflow: auto;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 8px;
    height: 8px;
  }
  :host::-webkit-scrollbar-track-piece{
    background: var(--s-color-outline-variant,#c0c8cc);
  }
  :host::-webkit-scrollbar-corner{
    background: var(--s-color-outline-variant,#c0c8cc);
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline,#70787d);
  }
}
`

const name = 's-scrollbar'
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