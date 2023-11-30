import { builder, html } from './core/element'

const style = /*css*/`
:host{
  display: block;
  overflow: hidden;
  font-size: .875rem;
}
.container{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
`

const name = 's-table'
const props = {
}

export default class Component extends builder({
  name, props,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <div class="container" part="container">
          <slot></slot>
        </div>
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