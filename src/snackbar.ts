import { useElement } from './core/element.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { mediaQueries, mediaQueryList } from './core/utils/mediaQuery.js'
import { Theme } from './page.js'

const name = 's-snackbar'
const props = {
  type: 'standard' as 'standard' | 'error',
  align: 'auto' as 'auto' | 'top' | 'bottom',
  duration: 4000,
  value: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
.popup{
  position: fixed;
  top: auto;
  bottom: 0;
  margin: 0 auto;
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
  transition: transform .2s ease-out;
  background: red;
}
.container{
  min-height: 48px;
  border-radius: 4px;
  line-height: 1.6;
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  height: fit-content;
  pointer-events: auto;
  --transform: translateY(100%);
  box-sizing: border-box;
  --filter: opacity(0);
  transition: transform .2s, filter .2s;
  transition-timing-function: ease-out;
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
}
:host([align=top]) .container{
  top: 0;
  transform: translateY(calc(-100% - 16px));
}
:host([align=bottom]) .container{
  bottom: 0;
  transform: translateY(calc(100% - 16px));
}
.popup.show .container{
  transform: translateY(0%);
  filter: opacity(1);
}
:host([type=error]) .container{
  background: var(--s-color-error, ${Theme.colorError});
  color: var(--s-color-on-error, ${Theme.colorOnError});
}
.error,
:host([type=error]) .hint{
  display: none;
}
:host([type=error]) .error{
  display: block;
}
.icon,
::slotted([slot=icon]){
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  fill: currentColor;
  color: currentColor;
  margin-left: 16px;
  margin-right: -4px;
}
.text{
  margin: 12px 16px;
  flex-grow: 1;
  user-select: text;
  -webkit-user-select: text;
}
::slotted([slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 4px;
  color: var(--s-color-inverse-primary, ${Theme.colorInversePrimary});
  margin-right: 8px;
  margin-left: -8px;
  cursor: pointer;
  height: 36px;
  font-size: .875rem;
}
:host([type=error]) ::slotted([slot=action]){
  color: var(--s-color-on-error, ${Theme.colorOnError});
}
@media (max-width: ${mediaQueries.mobileM}px){
  .popup{
    padding: 8px;
  }
  .container{
    min-width: 100%;
  }
}
@media (pointer: coarse){
  .container{
    transform: translateY(calc(-100% - 16px));
    min-width: 240px;
  }
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="popup" popover="manual" part="popup">
  <div class="container" part="container">
    <slot name="icon">
      <svg class="icon hint" viewBox="0 -960 960 960">
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
      </svg>
    </slot>
    <svg class="icon error" viewBox="0 -960 960 960">
      <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
    </svg>
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
  type?: typeof props['type']
  align: typeof props['align']
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
  //requestAnimationFrame(snackbar.show)
  return snackbar
}

const bottomTask: HTMLElement[] = []
const topTask: typeof bottomTask[number][] = []

class Snackbar extends useElement({
  style, template, props, syncProps: ['type', 'align'],
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const popup = shadowRoot.querySelector('.popup') as HTMLDivElement
    //const popup = shadowRoot.querySelector('.popup') as HTMLDivElement & { task: typeof bottomTask[number][], offset: number }
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    const state = { timer: 0 }
    const gap = 8
    const getAlign = () => this.align === 'auto' ? (mediaQueryList.pointerCoarse.matches ? 'top' : 'bottom') : this.align
    const show = () => {
      if (!this.isConnected) return
      popup.style.display = 'flex'
      if (popup.showPopover) {
        popup.showPopover()
      }
    }
    const close = () => {

    }
    // const show = () => {
    //   if (popup.classList.contains('show')) return
    //   const stackingContext = getStackingContext(shadowRoot)
    //   if (stackingContext.top !== 0 || stackingContext.left !== 0) {
    //     popup.style.width = `${innerWidth}px`
    //     popup.style.height = `${innerHeight}px`
    //     popup.style.top = `${0 - stackingContext.top}px`
    //     popup.style.left = `${0 - stackingContext.left}px`
    //   }
    //   const align = getAlign()
    //   const height = container.offsetHeight
    //   popup.task = { top: topTask, bottom: bottomTask }[align]
    //   popup.offset = align === 'top' ? 1 : -1
    //   let h = height + gap
    //   if (popup.task.length > 0) {
    //     for (const item of popup.task) {
    //       item.style.transform = `translateY(${h * popup.offset}px)`
    //       h += (item.firstElementChild as HTMLElement).offsetHeight + gap
    //     }
    //   }
    //   popup.task.unshift(popup)
    //   popup.classList.add('show')
    //   this.dispatchEvent(new Event('show'))
    //   if (this.duration > 0) state.timer = setTimeout(dismiss, this.duration)
    // }
    // const dismiss = () => {
    //   if (!popup.classList.contains('show')) return
    //   clearTimeout(state.timer)
    //   popup.classList.remove('show')
    //   this.dispatchEvent(new Event('dismiss'))
    //   const indexOf = popup.task.indexOf(popup)
    //   for (let i = indexOf + 1; i < popup.task.length; i++) {
    //     const item = popup.task[i]
    //     const h = Math.abs(Number(item.style.transform.slice(11).slice(0, -3)))
    //     item.style.transform = `translateY(${(h - container.offsetHeight - gap) * popup.offset}px)`
    //   }
    //   popup.task.splice(indexOf, 1)
    // }
    // const transitionEnd = (event: TransitionEvent) => {
    //   if (event.propertyName !== 'transform') return
    //   const showed = popup.classList.contains('show')
    //   this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
    //   !showed && popup.removeAttribute('style')
    // }
    // trigger.addEventListener('click', show)
    // container.addEventListener('transitionend', transitionEnd)
    // action.addEventListener('click', dismiss)
    shadowRoot.querySelector('slot[name=trigger]')!.addEventListener('click', show)
    return {
      expose: { show, close }
    }
  }
}) {
  static readonly builder = builder
}

Snackbar.define(name)

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  close: Event
  closed: Event
}

interface Snackbar {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

export { Snackbar }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Snackbar
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