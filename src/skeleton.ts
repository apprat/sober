import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-skeleton'

const style = /*css*/`
:host{
  display: block;
  height: 16px;
  animation: skeleton var(--s-motion-duration-extra-long4, ${Theme.motionDurationExtraLong4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard}) infinite;
  background: linear-gradient(90deg, var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) 25%, var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) 37%, var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) 63%);
  background-size: 400% 100%;
  border-radius: 8px;
}
@keyframes skeleton{
  0%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0 50%;
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