import { useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  position: relative;
  font-size: calc(var(--s-font-size, 1) * 24px);
  font-weight: 500;
  width: 40px;
  border-radius: 50%;
  color: ${scheme.color.onTertiary};
  background: ${scheme.color.tertiary};
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 24px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
}
::slotted(s-badge){
  position: absolute;
  right: 15%;
  bottom: 15%;
  transform: translate(50%, 50%);
  outline-offset: 0;
  outline: solid 2px ${scheme.color.surface};
  color: ${scheme.color.onSuccess};
  background: ${scheme.color.success};
}
::slotted(:is(img, object)){
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
`

const template = /*html*/`
<slot></slot>
`

export class Avatar extends useElement({
  style, template
}) { }

const name = Avatar.define('s-avatar')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Avatar
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
    } & Avatar
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