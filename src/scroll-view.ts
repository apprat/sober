import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

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

export class ScrollView extends useElement({ style, template, props, }) { }

ScrollView.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: ScrollView
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}