import { builder, html } from './core/element.js'
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
  background: var(--s-color-surface-container-low, #f3f3f6);
  border-radius: var(--s-shape-corner-small, 8px);
  padding: 8px 0;
  max-width: 224px;
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
::slotted(s-menu[group=start]){
  border-top: solid 1px var(--s-color-outline-variant, #c1c7ce);
  margin-top: 8px;
  padding-top: 8px;
}
::slotted(s-menu[group=end]){
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
  group: '' as 'start' | 'end' | ''
}

export default class Component extends builder({
  name, style, props, propSyncs: ['group'],
  setup(shadowRoot) {
    let trigger: HTMLDivElement
    let wrapper: HTMLDivElement
    let container: HTMLDivElement
    const state = { showed: false }
    const show = (element?: HTMLElement) => {
      if (!this.isConnected || state.showed) return
      const el = (element ?? trigger)
      const rect = el.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const left = rect.left - stackingContext.left
      const top = rect.top - stackingContext.top
      const cWidth = container.offsetWidth
      const tWidth = el.offsetWidth
      const cHeight = container.offsetHeight
      const tHeight = el.offsetHeight
      const position = {
        top: top + el.offsetHeight,
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
      wrapper.style.setProperty('--origin', position.origin.join(' '))
      position.top && wrapper.style.setProperty('--top', `${position.top}px`)
      position.left && wrapper.style.setProperty('--left', `${position.left}px`)
      wrapper.classList.add('show')
      container.animate([
        { transform: 'scale(.9)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 200 })
      state.showed = true
    }
    const dismiss = () => {
      if (!this.isConnected || !state.showed) return
      wrapper.classList.remove('show')
      container.animate([
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
      expose: { show, dismiss, toggle },
      render: () => html`
        <div ref="${(el: HTMLDivElement) => trigger = el}">
          <slot name="trigger" @click="${() => show()}"></slot>
        </div>
        <div class="wrapper" ref="${(el: HTMLDivElement) => wrapper = el}">
          <div class="scrim" @pointerdown="${dismiss}"></div>
          <div class="container" ref="${(el: HTMLDivElement) => container = el}">
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

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}