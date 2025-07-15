import { useProps, useEvents, useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'
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
  name: 's-button-group',
  style, props, template,
  setup(shadowRoot) {
  }
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [ButtonGroup.tagName]: ButtonGroup
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [ButtonGroup.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [ButtonGroup.tagName]: new () => {
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
      [ButtonGroup.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [ButtonGroup.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [ButtonGroup.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}