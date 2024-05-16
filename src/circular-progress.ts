import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 48px;
  height: 48px;
  color: var(--s-color-primary, #5256a9);
}
:host([indeterminate=true]) .determinable,
.indeterminate{
  display: none;
}
:host([indeterminate=true]) .indeterminate{
  display: block;
  animation: rotate 1568ms linear infinite;
  width: inherit;
  height: inherit;
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
svg{
  height: inherit;
  width: inherit;
  stroke: currentColor;
}
circle{
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: var(--dasharray)
}
.unckecked{
  stroke: var(--s-color-secondary-container, #e2e0f9);
}
`

const name = 's-circular-progress'
const props = {
  indeterminate: false,
  max: 100,
  value: 0
}

export class CircularProgress extends builder({
  name, style, props, propSyncs: ['indeterminate'],
  setup() {
    let circular: SVGCircleElement
    const size = 48
    const borderWidth = 4
    const dasharray = (size - borderWidth) * Math.PI
    const update = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      circular.style.strokeDashoffset = `${dasharray - (dasharray * (percentage / 100))}px`
    }
    return {
      watches: {
        max: update,
        value: update
      },
      render: () => html`
        <svg class="determinable" viewBox="0 0 48 48" style="transform: rotate(-90deg);--dasharray: ${dasharray}px;">
          <circle class="unckecked" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-width: ${borderWidth}px" />
          <circle ref="${(el: SVGCircleElement) => circular = el}" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-dashoffset: ${dasharray}px;stroke-width: ${borderWidth}px" />
        </svg>
        <div class="indeterminate">
          <svg viewBox="0 0 48 48" style="animation: stroke-rotate 5.2s ease-in-out infinite;--dasharray: ${dasharray}px;">
            <circle transform="rotate(-90, ${size / 2}, ${size / 2})" cx="${size / 2}" cy="${size / 2}" r=" ${(size - borderWidth) / 2}" style="animation: stroke 1.3s ease-in-out infinite;stroke-width: ${borderWidth}px"></circle>
          </svg>
        </div>
      `
    }
  }
}) { }

CircularProgress.define()

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