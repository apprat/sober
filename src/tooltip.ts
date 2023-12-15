import { builder, html, ref } from './core/element.js'
import { device, getStackingContext } from './core/utils.js'

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
  background: var(--s-color-inverse-surface,#2e3132);
  color: var(--s-color-inverse-on-surface,#eff1f3);
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
  name, props,
  setup(shadowRoot) {
    const container = ref<HTMLElement>()
    const show = () => {
      const rect = this.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const gap = 4
      const margin = { top: this.offsetHeight + gap, left: -((container.target.offsetWidth - this.offsetWidth) / 2) }
      if (rect.top + margin.top + container.target.offsetHeight > stackingContext.top + stackingContext.height) {
        margin.top = -(container.target.offsetHeight + gap)
      }
      if (rect.left + margin.left < stackingContext.left) {
        margin.left = 0
      }
      if ((rect.left + container.target.offsetWidth) + margin.left > stackingContext.width - stackingContext.left) {
        margin.left = -(container.target.offsetWidth - this.offsetWidth)
      }
      container.target.setAttribute('style', `left: auto;top: auto;margin-left: ${margin.left}px;margin-top: ${margin.top}px`)
      container.target.classList.add('show')
    }
    const dismiss = () => container.target.classList.remove('show')
    const transitionEnd = () => {
      const showed = container.target.classList.contains('show')
      if (showed) return
      container.target.removeAttribute('style')
    }
    this.addEventListener('wheel', dismiss)
    this.addEventListener('mouseover', () => !device.touched && show())
    this.addEventListener('mouseleave', () => !device.touched && dismiss())
    this.addEventListener('touchstart', show, { passive: true })
    this.addEventListener('touchend', dismiss)
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="trigger"></slot>
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