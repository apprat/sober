import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-divider'
const props = {
}

const style = /*css*/`
:host{
  display: block;
  height: 1px;
  background: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  margin: 0 16px;
}
`

const template = /*html*/`<slot></slot>`

export class Divider extends useElement({ style, template, props }) { }

Divider.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Divider
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}