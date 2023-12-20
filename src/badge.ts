import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  background: var(--s-color-error,#b3261e);
  color: var(--s-color-on-error, #ffffff);
  border-radius: 12px;
  padding: 0 3px;
  font-size: .625rem;
  box-sizing: border-box;
}
:host(:empty){
  min-width: 8px;
  height: 8px;
  margin: 5px;
}
`

const name = 's-badge'
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