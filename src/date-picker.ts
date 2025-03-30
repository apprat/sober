import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  value: string
}

const name = 's-date-picker'
const props: Props = {
  value: ''
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
`
const template = /*html*/`
<slot class="text" part="text"></slot>`

class DatePicker extends useElement({ style, template, props }) { }

DatePicker.define(name)

export { DatePicker }

declare global {
  interface HTMLElementTagNameMap {
    [name]: DatePicker
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

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}