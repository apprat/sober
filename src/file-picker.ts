import { useElement, JSXAttributes } from './core/element.js'
import './ripple.js'

const name = 's-file-picker'
const props = {
  placeholder: ''
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
`

const template = /*html*/`
`

export class Card extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
  }
}) { }

Card.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Card
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}