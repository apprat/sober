import { useElement, JSXAttributes } from './core/element.js'
import { device, getStackingContext } from './core/utils.js'

const name = 's-tooltip'
const props = {
}

const style = /*css*/`
:host{
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}
.container{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background: var(--s-color-inverse-surface, #313034);
  color: var(--s-color-inverse-on-surface, #f3eff4);
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: .85;
  filter: opacity(0);
  transition: filter .12s;
  pointer-events: none;
}
.container.show{
  filter: opacity(1);
}
::slotted(img){
  display: block;
  border-radius: 4px;
  margin: 2px 0;
}
`

const template = /*html*/`
<div id="trigger" part="trigger">
  <slot name="trigger"></slot>
</div>
<div class="container" part="container">
  <slot></slot>
</div>
`

export class Tooltip extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('#trigger') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const state = { showed: false, timer: 0 }
    const show = () => {
      if (!this.isConnected || state.showed) return
      const rect = trigger.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const gap = 4
      const cWidth = container.offsetWidth
      const cHeight = container.offsetHeight
      const position = {
        top: rect.top - gap - cHeight,
        left: rect.left - ((cWidth - rect.width) / 2),
      }
      //left
      if (position.left < 0) {
        position.left = rect.left
      }
      //right
      if (position.left + cWidth > innerWidth) {
        position.left = rect.left + rect.width - cWidth
      }
      //bottom
      if (position.top < 0) {
        position.top = rect.top + trigger.offsetHeight + gap
      }
      container.setAttribute('style', `left: ${position.left - stackingContext.left}px;top: ${position.top - stackingContext.top}px`)
      container.classList.add('show')
      state.showed = true
    }
    const dismiss = () => {
      if (!this.isConnected || !state.showed) return
      container.classList.remove('show')
      state.showed = false
    }
    const transitionEnd = () => {
      const showed = container.classList.contains('show')
      if (showed) return
      container.removeAttribute('style')
    }
    const touchShow = () => {
      clearTimeout(state.timer)
      state.timer = setTimeout(show, 600)
    }
    const touchDismiss = () => {
      clearTimeout(state.timer)
      dismiss()
    }
    trigger.addEventListener('wheel', dismiss, { passive: true })
    trigger.addEventListener('mouseover', () => !device.touched && show(), { passive: true })
    trigger.addEventListener('mouseleave', () => !device.touched && dismiss(), { passive: true })
    trigger.addEventListener('touchstart', touchShow, { passive: true })
    trigger.addEventListener('touchend', touchDismiss, { passive: true })
    container.addEventListener('transitionend', transitionEnd)
  }
}) { }

Tooltip.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Tooltip
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}