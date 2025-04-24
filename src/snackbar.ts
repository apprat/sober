import { useElement } from './core/element.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { mediaQueries, mediaQueryList } from './core/utils/mediaQuery.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import { Theme } from './core/theme.js'

type Props = {
  type: 'none' | 'info' | 'success' | 'warning' | 'error'
  align: 'auto' | 'top' | 'bottom'
  duration: number
}

const name = 's-snackbar'
const props: Props = {
  type: 'none',
  align: 'auto',
  duration: 4000
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
.popup{
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  max-width: none;
  max-height: none;
  display: none;
  overflow: hidden;
  box-sizing: border-box;
  pointer-events: none;
  padding: 16px;
  justify-content: center;
  transition: transform var(--s-motion-duration-medium4, ${Theme.motionDurationMedium4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
}
.popup.show{
  display: flex;
}
.container{
  align-self: flex-end;
  width: stretch;
  display: flex;
  align-items: center;
  min-height: 48px;
  line-height: 22px;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: .875rem;
  font-weight: 500;
  box-sizing: border-box;
  max-width: ${mediaQueries.mobileS}px;
  transition: box-shadow var(--s-motion-duration-medium4, ${Theme.motionDurationMedium4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
}
.text{
  flex-grow: 1;
  min-width: 0;
  user-select: text;
  -webkit-user-select: text;
}
.icon{
  display: none;
}
:host([type=info]) .info,
:host([type=success]) .success,
:host([type=warning]) .warning,
:host([type=error]) .error{
  display: block;
}
:host([type=info]) .container{
  color: var(--s-color-on-secondary, ${Theme.colorOnSecondary});
  background: var(--s-color-secondary, ${Theme.colorSecondary});
}
:host([type=success]) .container{
  color: var(--s-color-on-success, ${Theme.colorOnSuccess});
  background: var(--s-color-success, ${Theme.colorSuccess});
}
:host([type=warning]) .container{
  color: var(--s-color-on-warning, ${Theme.colorOnWarning});
  background: var(--s-color-warning, ${Theme.colorWarning});
}
:host([type=error]) .container{
  color: var(--s-color-on-error, ${Theme.colorOnError});
  background: var(--s-color-error, ${Theme.colorError});
}
:host([type=info]) ::slotted([slot=action]),
:host([type=success]) ::slotted([slot=action]),
:host([type=warning]) ::slotted([slot=action]),
:host([type=error]) ::slotted([slot=action]){
  color: currentColor;
}
svg,
::slotted([slot=icon]){
  width: 24px;
  height: 24px;
  color: currentColor;
  fill: currentColor;
  margin-right: 12px;
  margin-left: -4px;
}
::slotted([slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 4px;
  margin-right: -8px;
  margin-left: 12px;
  cursor: pointer;
  height: 36px;
  font-size: .875rem;
  color: var(--s-color-inverse-primary, ${Theme.colorInversePrimary});
}
@media (max-width: ${mediaQueries.mobileM}px){
  .popup{
    padding: 8px;
  }
}
@media (pointer: fine){
  .container:hover{
    box-shadow: var(--s-elevation-level4, ${Theme.elevationLevel4});
  }
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="popup" popover="manual" part="popup">
  <div class="container" part="container">
    <slot name="icon">
      <svg viewBox="0 0 24 24" class="icon info">
        <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
      </svg>
      <svg viewBox="0 0 24 24" class="icon success">
        <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
      </svg>
      <svg viewBox="0 0 24 24" class="icon warning">
        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
      </svg>
      <svg viewBox="0 0 24 24" class="icon error">
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>
    </slot>
    <div class="text" part="text">
      <slot></slot>
    </div>
    <slot name="action"></slot>
  </div>
</div>
`

const builder = (options: string | {
  root?: Element
  icon?: string | Element
  text: string
  type?: Props['type']
  align?: Props['align']
  duration?: number
  action?: string | {
    text: string
    click: (event: MouseEvent) => unknown
  }
}) => {
  let root: Element = document.body
  const snackbar = new Snackbar()
  snackbar.style.display = 'block'
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') {
    root = page
  }
  if (typeof options === 'string') {
    snackbar.textContent = options
  } else {
    if (options.root) root = options.root
    if (options.align) snackbar.align = options.align
    if (options.icon) {
      if (options.icon instanceof Element) {
        options.icon.slot = 'icon'
        snackbar.appendChild(options.icon)
      }
      if (typeof options.icon === 'string') {
        snackbar.innerHTML = options.icon
      }
    }
    snackbar.append(options.text)
    if (options.type) snackbar.type = options.type
    if (options.action) {
      const action = document.createElement('s-button')
      action.type = 'text'
      action.slot = 'action'
      if (typeof options.action === 'string') {
        action.textContent = options.action
      } else {
        action.textContent = options.action.text
        action.addEventListener('click', options.action.click)
      }
      snackbar.appendChild(action)
    }
    if (typeof options.duration === 'number') snackbar.duration = options.duration
  }
  root.appendChild(snackbar)
  snackbar.addEventListener('closed', () => root.removeChild(snackbar))
  snackbar.show()
  return snackbar
}

const tasks = {
  top: [] as HTMLElement[],
  bottom: [] as HTMLElement[],
}

class Snackbar extends useElement({
  style, template, props, syncProps: ['type'],
  setup(shadowRoot) {
    const popup = shadowRoot.querySelector<HTMLDivElement>('.popup')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const computedStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    const state = { timer: 0, gap: 8 }
    const getAlign = () => this.align === 'auto' ? (mediaQueryList.anyPointerCoarse.matches ? 'top' : 'bottom') : this.align
    const show = () => {
      if (!this.isConnected || popup.classList.contains('show')) return
      popup.classList.add('show')
      if (popup.showPopover) {
        popup.showPopover()
      } else {
        const rect = getStackingContext(shadowRoot)
        popup.style.width = `${innerWidth}px`
        popup.style.height = `${innerHeight}px`
        popup.style.marginLeft = `${-rect.left}px`
        popup.style.marginTop = `${-rect.top}px`
        popup.style.zIndex = '2'
      }
      const align = getAlign()
      container.style.alignSelf = { top: 'start', bottom: 'end' }[align]
      const task = tasks[align]
      const offset = { top: 1, bottom: -1 }[align]
      let height = container.offsetHeight + state.gap
      for (const item of task) {
        item.style.transform = `translateY(${height * offset}px)`
        height += (item.firstElementChild as HTMLElement).offsetHeight + state.gap
      }
      const animation = container.animate({ opacity: [0, 1], transform: [`translateY(calc(${offset * -100}% + 16px))`, ''], pointerEvents: 'auto' }, { ...getAnimateOptions(), fill: 'forwards' })
      this.dispatchEvent(new Event('show'))
      this.duration > 0 && (state.timer = setTimeout(close, this.duration))
      popup.dataset.align = align
      task.unshift(popup)
      animation.finished.then(() => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !popup.classList.contains('show')) return
      clearTimeout(state.timer)
      const align = popup.dataset.align as 'top' | 'bottom'
      const task = tasks[align]
      const offset = { top: 1, bottom: -1 }[align]
      const indexOf = task.indexOf(popup)
      for (let i = indexOf + 1; i < task.length; i++) {
        const item = task[i]
        const h = Math.abs(Number(item.style.transform.slice(11).slice(0, -3)))
        item.style.transform = `translateY(${(h - container.offsetHeight - state.gap) * offset}px)`
      }
      const animation = container.animate({ opacity: [1, 0], transform: `translateY(calc(${offset * -100}% + 16px))` }, getAnimateOptions())
      this.dispatchEvent(new Event('close'))
      animation.finished.then(() => {
        if (popup.hidePopover) popup.hidePopover()
        popup.removeAttribute('style')
        popup.classList.remove('show')
        this.dispatchEvent(new Event('closed'))
      })
      task.splice(indexOf, 1)
    }
    container.onmouseenter = () => clearTimeout(state.timer)
    container.onmouseleave = () => popup.classList.contains('show') && this.duration > 0 && (state.timer = setTimeout(close, this.duration))
    shadowRoot.querySelector<HTMLSlotElement>('slot[name=trigger]')!.onclick = show
    shadowRoot.querySelector<HTMLSlotElement>('slot[name=action]')!.onclick = close
    return {
      expose: { show, close },
    }
  }
}) {
  static readonly builder = builder
}

Snackbar.define(name)

export { Snackbar }

interface Events {
  Show: Event
  Showed: Event
  Closed: Event
}


type EventMaps = Events & HTMLElementEventMap

interface Snackbar {
  addEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: Snackbar, ev: EventMaps[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: Snackbar, ev: EventMaps[K]) => any, options?: boolean | EventListenerOptions): void
}

type JSXEvents<L extends boolean = false> = {
  [K in keyof EventMaps as `on${L extends false ? K : Lowercase<K>}`]?: (ev: EventMaps[K]) => void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: Snackbar
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props> & Events<true>
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
      $props: HTMLAttributes & Partial<Props> & JSXEvents
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props> & JSXEvents
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props> & Events<true>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props> & Events<true>
    }
  }
}