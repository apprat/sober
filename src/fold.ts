import { useElement } from './core/element.js'

type Props = {
  folded: boolean
}

const name = 's-fold'
const props: Props = {
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
  transition: grid-template-rows .3s cubic-bezier(0.05, 0.7, 0.1, 1.0);
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

const template = /*html*/`
<slot name="trigger"></slot>
<div class="container" part="container">
  <slot class="view" part="view"></slot>
</div>
`

class Fold extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]')!
    trigger.addEventListener('click', () => this.folded = !this.folded)
  }
}) { }

Fold.define(name)

export { Fold }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Fold
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: Props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}