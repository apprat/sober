import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 48px;
  height: 48px;
  color: var(--s-color-primary, #006495);
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
  stroke: var(--s-color-primary-container, #cbe6ff);
}
`

const name = 's-circular-progress'
const props = {
  indeterminate: false,
  max: 100,
  value: 0
}

export default class Component extends builder({
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
          <circle class="unckecked" style="cx: ${size / 2};cy: ${size / 2};r: ${(size - borderWidth) / 2};stroke-width: ${borderWidth}px" />
          <circle ref="${(el: SVGCircleElement) => circular = el}" style="stroke-dashoffset: ${dasharray}px;cx: ${size / 2};cy: ${size / 2};r: ${(size - borderWidth) / 2};stroke-width: ${borderWidth}px" />
        </svg>
        <div class="indeterminate">
          <svg viewBox="0 0 48 48" style="animation: stroke-rotate 5.2s ease-in-out infinite;--dasharray: ${dasharray}px;">
            <circle transform="rotate(-90, ${size / 2}, ${size / 2})" style="animation: stroke 1.3s ease-in-out infinite; cx: ${size / 2};cy: ${size / 2};r: ${(size - borderWidth) / 2};stroke-width: ${borderWidth}px"></circle>
          </svg>
        </div>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}