import { useElement, useProps, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { device } from '../core/device.js'
import './ripple.js'

const props = useProps({
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  clickChanged: true,
  mode: ['range', 'single', 'single-reversed'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  variant: ['standard', 'segmented'],
  orientation: ['horizontal', 'vertical'],
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--s-color-primary, ${scheme.color.primary});
  transition-property: none;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
  height: 24px;
  cursor: pointer;
  --base-slider-gap: 4px;
  --base-slider-thumb-size: 18px;
  --base-slider-thumb-width: var(--base-slider-thumb-size);
  --base-slider-thumb-height: var(--base-slider-thumb-size);
  --base-slider-thumb-start-width: var(--base-slider-thumb-width);
  --base-slider-thumb-start-height: var(--base-slider-thumb-height);
  --base-slider-thumb-end-width: var(--base-slider-thumb-width);
  --base-slider-thumb-end-height: var(--base-slider-thumb-height);
}
.layuot{
  display: contents;
}
slot:is([name=track-start], [name=track-fill], [name=track-end], [name=thumb-start], [name=thumb-end]){
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: absolute;
}
slot:is([name=track-start], [name=track-fill], [name=track-end]){
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
  border-radius: 4px;
  height: calc(100% / 3);
  left: 0;
  --s-private-thumb-start-size: var(--base-slider-thumb-start-width);
  --s-private-thumb-end-size: var(--base-slider-thumb-end-width);
  --s-private-start-offset: calc((0px - var(--s-private-thumb-start-size) / 2) / 50 * var(--s-private-start) + var(--s-private-thumb-start-size) / 2);
  --s-private-end-offset: calc((0px - var(--s-private-thumb-end-size) / 2) / 50 * var(--s-private-end) + var(--s-private-thumb-end-size) / 2);
}
slot[name=track-start]{
  --s-private-size: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
  width: var(--s-private-size);
}
slot[name=track-fill]{
  --s-private-position: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
  --s-private-size: calc(var(--s-private-diff) * 1% - var(--s-private-start-offset) + var(--s-private-end-offset));
  width: var(--s-private-size);
  left: var(--s-private-position);
  background: currentColor;
}
slot[name=track-end]{
  --s-private-size: calc((100 - var(--s-private-end)) * 1% - var(--s-private-end-offset));
  width: var(--s-private-size);
  right: 0;
  left: auto;
}
slot:is([name=thumb-start], [name=thumb-end]){
  background: currentColor;
  border-radius: 50%;
  cursor: grab;
  &::before{
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    border-radius: inherit;
    opacity: 0;
    background: currentColor;
    transition-property: opacity;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
slot[name=thumb-start]{
  width: var(--base-slider-thumb-start-width);
  height: var(--base-slider-thumb-start-height);
  left: calc(var(--s-private-start) * 1%);
  transform: translateX(calc(var(--s-private-start) * -1%));
}
slot[name=thumb-end]{
  width: var(--base-slider-thumb-end-width);
  height: var(--base-slider-thumb-end-height);
  left: calc(var(--s-private-end) * 1%);
  transform: translateX(calc(var(--s-private-end) * -1%));
}
:host([start-pressed]) slot[name=thumb-start],
:host([end-pressed]) slot[name=thumb-end]{
  cursor: grabbing;
}
:host(:is([start-hovered], [start-pressed])) slot[name=thumb-start]::before,
:host(:is([end-hovered], [end-pressed])) slot[name=thumb-end]::before{
  opacity: .2;
}
:host([variant=segmented]){
  slot:is([name=track-start], [name=track-fill], [name=track-end]){
    --s-private-start-offset: calc((0px - var(--s-private-thumb-start-size) / 2) / 50 * var(--s-private-start) + var(--s-private-thumb-start-size) + var(--base-slider-gap));
    --s-private-end-offset: calc((0px - var(--s-private-thumb-end-size) / 2) / 50 * var(--s-private-end) + var(--s-private-thumb-end-size) / 2);
  }
  slot[name=track-start]{
    --s-private-size: calc(var(--s-private-start) * 1% + var(--s-private-start-offset) - var(--base-slider-gap) * 2 - var(--s-private-thumb-start-size));
  }
  slot[name=track-fill]{
    --s-private-position: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
    --s-private-size: calc(var(--s-private-diff) * 1% - var(--s-private-start-offset) + var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
  }
  slot[name=track-end]{
    --s-private-size: calc((100 - var(--s-private-end)) * 1% - var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
  }
  &:host(:is([mode=single], [mode=single-reversed])){
    slot[name=track-fill]{
      --s-private-size: calc(var(--s-private-diff) * 1% + var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
    }
  }
}
:host(:is([mode=single], [mode=single-reversed])){
  slot:is([name=track-start], [name=thumb-start]) {
    display: none;
  }
  slot[name=track-fill]{
    --s-private-position: 0px;
    --s-private-size: calc(var(--s-private-diff) * 1% + var(--s-private-end-offset));
  }
}
:host([mode=single-reversed]){
  slot[name=track-fill]{
    left: auto;
    right: var(--s-private-position);
  }
  slot[name=track-end]{
    left: 0;
    right: auto;
  }
  slot[name=thumb-end]{
    left: auto;
    right: calc(var(--s-private-end) * 1%);
    transform: translateX(calc(var(--s-private-end) * 1%));
  }
}
:host([orientation=vertical]){
  width: 24px;
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  slot:is([name=track-start], [name=track-fill], [name=track-end]){
    width: calc(100% / 3);
    left: auto;
    bottom: 0;
    height: var(--s-private-size);
    --s-private-thumb-start-size: var(--base-slider-thumb-start-height);
    --s-private-thumb-end-size: var(--base-slider-thumb-end-height);
  }
  slot[name=track-fill]{
    bottom: var(--s-private-position);
    height: var(--s-private-size);
  }
  slot[name=track-end]{
    inset: auto;
    top: 0;
  }
  slot:is([name=thumb-start], [name=thumb-end]){
    left: auto;
    right: auto;
  }
  slot[name=thumb-start]{
    bottom: calc(var(--s-private-start) * 1%);
    transform: translateY(calc(var(--s-private-start) * 1%));
  }
  slot[name=thumb-end]{
    bottom: calc(var(--s-private-end) * 1%);
    transform: translateY(calc(var(--s-private-end) * 1%));
  }
  &:host([mode=single-reversed]){
    slot:is([name=thumb-start], [name=thumb-end]){
      right: auto;
      top: calc(var(--s-private-end) * 1%);
      transform: translateY(calc(var(--s-private-end) * -1%));
    }
    slot[name=track-fill]{
      right: auto;
      top: var(--s-private-position);
    }
    slot[name=track-end]{
      inset: auto;
      bottom: 0;
    }
  }
}
`

const template = /*html*/`
<div class="layuot" part="layuot">
  <slot name="track-start" part="track-start"></slot>
  <slot name="track-end" part="track-end"></slot>
  <slot part="custom"></slot>
  <slot name="track-fill" part="track-fill"></slot>
  <slot name="thumb-start" part="thumb-start"></slot>
  <slot name="thumb-end" part="thumb-end"></slot>
</div>
`

const whichIsCloser = (v: number, start: number, end: number) => {
  const toSatart = Math.abs(v - start)
  const toEnd = Math.abs(v - end)
  return toSatart < toEnd ? 1 : toEnd < toSatart ? 2 : 0
}
const findClosestStep = (num: number, step: number, max: number) => Math.max(0, Math.min(max / step, Math.round(num / step))) * step
const orientation = {
  horizontal: { offsetWidth: 'offsetWidth', clientX: 'clientX', clientY: 'clientY', left: 'left' },
  vertical: { offsetWidth: 'offsetHeight', clientX: 'clientY', clientY: 'clientX', left: 'top' }
} as const
const getEventNames = (type: string) => {
  const mouse = { move: 'mousemove', up: 'mouseup' } as const
  const touch = { move: 'touchmove', up: 'touchend' } as const
  return type === 'mouse' ? mouse : touch
}

export class BaseSlider extends useElement({
  props, template, style,
  focused: true,
  pressed: true,
  hovered: true,
  setup(shadowRoot, states) {
    const layuot = shadowRoot.querySelector<HTMLDivElement>('.layuot')!
    const thumbStartSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-start]')!
    const thumbEndSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-end]')!
    const getPercent = (v: number) => ((v - this.min) / (this.max - this.min)) * 100
    const render = () => {
      const [start, end] = [
        findClosestStep(getPercent(this.start), this.step / this.max * 100, 100),
        findClosestStep(getPercent(this.end), this.step / this.max * 100, 100)
      ].sort((a, b) => a - b)
      const name = '--s-private'
      layuot.style.setProperty(`${name}-diff`, `${end - start}`)
      layuot.style.setProperty(`${name}-start`, `${start}`)
      layuot.style.setProperty(`${name}-end`, `${end}`)
    }
    let touched = false
    const getCloser = (x: number) => {
      const startRect = thumbStartSlot.getBoundingClientRect()
      const start = startRect[orientation[this.orientation].left]
      const endRect = thumbEndSlot.getBoundingClientRect()
      const end = endRect[orientation[this.orientation].left]
      const closer = whichIsCloser(x, start, end)
      if (closer === 0) return x > start ? 'end' : 'start'
      return ([null, 'start', 'end'] as const)[closer]
    }
    const getValue = (left: number, thumbSize: number, size: number) => {
      if ((this.orientation === 'horizontal' && this.mode === 'single-reversed') || (this.orientation === 'vertical' && this.mode !== 'single-reversed')) left = size - left
      const offset = Math.min(Math.max(0 + thumbSize / 2, (left / size * 100)), 100 - thumbSize / 2)
      const percent = ((offset - thumbSize / 2) / (100 - thumbSize)) * 100
      const newValue = findClosestStep(this.min + (percent / 100) * (this.max - this.min), this.step, this.max)
      return newValue
    }
    this.addEventListener('click', (event) => {
      if (!this.clickChanged || touched) return
      const ori = orientation[this.orientation]
      const x = event[ori.clientX]
      const name = this.mode === 'range' ? getCloser(x) : 'end'
      const rect = this.getBoundingClientRect()
      const size = this[ori.offsetWidth]
      const thumbSize = { start: thumbStartSlot, end: thumbEndSlot }[name][ori.offsetWidth] / size * 100
      let left = x - rect[ori.left]
      const newValue = getValue(left, thumbSize, size)
      if (newValue !== this[name]) {
        this[name] = newValue
        this.dispatchEvent(new Event('change'))
      }
    })
    const down = (event: PointerEvent, name?: 'start' | 'end') => {
      if (event.button !== 0) return
      const ori = orientation[this.orientation]
      const rect = this.getBoundingClientRect()
      const size = this[ori.offsetWidth]
      const notThumb = !name
      if (!name) name = this.mode === 'range' ? getCloser(event[ori.clientX]) : 'end'
      const thumbSize = { start: thumbStartSlot, end: thumbEndSlot }[name][ori.offsetWidth] / size * 100
      const startValue = this.start
      const endValue = this.end
      const thumbRect = { start: thumbStartSlot.getBoundingClientRect(), end: thumbEndSlot.getBoundingClientRect() }[name]
      const offsetClientX = this.slidingMode === 'all-cumulative' ? thumbRect[ori.left] - event[ori.clientX] : 0
      const state = { x: event[ori.clientX], y: event[ori.clientY], allowed: false }
      const move = (ev: MouseEvent | TouchEvent) => {
        touched = true
        const e = ev instanceof TouchEvent ? ev.touches[0] : ev
        if (notThumb && !state.allowed && Math.abs(state.x - e[ori.clientX]) < Math.abs(state.y - e[ori.clientY])) return up()
        if (!state.allowed) state.allowed = true
        event.preventDefault()
        event.stopPropagation()
        let left = (e[ori.clientX] - rect[ori.left]) + offsetClientX
        let newValue = getValue(left, thumbSize, size)
        const v = { start: Math.min(newValue, endValue), end: Math.max(newValue, startValue) }[name]
        if (v !== this[name]) {
          this[name] = v
          this.dispatchEvent(new Event('input'))
        }
        !this.hasAttribute('sliding') && this.setAttribute('sliding', '')
        !this.hasAttribute(`${name}-pressed`) && this.setAttribute(`${name}-pressed`, '')
      }
      const up = () => {
        allowed = true
        document.removeEventListener(eventNames.move, move)
        document.removeEventListener(eventNames.up, up)
        this.removeAttribute('start-pressed')
        this.removeAttribute('end-pressed')
        this.removeAttribute('sliding')
        if (startValue !== this.start || endValue !== this.end) this.dispatchEvent(new Event('change'))
      }
      const eventNames = getEventNames(event.pointerType)
      document.addEventListener(eventNames.move, move, { passive: false })
      document.addEventListener(eventNames.up, up)
    }
    let allowed = true
    this.addEventListener('pointerdown', (event) => {
      touched = false
      if (!allowed || this.slidingMode === 'thumb') return
      down(event)
    })
    const thumbDown = (event: PointerEvent, name: 'start' | 'end') => {
      allowed = false
      this.setAttribute(`${name}-pressed`, '')
      down(event, name)
    }
    thumbStartSlot.addEventListener('pointerdown', (event) => thumbDown(event, 'start'))
    thumbEndSlot.addEventListener('pointerdown', (event) => thumbDown(event, 'end'))
    thumbStartSlot.onmouseenter = () => device.mouseEnabled && this.setAttribute('start-hovered', '')
    thumbStartSlot.onmouseleave = () => device.mouseEnabled && this.removeAttribute('start-hovered')
    thumbEndSlot.onmouseenter = () => device.mouseEnabled && this.setAttribute('end-hovered', '')
    thumbEndSlot.onmouseleave = () => device.mouseEnabled && this.removeAttribute('end-hovered')
    this.addEventListener('keydown', (event) => {
      const subEnd = () => this.end = Math.max(this.end - this.step, this.start)
      const addEnd = () => this.end = Math.max(this.end + this.step, this.start)
      const subStart = () => this.start = Math.min(this.start - this.step, this.end)
      const addStart = () => this.start = Math.min(this.start + this.step, this.end)
      let calls = { ArrowLeft: subEnd, ArrowRight: addEnd, ArrowUp: subStart, ArrowDown: addStart }
      let key = event.key as keyof typeof calls
      if (!(key in calls)) return
      event.preventDefault()
      const startValue = this.start
      const endValue = this.end
      if (this.orientation === 'horizontal') {
        if (this.mode === 'single') {
          calls.ArrowUp = subEnd
          calls.ArrowDown = addEnd
        }
        if (this.mode === 'single-reversed') {
          calls.ArrowUp = calls.ArrowLeft = addEnd
          calls.ArrowDown = calls.ArrowRight = subEnd
        }
      } else {
        calls = { ArrowLeft: addStart, ArrowRight: subStart, ArrowUp: addEnd, ArrowDown: subEnd }
        if (this.mode === 'single') {
          calls.ArrowLeft = addEnd
          calls.ArrowRight = subEnd
        }
        if (this.mode === 'single-reversed') {
          calls.ArrowLeft = calls.ArrowUp = subEnd
          calls.ArrowRight = calls.ArrowDown = addEnd
        }
      }
      calls[key]()
      if (startValue !== this.start || endValue !== this.end) this.dispatchEvent(new Event('change'))
    })
    useThrottle(render)
    return {
      onAttributeChanged: (name) => ['start', 'end', 'max', 'min', 'step', 'mode'].includes(name) && useThrottle(render),
      getStart: () => {
        if (this.mode !== 'range') return 0
        return Math.max(Math.min(states.props.start, states.props.max), states.props.min)
      },
      getEnd: () => Math.min(Math.max(states.props.end, states.props.min), states.props.max),
      getStep: () => states.props.max % states.props.step === 0 ? states.props.step : 1,
      getMax: () => states.props.max <= 1 ? 1 : states.props.max,
      getMin: () => {
        if (states.props.min > states.props.max) return 0
        return states.props.min % states.props.step === 0 ? states.props.min : 0
      }
    }
  }
}) { }

const name = BaseSlider.define('s-base-slider')

declare global {
  interface HTMLElementTagNameMap {
    [name]: BaseSlider
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
    } & BaseSlider
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