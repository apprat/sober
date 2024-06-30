import { useElement, JSXAttributes } from './core/element.js'

const name = 's-badge'
const props = {
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  background: var(--s-color-error, #ba1a1a);
  color: var(--s-color-on-error, #ffffff);
  border-radius: 18px;
  padding: 0 3px;
  font-size: .625rem;
  box-sizing: border-box;
  vertical-align: middle;
}
:host(:empty){
  min-width: 8px;
  height: 8px;
  margin: 5px;
}
`

const template = /*html*/ `<slot></slot>`

export class Badge extends useElement({ style, template, props }) { }

Badge.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Badge
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}