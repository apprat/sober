import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-linear-progress'
const props = {
  indeterminate: false,
  animated: false,
  max: 100,
  value: 0
}

const style = /*css*/`
:host{
  display: block;
  height: 4px;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}
:host([animated=true]) .known>.block{
  transition: transform .2s ease-out;
}
:host([indeterminate=true]) .known,
.unknown{
  display: none;
}
:host([indeterminate=true]) .unknown,
.known{
  display: flex;
}
.container{
  height: 100%;
  border-radius: inherit;
  position: relative;
}
.block{
  position: absolute;
  height: 100%;
  border-radius: inherit;
  width: 100%;
  left: 0;
  top: 0;
}
.track{
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
}
.indicator{
  background: currentColor;
}
.indicator-dot{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  background: currentColor;
  border-radius: inherit;
}
@keyframes unknown{
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(150%);
  }
}
.unknown{
  justify-content: flex-end;
  gap: 4px;
  animation: unknown 2s linear infinite;
}
.unknown .block{
  position: static;
  flex-grow: 1;
  width: 100%;
  flex-shrink: 0;
}
.unknown .indicator{
  width: 50%;
}
`

const template = /*html*/`
<div class="container known" part="container">
  <div class="track block" style="transform: translateX(0%)" part="track"></div>
  <div class="indicator-dot" part="indicator-dot"></div>
  <div class="indicator block" style="transform: translateX(-100%)" part="indicator"></div>
</div>
<div class="container unknown" part="container">
  <div class="track block" part="track"></div>
  <div class="indicator block" part="indicator"></div>
  <div class="track block" part="indicator"></div>
</div>
`

class SLinearProgress extends useElement({
  style, template, props, syncProps: ['indeterminate', 'animated'],
  setup(shadowRoot) {
    const track = shadowRoot.querySelector('.known>.track') as HTMLDivElement
    const indicator = shadowRoot.querySelector('.known>.indicator') as HTMLDivElement
    const render = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      track.style.transform = `translateX(calc(${percentage}% + ${percentage === 0 ? 0 : 4}px))`
      indicator.style.transform = `translateX(${percentage - 100}%)`
    }
    return {
      max: render,
      value: render
    }
  }
}) { }

SLinearProgress.define(name)

export { SLinearProgress as LinearProgress }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SLinearProgress
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}