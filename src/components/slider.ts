import { useProps, useEvents, useElement } from '../core/element.js'
import { BaseSlider } from './base-slider.js'

const name = 's-slider'
const props = useProps({
  disabled: false,
  labeled: false,
  $value: 0,
  $start: 0,
  $end: 0,
  $step: 1,
  $min: 0,
  $max: 100,
  mode: ['single', 'single-reversed', 'range'],
  orientation: ['horizontal', 'vertical'],
})
const events = useEvents({

})

const style = /*css*/`
:host{
  display: block;
}
`

const template = /*html*/`
<div>alert</div>
`

const bulder = () => { }

export class Slider extends useElement({
  style, props, template, events, methods: { bulder },
  setup(shadowRoot) {
    this.addEventListener('click', (e) => {
      this.dispatchEvent(new Event('show'))
    })
    return {
      expose: {
      }
    }
  }
}) { }

Slider.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Slider
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
    } & Slider
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