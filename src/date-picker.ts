import { useElement, JSXAttributes } from './core/element.js'

const name = 's-date-picker'
const props = {
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
`

const template = /*html*/ `<slot></slot>`

export class DatePicker extends useElement({ style, template, props }) { }

DatePicker.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: DatePicker
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}