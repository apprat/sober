import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import './button.js'

const props = useProps({
  mode: ['standard', 'connected'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  value: '',
})

const style = /*css*/`
:host{
  display: block;
}
`

const template = /*html*/`

`

export class ButtonGroup extends useElement({
  style, props, template,
  setup() {
  }
}) { }

const name = ButtonGroup.define('s-button-group')

declare global {
  interface HTMLElementTagNameMap {
    [name]: ButtonGroup
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
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & ButtonGroup
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
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

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}