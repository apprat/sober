import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  variant: ['linear', 'circular'],
  shape: ['flat', 'wavy'],
  max: 100,
  value: 0,
})

const style = /*css*/`
:host{
  display: flex;
  padding: 12px 16px;
  align-items: center;
  line-height: 24px;
  font-size: .875rem;
  font-weight: 500;
  min-height: 48px;
  border-radius: 4px;
  word-break: break-all;
  color: var(--s-color-on-secondary-container, ${scheme.color.onSecondaryContainer});
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
  transition-property: color, background-color;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
`
const template = /*html*/`

`

export class Progress extends useElement({
  style, props, template,
  setup(shadowRoot) {
    return {
    }
  }
}) { }

const name = Progress.define('s-progress')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Progress
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Alert.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
    } & Progress
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