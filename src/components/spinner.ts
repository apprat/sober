import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { bezier } from '../core/utils/bezier.js'

const config = {
  path: 100,
  stroke: 4,
  gap: 4,
  duration: 5400,
  segment: 667,
  expand: [0, 1350, 2700, 4050],
  collapse: [667, 2017, 3367, 4717],
  tail: -20,
  extra: 250,
  rotate: 1520
} as const

const gap = ((config.stroke + config.gap) / (Math.PI * (40 - config.stroke))) * config.path
let indicatorStr = ''
let trackStr = ''
{
  const ease = bezier(.4, 0, .2, 1)
  const fraction = (time: number, delay: number) => {
    if (time <= delay) return 0
    if (time >= delay + config.segment) return 1
    return ease((time - delay) / config.segment)
  }
  const step = 80
  const times = [...new Set([0, config.duration,
    ...[...config.expand, ...config.collapse].flatMap((start) => Array.from({ length: Math.ceil(config.segment / step) + 1 }, (_, i) => Math.min(start + i * step, start + config.segment)))
  ])].sort((a, b) => a - b)
  for (const play of times) {
    let s = config.rotate * play / config.duration + config.tail
    let e = config.rotate * play / config.duration
    for (let i = 0; i < 4; i++) {
      e += fraction(play, config.expand[i]) * config.extra
      s += fraction(play, config.collapse[i]) * config.extra
    }
    s = s / 360
    e = e / 360
    const len = (e - s) * 100
    const off = s * 100
    const t = play / config.duration * 100
    indicatorStr += `${t}%{stroke-dasharray: ${len} ${100 - len}; stroke-dashoffset: ${-off};}`
    trackStr += `${t}%{stroke-dasharray: ${100 - len - gap * 2} ${len + gap * 2};stroke-dashoffset: ${-(off + len + gap)};}`
  }
}
const indeterminateStyle = `@keyframes indicator{${indicatorStr}}@keyframes track{${trackStr}}`

const props = useProps({
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
  stroke: ${scheme.color.secondaryContainer};
}
.layout{
  display: block;
  width: 100%;
  height: 100%;
  &.min{
    .track{
      stroke-dasharray: 100px 0px;
      stroke-dashoffset: 0px;
    }
    .indicator{
      filter: opacity(0);
    }
  }
  &.max .track{
    filter: opacity(0);
  }
}
.icon{
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  display: block;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
.track,
.indicator{
  transform: rotate(-90deg);
  stroke: var(--s-spinner-indicator-color, currentColor);
  opacity: var(--s-spinner-indicator-opacity, 1);
  fill: none;
  stroke-linecap: round;
  transform-origin: center;
  transition-timing-function: inherit;
  transition-duration: inherit;
  transition-property: stroke-dasharray, stroke-dashoffset;
}
.track{
  opacity: var(--s-spinner-track-opacity, 1);
  stroke-dasharray: var(--s_spinner-track-dasharray);
  stroke-dashoffset: var(--s_spinner-track-dashoffset);
  stroke: var(--s-spinner-track-color, inherit);
}
.indicator{
  stroke-dasharray: var(--s_spinner-indicator-dasharray);
}
:host([indeterminate]){
  .track,
  .indicator{
    filter: opacity(1);
    animation-duration: ${config.duration}ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .track{
    animation-name: track;
  }
  .indicator{
    animation-name: indicator;
  }
}
`

const template = /*html*/`
<div class="layout min" part="layout">
  <svg viewBox="0 0 40 40" class="icon" part="icon">
    <circle cx="20" cy="20" r="18" stroke-width="${config.stroke}" pathLength="${config.path}" class="track" part="track"></circle>
    <circle cx="20" cy="20" r="18" stroke-width="${config.stroke}" pathLength="${config.path}" class="indicator" part="indicator"></circle>
  </svg>
</div>
`

export class Spinner extends useElement({
  style: [style, indeterminateStyle], props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      const v = Math.min(this.value, this.max) / this.max * 100
      const double = gap * 2
      const offset = v + gap
      layout.classList.toggle('min', v === 0)
      layout.classList.toggle('max', offset + gap > 100)
      layout.style.setProperty('--s_spinner-track-dasharray', `${100 - v - double}px ${v + double}px`)
      layout.style.setProperty('--s_spinner-track-dashoffset', `${offset * -1}px`)
      layout.style.setProperty('--s_spinner-indicator-dasharray', `${v}px ${100 - v}px`)
    }
    return {
      value: rander
    }
  }
}) { }

const name = Spinner.define('s-spinner')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Spinner
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Alert.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
    } & Spinner
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