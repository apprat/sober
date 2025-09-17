import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['default', 'contained']
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  width: 48px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  color: var(--s-color-primary, ${scheme.color.primary});
}
:host([variant=contained]){
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
}
@keyframes loading{ 
  0%{ 
    transform: rotate(0deg);
  }
  25%{ 
    transform: rotate(90deg);
  }
  50%{
    transform: rotate(180deg);
  }
  75%{
    transform: rotate(270deg);
  }
  100%{
    transform: rotate(360deg);
  }
  0%, 100%{
    clip-path: polygon(50% 0, 62% 15%, 85% 13%, 83% 33%, 100% 36%, 87% 50%, 100% 67%, 78% 74%, 82% 94%, 61% 85%, 50% 100%, 40% 86%, 18% 94%, 21% 74%, 0 67%, 13% 50%, 0 34%, 20% 28%, 19% 9%, 39% 15%);
  }
}
.layout{
  background: currentColor;
  width: 32px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  animation: loading 3s infinite cubic-bezier(0.4, 0, 0.2, 1), steps(4), linear;
}
`

const template = /*html*/`
<div class="layout" part="layout"></div>
`

export class Loading extends useElement({
  style, template,
  setup(shadowRoot) {
  }
}) { }

const name = Loading.define('s-loading')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Loading
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
    } & Loading
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