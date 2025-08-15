import { useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 48px 16px;
  gap: 12px;
  font-size: .75rem;
  border-radius: 4px;
  color: var(--s-color-outline, ${scheme.color.outline});
}
.shadow{
  fill: var(--s-color-surface-container-high, ${scheme.color.surfaceContainerHigh});
}
.box{
  fill: var(--s-color-surface-container-highest, ${scheme.color.surfaceContainerHighest});
}
.border{
  stroke: var(--s-color-outline, ${scheme.color.outline});
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 40px;
}
`
const template = /*html*/`
<slot name="icon">
  <svg width="64" height="41" viewBox="0 0 64 41">
    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
      <ellipse cx="32" cy="33" rx="32" ry="7" class="shadow"></ellipse>
      <g fill-rule="nonzero" class="border">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
        <path class="box" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"></path>
      </g>
    </g>
  </svg>
</slot>
<slot></slot>`

export class Empty extends useElement({
  style, template
}) { }

const name = Empty.define('s-empty')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Empty
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
    } & Empty
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