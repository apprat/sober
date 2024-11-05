import { useElement, JSXAttributes } from './core/element.js'

const name = 's-fold'
const props = {
  folded: false
}

const style = /*css*/`
:host{
  display: block;
}
.container{
  grid-template-rows: 1fr;
  display: grid;
  overflow: hidden;
  transition: grid-template-rows .2s ease-out;
}
:host([folded=true]) .container{
  grid-template-rows: 0fr;
}
.view{
  display: block;
  min-height: 0;
  overflow: hidden;
}
`

const template = /*html*/ `
<slot name="trigger"></slot>
<div class="container" part="container">
  <slot class="view" part="view"></slot>
</div>
`

export class Fold extends useElement({
  style, template, props, syncProps: ['folded'],
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]')!
    trigger.addEventListener('click', () => this.folded = !this.folded)
  }
}) { }

Fold.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Fold
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}