import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { device } from '../core/device.js'
import './ripple.js'

const name = 's-switch'
const props = useProps({
  disabled: false,
  checked: false,
  $value: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  width: 52px;
  aspect-ratio: 1.625;
  -webkit-aspect-ratio: 1.625;
  border-radius: 16px;
  color: var(--s-color-primary, ${scheme.color.primary});
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
.track,
.ripple{
  color: var(--s-color-outline, ${scheme.color.outline});
}
.track{
  width: 100%;
  height: 100%;
  border: solid 2px currentColor;
  border-radius: inherit;
  transition-property: background;
}
.ripple{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  pointer-events: auto;
  height: 125%;
  width: auto;
  inset: auto;
  left: -8%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  transition-property: transform;
  .thumb{
    max-width: 60%;
    min-width: 40%;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    border-radius: 50%;
    padding: 10%;
    transition-property: transform, min-width, background;
    background: var(--s-color-outline, ${scheme.color.outline});
  }
}
.selected,
.unselected{
  display: flex;
}
.unselected{
  color: var(--s-color-surface-variant, ${scheme.color.surfaceVariant});
}
.selected{
  display: none;
  color: currentColor;
}
:host([checked]){
  .track{
    color: inherit;
    background: currentColor;
  }
  .ripple{
    color: inherit;
    transform: translateX(50%);
    .thumb{
      min-width: 60%;
      background: var(--s-color-on-primary, ${scheme.color.onPrimary});
    }
  }
  .unselected{
    display: none;
  }
  .selected{
    display: flex;
  }
}
:host([ripple-pressed]) .ripple>.thumb{
  min-width: 70%;
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 100%;
  height: 100%;
}
`

const template = /*html*/`
<div class="track" part="track"></div>
<s-ripple class="ripple" part="ripple">
  <div class="thumb" part="thumb">
    <slot name="unselected" class="unselected" part="unselected"></slot>
    <slot name="selected" class="selected" part="selected"></slot>
  </div>
</s-ripple>
`

export class Switch extends useElement({
  style, template, props,
  focused: true,
  setup(shadowRoot) {
    const ripple = shadowRoot.querySelector<HTMLDivElement>('.ripple')!
    let touched = false
    this.addEventListener('click', () => {
      if (touched) return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    ripple.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      const state = { x: event.pageX, checked: this.checked }
      touched = false
      const move = (event: PointerEvent | TouchEvent) => {
        const e = event instanceof TouchEvent ? event.touches[0] : event
        event.cancelable && event.preventDefault()
        touched = true
        const left = Math.min(Math.max(0, (e.pageX - state.x) + (state.checked ? ripple.offsetWidth / 2 : 0)), ripple.offsetWidth / 2)
        ripple.style.transition = 'none'
        ripple.style.transform = `translateX(${left}px)`
        const checked = left >= ripple.offsetWidth / 4
        if (this.checked !== checked) {
          this.checked = checked
          this.dispatchEvent(new Event('change'))
        }
      }
      const eventNames = device.touchEnabled ? { move: 'touchmove', up: 'touchend' } as const : { move: 'pointermove', up: 'pointerup' } as const
      const remove = () => {
        ripple.style.removeProperty('transition')
        ripple.style.removeProperty('transform')
        document.removeEventListener(eventNames.move, move)
      }
      document.addEventListener(eventNames.move, move, { passive: false })
      document.addEventListener(eventNames.up, remove, { once: true })
    })
  }
}) { }

Switch.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Switch
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
    } & Switch
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