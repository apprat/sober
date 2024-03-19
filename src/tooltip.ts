import { builder, html, ref } from './core/element.js'
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
  border-radius: 4px;
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
  border-radius: 4px;
  margin: 2px 0;
}
`

const name = 's-tooltip'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup(shadowRoot) {
    const trigger = ref<HTMLDivElement>()
    const container = ref<HTMLElement>()
    const state = { showed: false, timer: 0 }
    const show = () => {
      if (!this.isConnected || state.showed) return
      const rect = trigger.target.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const gap = 4
      const left = rect.left - stackingContext.left
      const top = rect.top - stackingContext.top
      const position = {
        top: top + trigger.target.offsetHeight + gap,
        left: left - ((container.target.offsetWidth - trigger.target.offsetWidth) / 2),
      }
      //right
      if (position.left + container.target.offsetWidth > innerWidth) {
        position.left = left - container.target.offsetWidth + trigger.target.offsetWidth
      }
      //left
      if (position.left < 0) {
        position.left = left
      }
      //top
      if (position.top + container.target.offsetHeight > innerHeight) {
        console.log('底部不够')
        position.top = top - container.target.offsetHeight - gap
      }
      container.target.setAttribute('style', `left: ${position.left}px;top: ${position.top}px`)
      container.target.classList.add('show')
      state.showed = true
    }
    const dismiss = () => {
      if (!this.isConnected || !state.showed) return
      container.target.classList.remove('show')
      state.showed = false
    }
    const transitionEnd = () => {
      const showed = container.target.classList.contains('show')
      if (showed) return
      container.target.removeAttribute('style')
    }
    const touchShow = () => {
      clearTimeout(state.timer)
      state.timer = setTimeout(show, 800)
    }
    const touchDismiss = () => {
      clearTimeout(state.timer)
      dismiss()
    }
    return {
      render: () => html`
        <div ref="${trigger}" 
          @wheel.passive="${dismiss}"
          @mouseover="${() => !device.touched && show()}"
          @mouseleave="${() => !device.touched && dismiss()}"
          @touchstart.passive="${touchShow}"
          @touchmove.passive="${touchDismiss}"
          @touchend="${touchDismiss}"
        >
          <slot name="trigger"></slot>
        </div>
        <div class="container" part="container" ref="${container}" @transitionend="${transitionEnd}">
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