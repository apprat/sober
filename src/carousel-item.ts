import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  user-select: none;
  display: block;
  height: 96px;
  position: relative;
  border-radius: 28px;
}
`

const name = 's-carousel-item'
const props = {
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
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