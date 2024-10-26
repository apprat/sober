import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

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
  -ms-flex-negative: 0;
  flex-shrink: 0;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([animated=true]) .known .block{
  -webkit-transition: stroke-dashoffset .2s, -webkit-transform .2s;
  transition: stroke-dashoffset .2s, -webkit-transform .2s;
  -o-transition: stroke-dashoffset .2s, transform .2s;
  transition: stroke-dashoffset .2s, transform .2s;
  transition: stroke-dashoffset .2s, transform .2s, -webkit-transform .2s;
  -webkit-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
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
  stroke: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
}
@-webkit-keyframes stroke{
  0% { stroke-dashoffset: var(--dasharray) }
  50% { stroke-dashoffset: calc(var(--dasharray) / 4) }
  100% { stroke-dashoffset: var(--dasharray) }
}
@keyframes stroke{
  0% { stroke-dashoffset: var(--dasharray) }
  50% { stroke-dashoffset: calc(var(--dasharray) / 4) }
  100% { stroke-dashoffset: var(--dasharray) }
}
@-webkit-keyframes stroke-rotate{
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  12.5% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  25% { -webkit-transform: rotate(270deg); transform: rotate(270deg)}
  37.5% { -webkit-transform: rotate(270deg); transform: rotate(270deg)}
  50% { -webkit-transform: rotate(540deg); transform: rotate(540deg)}
  62.5% { -webkit-transform: rotate(540deg); transform: rotate(540deg)}
  75% { -webkit-transform: rotate(810deg); transform: rotate(810deg)}
  87.5% { -webkit-transform: rotate(810deg); transform: rotate(810deg)}
  100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg) }
  100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg) }
}
@keyframes stroke-rotate{
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  12.5% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  25% { -webkit-transform: rotate(270deg); transform: rotate(270deg)}
  37.5% { -webkit-transform: rotate(270deg); transform: rotate(270deg)}
  50% { -webkit-transform: rotate(540deg); transform: rotate(540deg)}
  62.5% { -webkit-transform: rotate(540deg); transform: rotate(540deg)}
  75% { -webkit-transform: rotate(810deg); transform: rotate(810deg)}
  87.5% { -webkit-transform: rotate(810deg); transform: rotate(810deg)}
  100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg) }
  100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg) }
}
@-webkit-keyframes rotate{
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg) }
}
@keyframes rotate{
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg) }
  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg) }
}
.unknown{
  -webkit-animation: rotate 1568ms linear infinite;
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
      props: {
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