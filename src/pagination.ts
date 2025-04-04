import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  current: number
  total: number
  pageSize: number
}

const name = 's-pagination'
const props: Props = {
  current: 1,
  total: -1,
  pageSize: 20
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 200px;
  background: #ddd;
}
`
const template = /*html*/`<slot class="text" part="text"></slot>`

class Pagination extends useElement({ style, template, props }) { }

Pagination.define(name)

export { Pagination }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Pagination
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
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      $props: HTMLAttributes & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
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