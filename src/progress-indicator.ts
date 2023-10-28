import { defineElement, html, ref } from './core/element'

const style = /*css*/`
:host{
  user-select: none;
  display: block;
  height: 4px;
  color: var(--s-color-primary);
}
.container{
  height: inherit;
  width: inherit;
  position: relative;
}
.linear{
  overflow: hidden;
  height: inherit;
  width: inherit;
}
.track{
  background: var(--s-color-surface-container-highest);
}
.indicator{
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: currentColor;
  transform: translateX(-100%);
  transition: transform .2s;
}
:host([type=circular]){
  display: inline-block;
  vertical-align: middle;
  width: 48px;
  height: 48px;
}
svg{
  height: inherit;
  width: inherit;
  stroke: currentColor;
}
.circular{
  height: inherit;
  width: inherit;
  display: none;
}
.indeterminate{
  display: none;
}
:host([indeterminate=true]) .indeterminate,
:host([type=circular]) .circular{
  display: block;
}
:host([indeterminate=true]) .determinable,
:host([type=circular]) .linear{
  display: none;
}
@keyframes translate{
  0% { transform: translateX(-100%); }
  60% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}
@keyframes translate2{
  0% { transform: translateX(-100%) scaleX(1); }
  60% { transform: translateX(50%) scaleX(0); }
  100% { transform: translateX(100%) scaleX(0); }
}
@keyframes stroke{
  0% { stroke-dasharray: 1px, 200px; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 100px, 200px; stroke-dashoffset: -15px; }
  100% { stroke-dasharray: 100px, 200px; stroke-dashoffset: -125px; }
}
@keyframes rotate{
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const name = 's-progress-indicator'
const props = {
  type: 'linear' as 'linear' | 'circular',
  indeterminate: false,
  max: 100,
  value: 50
}

export default class Component extends defineElement({
  name, props, propSyncs: ['indeterminate', 'type'],
  setup() {
    const linear = ref<HTMLElement>()
    const circular = ref<SVGCircleElement>()
    const dashoffset = 126.92
    const render = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      linear.target.style.transform = `translateX(-${100 - percentage}%)`
      circular.target.style.strokeDashoffset = `${dashoffset - (dashoffset * (percentage / 100))}px`
    }
    return {
      watches: {
        max: render,
        value: render
      },
      render: () => html`
        <style>${style}</style>
        <div class="linear">
          <div class="determinable container">
            <div class="track container"></div>
            <div class="indicator" ref="${linear}"></div>
          </div>
          <div class="indeterminate container">
            <div class="track container"></div>
            <div class="indicator" style="animation: translate 2.1s cubic-bezier(.65, .815, .735, .395) infinite"></div>
            <div class="indicator" style="animation: translate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1s infinite"></div>
          </div>
        </div>
        <div class="circular">
          <svg viewBox="22 22 44 44" class="determinable" style="transform: rotate(-90deg)">
            <circle ref="${circular}" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" style="transition: stroke-dashoffset .2s;stroke-dasharray: ${dashoffset}px"></circle>
          </svg>
          <svg class="indeterminate" viewBox="22 22 44 44" style="animation: rotate 1.4s linear infinite">
            <circle style="stroke-dasharray: 80px,200px;stroke-dashoffset: 0;animation: stroke 1.4s ease-in-out infinite" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
          </svg>
        </div>
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}