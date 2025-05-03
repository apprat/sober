import { useElement } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import { Theme } from './core/theme.js'

type Props = {
  showed: boolean
  disabledGesture: boolean
}

const name = 's-bottom-sheet'
const props: Props = {
  showed: false,
  disabledGesture: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
dialog{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  max-width: none;
  max-height: none;
  outline: none;
  justify-content: center;
  align-items: flex-end;
  color: inherit;
  overflow: hidden;
}
dialog::backdrop{
  background: none;
}
dialog[open]{
  display: flex;
}
.scrim{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  backdrop-filter: saturate(180%) blur(2px);
}
.scrim::before{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  opacity: .75;
  background: var(--s-color-scrim, ${Theme.colorScrim});
}
dialog.show .scrim{
  opacity: 1;
}
.container{
  position: relative;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
  max-width: ${mediaQueries.mobileL}px;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
}
.indicator{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}
.indicator::before{
  content: '';
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--s-color-outline, ${Theme.colorOutline});
  opacity: .4;
}
::slotted([slot=text]){
  padding: 24px;
  line-height: 22px;
}
::slotted(:not([slot])){
  overscroll-behavior: none;
}
@media (max-width: ${mediaQueries.tablet}px){
  .container{
    max-width: ${mediaQueries.tablet}px;
  }
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog part="popup">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <div class="indicator" part="indicator"></div>
    <slot name="text"></slot>
    <slot id="view"></slot>
  </div>
</dialog>
`

type View = HTMLElement | ((bottomSheet: BottomSheet) => void)

const builder = (options: string | View | {
  root?: Element
  view: View | string
  disabledGesture: boolean
}) => {
  let root: Element = document.body
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  const bottomSheet = new BottomSheet()
  const text = document.createElement('div')
  text.slot = 'text'
  if (typeof options === 'function' || options instanceof HTMLElement) {
    options instanceof HTMLElement ? bottomSheet.appendChild(options) : options(bottomSheet)
  } else if (typeof options === 'string') {
    text.textContent = options
    bottomSheet.appendChild(text)
  } else {
    if (options.root) root = options.root
    if (options.disabledGesture) bottomSheet.disabledGesture = options.disabledGesture
    if (typeof options.view === 'string') {
      text.textContent = options.view
      bottomSheet.appendChild(text)
    }
    if (options.view instanceof HTMLElement) {
      bottomSheet.appendChild(options.view)
    }
    if (typeof options.view === 'function') {
      options.view(bottomSheet)
    }
  }
  bottomSheet.addEventListener('closed', () => root.removeChild(bottomSheet))
  bottomSheet.showed = true
  root.appendChild(bottomSheet)
  return bottomSheet
}

type EventShowSource = 'TRIGGER'
type EventCloseSource = 'SCRIM' | 'GESTURE'

class BottomSheet extends useElement({
  style,
  template,
  props,
  syncProps: ['showed'],
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector<HTMLDialogElement>('dialog')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const scrim = shadowRoot.querySelector<HTMLDivElement>('.scrim')!
    const indicator = shadowRoot.querySelector<HTMLDivElement>('.indicator')!
    const computedStyle = getComputedStyle(this)
    let scrollView: null | HTMLElement = null
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    shadowRoot.querySelector<HTMLSlotElement>('#view')!.onslotchange = (event) => {
      const target = event.target as HTMLSlotElement
      scrollView = (target.assignedElements()[0] as HTMLElement) ?? null
    }
    shadowRoot.querySelector<HTMLSlotElement>('slot[name=trigger]')!.onclick = () => {
      if (this.showed || !this.dispatchEvent(new CustomEvent('show', { cancelable: true, detail: { source: 'TRIGGER' } }))) return
      this.showed = true
    }
    const onClose = (source: EventCloseSource) => {
      if (!this.showed || !this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source } }))) return
      this.showed = false
    }
    scrim.onclick = () => onClose('SCRIM')
    let touchs: null | { y: number, x: number, disabled: boolean, top: number, h: number, now: number } = null
    container.addEventListener('touchmove', (event) => {
      const target = event.target as HTMLElement
      if (this.disabledGesture) return
      const touch = event.touches[0]
      if (!touchs) return touchs = { y: touch.pageY, x: touch.pageX, disabled: false, top: 0, h: container.offsetHeight, now: Date.now() }
      if (touchs.disabled) return
      const top = touch.pageY - touchs.y
      const left = touch.pageX - touchs.x
      touchs.top = Math.min(touchs.h, Math.max(0, top))
      if ((target !== indicator && scrollView && scrollView.scrollTop > 0) || Math.abs(top) < Math.abs(left)) return touchs.disabled = true
      container.style.transform = `translateY(${touchs.top}px)`
    }, { passive: false })
    container.ontouchend = () => {
      if (!touchs || touchs.disabled) return touchs = null
      const threshold = (Date.now() - touchs.now) > 300 ? (touchs.h / 3) : 20
      if (touchs.top > threshold) {
        if (!this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source: 'GESTURE' } }))) return
        this.showed = false
      } else {
        container.animate({ transform: [container.style.transform, 'translateY(0)'] }, getAnimateOptions())
        container.style.removeProperty('transform')
      }
      touchs = null
    }
    const show = () => {
      if (!this.isConnected || dialog.open) return
      dialog.showModal()
      dialog.classList.add('show')
      const animateOptions = getAnimateOptions()
      scrim.animate({ opacity: [0, 1] }, animateOptions)
      const animation = container.animate({ transform: ['translateY(100%)', 'translateY(0)'], opacity: [0, 1] }, animateOptions)
      animation.finished.then(() => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open) return
      dialog.classList.remove('show')
      const animateOptions = getAnimateOptions()
      const oldTransform = container.style.transform
      scrim.animate({ opacity: [1, 0] }, animateOptions)
      const animation = container.animate({ transform: [oldTransform === '' ? 'translateY(0)' : oldTransform, 'translateY(100%)'], opacity: [1, 0] }, animateOptions)
      animation.finished.then(() => {
        dialog.close()
        if (oldTransform) container.style.removeProperty('transform')
        this.dispatchEvent(new Event('closed'))
      })
    }
    return {
      onMounted: () => this.showed && !dialog.open && show(),
      showed: (value) => value ? show() : close()
    }
  }
}) {
  static readonly builder = builder
}

BottomSheet.define(name)

export { BottomSheet }

type Events = {
  Show: CustomEvent<{ source: EventShowSource }>
  Showed: Event
  Close: CustomEvent<{ source: EventCloseSource }>
  Closed: Event
}

type EventMaps = Events & HTMLElementEventMap

interface BottomSheet {
  addEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: BottomSheet, ev: EventMaps[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: BottomSheet, ev: EventMaps[K]) => any, options?: boolean | EventListenerOptions): void
}

type JSXEvents<L extends boolean = false> = {
  [K in keyof EventMaps as `on${L extends false ? K : Lowercase<K>}`]?: (ev: EventMaps[K]) => void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: BottomSheet
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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props> & JSXEvents
    } & BottomSheet
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