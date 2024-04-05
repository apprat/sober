import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 48px;
  height: 48px;
  color: var(--s-color-primary, #006495);
}
svg{
  height: inherit;
  width: inherit;
  stroke: currentColor;
}
:host([indeterminate=true]) .determinable,
.indeterminate{
  display: none;
}
:host([indeterminate=true]) .indeterminate{
  display: block;
}
@keyframes stroke{
  0% { stroke-dasharray: 1px, 200px; stroke-dashoffset: 0 }
  50% { stroke-dasharray: 100px, 200px; stroke-dashoffset: -15px }
  100% { stroke-dasharray: 100px, 200px; stroke-dashoffset: -125px }
}
@keyframes rotate{
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
`

const name = 's-circular-progress'
const props = {
  indeterminate: false,
  max: 100,
  value: 100
}

export default class Component extends builder({
  name, style, props, propSyncs: ['indeterminate'],
  setup() {
    let circular: SVGCircleElement
    const dashoffset = 126.92
    const update = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      circular.style.strokeDashoffset = `${dashoffset - (dashoffset * (percentage / 100))}px`
    }
    return {
      watches: {
        max: update,
        value: update
      },
      render: () => html`
        <svg class="determinable" viewBox="22 22 44 44"style="transform: rotate(-90deg)">
          <circle ref="${(el: SVGCircleElement) => circular = el}" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" style="transition: stroke-dashoffset .2s;stroke-dasharray: ${dashoffset}px"></circle>
        </svg>
        <svg class="indeterminate" viewBox="22 22 44 44" style="animation: rotate 1.4s linear infinite">
          <circle style="stroke-dasharray: 80px,200px;stroke-dashoffset: 0;animation: stroke 1.4s ease-in-out infinite" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
        </svg>
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