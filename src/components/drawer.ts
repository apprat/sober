import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { device } from '../core/device.js'

const props = useProps({
  mode: ['auto', 'sidebar', 'overlay'],
  sidebarStartOpened: true,
  sidebarEndOpened: true,
  overlayStartOpened: false,
  overlayEndOpened: false,
})

const style = /*css*/`
:host{
  display: flex;
  overflow: hidden;
  position: relative;
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standardDecelerate};
  transition-duration: ${scheme.motion.duration.medium2};
}
slot{
  display: block;
  flex-shrink: 0;
}
.view{
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
}
.scrim{
  position: absolute;
  inset: 0;
  filter: opacity(.62);
  pointer-events: none;
  opacity: 0;
  transition-property: opacity;
  background: ${scheme.color.scrim};
}
.start{
  order: -1;
}
::slotted(:is([slot=start], [slot=end])){
  width: 280px;
  height: 100%;
  max-width: 100%;
  pointer-events: auto;
  background: ${scheme.color.surfaceContainerLow};
  border-color: ${scheme.color.surfaceVariant};
}
:host([mode=sidebar]){
  .start,
  .end{
    overflow: hidden;
  }
  &:host([sidebarstartopened=false]) .start,
  &:host([sidebarendopened=false]) .end{
    width: 0;
  }
  ::slotted([slot=start]){
    border-right-style: solid;
    border-right-width: 1px;
  }
  ::slotted([slot=end]){
    border-left-style: solid;
    border-left-width: 1px;
  }
}
@media (orientation: landscape){
  :host(:not([mode])){
    .start,
    .end{
      overflow: hidden;
    }
    &:host([sidebarstartopened=false]) .start,
    &:host([sidebarendopened=false]) .end{
      width: 0;
    }
    ::slotted([slot=start]){
      border-right-style: solid;
      border-right-width: 1px;
    }
    ::slotted([slot=end]){
      border-left-style: solid;
      border-left-width: 1px;
    }
  }
}
:host([mode=overlay]){
  .start,
  .end{
    position: absolute;
    height: 100%;
    width: fit-content;
    top: -100%;
    pointer-events: none;
    max-width: 70%;
  }
  .end{
    right: 0;
  }
  &:host(:is([overlaystartopened], [overlayendopened])) .scrim{
    opacity: 1;
    pointer-events: auto;
  }
  &:host([overlaystartopened]){
    .start{
      top: 0;
    }
    ::slotted([slot=start]){
      box-shadow: ${scheme.elevation.level3}
    }
  }
  &:host([overlayendopened]){
    .end{
      top: 0;
    }
    ::slotted([slot=end]){
      box-shadow: ${scheme.elevation.level3}
    }
  }
}
@media (orientation: portrait) {
  :host(:not([mode])){
    .start,
    .end{
      position: absolute;
      height: 100%;
      width: fit-content;
      top: -100%;
      pointer-events: none;
      max-width: 70%;
    }
    .end{
      right: 0;
    }
    &:host(:is([overlaystartopened], [overlayendopened])) .scrim{
      opacity: 1;
      pointer-events: auto;
    }
    &:host([overlaystartopened]){
      .start{
        top: 0;
      }
      ::slotted([slot=start]){
        box-shadow: ${scheme.elevation.level3}
      }
    }
    &:host([overlayendopened]){
      .end{
        top: 0;
      }
      ::slotted([slot=end]){
        box-shadow: ${scheme.elevation.level3}
      }
    }
  }
}
`
const template = /*html*/`
<slot class="view" part="view"></slot>
<div class="scrim" part="scrim"></div>
<slot class="start" part="start" name="start"></slot>
<slot class="end" part="end" name="end"></slot>
`

export class Drawer extends useElement({
  style, template, props,
  setup(shadowRoot, info) {
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    const scrim = shadowRoot.querySelector<HTMLDivElement>('.scrim')!
    const start = shadowRoot.querySelector<HTMLSlotElement>('.start')!
    const end = shadowRoot.querySelector<HTMLSlotElement>('.end')!
    scrim.onclick = () => {
      this.overlayStartOpened = false
      this.overlayEndOpened = false
    }
    const getMode = () => this.mode === 'auto' ? (device.orientation.portrait ? 'overlay' : 'sidebar') : this.mode
    const toggle = (slot: 'start' | 'end', mode: typeof props.values.mode = 'auto') => {
      const modeName = mode === 'auto' ? getMode() : mode
      const name = `${modeName}${slot === 'start' ? 'Start' : 'End'}Opened` as const
      this[name] = !this[name]
    }
    const overlayAnimate = (el: HTMLSlotElement, state: boolean, negatived = false) => {
      if (!info.isConnected || getMode() === 'sidebar') return
      const transform = ['translateX(0)', `translateX(${negatived ? '' : '-'}100%)`]
      if (state) transform.reverse()
      el.animate({ transform, top: [0, 0] }, getAnimateOptions())
    }
    const sidebarAnimate = (el: HTMLSlotElement, state: boolean) => {
      if (!info.isConnected || getMode() === 'overlay') return
      el.style.width = 'auto'
      const width = ['0', `${el.offsetWidth}px`]
      if (!state) width.reverse()
      el.animate({ width }, getAnimateOptions()).finished.then(() => el.style.removeProperty('width'))
    }
    return {
      expose: { toggle, getMode },
      overlayStartOpened: (v) => overlayAnimate(start, v),
      sidebarStartOpened: (v) => sidebarAnimate(start, v),
      overlayEndOpened: (v) => overlayAnimate(end, v, true),
      sidebarEndOpened: (v) => sidebarAnimate(end, v)
    }
  }
}) { }

const name = Drawer.define('s-drawer')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Drawer
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & Drawer
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}