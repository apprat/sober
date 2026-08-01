import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { bezier } from '../core/utils/bezier.js'

const config = {
  path: 100,
  gap: 4,
  duration: 5400,
  segment: 667,
  expand: [0, 1350, 2700, 4050],
  collapse: [667, 2017, 3367, 4717],
  tail: -20,
  extra: 250,
  rotate: 1520
} as const

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
const animationStyle = { indicator: '', track: '' }
const dashGap = 'var(--s_spinner-dash-gap)'
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
  animationStyle.indicator += `${t}%{stroke-dasharray: ${len} ${100 - len}; stroke-dashoffset: ${-off};}`
  animationStyle.track += `${t}%{stroke-dasharray: calc(${100 - len}px - ${dashGap} * 2) calc(${len}px + ${dashGap} * 2);stroke-dashoffset: calc((${off + len}px + ${dashGap}) * -1);}`
}
const indeterminateStyle = `@keyframes indicator{${animationStyle.indicator}}@keyframes track{${animationStyle.track}}`

const props = useProps({
  indeterminate: false,
  $max: 100,
  $value: 0,
  size: ['medium', 'large']
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
  stroke-width: 4px;
  transition-property: stroke-dasharray, stroke-dashoffset;
  cx: 20;
  cy: 20;
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
:host([size=large]){
  width: 44px;
  .track,
  .indicator{
    stroke-width: 8px;
    cx: 22;
    cy: 22;
  }
}
`

const template = /*html*/`
<div class="layout min" part="layout">
  <svg viewBox="0 0 40 40" class="icon" part="icon">
    <circle pathLength="${config.path}" r="18" class="track" part="track"></circle>
    <circle pathLength="${config.path}" r="18" class="indicator" part="indicator"></circle>
  </svg>
</div>
`

const getGapPerimeter = (width: number, strokeWidth: number) => (strokeWidth + config.gap) / (Math.PI * (width - strokeWidth)) * config.path

export class Spinner extends useElement({
  style: [style, indeterminateStyle], props, template,
  setup(shadowRoot) {
    const svg = shadowRoot.querySelector<SVGSVGElement>('svg')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    let gap = getGapPerimeter(40, 4)
    const updateDashGap = () => layout.style.setProperty('--s_spinner-dash-gap', `${gap}px`)
    updateDashGap()
    const render = () => {
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
      value: render,
      size: (v) => {
        const isMedium = v === 'medium'
        gap = isMedium ? getGapPerimeter(40, 4) : getGapPerimeter(44, 8)
        svg.setAttribute('viewBox', isMedium ? '0 0 40 40' : '0 0 44 44')
        updateDashGap()
        render()
      }
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