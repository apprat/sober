import { useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const style = /*css*/`
:host{
  display: block;
  height: 16px;
  border-radius: 8px;
  animation-name: skeleton;
  animation-iteration-count: infinite;
  animation-duration: calc(var(--s-motion-duration-extra-long4, ${scheme.motion.duration.extraLong4}) * 2);
  animation-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  background: var(--s-color-surface-container-highest, ${scheme.color.surfaceContainerHighest});
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

export class Skeleton extends useElement({
  name: 's-skeleton',
  style
}) { }

Skeleton.define()

declare global {
  interface HTMLElementTagNameMap {
    [Skeleton.tagName]: Skeleton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Skeleton.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [Skeleton.tagName]: new () => {
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
      [Skeleton.tagName]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Skeleton.tagName]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Skeleton.tagName]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}