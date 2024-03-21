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
  top: var(--top, auto);
  left: var(--left, auto);
  transform-origin: var(--origin,left top);
  background: var(--s-color-surface-container-high, #e8e8eb);
  border-radius: 4px;
  padding: 8px 0;
  max-width: 192px;
  min-width: 128px;
  height: min-content;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
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
      const left = rect.left - stackingContext.left
      const top = rect.top - stackingContext.top
      const cWidth = container.target.offsetWidth
      const tWidth = trigger.target.offsetWidth
      const cHeight = container.target.offsetHeight
      const tHeight = trigger.target.offsetHeight
      const position = {
        top: top + trigger.target.offsetHeight,
        left: left,
        origin: ['left', 'top']
      }
      if (!(this.parentNode instanceof Component)) {
        //right
        if (rect.left + cWidth > innerWidth) {
          position.left = left - cWidth + tWidth
          position.origin[0] = 'right'
        }
        //top
        if (rect.top + cHeight + tHeight > innerHeight) {
          position.top = top - cHeight
          position.origin[1] = 'bottom'
        }
      } else {
        position.left = left + cWidth
        position.top = top
        console.log(innerWidth, rect.left)
        //right
        if (rect.left + cWidth + cWidth > innerWidth) {
          position.left = left - cWidth
          position.origin[0] = 'right'
        }
        //top
        if (rect.top + cHeight + tHeight > innerHeight) {
          position.top = (top - cHeight) + tHeight
          position.origin[1] = 'bottom'
        }
      }
      wrapper.target.style.setProperty('--origin', position.origin.join(' '))
      position.top && wrapper.target.style.setProperty('--top', `${position.top}px`)
      position.left && wrapper.target.style.setProperty('--left', `${position.left}px`)
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