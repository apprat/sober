import { builder, html, ref } from './core/element.js'
import { animate } from './core/utils.js'

const style = /*css*/`
:host{
  display: block;
  height: 100%;
}
.container{
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.start-scrim,
.end-scrim{
  background: var(--s-color-scrim, #000000);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
  transition: filter .2s linear;
}
.start,
.end{
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  will-change: width;
}
.start{
  order: -1;
}
.supporting-text{
  flex-grow: 1;
  min-width: 0;
}
::slotted([slot=start]),
::slotted([slot=end]){
  width: 320px;
  height: 100%;
  background: var(--s-color-surface-container-low, #f7f2fa);
  position: relative;
  display: flow-root;
}
@media (min-width: 840px){
  .start {
    width: var(--start-left,0);
  }
  .end {
    width: var(--end-right,0);
  }
  .start-static-show .start{
    width: var(--start-left,auto);
  }
  .end-static-show .end{
    width: var(--end-right,auto);
  }
}
@media (max-width: 840px){
  .start-scrim,
  .end-scrim{
    display: block;
    pointer-events: none;
    filter: opacity(0);
  }
  .start-fixed-show .start-scrim,
  .end-fixed-show .end-scrim{
    filter: opacity(.62);
    pointer-events: auto;
  }
  .start,
  .end{
    width: auto;
    position: absolute;
    top: 0;
    overflow: visible;
    pointer-events: none;
  }
  .start{
    left: 0;
  }
  .end{
    right: 0;
  }
  ::slotted([slot=start]),
  ::slotted([slot=end]){
    transition: box-shadow .2s;
  }
  ::slotted([slot=start]){
    margin-left: -100%;
    left: var(--start-left,0%);
  }
  ::slotted([slot=end]){
    margin-left: 100%;
    right: var(--end-right,0%);
  }
  .start-fixed-show .start,
  .end-fixed-show .end{
    pointer-events: auto;
  }
  .start-fixed-show ::slotted([slot=start]),
  .end-fixed-show ::slotted([slot=end]){
    box-shadow: var(--s-elevation-level3, 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  }
  .start-fixed-show ::slotted([slot=start]){
    left: var(--start-left,100%);
  }
  .end-fixed-show ::slotted([slot=end]){
    right: var(--end-right,100%);
  }
}
`

type Type = 'start' | 'end'
type Mode = 'auto' | 'static' | 'fixed'


const name = 's-drawer'
const props = {
}

export default class Component extends builder({
  name, props, style,
  setup() {
    const container = ref<HTMLDivElement>()
    const start = ref<HTMLSlotElement>()
    const end = ref<HTMLSlotElement>()
    const slots = {
      start: undefined as undefined | HTMLElement,
      end: undefined as undefined | HTMLElement
    }
    const getMode = () => innerWidth < 840 ? 'fixed' : 'static'
    const show = (type: Type = 'start', mode: Mode = 'auto') => {
      if (!this.isConnected) return
      const className = `${type}-${mode === 'auto' ? getMode() : mode}-show`
      if (container.target.classList.contains(className)) return
      container.target.classList.add(className)
      if (type === 'start' && slots.start) {
        animate((progress) => {
          container.target.style.setProperty('--start-left', `${progress * slots.start!.offsetWidth}px`)
          if (progress === 1) container.target.style.removeProperty('--start-left')
        }, 200)
      }
      if (type === 'end' && slots.end) {
        animate((progress) => {
          container.target.style.setProperty('--end-right', `${progress * slots.end!.offsetWidth}px`)
          if (progress === 1) container.target.style.removeProperty('--end-right')
        }, 200)
      }
    }
    const dismiss = (type: Type = 'start', mode: Mode = 'auto') => {
      if (!this.isConnected) return
      const className = `${type}-${mode === 'auto' ? getMode() : mode}-show`
      if (!container.target.classList.contains(className)) return
      container.target.classList.remove(className)
      if (type === 'start' && slots.start) {
        animate((progress) => {
          container.target.style.setProperty('--start-left', `${slots.start!.offsetWidth * (1 - progress)}px`)
          if (progress === 1) container.target.style.removeProperty('--start-left')
        }, 200)
      }
      if (type === 'end' && slots.end) {
        animate((progress) => {
          container.target.style.setProperty('--end-right', `${slots.end!.offsetWidth * (1 - progress)}px`)
          if (progress === 1) container.target.style.removeProperty('--end-right')
        }, 200)
      }
    }
    const toggle = (type: Type = 'start', mode: Mode = 'auto') => {
      const className = `${type}-${mode === 'auto' ? getMode() : mode}-show`
      container.target.classList.contains(className) ? dismiss(type, mode) : show(type, mode)
    }
    const startSlotchange = () => slots.start = start.target.assignedElements()[0] as HTMLElement
    const endSlotchange = () => slots.end = end.target.assignedElements()[0] as HTMLElement
    return {
      expose: {
        show, dismiss, toggle,
        get mode() {
          return getMode()
        }
      },
      render: () => html`
        <div class="container start-static-show end-static-show" ref="${container}">
          <div class="supporting-text">
            <slot></slot>
          </div>
          <div class="start-scrim" @click="${() => dismiss()}"></div>
          <div class="end-scrim" @click="${() => dismiss('end')}"></div>
          <div class="start">
            <slot name="start" ref="${start}" @slotchange="${startSlotchange}"></slot>
          </div>
          <div class="end">
            <slot name="end" ref="${end}" @slotchange="${endSlotchange}"></slot>
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
