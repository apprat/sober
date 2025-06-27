import { useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'

const name = 's-skeleton'

const style = /*css*/`
:host{
  display: block;
  height: 16px;
  border-radius: 8px;
  animation-name: skeleton;
  animation-iteration-count: infinite;
  animation-duration: calc(var(--s-motion-duration-extra-long4, ${Theme.motionDurationExtraLong4}) * 2);
  animation-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
}
@keyframes skeleton{
  0%{
    opacity: .5;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: .5;
  }
}
`

export class Skeleton extends useElement({ style }) { }

Skeleton.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Skeleton
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
    } & Skeleton
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