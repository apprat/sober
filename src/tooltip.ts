import { builder, html } from './core/element.js'
import { device, getStackingContext } from './core/utils.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

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
  background: var(--s-color-inverse-surface, #2f3133);
  color: var(--s-color-inverse-on-surface, #f0f0f3);
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  white-space: nowrap;
  opacity: .95;
  filter: opacity(0);
  transition: filter .2s;
  pointer-events: none;
}
.container.show{
  filter: opacity(1);
}
::slotted(img){
  display: block;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  margin: 2px 0;
}
`

const name = 's-tooltip'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup(shadowRoot) {
    let trigger: HTMLDivElement
    let container: HTMLDivElement
    const state = { showed: false, timer: 0 }
    const show = () => {
      if (!this.isConnected || state.showed) return
      const rect = trigger.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const gap = 4
      const left = rect.left - stackingContext.left
      const top = rect.top - stackingContext.top
      const cWidth = container.offsetWidth
      const tWidth = trigger.offsetWidth
      const cHeight = container.offsetHeight
      const tHeight = trigger.offsetHeight
      const position = {
        top: top + trigger.offsetHeight + gap,
        left: left - ((cWidth - tWidth) / 2),
      }
      //right
      if (rect.left + ((cWidth + tWidth) / 2) > innerWidth) {
        position.left = left - cWidth + tWidth
      }
      //left
      if (rect.left - ((cWidth + tWidth) / 2) < 0) {
        position.left = left
      }
      //top
      if (rect.top + cHeight + tHeight + gap > innerHeight) {
        position.top = top - cHeight - gap
      }
      container.setAttribute('style', `left: ${position.left}px;top: ${position.top}px`)
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
    return {
      render: () => html`
        <div ref="${(el: HTMLDivElement) => trigger = el}" 
          @wheel.passive="${dismiss}"
          @mouseover="${() => !device.touched && show()}"
          @mouseleave="${() => !device.touched && dismiss()}"
          @touchstart.passive="${touchShow}"
          @touchend="${touchDismiss}"
        >
          <slot name="trigger"></slot>
        </div>
        <div class="container" part="container" ref="${(el: HTMLDivElement) => container = el}" @transitionend="${transitionEnd}">
          <slot></slot>
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