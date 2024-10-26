import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-badge'
const props = {
}

const style = /*css*/`
:host{
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  background: var(--s-color-error, ${Theme.colorError});
  color: var(--s-color-on-error, ${Theme.colorOnError});
  border-radius: 18px;
  padding: 0 3px;
  font-size: .625rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  vertical-align: middle;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
:host(:empty){
  width: 8px;
  height: 8px;
  min-width: auto;
  padding: 0;
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