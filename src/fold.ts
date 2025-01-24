import { useElement } from './core/element.js'

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

const template = /*html*/`
<slot name="trigger"></slot>
<div class="container" part="container">
  <slot class="view" part="view"></slot>
</div>
`

class SFold extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]')!
    trigger.addEventListener('click', () => this.folded = !this.folded)
  }
}) { }

SFold.define(name)

export { SFold as Fold }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SFold
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}