import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-scroll-view'
const props = {
}

const style = /*css*/`
:host{
  display: block;
  overflow: auto;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background: transparent;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
    border-radius: 3px;
  }
  @supports not selector(::-webkit-scrollbar){
    :host{
      scrollbar-color: var(--s-color-outline-variant, ${Theme.colorOutlineVariant}) transparent;
    }
  }
}
`

const template = /*html*/`<slot></slot>`

class SScrollView extends useElement({ style, template, props, }) { }

SScrollView.define(name)

export { SScrollView as ScrollView }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SScrollView
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