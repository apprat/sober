import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { device } from '../core/device.js'

const name = 's-switch'
const props = useProps({
  disabled: false,
  checked: false,
  $value: ''
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 52px;
  aspect-ratio: 1.625;
  -webkit-aspect-ratio: 1.625;
  border-radius: 16px;
  cursor: grab;
  color: var(--s-color-primary, ${scheme.color.primary});
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
.track{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--s-color-surface-container-highest, ${scheme.color.surfaceContainerHighest});
  box-shadow: 0 0 0 2px var(--s-color-outline, ${scheme.color.outline}) inset;
  border-radius: inherit;
  transition-property: background;
  &::before{
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0;
    border-radius: inherit;
  }
}
.handle{
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
    position: relative;
    transition-property: transform, min-width, background;
    background: var(--s-color-outline, ${scheme.color.outline});
    &::before{
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--s-color-on-primary, ${scheme.color.onPrimary});
      opacity: 0;
    }
  }
  .ripple{
    position: absolute;
    inset: 0;
    &::after,
    &::before{
      content: '';
      border-radius: 50%;
      position: absolute;
      inset: 0;
      background: var(--s-color-outline, ${scheme.color.outline});
      opacity: 0;
      transition-property: transform, opacity;
      transition-duration: inherit;
      transform: scale(1);
    }
    &::before{
      opacity: 0;
    }
    &::after{
      background: currentColor;
      opacity: 0;
    }
  }
}
:host(:is([pressed],[hovered])){
  .handle>.ripple::before{
    transform: scale(1);
    opacity: .12;
  }
}
.selected,
.unselected{
  display: flex;
  position: relative;
  padding: 10%;
}
.unselected{
  color: var(--s-color-surface-variant, ${scheme.color.surfaceVariant});
  opacity: 1;
}
.selected{
  color: currentColor;
  position: absolute;
  inset: 0;
  opacity: 0;
}
:host([checked]){
  .track::before{
    opacity: 1;
  }
  .handle{
    transform: translateX(50%);
    .thumb{
      min-width: 60%;
      &::before{
        opacity: 1;
      }
    }
  }
  .unselected{
    opacity: 0;
  }
  .selected{
    opacity: 1;
  }
}
:host([pressed]) {
  cursor: grabbing;
  .handle>.thumb{
    min-width: 70%;
  }
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 100%;
  height: 100%;
}
`

const template = /*html*/`
<div class="track" part="track">
  <div class="handle" part="handle">
    <div class="ripple" part="ripple"></div>
    <div class="thumb" part="thumb">
      <slot name="unselected" class="unselected" part="unselected"></slot>
      <slot name="selected" class="selected" part="selected"></slot>
    </div>
  </div>
</div>
`

const getEventNames = (type: string) => {
  const mouse = { move: 'mousemove', up: 'mouseup' } as const
  const touch = { move: 'touchmove', up: 'touchend' } as const
  return type === 'mouse' ? mouse : touch
}

export class Switch extends useElement({
  style, template, props,
  focused: true,
  pressed: true,
  hovered: true,
  setup(shadowRoot) {
    const track = shadowRoot.querySelector<HTMLDivElement>('.track')!
    const handle = shadowRoot.querySelector<HTMLDivElement>('.handle')!
    let touched = false
    this.addEventListener('click', () => {
      if (touched) return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    this.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      touched = false
    })
    this.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      const state = { x: event.pageX, checked: this.checked }
      const move = (event: PointerEvent | TouchEvent) => {
        const e = event instanceof TouchEvent ? event.touches[0] : event
        event.cancelable && event.preventDefault()
        touched = true
        const left = Math.min(Math.max(0, (e.pageX - state.x) + (state.checked ? handle.offsetWidth / 2 : 0)), handle.offsetWidth / 2)
        handle.style.transition = 'none'
        handle.style.transform = `translateX(${left}px)`
        const percentage = left / (handle.offsetWidth / 2) * 1
        track.style.setProperty('--opacity', percentage.toString())
        //const checked = left >= handle.offsetWidth / 4
        //if (this.checked !== checked) {
        //this.checked = checked
        //this.dispatchEvent(new Event('change'))
        //}
      }
      const eventNames = getEventNames(event.pointerType)
      const remove = () => {
        handle.style.removeProperty('transition')
        handle.style.removeProperty('transform')
        track.style.removeProperty('--opacity')
        //document.removeEventListener(eventNames.move, move)
      }
      //document.addEventListener(eventNames.move, move, { passive: false })
      //document.addEventListener(eventNames.up, remove, { once: true })
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

function interpolateColor(startHex: string, endHex: string, progress: number) {
  const start = parseInt(startHex.substring(1), 16);
  const end = parseInt(endHex.substring(1), 16);
  const r = Math.round((end >> 16 & 0xFF) * progress / 100 + (start >> 16 & 0xFF) * (1 - progress / 100))
  const g = Math.round((end >> 8 & 0xFF) * progress / 100 + (start >> 8 & 0xFF) * (1 - progress / 100))
  const b = Math.round((end & 0xFF) * progress / 100 + (start & 0xFF) * (1 - progress / 100))
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`
}