import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

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
.left,
.right{
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  will-change: width;
  min-width: 0;
}
.left{
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
  background: var(--s-color-surface-container-low, #f3f3f6);
  position: relative;
  display: flow-root;
}
@media (min-width: 840px){
  .start,
  .end {
    width: 0;
    height: 100%;
  }
  .start-static-show .start,
  .end-static-show .end{
    width: auto;
  }
}
@media (max-width: 840px){
  .left,
  .right{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
  .scrim{
    background: var(--s-color-scrim, #000000);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: filter .2s linear;
  }
  .left>.scrim,
  .right>.scrim{
    display: block;
    filter: opacity(0);
  }
  .start-fixed-show>.left>.scrim,
  .end-fixed-show>.right>.scrim{
    filter: opacity(.62);
    pointer-events: auto;
  }
  .start,
  .end{
    height: 100%;
    position: absolute;
  }
  .start{
    margin-left: -100%;
  }
  .end{
    margin-right: 100%;
    right: 0;
  }
  ::slotted([slot=start]),
  ::slotted([slot=end]){
    transition: box-shadow .2s;
  }
  .start-fixed-show .start,
  .end-fixed-show .end{
    pointer-events: auto;
  }
  .start-fixed-show .start{
    margin-left: 0;
  }
  .end-fixed-show .end{
    margin-right: 0;
  }
  .start-fixed-show ::slotted([slot=start]),
  .end-fixed-show ::slotted([slot=end]){
    box-shadow: var(--s-elevation-level3, 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  }
}
`

type Type = 'start' | 'end'
type Mode = 'static' | 'fixed'


const name = 's-drawer'
const props = {
}

export default class Drawer extends builder({
  name, props, style,
  setup() {
    let container: HTMLDivElement
    let start: HTMLDivElement
    let end: HTMLDivElement
    const getMode = () => innerWidth < 840 ? 'fixed' : 'static'
    const show = (type: Type = 'start', mode?: Mode) => {
      if (!this.isConnected) return
      const moded = getMode()
      const className = `${type}-${!mode ? moded : mode}-show`
      if (container.classList.contains(className)) return
      container.classList.add(className)
      const el = type === 'start' ? start : end
      const width = el.offsetWidth
      let keyframes: { width?: string, transform?: string }[] = [{ width: '0px' }, { width: `${width}px` }]
      if (type === 'start' && moded === 'fixed') keyframes = [{ transform: `translateX(-${width}px)` }, { transform: 'translateX(0px)' }]
      if (type === 'end' && moded === 'fixed') keyframes = [{ transform: `translateX(${width}px)` }, { transform: `translateX(0px)` }]
      el.animate(keyframes, { duration: 200 })
    }
    const dismiss = (type: Type = 'start', mode?: Mode) => {
      if (!this.isConnected) return
      const moded = getMode()
      const el = type === 'start' ? start : end
      const width = el.offsetWidth
      const className = `${type}-${!mode ? moded : mode}-show`
      if (!container.classList.contains(className)) return
      const remove = () => container.classList.remove(className)
      let keyframes: { width?: string, transform?: string }[] = [{ width: `${width}px` }, { width: '0px' }]
      if (type === 'start' && moded === 'fixed') keyframes = [{ transform: 'translateX(0px)' }, { transform: `translateX(-${width}px)` },]
      if (type === 'end' && moded === 'fixed') keyframes = [{ transform: `translateX(0px)` }, { transform: `translateX(${width}px)` }]
      const animation = el.animate(keyframes, { duration: 200 })
      animation.addEventListener('cancel', remove)
      animation.addEventListener('remove', remove)
      animation.addEventListener('finish', remove)
    }
    const toggle = (type: Type = 'start', mode?: Mode) => {
      container.classList.contains(`${type}-${!mode ? getMode() : mode}-show`) ? dismiss(type, mode) : show(type, mode)
    }
    return {
      expose: {
        show, dismiss, toggle,
        get mode() {
          return getMode()
        }
      },
      render: () => html`
        <div class="container start-static-show end-static-show" ref="${(el: HTMLDivElement) => container = el}">
          <div class="supporting-text">
            <slot></slot>
          </div>
          <div class="left">
            <div class="scrim" @click="${() => dismiss()}"></div>
            <div class="start" ref="${(el: HTMLDivElement) => start = el}">
              <slot name="start"></slot>
            </div>
          </div>
          <div class="right">
            <div class="scrim" @click="${() => dismiss('end')}"></div>
            <div class="end" ref="${(el: HTMLDivElement) => end = el}">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
      `
    }
  }
}) { }

Drawer.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Drawer
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}