import { useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow: clip visible;
  font-size: calc(var(--s-font-size, 1) * 12px);
  color: ${scheme.color.outline};
  &::before,
  &::after{
    content: '';
    flex-grow: 1;
    border-top-style: solid;
    border-width: 1px;
    border-color: ${scheme.color.outlineVariant};
  }
}
:host(:empty){
  gap: 0;
}
`

const template = /*html*/`<slot></slot>`

export class Divider extends useElement({
  style, template
}) { }

const name = Divider.define('s-divider')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Divider
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
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
      $props: HTMLAttributes
    } & Divider
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}