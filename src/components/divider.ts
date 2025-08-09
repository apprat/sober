import { useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  margin: 0 16px;
  gap: 8px;
  font-size: .75rem;
  color: var(--s-color-outline, ${scheme.color.outline});
 }
:host::before,
:host::after{
  content: '';
  flex-grow: 1;
  border-top: solid 1px var(--s-color-outline-variant, ${scheme.color.outlineVariant});
}
:host(:empty){
  gap: 0;
}
`

const template = /*html*/`<slot></slot>`

export class Divider extends useElement({
  name: 's-divider',
  style, template
}) { }

Divider.define()

declare global {
  interface HTMLElementTagNameMap {
    [Divider.tagName]: Divider
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Divider.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [Divider.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Divider
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [Divider.tagName]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Divider.tagName]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Divider.tagName]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}