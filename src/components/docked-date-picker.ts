import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['modal', 'docked'],
  ranged: false,
  mode: ['single', 'range'],
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  gap: 36px;
  padding: 24px;
  position: relative;
  border-radius: 12px;
  transition-property: none;
  background: ${scheme.color.surfaceContainerHigh};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.headline{
  font-size: 20px;
}
`

const template = /*html*/`
<div class="headline"></div>
`

export class DockedDatePicker extends useElement({
  props, style, template
}) { }

const name = DockedDatePicker.define('s-docked-date-picker')

declare global {
  interface HTMLElementTagNameMap {
    [name]: DockedDatePicker
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.value.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & DockedDatePicker
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}