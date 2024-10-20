import { useElement, JSXAttributes } from './core/element.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { Theme } from './page.js'

const name = 's-snackbar'
const props = {
  type: 'basic' as 'basic' | 'error',
  position: 'auto' as 'auto' | 'top-center' | 'bottom-center',
  duration: 4000
}

const style = /*css*/ `
:host{
  display: inline-block;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: var(--z-index, 2);
  overflow: hidden;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  --offset-direction: -1;
  transform: translateY(calc(var(--offset) * var(--offset-direction)));
  transition: transform .2s ease-out;
}
.container{
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
  min-height: 48px;
  border-radius: 4px;
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  height: fit-content;
  pointer-events: auto;
  transform: translateY(calc(100% - 16px));
  filter: opacity(0);
  transition: transform .2s, filter .2s;
  transition-timing-function: ease-out;
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
::slotted(svg[slot=icon]),
::slotted(s-icon[slot=icon]){
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
@media (max-width: 320px){
  .wrapper{
    padding: 8px;
  }
  .container{
    min-width: 100%;
  }
}
@media (pointer: coarse){
  .wrapper{
    align-items: flex-start;
    --offset-direction: 1;
  }
  .container{
    transform: translateY(calc(-100% - 16px));
    min-width: 240px;
  }
}
:host([position=bottom-center]) .wrapper {
  --offset-direction: -1;
}
:host([position=bottom-center]) .container{
  transform: translateY(calc(100% - 16px));
  min-width: 320px;
}
:host([position=top-center]) .wrapper{
  align-items: flex-start;
  --offset-direction: 1;
}
:host([position=top-center]) .container{
  transform: translateY(calc(-100% - 16px));
  min-width: 240px;
}
.wrapper.show .container{
  transform: translateY(0%);
  filter: opacity(1);
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="wrapper" part="wrapper">
  <div class="container" part="container">
    <slot name="icon" part="icon">
      <svg class="icon hint" viewBox="0 -960 960 960">
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
      </svg>
      <svg class="icon error" viewBox="0 -960 960 960">
        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
      </svg>
    </slot>
    <div class="text" part="text">
      <slot></slot>
    </div>
    <slot name="action"></slot>
  </div>
</div>
`

const show = (options: string | {
  root?: Element
  text: string
  type?: typeof props['type']
  position?: typeof props['position']
  duration?: number
  icon?: string | Element
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
    snackbar.textContent = options.text
    snackbar.type = options.type ?? 'basic'
    snackbar.position = options.position ?? 'auto'
    if (options.icon) {
      const icon = document.createElement('s-icon')
      icon.slot = 'icon'
      if (typeof options.icon === 'string') {
        icon.innerHTML = options.icon
      }
      else {
        icon.appendChild(options.icon)
      }
      snackbar.appendChild(icon)
    }
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
  snackbar.addEventListener('dismissed', () => root.removeChild(snackbar))
  requestAnimationFrame(snackbar.show)
  return snackbar
}

const task: { height: number, wrapper: HTMLElement, position: 'top-center' | 'bottom-center', propPosition: typeof props['position'] }[] = []
const isMobileQuery: MediaQueryList = window.matchMedia('(pointer: coarse)')
let isMobile: boolean = isMobileQuery.matches
isMobileQuery.addEventListener('change', (query) => {
  isMobile = query.matches
  // debugger
  if (task.length > 0) {
    for (const item of task) {
      if (item.propPosition === 'auto') {
        item.position = isMobile ? 'top-center' : 'bottom-center'
        // item.wrapper.style.setProperty('--offset', '0px')
      }
    }
    let offsetTop = 0, offsetBottom = 0;
    for (const item of task) {
      if (item.position === 'top-center') {
        item.wrapper.style.setProperty('--offset', `${offsetTop}px`)
        offsetTop += item.height + 8
      }
      if (item.position === 'bottom-center') {
        item.wrapper.style.setProperty('--offset', `${offsetBottom}px`)
        offsetBottom += item.height + 8
      }
    }
  }
})

class Snackbar extends useElement({
  style, template, props, syncProps: ['type', 'position'],
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    const state = { timer: 0, task: null as null | typeof task[number] }
    const show = () => {
      // debugger
      if (wrapper.classList.contains('show')) return
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        wrapper.style.width = `${innerWidth}px`
        wrapper.style.height = `${innerHeight}px`
        wrapper.style.top = `${0 - stackingContext.top}px`
        wrapper.style.left = `${0 - stackingContext.left}px`
      }
      const position = this.position === 'auto' ? (isMobile ? 'top-center' : 'bottom-center') : this.position
      let offset = container.offsetHeight + 8
      if (task.length > 0) {
        for (const item of task) {
          if (item.position === position) {
            item.wrapper.style.setProperty('--offset', `${offset}px`)
            offset += item.height + 8
          }
        }
      }
      task.unshift(state.task = { height: container.offsetHeight, wrapper, position: position, propPosition: this.position })
      wrapper.classList.add('show')
      this.dispatchEvent(new Event('show'))
      if (this.duration > 0) state.timer = setTimeout(dismiss, this.duration)
    }
    const dismiss = () => {
      if (!wrapper.classList.contains('show')) return
      clearTimeout(state.timer)
      wrapper.classList.remove('show')
      this.dispatchEvent(new Event('dismiss'))
      const indexOf = task.indexOf(state.task!)
      const position = this.position === 'auto' ? (isMobile ? 'top-center' : 'bottom-center') : this.position
      for (let i = indexOf + 1; i < task.length; i++) {
        const item = task[i]
        if (item.position === position) {
          const offset = Number(item.wrapper.style.getPropertyValue('--offset').slice(0, -2))
          item.wrapper.style.setProperty('--offset', `${offset - 8 - container.offsetHeight}px`)
        }
      }
      task.splice(indexOf, 1)
    }
    const transitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      const showed = wrapper.classList.contains('show')
      this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
      !showed && wrapper.removeAttribute('style')
    }
    trigger.addEventListener('click', show)
    container.addEventListener('transitionend', transitionEnd)
    action.addEventListener('click', dismiss)
    return {
      expose: { show, dismiss }
    }
  }
}) {
  static readonly show = show
}

Snackbar.define(name)

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  dismiss: Event
  dismissed: Event
}

interface Snackbar {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

export { Snackbar }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Snackbar
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}