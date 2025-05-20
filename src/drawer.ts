import { useElement, supports } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import { Theme } from './core/theme.js'

type Props = {
  hiddenStart: boolean,
  hiddenEnd:boolean,
}

const name = 's-drawer'
const props: Props = {
  hiddenStart:true,
  hiddenEnd:true
}

const style = /*css*/`
:host{
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
  container-name: s-drawer;
  container-type: inline-size;
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
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  backdrop-filter: saturate(180%) blur(2px);
  pointer-events: none;
}
.scrim::before{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  opacity: .75;
  background: var(--s-color-scrim, ${Theme.colorScrim});
}
.view{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  position: relative;
}
::slotted(:is([slot=start], [slot=end])){
  width: 280px;
  border-width: 1px;
  height: 100%;
  box-sizing: border-box;
  pointer-events: auto;
  position: relative;
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
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
  
:host([hiddenstart="false"]) .start.show{
  display: block;
}

:host([hiddenend="false"]) .end.show{
  display: block;
}
.scrim.s-laptop{
  display: block;
  z-index: 3;
}
.scrim.s-laptop.show-laptop{
  opacity: 1;
  pointer-events: auto;
}
.start.s-laptop,
.end.s-laptop{
  position: absolute;
  z-index: 3;
  max-width: 75%;
  display: none;
}
.end.s-laptop{
  left: auto;
  right: 0;
}
.start.s-laptop.show,
.end.s-laptop.show{
  display: none;
}
.start.s-laptop.show-laptop,
.end.s-laptop.show-laptop{
  display: block;
}
.s-laptop ::slotted(:is([slot=start], [slot=end])){
  border-left-style: none;
  border-right-style: none;
  box-shadow: var(--s-elevation-level-3, ${Theme.elevationLevel3});
}
@container s-drawer (max-width: ${mediaQueries.laptop}px){
  .scrim{
    display: block;
    z-index: 3;
  }
  .scrim.show-laptop{
    opacity: 1;
    pointer-events: auto;
  }
  .start,
  .end{
    position: absolute;
    z-index: 3;
    max-width: 75%;
    display: none;
  }
  .end{
    left: auto;
    right: 0;
  }
  .start.show,
  .end.show{
    display: none;
  }
  .start.show-laptop,
  .end.show-laptop{
    display: block;
  }
  ::slotted(:is([slot=start], [slot=end])){
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

class Drawer extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const scrim = shadowRoot.querySelector<HTMLDivElement>('.scrim')!
    const slots = {
      start: shadowRoot.querySelector<HTMLSlotElement>('.start')!,
      end: shadowRoot.querySelector<HTMLSlotElement>('.end')!
    }
    const containerStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = containerStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = containerStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    const getElement = (name: SlotName = 'start') => slots[name]
    const getClassName = (folded?: boolean) => folded ?? this.offsetWidth <= mediaQueries.laptop ? 'show-laptop' : 'show'
    const getOffset = (name: SlotName = 'start') => ({ start: -1, end: 1 }[name])
    const show = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      const isElementStart = element === getElement("start");
      if (isElementStart && this.getAttribute("hiddenstart") === "true"){
        this.setAttribute("hiddenstart","false")
        startAnimation(element,className,slot)
        return
      }
      const isElementEnd = element === getElement("end");
      if (isElementEnd && this.getAttribute("hiddenend") === "true"){
        this.setAttribute("hiddenend","false")
        startAnimation(element,className,slot)
        return
      }
      if (element.classList.contains(className)) return
      startAnimation(element,className,slot)
    }

    const startAnimation = (element:HTMLSlotElement,className:string, slot?: SlotName) => {
      const offset = getOffset(slot)
      const animateOptions = getAnimateOptions()
      element.classList.add(className)
      scrim.classList.add(className)
      const keyframes = this.offsetWidth <= mediaQueries.laptop ? { transform: [`translateX(${element.offsetWidth * offset}px)`, `translateX(0)`] } : { width: ['0', element.offsetWidth + 'px'] }
      this.offsetWidth <= mediaQueries.laptop && scrim.animate({ opacity: [0, 1] }, animateOptions)
      element.animate(keyframes, animateOptions)
    }

    const close = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      if (!element.classList.contains(className)) return
      const offset = getOffset(slot)
      const animateOptions = getAnimateOptions()
      const keyframes = { ...this.offsetWidth <= mediaQueries.laptop ? { transform: [`translateX(0)`, `translateX(${element.offsetWidth * offset}px)`] } : { width: [element.offsetWidth + 'px', '0px'] } }
      element.style.display = 'block'
      element.animate(keyframes, animateOptions).finished.then(() => element.style.removeProperty('display'))
      this.offsetWidth <= mediaQueries.laptop && scrim.animate({ opacity: [1, 0] }, animateOptions)
      element.classList.remove(className)
      scrim.classList.remove(className)
    }
    const toggle = (slot?: SlotName, folded?: boolean) => {
      const element = getElement(slot)
      const className = getClassName(folded)
      const isElementStart = element === getElement("start");
      const isElementEnd = element === getElement("end");
      if ((isElementStart && this.getAttribute("hiddenstart") === "true") ||
      isElementEnd && this.getAttribute("hiddenend") === "true"){
        show(slot, folded)
        return
      }
      element.classList.contains(className) ? close(slot, folded) : show(slot, folded)
    }
    scrim.addEventListener('click', () => {
      close('start', true)
      close('end', true)
    })
    if (!supports.CSSContainer) {
      new ResizeObserver(() => {
        scrim.classList.toggle('s-laptop', this.offsetWidth <= mediaQueries.laptop)
        slots.start.classList.toggle('s-laptop', this.offsetWidth <= mediaQueries.laptop)
        slots.end.classList.toggle('s-laptop', this.offsetWidth <= mediaQueries.laptop)
      }).observe(this)
    }
    return {
      expose: { show, close, toggle}
    }
  }
}) { }

Drawer.define(name)

export { Drawer }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Drawer
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props>
    } & Drawer
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}