import { defineElement, html, ref } from './core/element'
import { rippleStyle, RippleEvent } from './fragment/ripple'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
}
`

const name = 's-ripple'
const props = {
  centered: false
}

export default class Component extends defineElement({
  name, props,
  setup() {
    const wrapper = ref()
    let rippleEvent: RippleEvent
    return {
      created: () => rippleEvent = new RippleEvent(this, wrapper.target, this.centered, true),
      watches: {
        centered: (value) => rippleEvent.centered = value
      },
      render: () => html`
        <style>${rippleStyle}</style>
        <style>${style}</style>
        <div class="ripple-wrapper" ref="${wrapper}">
          <div class="ripple-animation"></div>
        </div>
        <slot></slot>
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}