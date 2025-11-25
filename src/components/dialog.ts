import { useElement, useProps } from '../core/element.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import * as scheme from '../core/scheme.js'
import type { Button } from './button.js'

const props = useProps({
  gravity: ['center', 'top', 'bottom'],
  size: ['standard', 'full-screen'],
  opened: false,
  disabled: false
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
  text-align: start;
  margin: 24px;
  border-radius: 28px;
  white-space: normal;
  font-size: .875rem;
  animation-timing-function: ${scheme.motion.easing.standard};
  animation-duration: ${scheme.motion.duration.short4};
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
  &.opened{
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
    ::slotted([slot=title]){
      font-size: calc(var(--s-font-size) * 24px);
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
`

const template = /*html*/`
<dialog class="popover" part="popover">
  <div class="layout" part="layout">
    <slot name="title"></slot>
    <slot name="text"></slot>
    <slot></slot>
    <div class="actions" part="actions">
      <slot name="action"></slot>
    </div>
  </div>
</dialog>
`

type BuildActions = { text: string, click?: (event: MouseEvent) => void }

const builder = (options: string | {
  root?: Element
  title?: string
  text?: string
  view?: HTMLElement | ((dialog: Dialog) => void)
  actions?: BuildActions | BuildActions[],
}) => {
  let root: Element = document.body
  const dialog = new Dialog()
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  if (typeof options === 'string') {
    const text = document.createElement('div')
    text.slot = 'text'
    text.textContent = options
    dialog.appendChild(text)
  } else {
    if (options.root) root = options.root
    if (options.title) {
      const headline = document.createElement('div')
      headline.slot = 'title'
      headline.textContent = options.title
      dialog.appendChild(headline)
    }
    if (options.text) {
      const text = document.createElement('div')
      text.slot = 'text'
      text.textContent = options.text
      dialog.appendChild(text)
    }
    if (options.view) {
      typeof options.view === 'function' ? options.view(dialog) : dialog.appendChild(options.view)
    }
    const actions = options.actions ?? []
    for (const item of Array.isArray(actions) ? actions : [actions]) {
      const action = document.createElement('s-button') as Button
      action.slot = 'action'
      action.variant = 'text'
      action.textContent = item.text
      if (item.click) action.onclick = item.click
      dialog.appendChild(action)
    }
  }
  dialog.addEventListener('closed', () => root.removeChild(dialog))
  root.appendChild(dialog)
  setTimeout(() => {
    dialog.opened = true
  }, 0)
  return dialog
}

export class Dialog extends useElement({
  style, template, props, events,
  setup(shadowRoot, info) {
    const popover = shadowRoot.querySelector<HTMLDialogElement>('.popover')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const action = shadowRoot.querySelector<HTMLDivElement>('slot[name=action')!
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const getGravity = () => {
      const cssVar = computedStyle.getValue('--dialog-gravity') as typeof this.gravity
      const gravity = ['center', 'top', 'bottom'].includes(cssVar) ? cssVar : this.gravity
      return gravity
    }
    const state = { parent: undefined as HTMLElement | undefined }
    const open = async (animated = true) => {
      if (popover.classList.contains('opened')) return
      popover.showModal()
      popover.classList.add('opened')
      const gravity = getGravity()
      gravity !== 'center' && popover.style.setProperty(`margin-${gravity}`, 'inherit')
      popover.focus()
      state.parent?.setAttribute('dialog-opened', '')
      if (animated) {
        let transform = ['scale(.9)', 'scale(1)']
        const animateOptions = getAnimateOptions()
        if (gravity !== 'center') {
          transform = [`translateY(-48px)`, 'translateY(0)']
          if (gravity === 'bottom') transform[0] = `translateY(48px)`
        }
        const animation = popover.animate({ transform, opacity: [0, 1] }, animateOptions)
        popover.animate({ opacity: [0, 1] }, { ...animateOptions, pseudoElement: '::backdrop' })
        await animation.finished
      }
      this.dispatchEvent(new Event('opened'))
    }
    const dispatchCloseEvent = (source: CloseSource) => this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source } }))
    const close = async (animated = true) => {
      if (!popover.classList.contains('opened')) return
      popover.blur()
      state.parent?.removeAttribute('dialog-opened')
      if (animated) {
        const animateOptions = getAnimateOptions()
        const gravity = getGravity()
        let transform = ['scale(1)', 'scale(.9)']
        if (gravity !== 'center') {
          transform = ['translateY(0)', `translateY(calc(-48px)`]
          if (gravity === 'bottom') transform[1] = `translateY(48px)`
        }
        const animation = popover.animate({ transform, opacity: [1, 0] }, animateOptions)
        popover.animate({ opacity: [1, 0] }, { ...animateOptions, pseudoElement: '::backdrop' })
        await animation.finished
      }
      popover.classList.remove('opened')
      this.dispatchEvent(new Event('closed'))
      popover.close()
    }
    layout.addEventListener('pointerdown', (e) => e.stopPropagation())
    popover.addEventListener('pointerdown', (e) => {
      e.stopPropagation()
      e.button === 0 && dispatchCloseEvent(0) && (this.opened = false)
    })
    action.addEventListener('click', () => dispatchCloseEvent(1) && (this.opened = false))
    const maskEvents = ['click', 'touchstart', 'mouseover']
    maskEvents.forEach((name) => {
      popover.addEventListener(name, (e) => e.stopPropagation())
    })
    popover.addEventListener('keydown', (e) => {
      e.stopPropagation()
      if (e.key !== 'Escape') return
      e.preventDefault()
      if (dispatchCloseEvent(2)) this.opened = false
    })
    return {
      setOpened: (v) => {
        if (!info.isConnected) return
        v ? open() : close()
      },
      onMounted: (parent) => {
        const parentElement = parent instanceof ShadowRoot ? parent.host : parent
        if (!(parentElement instanceof HTMLElement)) return
        state.parent = parentElement
        const show = () => {
          const cssVar = computedStyle.getValue('--dialog-disabled')
          const disabled = cssVar === 'true' ? true : this.disabled
          !disabled && (this.opened = true)
        }
        parentElement.addEventListener('click', show)
        if (this.opened) open(false)
        return () => {
          if (this.opened) close()
          delete state.parent
          parentElement.removeEventListener('click', show)
        }
      }
    }
  }
}) {
  static CLOSE_SOURCE_SCRIM = 0 as const
  static CLOSE_SOURCE_ACTION = 1 as const
  static CLOSE_SOURCE_KEYBOARD = 2 as const
  static builder = builder
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