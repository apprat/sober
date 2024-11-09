import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-drawer'
const props = {
}

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
.scrim{
  background: color-mix(in srgb, var(--s-color-scrim, ${Theme.colorScrim}) 80%, transparent);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  transition: opacity .3s ease-out;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  pointer-events: none;
}
.start,
.end{
  flex-shrink: 0;
  min-width: 0;
  display: block;
}
::slotted(*){
  flex-grow: 1;
  min-width: 0;
}
::slotted([slot=start]),
::slotted([slot=end]){
  width: 280px;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  border-color: var(--s-color-surface-container-lowest, ${Theme.colorSurfaceContainerLowest});
  border-width: 1px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
}
::slotted([slot=start]){
  border-right-style: solid;
}
::slotted([slot=end]){
  border-left-style: solid;
}
@media (min-width: 1200px){
  .start,
  .end{
    width: 0;
    overflow: hidden;
  }
  .show-start .start,
  .show-end .end{
    width: auto;
  }
}
@media (max-width: 1200px){
  .start,
  .end{
    position: absolute;
    left: 0;
    top: 100%;
    max-width: 80%;
    height: 100%;
    pointer-events: none;
  }
  .end{
    left: auto;
    right: 0;
  }
  .show-start-folded .scrim,
  .show-end-folded .scrim{
    opacity: 1;
    pointer-events: auto;
  }
  .show-start-folded .start,
  .show-end-folded .end{
    top: 0;
    pointer-events: auto;
  }
  ::slotted([slot=start]),
  ::slotted([slot=end]){
    max-width: 100%;
  }
  .show-start-folded ::slotted([slot=start]),
  .show-end-folded ::slotted([slot=end]){
    box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  }
}
`

const template = /*html*/`
<div class="container show-start show-end" part="container">
  <slot></slot>
  <div class="scrim" part="scrim"></div>
  <slot name="start" class="start" part="start" style="order: -1"></slot>
  <slot name="end"  class="end" part="end"></slot>
</div>
`

const mediaQueryList = matchMedia('(max-width: 1200px)')
const device = { folded: mediaQueryList.matches }
mediaQueryList.addEventListener('change', ({ matches }) => device.folded = matches)

type Fn = (slot?: 'start' | 'end', folded?: boolean) => void

export class Drawer extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const start = shadowRoot.querySelector('.start') as HTMLSlotElement
    const end = shadowRoot.querySelector('.end') as HTMLSlotElement
    const state = { duration: 300, easing: 'ease-out' }
    const getClassName = (slot: Parameters<Fn>[0], folded: Parameters<Fn>[1]) => (folded ?? device.folded) ? `show-${slot}-folded` : `show-${slot}`
    const show: Fn = (slot = 'start', folded) => {
      const className = getClassName(slot, folded)
      if (container.classList.contains(className)) return
      container.classList.add(className)
      const fold = (folded ?? device.folded)
      const el = { start, end }[slot] ?? start
      const animate = fold ?
        [
          { transform: `translateX(${{ start: -el.offsetWidth, end: el.offsetWidth }[slot]}px)` },
          { transform: 'translateX(0)' }
        ]
        : [{ width: 0 }, { width: `${el.offsetWidth}px` }]
      fold === device.folded && el.animate(animate, { duration: state.duration, easing: state.easing })
    }
    const dismiss: Fn = (slot = 'start', folded) => {
      const className = getClassName(slot, folded)
      if (!container.classList.contains(className)) return
      const el = { start, end }[slot] ?? start
      const fold = (folded ?? device.folded)
      const animate = fold ?
        [
          { top: 0, transform: 'translateX(0)' },
          { top: 0, transform: `translateX(${{ start: -el.offsetWidth, end: el.offsetWidth }[slot]}px)` }
        ]
        : [{ width: `${el.offsetWidth}px` }, { width: 0 }]
      fold === device.folded && el.animate(animate, { duration: state.duration, easing: state.easing })
      container.classList.remove(className)
    }
    const toggle: Fn = (slot = 'start', folded) => {
      const className = getClassName(slot, folded)
      container.classList.contains(className) ? dismiss(slot, folded) : show(slot, folded)
    }
    scrim.addEventListener('click', () => {
      dismiss()
      dismiss('end')
    })
    return { expose: { show, dismiss, toggle } }
  }
}) { }

Drawer.define(name)

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