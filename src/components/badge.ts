import { useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 8px;
  min-height: 8px;
  padding: 0 4px;
  border-radius: 8px;
  font-size: calc(var(--s-font-size, 1) * 10px);
  vertical-align: middle;
  font-weight: 600;
  background: ${scheme.color.error};
  color: ${scheme.color.onError};
}
:host(:not(:empty)){
  min-width: 16px;
  min-height: 16px;
}
`
const template = /*html*/`<slot class="text" part="text"></slot>`

export class Badge extends useElement({
  style, template
}) { }

const name = Badge.define('s-badge')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Badge
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
    } & Badge
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