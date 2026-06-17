import { useProps, useElement, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  $value: 50,
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  readOnly: false,
  disabled: false,
  labeled: false,
  marks: '',
  mode: ['single', 'reversed', 'range'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  orientation: ['horizontal', 'vertical'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large']
})

const events = {
  label: CustomEvent<{ format: (fn: (value: number) => string) => void, name: 'start' | 'end' }>,
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 48px;
  font-size: calc(var(--s-font-size) * 14px);
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
}
.slider{
  flex-grow: 1;
}
:host(:focus-visible){
  outline: none;
}
`

const template = /*html*/`
<s-base-slider variant="segmented" mode="${props.values.mode}" min="${props.values.min}" max="${props.values.max}" step="${props.values.step}" class="slider" part="base-slider" tabindex="-1">

</s-base-slider>
`

export class Slider extends useElement({
  style, props, events, template,
  states: ['focusableOnly', 'pressable', 'hoverable', 'formable'],
  setup(shadowRoot, info) {
    const slider = shadowRoot.querySelector<BaseSlider>('.slider')!
  }
}) { }

const name = Slider.define('s-slider')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Slider
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
    } & Slider
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