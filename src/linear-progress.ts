import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: block;
  height: 4px;
  color: var(--s-color-primary, #006495);
  position: relative;
  border-radius: 2px;
  overflow: hidden;
}
.track{
  background: var(--s-color-secondary-container, #d4e4f6);
  height: 100%;
}
.float{
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
.determinable{
  background: currentColor;
  transform: translateX(-100%);
}
.indeterminate::before,
.indeterminate::after{
  content: '';
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background: currentColor;
  animation: translate 2s linear infinite;
}
.indeterminate::after{
  animation: translate2 2s linear infinite;
}
:host([indeterminate=true]) .determinable,
.indeterminate{
  display: none;
}
:host([indeterminate=true]) .indeterminate{
  display: block;
}
@keyframes translate{
  0% { left: 0; width: 0 }
  50% { left: 30%; width: 70% }
  75% { left: 100%; width: 0 }
}
@keyframes translate2{
  0% { left: 0; width: 0 }
  50% { left: 0; width: 0 }
  75% { left: 0; width: 25% }
  100% { left: 100%; width: 0 }
}
`

const name = 's-linear-progress'
const props = {
  indeterminate: false,
  max: 100,
  value: 0
}

export class LinearProgress extends builder({
  name, style, props, propSyncs: ['indeterminate'],
  setup() {
    let linear: HTMLDivElement
    const render = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      linear.style.transform = `translateX(-${100 - percentage}%)`
    }
    return {
      watches: {
        max: render,
        value: render
      },
      render: () => html`
        <div class="track"></div>
        <div class="determinable float" ref="${(el: HTMLDivElement) => linear = el}"></div>
        <div class="indeterminate float"></div>
      `
    }
  }
}) { }

LinearProgress.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: LinearProgress
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}