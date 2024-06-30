import { useElement, JSXAttributes } from './core/element.js'

const name = 's-circular-progress'
const props = {
  indeterminate: false,
  animated: false,
  max: 100,
  value: 0
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 48px;
  aspect-ratio: 1;
  color: var(--s-color-primary, #5256a9);
}
:host([animated=true]) .known .block{
  transition: stroke-dashoffset .12s, transform .12s;
}
:host([indeterminate=true]) .known,
.unknown{
  display: none;
}
:host([indeterminate=true]) .unknown,
.known{
  display: block;
}
.container{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
}
svg{
  height: inherit;
  width: inherit;
  stroke: currentColor;
}
circle{
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: var(--dasharray);
}
.track{
  stroke: var(--s-color-secondary-container, #e2e0f9);
}
@keyframes stroke{
  0% { stroke-dashoffset: var(--dasharray) }
  50% { stroke-dashoffset: calc(var(--dasharray) / 4) }
  100% { stroke-dashoffset: var(--dasharray) }
}
@keyframes stroke-rotate{
  0% { transform: rotate(0deg) }
  12.5% { transform: rotate(0deg) }
  25% {transform: rotate(270deg)}
  37.5% {transform: rotate(270deg)}
  50% {transform: rotate(540deg)}
  62.5% {transform: rotate(540deg)}
  75% {transform: rotate(810deg)}
  87.5% {transform: rotate(810deg)}
  100% { transform: rotate(1080deg) }
  100% { transform: rotate(1080deg) }
}
@keyframes rotate{
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
.unknown{
  animation: rotate 1568ms linear infinite;
}
`

const size = 48
const borderWidth = 4
const dasharray = (size - borderWidth) * Math.PI

const template = /*html*/`
<div class="container known">
  <svg viewBox="0 0 48 48" style="transform: rotate(-90deg);--dasharray: ${dasharray}px;">
    <circle class="track block" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-width: ${borderWidth}px" />
    <circle class="indicator block" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-dashoffset: ${dasharray}px;stroke-width: ${borderWidth}px" />
  </svg>
</div>
<div class="container unknown">
  <svg viewBox="0 0 48 48" style="animation: stroke-rotate 5.2s ease-in-out infinite;--dasharray: ${dasharray}px;">
    <circle transform="rotate(-90, ${size / 2}, ${size / 2})" cx="${size / 2}" cy="${size / 2}" r=" ${(size - borderWidth) / 2}" style="animation: stroke 1.3s ease-in-out infinite;stroke-width: ${borderWidth}px"></circle>
  </svg>
</div>
`

export class CircularProgress extends useElement({
  style, template, props, syncProps: ['indeterminate', 'animated'],
  setup(shadowRoot) {
    const track = shadowRoot.querySelector('.known .track') as SVGCircleElement
    const indicator = shadowRoot.querySelector('.known .indicator') as SVGCircleElement
    const update = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      const value = dasharray - (dasharray * (percentage / 100))
      const deg = percentage / 100 * 360
      track.style.strokeDashoffset = `${percentage === 0 ? 0 : Math.min((dasharray + 16) - value, dasharray)}px`
      track.setAttribute('transform', `rotate(${deg + 20}, ${size / 2}, ${size / 2})`)
      indicator.style.strokeDashoffset = `${value}px`
    }
    return {
      watches: {
        max: update,
        value: update
      }
    }
  }
}) { }

CircularProgress.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: CircularProgress
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}