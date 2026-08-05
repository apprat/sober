import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'

const props = useProps({
  startOpen: true,
  endOpen: true,
  startModalOpen: false,
  endModalOpen: false,
  $mode: ['auto', 'standard', 'modal'],
  $media: '(orientation: portrait)'
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
:host([modal]){
  .start,
  .end{
    display: none;
  }
  ::slotted(:is([slot=start], [slot=end])){
    position: absolute;
    max-width: 80%;
    transition-property: box-shadow;
    border-radius: 0 ${scheme.shape.corner.large} ${scheme.shape.corner.large} 0;
  }
  ::slotted([slot=end]){
    right: 0;
    border-radius: ${scheme.shape.corner.large} 0 0 ${scheme.shape.corner.large};
  }
  &:host(:is([startModalOpen], [endModalOpen])) .scrim{
    pointer-events: auto;
    opacity: 1;
  }
  &:host([startModalOpen]) .start,
  &:host([endModalOpen]) .end{
    display: contents;
  }
  &:host([startModalOpen]) ::slotted([slot=start]),
  &:host([endModalOpen]) ::slotted([slot=end]){
    box-shadow: ${scheme.elevation.level3};
  }
}
:host(:not([modal])){
  .start,
  .end{
    transition-property: margin;
  }
  &:host([startOpen=false]) .start,
  &:host([endOpen=false]) .end{
    display: none;
  }
  ::slotted([slot=start]){
    border-right-style: solid;
  }
  ::slotted([slot=end]){
    border-left-style: solid;
  }
}
.view{
  display: block;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
  position: relative;
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
.start,
.end{
  display: block;
  max-width: 50%;
  height: 100%;
  right: 0;
  overflow: hidden;
  flex-shrink: 0;
  contain: layout;
}
.start{
  left: 0;
  right: auto;
  order: -1;
}
::slotted(:is([slot=start], [slot=end])){
  width: 260px;
  height: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  align-self: stretch;
  overflow: auto;
  background: ${scheme.color.surfaceContainerLow};
  border-width: 1px;
  border-color: ${scheme.color.surfaceVariant};
}
`
const template = /*html*/`
<div class="view" part="view">
  <slot></slot>
</div>
<div class="scrim" part="scrim"></div>
<div class="start" part="start">
  <slot name="start"></slot>
</div>
<div class="end" part="end">
  <slot name="end"></slot>
</div>
`

export class Drawer extends useElement({
  style, template, props,
  setup(shadowRoot, info) {
    const scrim = shadowRoot.querySelector<HTMLDivElement>('.scrim')!
    const start = shadowRoot.querySelector<HTMLDivElement>('.start')!
    const end = shadowRoot.querySelector<HTMLDivElement>('.end')!
    const slots = {
      start: shadowRoot.querySelector<HTMLSlotElement>('slot[name=start]')!,
      end: shadowRoot.querySelector<HTMLSlotElement>('slot[name=end]')!
    }
    const mediaQueryer = new MediaQueryer(this.media)
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    mediaQueryer.onChange = (v) => this.mode === 'auto' && this.toggleAttribute('modal', v)
    scrim.onclick = () => {
      this.startModalOpen = false
      this.endModalOpen = false
    }
    const getMode = () => this.mode === 'auto' ? (mediaQueryer.matches ? 'modal' : 'standard') : this.mode
    const toggle = (slot: 'start' | 'end', mode: typeof props.values.mode = 'auto') => {
      const modeName = mode === 'auto' ? getMode() : mode
      const data = {
        standard: { start: 'startOpen', end: 'endOpen' },
        modal: { start: 'startModalOpen', end: 'endModalOpen' }
      } as const
      const name = data[modeName][slot]
      this[name] = !this[name]
    }
    const animate = async (started: boolean, open: boolean) => {
      if (!info.isConnected || getMode() === 'modal') return
      const target = started ? start : end
      target.style.display = 'block'
      const values = ['0px', `${target.offsetWidth * -1}px`]
      if (open) values.reverse()
      const animateOptions = getAnimateOptions()
      await target.animate({ [started ? 'marginLeft' : 'marginRight']: values }, animateOptions).finished
      target.style.removeProperty('display')
    }
    const modalAnimate = async (started: boolean, open: boolean) => {
      if (!info.isConnected || getMode() === 'standard') return
      const wrap = started ? start : end
      const target = started ? slots.start : slots.end
      const [el] = target.assignedElements()
      if (!el) return
      const transform = ['translateX(0)', `translateX(${started ? '-' : ''}100%)`]
      if (open) transform.reverse()
      wrap.style.display = 'contents'
      await el.animate({ transform, top: [0, 0] }, getAnimateOptions()).finished
      wrap.style.removeProperty('display')
    }
    return {
      expose: { toggle, getMode },
      mode: (v) => {
        if (v === 'auto') return mediaQueryer.call()
        this.toggleAttribute('modal', v === 'modal')
      },
      media: (v) => mediaQueryer.replace(v),
      startOpen: (v) => animate(true, v),
      endOpen: (v) => animate(false, v),
      startModalOpen: (v) => modalAnimate(true, v),
      endModalOpen: (v) => modalAnimate(false, v)
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