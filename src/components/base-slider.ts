import { useElement, useProps, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { device } from '../core/device.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  clickChanged: true,
  slidingPriority: false,
  mode: ['single', 'single-reversed', 'range'],
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
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
  height: 24px;
  cursor: pointer;
}
.layout{
  display: contents;
  --s_gap: 0;
  --s_gap: var(--base-slider-gap, 4px);
  --s_thumb-size: var(--s-base-slider-thumb-size, 18px);
  --s_thumb-width: var(--s-base-slider-thumb-width, var(--s_thumb-size));
  --s_thumb-height: var(--s-base-slider-thumb-height, var(--s_thumb-size));
  --s_thumb-start-width: var(--s-base-slider-thumb-start-width, var(--s_thumb-width));
  --s_thumb-start-height: var(--s-base-slider-thumb-start-height, var(--s_thumb-height));
  --s_thumb-end-width: var(--s-base-slider-thumb-end-width, var(--s_thumb-width));
  --s_thumb-end-height: var(--s-base-slider-thumb-end-height, var(--s_thumb-height));
  --s_thumb-start-size: var(--s_thumb-start-width);
  --s_thumb-end-size: var(--s_thumb-end-width);
  --s_start-offset: calc((0px - var(--s_thumb-start-size) / 2) / 50 * var(--s_start) + var(--s_thumb-start-size) / 2);
  --s_end-offset: calc((0px - var(--s_thumb-end-size) / 2) / 50 * var(--s_end) + var(--s_thumb-end-size) / 2);
  --s_track-start-size: calc(var(--s_start) * 1% + var(--s_start-offset));
  --s_track-fill-position: 0px;
  --s_track-fill-size: calc(var(--s_diff) * 1% + var(--s_end-offset));
  --s_track-end-size: calc((100 - var(--s_end)) * 1% - var(--s_end-offset));
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
}
slot[name=track-start]{
  width: var(--s_track-start-size);
  display: none;
}
slot[name=track-fill]{
  width: var(--s_track-fill-size);
  left: var(--s_track-fill-position);
  background: currentColor;
}
slot[name=track-end]{
  width: var(--s_track-end-size);
  right: 0;
  left: auto;
}
slot:is([name=thumb-start], [name=thumb-end]){
  background: currentColor;
  border-radius: 50%;
  cursor: grab;
  &::before,
  &::after{
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    border-radius: inherit;
  }
  &::before{
    opacity: 0;
    transform: scale(.5);
    background: currentColor;
    transition-property: opacity, transform;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
slot[name=thumb-start]{
  display: none;
  width: var(--s_thumb-start-width);
  height: var(--s_thumb-start-height);
  left: calc(var(--s_start) * 1%);
  transform: translateX(calc(var(--s_start) * -1%));
}
slot[name=thumb-end]{
  width: var(--s_thumb-end-width);
  height: var(--s_thumb-end-height);
  left: calc(var(--s_end) * 1%);
  transform: translateX(calc(var(--s_end) * -1%));
}
:host([start-pressed]) slot[name=thumb-start],
:host([end-pressed]) slot[name=thumb-end]{
  cursor: grabbing;
}
:host(:is([start-hovered], [start-pressed])) slot[name=thumb-start]::before,
:host(:is([end-hovered], [end-pressed])) slot[name=thumb-end]::before{
  opacity: .12;
  transform: scale(1);
}
:host([mode=single-reversed]){
  slot[name=track-fill]{
    left: auto;
    right: var(--s_track-fill-position);
  }
  slot[name=track-end]{
    left: 0;
    right: auto;
  }
  slot[name=thumb-end]{
    left: auto;
    right: calc(var(--s_end) * 1%);
    transform: translateX(calc(var(--s_end) * 1%));
  }
}
:host([mode=range]){
  .layout{
    --s_track-fill-position: calc(var(--s_start) * 1% + var(--s_start-offset));
    --s_track-fill-size: calc(var(--s_diff) * 1% - var(--s_start-offset) + var(--s_end-offset));
  }
  slot[name=thumb-start],
  slot[name=track-start]{
    display: flex;
  }
}
:host([variant=segmented]){
  .layout{
    --s_start-offset: calc((0px - var(--s_thumb-start-size) / 2) / 50 * var(--s_start) + var(--s_thumb-start-size) + var(--s_gap));
    --s_end-offset: calc((0px - var(--s_thumb-end-size) / 2) / 50 * var(--s_end) + var(--s_thumb-end-size) / 2);
    --s_track-start-size: calc(var(--s_start) * 1% + var(--s_start-offset) - var(--s_gap) * 2 - var(--s_thumb-start-size));
    --s_track-fill-size: calc(var(--s_diff) * 1% + var(--s_end-offset) - var(--s_thumb-end-size) / 2 - var(--s_gap));
    --s_track-end-size: calc((100 - var(--s_end)) * 1% - var(--s_end-offset) - var(--s_thumb-end-size) / 2 - var(--s_gap));
  }
  &:host([mode=range]){
    .layout{
      --s_track-fill-position: calc(var(--s_start) * 1% + var(--s_start-offset));
      --s_track-fill-size: calc(var(--s_diff) * 1% - var(--s_start-offset) + var(--s_end-offset) - var(--s_thumb-end-size) / 2 - var(--s_gap));
    }
  }
}
:host([orientation=vertical]){
  width: 24px;
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  .layout{
    --s_thumb-start-size: var(--s_thumb-start-height);
    --s_thumb-end-size: var(--s_thumb-end-height);
  }
  slot:is([name=track-start], [name=track-fill], [name=track-end]){
    width: calc(100% / 3);
    left: auto;
    bottom: 0;
  }
  slot[name=track-fill]{
    bottom: var(--s_track-fill-position);
    height: var(--s_track-fill-size);
  }
  slot[name=track-end]{
    inset: auto;
    top: 0;
    height: var(--s_track-end-size);
  }
  slot:is([name=thumb-start], [name=thumb-end]){
    left: auto;
    right: auto;
  }
  slot[name=thumb-start]{
    bottom: calc(var(--s_start) * 1%);
    transform: translateY(calc(var(--s_start) * 1%));
  }
  slot[name=thumb-end]{
    bottom: calc(var(--s_end) * 1%);
    transform: translateY(calc(var(--s_end) * 1%));
  }
  &:host([mode=single-reversed]){
    slot:is([name=thumb-start], [name=thumb-end]){
      right: auto;
      top: calc(var(--s_end) * 1%);
      transform: translateY(calc(var(--s_end) * -1%));
    }
    slot[name=track-fill]{
      right: auto;
      top: var(--s_track-fill-position);
    }
    slot[name=track-end]{
      inset: auto;
      bottom: 0;
    }
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot name="low" part="low"></slot>
  <slot name="track-start" part="track-start"></slot>
  <slot name="track-end" part="track-end"></slot>
  <slot name="middle" part="middle"></slot>
  <slot name="track-fill" part="track-fill"></slot>
  <slot name="thumb-start" part="thumb-start"></slot>
  <slot name="thumb-end" part="thumb-end"></slot>
  <slot part="custom"></slot>
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
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const thumbStartSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-start]')!
    const thumbEndSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-end]')!
    const computedStyle = useComputedStyle(this)
    const getPercent = (v: number) => ((v - this.min) / (this.max - this.min)) * 100
    const render = () => {
      const [start, end] = [
        findClosestStep(getPercent(this.start), this.step / this.max * 100, 100),
        findClosestStep(getPercent(this.end), this.step / this.max * 100, 100)
      ].sort((a, b) => a - b)
      const name = '--s_'
      layout.style.setProperty(`${name}diff`, `${end - start}`)
      layout.style.setProperty(`${name}start`, `${start}`)
      layout.style.setProperty(`${name}end`, `${end}`)
    }
    const getSlidingMode = () => {
      const cssSlidingMode = computedStyle.getValue('--s-base-slider-sliding-mode')
      return ['thumb', 'all', 'all-cumulative'].includes(cssSlidingMode) ? cssSlidingMode : this.slidingMode
    }
    const getSlidingPriority = () => {
      const cssSlidingPriority = computedStyle.getValue('--s-base-slider-sliding-priority')
      return ['', 'none'].includes(cssSlidingPriority) ? this.slidingPriority : Boolean(cssSlidingPriority)
    }
    const getClickChanged = () => {
      const cssClickChanged = computedStyle.getValue('--s-base-slider-click-changed')
      return ['', 'none'].includes(cssClickChanged) ? this.clickChanged : Boolean(cssClickChanged)
    }
    const getCloser = (x: number) => {
      const startRect = thumbStartSlot.getBoundingClientRect()
      const start = startRect[orientation[this.orientation].left]
      const endRect = thumbEndSlot.getBoundingClientRect()
      const end = endRect[orientation[this.orientation].left]
      const closer = whichIsCloser(x, start, end)
      if (start === end) return x > start ? 'end' : 'start'
      return (['end', 'start', 'end'] as const)[closer]
    }
    const getValue = (left: number, thumbSize: number, size: number) => {
      if ((this.orientation === 'horizontal' && this.mode === 'single-reversed') || (this.orientation === 'vertical' && this.mode !== 'single-reversed')) left = size - left
      const offset = Math.min(Math.max(0 + thumbSize / 2, (left / size * 100)), 100 - thumbSize / 2)
      const percent = ((offset - thumbSize / 2) / (100 - thumbSize)) * 100
      const newValue = findClosestStep(this.min + (percent / 100) * (this.max - this.min), this.step, this.max)
      return newValue
    }
    let touched = false
    this.addEventListener('click', (event) => {
      const clickChanged = getClickChanged()
      if (!clickChanged || touched) return
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
        this.dispatchEvent(new Event('input'))
        this.dispatchEvent(new Event('change'))
      }
    })
    const down = (event: PointerEvent, name?: 'start' | 'end') => {
      const ori = orientation[this.orientation]
      const rect = this.getBoundingClientRect()
      const size = this[ori.offsetWidth]
      const notThumb = !name
      if (!name) {
        name = this.mode === 'range' ? getCloser(event[ori.clientX]) : 'end'
        event.pointerType === 'mouse' && this.setAttribute(`${name}-pressed`, '')
      }
      const thumbSize = { start: thumbStartSlot, end: thumbEndSlot }[name][ori.offsetWidth] / size * 100
      const startValue = this.start
      const endValue = this.end
      const thumbRect = { start: thumbStartSlot.getBoundingClientRect(), end: thumbEndSlot.getBoundingClientRect() }[name]
      const slidingMode = getSlidingMode()
      const slidingPriority = getSlidingPriority()
      const offsetClientX = slidingMode === 'all-cumulative' ? thumbRect[ori.left] - event[ori.clientX] : 0
      const state = { x: event[ori.clientX], y: event[ori.clientY], allowed: false, initialized: false }
      const move = (ev: MouseEvent | TouchEvent) => {
        const e = ev instanceof TouchEvent ? ev.touches[0] : ev
        if (notThumb && event.pointerType !== 'mouse' && !slidingPriority) {
          const x = Math.abs(state.x - e[ori.clientX])
          const y = Math.abs(state.y - e[ori.clientY])
          if (x > 5 || y > 5) state.initialized = true
          if (!state.initialized) return
          if (!state.allowed && x < y) return up()
          state.allowed = true
        }
        touched = true
        ev.cancelable && ev.preventDefault()
        ev.stopPropagation()
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
      if (event.button !== 0) return
      touched = false
      const slidingMode = getSlidingMode()
      if (!allowed || slidingMode === 'thumb') return
      down(event)
    })
    const thumbDown = (event: PointerEvent, name: 'start' | 'end') => {
      if (event.button !== 0) return
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
    const keydown = (key: string) => {
      const subEnd = () => this.end = Math.max(this.end - this.step, this.start)
      const addEnd = () => this.end = Math.max(this.end + this.step, this.start)
      const subStart = () => this.start = Math.min(this.start - this.step, this.end)
      const addStart = () => this.start = Math.min(this.start + this.step, this.end)
      let calls = { ArrowLeft: subEnd, ArrowRight: addEnd, ArrowUp: subStart, ArrowDown: addStart }
      let k = key as keyof typeof calls
      if (!(key in calls)) return false
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
      calls[k]()
      if (startValue !== this.start || endValue !== this.end) {
        this.dispatchEvent(new Event('input'))
        this.dispatchEvent(new Event('change'))
      }
      return true
    }
    this.addEventListener('keydown', (e) => {
      if (!keydown(e.key)) return
      e.preventDefault()
    })
    useThrottle(render)
    return {
      expose: { keydown },
      onAttributeChanged: (name) => ['start', 'end', 'max', 'min', 'step', 'mode'].includes(name) && useThrottle(render),
      getStart: () => {
        if (this.mode !== 'range') return 0
        return Math.max(Math.min(info.props.start, info.props.max), info.props.min)
      },
      getEnd: () => Math.min(Math.max(info.props.end, info.props.min), info.props.max),
      getMax: () => info.props.max <= 1 ? 1 : info.props.max,
      getMin: () => {
        if (info.props.min > info.props.max) return 0
        return info.props.min % info.props.step === 0 ? info.props.min : 0
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