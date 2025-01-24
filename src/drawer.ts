import { useElement } from './core/element.js'
import { mediaQueries, mediaQueryList } from './core/utils/mediaQuery.js'
import { Theme } from './core/theme.js'

const name = 's-drawer'
const props = {
}

const style = /*css*/`
:host{
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.start,
.end{
  flex-shrink: 0;
  height: 100%;
  display: none;
  overflow: hidden;
}
.start{
  order: -1;
}
.scrim{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: none;
  pointer-events: none;
  transition: opacity .3s ease-out;
  background: color-mix(in srgb, var(--s-color-scrim, ${Theme.colorScrim}) 70%, transparent);
}
.view{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  position: relative;
}
::slotted([slot=start]),
::slotted([slot=end]){
  width: 280px;
  border-width: 1px;
  height: 100%;
  box-sizing: border-box;
  pointer-events: auto;
  position: relative;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  border-color: var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
}
::slotted([slot=start]){
  border-right-style: solid;
}
::slotted([slot=end]){
  border-left-style: solid;
}
::slotted(s-scroll-view:not([slot])){
  flex-grow: 1;
}
@media not (max-width: ${mediaQueries.laptop}px){
  .start.show,
  .end.show{
    display: block;
  }
}
@media (max-width: ${mediaQueries.laptop}px){
  .scrim{
    display: block;
    z-index: 1;
  }
  .scrim.show-laptop{
    opacity: 1;
    pointer-events: auto;
  }
  .start,
  .end{
    position: absolute;
    z-index: 1;
    max-width: 75%;
    display: none;
  }
  .end{
    left: auto;
    right: 0;
  }
  .start.show-laptop,
  .end.show-laptop{
    display: block;
  }
  ::slotted([slot=start]),
  ::slotted([slot=end]){
    border-left-style: none;
    border-right-style: none;
    box-shadow: var(--s-elevation-level-3, ${Theme.elevationLevel3});
  }
}
`

const template = /*html*/`
<slot class="view" part="view"></slot>
<div class="scrim" part="scrim show"></div>
<slot name="start" class="start show" part="start"></slot>
<slot name="end" class="end show" part="end"></slot>
`

type SlotName = 'start' | 'end'

class SDrawer extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const slots = {
      start: shadowRoot.querySelector('.start') as HTMLSlotElement,
      end: shadowRoot.querySelector('.end') as HTMLSlotElement
    }
    const getElement = (name: SlotName = 'start') => slots[name]
    const getClassName = (folded?: boolean) => folded ?? mediaQueryList.laptop.matches ? 'show-laptop' : 'show'
    const getOffset = (name: SlotName = 'start') => ({ start: -1, end: 1 }[name])
    const animateOptions = { duration: 300, easing: 'ease-out' } as const
    const show = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      if (element.classList.contains(className)) return
      const offset = getOffset(slot)
      element.classList.add(className)
      const keyframe = mediaQueryList.laptop.matches ? [{ transform: `translateX(${element.offsetWidth * offset}px)` }, { transform: `translateX(0)` }] : [{ width: 0 }, { width: element.offsetWidth + 'px' }]
      scrim.classList.add(className)
      element.animate(keyframe, animateOptions)
    }
    const close = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      if (!element.classList.contains(className)) return
      const offset = getOffset(slot)
      const keyframe = mediaQueryList.laptop.matches ? [{ transform: `translateX(0)`, display: 'block' }, { transform: `translateX(${element.offsetWidth * offset}px)`, display: 'block' }] : [{ width: element.offsetWidth + 'px', display: 'block' }, { width: 0, display: 'block' }]
      element.animate(keyframe, animateOptions)
      element.classList.remove(className)
      scrim.classList.remove(className)
    }
    const toggle = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      element.classList.contains(className) ? close(slot, folded) : show(slot, folded)
    }
    scrim.addEventListener('pointerdown', () => {
      close('start', true)
      close('end', true)
    })
    return {
      expose: { show, close, toggle }
    }
  }
}) { }

SDrawer.define(name)

export { SDrawer as Drawer }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SDrawer
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}