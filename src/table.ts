import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: block;
  overflow: hidden;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline-variant, #c1c7ce);
  border-radius: 8px;
  overflow: auto;
}
.container{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, #c1c7ce);
    border-radius: 2px;
  }
}
`

const name = 's-table'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup() {
    return {
      render: () => html`
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