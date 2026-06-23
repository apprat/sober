import { useElement, useProps } from '../core/elements.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  gravity: ['center', 'top', 'bottom'],
  size: ['standard', 'full-screen'],
  opened: false,
  attached: false,
  $slotLayer: -1,
})

type CloseSource = 0 | 1 | 2

const events = {
  opened: Event,
  closed: Event,
  open: Event,
  close: CustomEvent<{ source: CloseSource }>
}

const style = /*css*/`
:host{
  display: contents;
  position: absolute;
  width: 380px;
  height: min-content;
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  cursor: default;
  outline-offset: 24px;
  border-radius: 28px;
  white-space: normal;
  font-size: .875rem;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  background: ${scheme.color.surfaceContainerHigh};
  color: ${scheme.color.onSurface};
  box-shadow: ${scheme.elevation.level4};
}
:host([size=full-screen]){
  max-width: none;
  max-height: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}
.popover{
  position: fixed;
  display: none;
  margin: auto;
  width: inherit;
  height: inherit;
  border: inherit;
  overflow: hidden;
  outline: none;
  max-width: inherit;
  max-height: inherit;
  background: inherit;
  color: inherit;
  box-shadow: inherit;
  border-radius: inherit;
  padding: inherit;
  &::backdrop{
    filter: opacity(.75);
    background: ${scheme.color.scrim};
  }
  &:open{
    display: flex;
  }
  .layout{
    flex-grow: 1;
    height: -moz-available;
    height: -webkit-fill-available;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    max-width: -moz-available;
    max-width: -webkit-fill-available;
    ::slotted(:is([slot=title], [slot=center-title])){
      font-size: calc(var(--s-font-size, 1) * 24px);
      font-weight: 600;
      padding: 24px 24px 0;
      line-height: 1.6;
      flex-shrink: 0;
    }
    ::slotted([slot=text]){
      cursor: text;
      padding: 16px 24px;
      line-height: 1.6;
      word-break: break-all;
      overflow: auto;
      outline: none;
      flex-grow: 1;
    }
    .actions{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0px 14px;
      flex-shrink: 0;
      ::slotted([slot=action]){
        min-width: 64px;
        margin: 16px 2px;
      }
    }
  }
}
:host([gravity=top]){
  .popover{
    margin-top: 0;
  }
}
:host([gravity=bottom]){
  .popover{
    margin-bottom: 0;
  }
}
`

const template = /*html*/`
<dialog class="popover" part="popover">
  <div class="layout" part="layout">
    <slot name="icon"></slot>
    <slot name="title"></slot>
    <slot name="center-title"></slot>
    <slot name="text"></slot>
    <slot></slot>
    <div class="actions" part="actions">
      <slot name="action"></slot>
    </div>
  </div>
</dialog>
`

export class Dialog extends useElement({
  style, template, props, events,
  setup(shadowRoot, info) {
    const popover = shadowRoot.querySelector<HTMLDialogElement>('.popover')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const action = shadowRoot.querySelector<HTMLDivElement>('slot[name=action')!
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    const toClose = (source: number) => {
      this.opened = false
      this.dispatchEvent(new CustomEvent('close', { detail: { source } }))
    }
    const getGravity = () => {
      const cssGravity = computedStyle.getValue('--s-dialog-gravity') as typeof this.gravity
      return props.metadata.gravity.types?.includes(cssGravity) ? cssGravity : this.gravity
    }
    popover.onkeydown = (e) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      toClose(Dialog.CLOSE_SOURCE_KEYBOARD)
    }
    popover.onmouseover = (e) => e.stopPropagation()
    popover.onpointerdown = (e) => e.stopPropagation()
    layout.onclick = (e) => {
      e.stopPropagation()
      //info.parentElement?.dispatchEvent(new PointerEvent('click', e))
      //console.log('click', info.parentElement)
    }
    action.onclick = () => toClose(Dialog.CLOSE_SOURCE_ACTION)
    popover.onclick = (e) => {
      toClose(Dialog.CLOSE_SOURCE_SCRIM)
      e.stopPropagation()
    }
    const open = async () => {
      if (!info.isConnected || popover.open) return
      popover.showModal()
      popover.focus()
      const offset = computedStyle.getValue('outline-offset')
      const gravity = getGravity()
      if (info.isConnected) {
        const transforms = {
          top: ['translateY(-100%)', 'translateY(0)'],
          bottom: ['translateY(100%)', 'translateY(0)'],
          center: ['scale(.9)', 'scale(1)']
        }
        const animateOptions = getAnimateOptions()
        await Promise.all([
          popover.animate({ transform: transforms[gravity], opacity: [0, 1] }, animateOptions).finished,
          popover.animate({ opacity: [0, 1] }, { ...animateOptions, pseudoElement: '::backdrop' }).finished
        ])
      }
    }
    const close = async () => {
      console.log('close')
      if (!popover.open) return
      if (info.isConnected) {
        const animateOptions = getAnimateOptions()
        await Promise.all([
          popover.animate({ transform: ['scale(1)', 'scale(.9)'], opacity: [1, 0] }, animateOptions).finished,
          popover.animate({ opacity: [1, 0] }, { ...animateOptions, pseudoElement: '::backdrop' }).finished
        ])
      }
      popover.close()
    }
    const show = () => this.opened = true
    const addEvent = () => {
      if (!info.parentNode || !this.attached) return
      let parentElement = info.parentNode
      if (this.slotLayer >= 0 && this.assignedSlot) {
        parentElement = this.assignedSlot
        for (let i = 0; i < this.slotLayer; i++) parentElement = parentElement.parentElement!
      }
      const parent = (parentElement instanceof ShadowRoot ? parentElement.host : parentElement) as HTMLElement
      if (!(parent instanceof HTMLElement)) return
      parent.addEventListener('click', show)
      info.parentNode = parent
    }
    const removeEvent = () => info.parentNode?.removeEventListener('click', show)
    return {
      onMounted: addEvent,
      onUnmounted: removeEvent,
      setSlotLayer: () => {
        removeEvent()
        addEvent()
      },
      attached: (v) => v ? addEvent() : removeEvent(),
      opened: (v) => v ? open() : close()
    }
  }
}) {
  static readonly CLOSE_SOURCE_SCRIM = 0 as const
  static readonly CLOSE_SOURCE_ACTION = 1 as const
  static readonly CLOSE_SOURCE_KEYBOARD = 2 as const
}

const name = Dialog.define('s-dialog')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Dialog
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
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
      $props: HTMLAttributes
    } & Dialog
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}