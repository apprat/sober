import { useElement, useProps, useThrottle, device } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  name: '',
  $stepMarks: '',
  $defaultStart: 0,
  $defaultEnd: 0,
  touchScrollPriority: false,
  mode: ['single', 'reversed', 'range'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  variant: ['standard', 'segmented'],
  orientation: ['horizontal', 'vertical'],
})

const events = {
  pressstart: CustomEvent<{ name: 'start' | 'end' }>,
  pressend: CustomEvent<{ name: 'start' | 'end' }>,
  hoverstart: CustomEvent<{ name: 'start' | 'end' }>,
  hoverend: CustomEvent<{ name: 'start' | 'end' }>,
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${scheme.color.primary};
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  height: 24px;
}
:host(:focus-visible){
  outline-style: none;
  .thumb-start,
  .thumb-end{
    outline-style: solid;
  }
}
.layout{
  display: contents;
  --s_base-slider-gap: var(--base-slider-gap, 4px);
  --s_base-slider-thumb-size: var(--s-base-slider-thumb-size, 18px);
  --s_base-slider-thumb-width: var(--s-base-slider-thumb-width, var(--s_base-slider-thumb-size));
  --s_base-slider-thumb-height: var(--s-base-slider-thumb-height, var(--s_base-slider-thumb-size));
  --s_base-slider-thumb-start-width: var(--s-base-slider-thumb-start-width, var(--s_base-slider-thumb-width));
  --s_base-slider-thumb-start-height: var(--s-base-slider-thumb-start-height, var(--s_base-slider-thumb-height));
  --s_base-slider-thumb-end-width: var(--s-base-slider-thumb-end-width, var(--s_base-slider-thumb-width));
  --s_base-slider-thumb-end-height: var(--s-base-slider-thumb-end-height, var(--s_base-slider-thumb-height));
  --s_base-slider-thumb-start-size: var(--s_base-slider-thumb-start-width);
  --s_base-slider-thumb-end-size: var(--s_base-slider-thumb-end-width);
  --s_base-slider-start-offset: calc((0px - var(--s_base-slider-thumb-start-size) / 2) / 50 * var(--s_base-slider-start) + var(--s_base-slider-thumb-start-size) / 2);
  --s_base-slider-end-offset: calc((0px - var(--s_base-slider-thumb-end-size) / 2) / 50 * var(--s_base-slider-end) + var(--s_base-slider-thumb-end-size) / 2);
  --s_base-slider-track-start-size: calc(var(--s_base-slider-start) * 1% + var(--s_base-slider-start-offset));
  --s_base-slider-track-fill-position: 0px;
  --s_base-slider-track-fill-size: calc(var(--s_base-slider-diff) * 1% + var(--s_base-slider-end-offset));
  --s_base-slider-track-end-size: calc((100 - var(--s_base-slider-end)) * 1% - var(--s_base-slider-end-offset));
}
.track-start,
.track-fill,
.track-end,
.thumb-start,
.thumb-end { 
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: absolute;
  will-change: left, right, bottom, width, height;
  contain: layout;
  transition-property: none;
}
.track-start,
.track-fill,
.track-end{
  background: ${scheme.color.secondaryContainer};
  border-radius: 4px;
  height: calc(100% / 3);
  left: 0;
}
.track-start{
  width: calc(var(--s_base-slider-track-start-size) + var(--s-base-slider-track-edge-offset, 0px));
  margin-left: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  display: none;
}
.track-fill{
  width: calc(var(--s_base-slider-track-fill-size) + var(--s-base-slider-track-edge-offset, 0px));
  left: var(--s_base-slider-track-fill-position);
  margin-left: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  background: currentColor;
}
.track-end{
  width: calc(var(--s_base-slider-track-end-size) + var(--s-base-slider-track-edge-offset, 0px));
  right: 0;
  margin-right: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  left: auto;
}
.thumb-start,
.thumb-end{
  background: currentColor;
  border-radius: 50%;
  cursor: grab;
  justify-content: center;
  outline-color: currentColor;
  outline-offset: 2px;
  outline-width: 3px;
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
    filter: opacity(.12);
    transform: scale(.5);
    background: currentColor;
    transition-property: opacity, transform;
  }
}
.thumb-start{
  display: none;
  width: var(--s_base-slider-thumb-start-width);
  height: var(--s_base-slider-thumb-start-height);
  left: calc(var(--s_base-slider-start) * 1%);
  transform: translateX(calc(var(--s_base-slider-start) * -1%));
}
.thumb-end{
  width: var(--s_base-slider-thumb-end-width);
  height: var(--s_base-slider-thumb-end-height);
  left: calc(var(--s_base-slider-end) * 1%);
  transform: translateX(calc(var(--s_base-slider-end) * -1%));
}
:host([start-pressed]) .thumb-start,
:host([end-pressed]) .thumb-end{
  cursor: grabbing;
}
:host(:is([start-hover], [start-pressed])) .thumb-start::before,
:host(:is([end-hover], [end-pressed])) .thumb-end::before{
  opacity: 1;
  transform: scale(1);
}
:host([mode=reversed]){
  .track-fill{
    left: auto;
    right: var(--s_base-slider-track-fill-position);
    margin-right: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
    margin-left: 0;
  }
  .track-end{
    left: 0;
    right: auto;
    margin-left: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
    margin-right: 0;
  }
  .thumb-end{
    left: auto;
    right: calc(var(--s_base-slider-end) * 1%);
    transform: translateX(calc(var(--s_base-slider-end) * 1%));
  }
}
:host([mode=range]){
  .layout{
    --s_base-slider-track-fill-position: calc(var(--s_base-slider-start) * 1% + var(--s_base-slider-start-offset));
    --s_base-slider-track-fill-size: calc(var(--s_base-slider-diff) * 1% - var(--s_base-slider-start-offset) + var(--s_base-slider-end-offset));
  }
  .track-fill{
    margin-left: 0;
    width: calc(var(--s_base-slider-track-fill-size) + var(--s_base-slider-track-edge-offset, 0px));
  }
  .thumb-start,
  .track-start{
    display: flex;
  }
}
:host([variant=segmented]){
  .layout{
    --s_base-slider-start-offset: calc((0px - var(--s_base-slider-thumb-start-size) / 2) / 50 * var(--s_base-slider-start) + var(--s_base-slider-thumb-start-size) + var(--s_base-slider-gap));
    --s_base-slider-end-offset: calc((0px - var(--s_base-slider-thumb-end-size) / 2) / 50 * var(--s_base-slider-end) + var(--s_base-slider-thumb-end-size) / 2);
    --s_base-slider-track-start-size: calc(var(--s_base-slider-start) * 1% + var(--s_base-slider-start-offset) - var(--s_base-slider-gap) * 2 - var(--s_base-slider-thumb-start-size));
    --s_base-slider-track-fill-size: calc(var(--s_base-slider-diff) * 1% + var(--s_base-slider-end-offset) - var(--s_base-slider-thumb-end-size) / 2 - var(--s_base-slider-gap));
    --s_base-slider-track-end-size: calc((100 - var(--s_base-slider-end)) * 1% - var(--s_base-slider-end-offset) - var(--s_base-slider-thumb-end-size) / 2 - var(--s_base-slider-gap));
  }
  &:host([mode=range]){
    .layout{
      --s_base-slider-track-fill-position: calc(var(--s_base-slider-start) * 1% + var(--s_base-slider-start-offset));
      --s_base-slider-track-fill-size: calc(var(--s_base-slider-diff) * 1% - var(--s_base-slider-start-offset) + var(--s_base-slider-end-offset) - var(--s_base-slider-thumb-end-size) / 2 - var(--s_base-slider-gap));
    }
  }
}
:host([orientation=vertical]){
  width: 24px;
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  .layout{
    --s_base-slider-thumb-start-size: var(--s_base-slider-thumb-start-height);
    --s_base-slider-thumb-end-size: var(--s_base-slider-thumb-end-height);
  }
  .track-start,
  .track-fill,
  .track-end{
    width: calc(100% / 3);
    left: auto;
    bottom: 0;
    margin: 0;
  }
  .track-start{
    margin-bottom: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  }
  .track-fill{
    bottom: var(--s_base-slider-track-fill-position);
    height: calc(var(--s_base-slider-track-fill-size) + var(--s-base-slider-track-edge-offset, 0px));
    margin-bottom: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  }
 .track-end{
    inset: auto;
    top: 0;
    height: calc(var(--s_base-slider-track-end-size) + var(--s-base-slider-track-edge-offset, 0px));
    margin-top: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
  }
  .thumb-start, 
  .thumb-end{
    left: auto;
    right: auto;
  }
  .thumb-start{
    bottom: calc(var(--s_base-slider-start) * 1%);
    transform: translateY(calc(var(--s_base-slider-start) * 1%));
  }
  .thumb-end{
    bottom: calc(var(--s_base-slider-end) * 1%);
    transform: translateY(calc(var(--s_base-slider-end) * 1%));
  }
  &:host([mode=reversed]){
    .thumb-start, 
    .thumb-end{
      right: auto;
      top: calc(var(--s_base-slider-end) * 1%);
      transform: translateY(calc(var(--s_base-slider-end) * -1%));
    }
    .track-fill{
      right: auto;
      top: var(--s_base-slider-track-fill-position);
      margin-top: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
    }
    .track-end{
      inset: auto;
      bottom: 0;
      margin-bottom: calc(var(--s-base-slider-track-edge-offset, 0px) * -1);
    }
  }
  &:host([mode=range]){
    .track-start{
      height: calc(var(--s_base-slider-track-start-size) + var(--s-base-slider-track-edge-offset, 0px));
    }
    .track-fill{
      bottom: calc(var(--s_base-slider-track-fill-position) + var(--s-base-slider-track-edge-offset, 0px));
      height: var(--s_base-slider-track-fill-size);
    }
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot name="low"></slot>
  <div class="track-start" part="track-start">
    <slot name="track-start"></slot>
  </div>
  <div class="track-end" part="track-end">
    <slot name="track-end"></slot>
  </div>
  <slot name="middle"></slot>
  <div class="track-fill" part="track-fill">
    <slot name="track-fill"></slot>
  </div>
  <div class="thumb-start" part="thumb-start">
    <slot name="thumb-start"></slot>
  </div>
  <div class="thumb-end" part="thumb-end">
    <slot name="thumb-end"></slot>
  </div>
  <slot></slot>
</div>
`

const orientation = {
  horizontal: { offsetWidth: 'offsetWidth', clientX: 'clientX', clientY: 'clientY', left: 'left' },
  vertical: { offsetWidth: 'offsetHeight', clientX: 'clientY', clientY: 'clientX', left: 'top' }
} as const

const onKeydown = (el: BaseSlider, key: string, steps: number[]) => {
  type K = 'start' | 'end'
  const sub = (key: K = 'end') => {
    const info = { old: el[key], min: el.min, value: el[key] - el.step }
    if (steps.length > 0) {
      info.min = steps[0]
      info.value = steps[steps.findLastIndex((v) => v < info.old)] ?? info.min
    }
    el[key] = Math.max(info.value, key === 'end' ? el.start : info.min)
  }
  const add = (key: K = 'end') => {
    const info = { old: el[key], max: el.max, value: el[key] + el.step }
    if (steps.length > 0) {
      info.max = steps[steps.length - 1]
      info.value = steps.find((v) => v > info.old) ?? info.max
    }
    el[key] = Math.min(info.value, key === 'end' ? info.max : el.end)
  }
  const k = key as keyof typeof calls
  let calls: { [key: string]: Function } = { ArrowLeft: sub, ArrowRight: add }
  const { start, end } = el
  if (el.mode === 'reversed') calls = { ArrowLeft: add, ArrowRight: sub }
  if (el.mode === 'range') calls = { ArrowLeft: sub, ArrowRight: add, ArrowUp: () => sub('start'), ArrowDown: () => add('start') }
  if (el.orientation === 'vertical') {
    calls = { ArrowUp: add, ArrowDown: sub }
    if (el.mode === 'reversed') calls = { ArrowUp: sub, ArrowDown: add }
    if (el.mode === 'range') calls = { ArrowUp: add, ArrowDown: sub, ArrowLeft: () => add('start'), ArrowRight: () => sub('start') }
  }
  calls[k]?.()
  if (start !== el.start || end !== el.end) {
    el.dispatchEvent(new Event('input'))
    el.dispatchEvent(new Event('change'))
    return true
  }
  return false
}

const whichIsCloser = (v: number, start: number, end: number) => {
  const toSatart = Math.abs(v - start)
  const toEnd = Math.abs(v - end)
  return toSatart < toEnd ? 1 : toEnd < toSatart ? 2 : 0
}

const findClosestStep = (value: number, min: number, max: number, step: number) => {
  let result = min + (value / 100) * (max - min)
  result = Math.round(result / step) * step
  result = Math.max(min, Math.min(max, result))
  return result
}

const findClosestArray = (value: number, arr: number[], min: number, max: number) => {
  const uniqueSorted = [...new Set([min, ...arr, max])].sort((a, b) => a - b)
  const mappedValue = min + (value / 100) * (max - min)
  let closest = uniqueSorted[0]
  let minDiff = Math.abs(uniqueSorted[0] - mappedValue)
  for (let i = 1; i < uniqueSorted.length; i++) {
    const diff = Math.abs(uniqueSorted[i] - mappedValue)
    if (diff < minDiff) {
      minDiff = diff
      closest = uniqueSorted[i]
    }
  }
  return closest
}

export class BaseSlider extends useElement({
  props, template, style, events,
  states: ['focusableOnly', 'pressable', 'hoverable', 'formable'],
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const thumbStart = shadowRoot.querySelector<HTMLDivElement>('.thumb-start')!
    const thumbEnd = shadowRoot.querySelector<HTMLDivElement>('.thumb-end')!
    const computedStyle = useComputedStyle(this)
    let steps: number[] = []
    const render = () => {
      const [start, end] = [
        (this.start - this.min) / (this.max - this.min) * 100,
        (this.end - this.min) / (this.max - this.min) * 100
      ].sort((a, b) => a - b)
      const name = '--s_base-slider-'
      layout.style.setProperty(`${name}diff`, `${end - start}`)
      layout.style.setProperty(`${name}start`, `${start}`)
      layout.style.setProperty(`${name}end`, `${end}`)
    }
    const getCloser = (x: number) => {
      const startRect = thumbStart.getBoundingClientRect()
      const start = startRect[orientation[this.orientation].left]
      const endRect = thumbEnd.getBoundingClientRect()
      const end = endRect[orientation[this.orientation].left]
      const closer = whichIsCloser(x, start, end)
      if (start === end) return x > start ? 'end' : 'start'
      return (['end', 'start', 'end'] as const)[closer]
    }
    const getValue = (left: number, thumbSize: number, size: number) => {
      if ((this.orientation === 'horizontal' && this.mode === 'reversed') || (this.orientation === 'vertical' && this.mode !== 'reversed')) left = size - left
      const offset = Math.min(Math.max(0 + thumbSize / 2, (left / size * 100)), 100 - thumbSize / 2)
      const percent = ((offset - thumbSize / 2) / (100 - thumbSize)) * 100
      if (steps.length === 0) return findClosestStep(percent, this.min, this.max, this.step)
      return findClosestArray(percent, steps, this.min, this.max)
    }
    const setPress = (name: 'start' | 'end') => {
      if (this.hasAttribute(`${name}-pressed`)) return
      this.setAttribute(`${name}-pressed`, '')
      this.dispatchEvent(new CustomEvent('pressstart', { detail: { name } }))
    }
    const down = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      const cssSlidingMode = computedStyle.getValue('--s-base-slider-sliding-mode')
      const slidingMode = props.metadata.slidingMode.types?.includes(cssSlidingMode) ? cssSlidingMode : this.slidingMode
      if (event.currentTarget === this && slidingMode === 'thumb') return
      if (slidingMode !== 'thumb' && event.currentTarget !== this) event.stopPropagation()
      const isThumb = event.currentTarget !== this
      const ori = orientation[this.orientation]
      let name = event.currentTarget === this ? undefined : (event.currentTarget === thumbStart ? 'start' as const : 'end' as const)
      if (!name) name = this.mode === 'range' ? getCloser(event[ori.clientX]) : 'end'
      const cssScrollPriority = computedStyle.getValue('--s-base-slider-touch-scroll-priority')
      const scrollPriority = ['', 'none'].includes(cssScrollPriority) ? this.touchScrollPriority : Boolean(cssScrollPriority)
      const rect = this.getBoundingClientRect()
      const size = this[ori.offsetWidth]
      const slot = { start: thumbStart, end: thumbEnd }[name]
      const thumbSize = slot[ori.offsetWidth]
      const thumbSizePercent = thumbSize / size * 100
      const startValue = this.start
      const endValue = this.end
      const thumbRect = slot.getBoundingClientRect()
      const isCumulative = slidingMode === 'all-cumulative'
      const offsetClientX = isCumulative ? (thumbRect[ori.left] + thumbSize / 2) - event[ori.clientX] : 0
      const state = { x: event[ori.clientX], y: event[ori.clientY], allowed: false, initialized: false }
      setPress(name)
      this.setAttribute('sliding', '')
      const setMove = (e: { clientX: number, clientY: number }) => {
        const left = (e[ori.clientX] - rect[ori.left]) + offsetClientX
        let newValue = getValue(left, thumbSizePercent, size)
        const v = { start: Math.min(newValue, endValue), end: Math.max(newValue, startValue) }[name]
        if (v !== this[name]) {
          this[name] = v
          this.dispatchEvent(new Event('input'))
        }
      }
      if (!isThumb && !isCumulative) setMove(event)
      const move = (ev: PointerEvent | TouchEvent) => {
        const e = ev instanceof TouchEvent ? ev.touches[0] : ev
        if (!isThumb && event.pointerType !== 'mouse' && scrollPriority) {
          const x = Math.abs(state.x - e[ori.clientX])
          const y = Math.abs(state.y - e[ori.clientY])
          if (x > 5 || y > 5) state.initialized = true
          if (!state.initialized) return
          if (!state.allowed && x < y) return up()
          state.allowed = true
        }
        ev.stopPropagation()
        ev.cancelable && ev.preventDefault()
        setMove(e)
      }
      const eventNames = event.pointerType === 'mouse' ? ['pointermove', 'pointerup', 'pointercancel'] as const : ['touchmove', 'touchend', 'touchcancel'] as const
      const up = () => {
        document.removeEventListener(eventNames[0], move)
        document.removeEventListener(eventNames[1], up)
        document.removeEventListener(eventNames[2], up)
        this.removeAttribute('start-pressed')
        this.removeAttribute('end-pressed')
        this.removeAttribute('sliding')
        this.dispatchEvent(new CustomEvent('pressend', { detail: { name } }))
        if (startValue !== this.start || endValue !== this.end) this.dispatchEvent(new Event('change'))
      }
      document.addEventListener(eventNames[0], move, { passive: false })
      document.addEventListener(eventNames[1], up)
      document.addEventListener(eventNames[2], up)
    }
    this.addEventListener('pointerdown', down)
    thumbStart.onpointerdown = down
    thumbEnd.onpointerdown = down
    const hovering = (event: PointerEvent) => {
      if (!device.mouseEnabled || event.pointerType !== 'mouse') return
      const name = event.currentTarget === thumbStart ? 'start' : 'end'
      const enter = event.type === 'pointerenter'
      this.toggleAttribute(`${name}-hover`, enter)
      this.dispatchEvent(new CustomEvent(`hover${enter ? 'start' : 'end'}`, { detail: { name } }))
    }
    thumbStart.onpointerenter = (e) => hovering(e)
    thumbStart.onpointerleave = (e) => hovering(e)
    thumbStart.onpointercancel = (e) => hovering(e)
    thumbEnd.onpointerenter = (e) => hovering(e)
    thumbEnd.onpointerleave = (e) => hovering(e)
    thumbEnd.onpointercancel = (e) => hovering(e)
    const keydown = (key: string) => onKeydown(this as never, key, steps)
    this.addEventListener('keydown', (e) => {
      if (!keydown(e.key)) return
      e.preventDefault()
    })
    const updateFrom = () => {
      const formdata = new FormData()
      if (this.mode === 'range') formdata.append(this.name, String(this.start))
      formdata.append(this.name, String(this.end))
      info.internals.setFormValue(formdata)
    }
    useThrottle(render)
    updateFrom()
    return {
      expose: {
        keydown,
        get start() {
          if (info.props.mode !== 'range') return info.props.min
          return Math.max(Math.min(info.props.start, info.props.max), info.props.min)
        },
        get end() {
          return Math.min(Math.max(info.props.end, info.props.min), info.props.max)
        },
        get max() {
          return info.props.max <= 1 ? 1 : info.props.max
        },
        get min() {
          if (info.props.min > info.props.max) return 0
          return info.props.min % info.props.step === 0 ? info.props.min : 0
        }
      },
      onAttributeChanged: (name) => {
        const arr = ['start', 'end', 'mode']
        if ([...arr, 'max', 'min', 'step'].includes(name)) useThrottle(render)
        if (arr.includes(name)) updateFrom()
      },
      onFormReset: () => {
        this.start = this.defaultStart
        this.end = this.defaultEnd
      },
      stepMarks: (v) => {
        if (v === '') return steps = []
        steps = v.split(',').map((v) => Number(v)).sort((a, b) => a - b)
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
    } & BaseSlider
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