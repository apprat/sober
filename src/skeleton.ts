import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {}

const name = 's-skeleton'
const props: Props = {
}

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

const template = ``

class Skeleton extends useElement({ style, template, props }) { }

Skeleton.define(name)

export { Skeleton }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Skeleton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
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
      $props: HTMLAttributes & Partial<Props>
    } & Skeleton
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}