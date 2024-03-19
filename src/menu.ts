import { builder, html, ref } from './core/element.js'
import { getStackingContext } from './core/utils.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  color: var(--s-color-on-surface, #1a1c1e);
}
.wrapper{
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.scrim{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.show .scrim{
  pointer-events: auto;
}
.container{
  opacity: 0;
  position: fixed;
  top: var(--top);
  left: var(--left);
  background: var(--s-color-surface-container-high, #e8e8eb);
  border-radius: 4px;
  padding: 8px 0;
  max-width: 192px;
  min-width: 128px;
  height: min-content;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  transform-origin: var(--origin);
  max-height: 504px;
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
}
.show .container{
  pointer-events: auto;
  opacity: 1;
}
::slotted(s-menu){
  display: block;
}
::slotted(s-menu:first-of-type:not(:first-child)){
  border-top: solid 1px var(--s-color-outline-variant, #c1c7ce);
  margin-top: 8px;
  padding-top: 8px;
}
::slotted(s-menu:last-of-type:not(:last-child)){
  border-bottom: solid 1px var(--s-color-outline-variant, #c1c7ce);
  margin-bottom: 8px;
  padding-bottom: 8px;
}
@media (pointer: fine){
  .container::-webkit-scrollbar{
    display: none;
  }
}
`

const name = 's-menu'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup(shadowRoot) {
    const trigger = ref<HTMLDivElement>()
    const wrapper = ref<HTMLDivElement>()
    const container = ref<HTMLElement>()
    const state = { showed: false }
    const show = (element?: HTMLElement) => {
      if (!this.isConnected || state.showed) return
      const rect = (element ?? trigger.target).getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const value = { top: -1, left: -2, origin: ['left', 'top'] }
      if (this.parentNode instanceof Component) {
        value.left = rect.left - stackingContext.left + rect.width
        value.top = rect.top - stackingContext.top
        if (value.left + container.target.offsetWidth > stackingContext.width) {
          value.left = value.left - container.target.offsetWidth * 2
          value.origin[0] = 'right'
        }
        if (value.top + container.target.offsetHeight > stackingContext.height) {
          value.top = value.top + rect.height - container.target.offsetHeight
          value.origin[1] = 'bottom'
        }
      } else {
        value.left = rect.left - stackingContext.left
        const top = rect.top - stackingContext.top
        if (value.left + container.target.offsetWidth > stackingContext.width) {
          value.origin[0] = 'right'
          value.left = value.left - container.target.offsetWidth + rect.width
        }
        if (top + container.target.offsetHeight > stackingContext.height) {
          value.origin[1] = 'bottom'
          value.top = top - container.target.offsetHeight
        } else {
          value.top = top + rect.height
        }
      }
      wrapper.target.style.setProperty('--origin', `${value.origin.join(' ')}`)
      wrapper.target.style.setProperty('--top', value.top >= 0 ? `${value.top}px` : `auto`)
      wrapper.target.style.setProperty('--left', value.left >= 0 ? `${value.left}px` : `auto`)
      wrapper.target.classList.add('show')
      container.target.animate([
        { transform: 'scale(.9)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 200 })
      state.showed = true
    }
    const dismiss = () => {
      if (!this.isConnected || !state.showed) return
      wrapper.target.classList.remove('show')
      container.target.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(.9)', opacity: 0 }
      ], { duration: 200 })
      state.showed = false
    }
    const toggle = (element?: HTMLElement) => {
      state.showed ? dismiss() : show(element)
    }
    this.addEventListener('item:click', (event) => {
      event.stopPropagation()
      dismiss()
    })
    addEventListener('resize', dismiss)
    return {
      expose: { show, dismiss, toggle, },
      render: () => html`
        <div ref="${trigger}">
          <slot name="trigger" @click="${() => show()}"></slot>
        </div>
        <div class="wrapper" ref="${wrapper}">
          <div class="scrim" @pointerdown="${dismiss}"></div>
          <div class="container" ref="${container}">
            <slot></slot>
          </div>
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