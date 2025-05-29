import { useElement, useProps, useEvents } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import { Theme } from './core/theme.js'
import './scroll-view.js'

type EventShowSource = 'TRIGGER'
type EventCloseSource = 'SCRIM' | 'ACTION'

const name = 's-dialog'
const props = useProps({
  showed: false,
  size: ['standard', 'full']
})

const events = useEvents({
  show: CustomEvent<{ source: EventShowSource }>,
  showed: Event,
  close: CustomEvent<{ source: EventCloseSource }>,
  closed: Event
})


const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
dialog{
  inset: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  max-width: none;
  max-height: none;
  outline: none;
  color: inherit;
}
dialog::backdrop{
  background: none;
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;
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
.container,
::slotted([slot=custom]){
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  pointer-events: auto;
  position: relative;
  border-radius: 28px;
  display: flex;
  outline: none;
  flex-direction: column;
  overflow: hidden;
  transition-timing-function: ease-out;
  box-shadow: var(--s-elevation-level5, ${Theme.elevationLevel5});
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
}
:host([size=full]) .container{
  width: 100%;
  height: 100%;
  border-radius: 0;
  max-width: none;
  max-height: none;
}
:host([size=full]) ::slotted(:is([slot=text],:not([slot]))){
  max-width: 100%;
  width: auto;
}
::slotted([slot=headline]){
  padding: 24px 24px 0 24px;
  font-size: 1.5rem;
  line-height: 22px;
  font-weight: 600;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  flex-shrink: 0;
}
.text{
  user-select: text;
  -webkit-user-select: text;
  flex-grow: 1;
}
::slotted([slot=text]){
  margin: 16px 24px;
  max-width: calc(100% - 48px);
  line-height: 22px;
}
::slotted(:is(:not([slot]), [slot=text])){
  width: ${mediaQueries.mobileM}px;
}
::slotted(:not([slot])){
  max-width: 100%;
}
.action{
  display: flex;
  justify-content: flex-end;
  padding: 0 14px;
  flex-shrink: 0;
}
::slotted([slot=action]){
  min-width: 72px;
  margin: 16px 2px;
  display: inline-flex;
  align-items: center;
  padding: 0 24px;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  box-sizing: border-box;
  height: 40px;
  font-size: .875rem;
  cursor: pointer;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog part="popup">
  <div class="scrim" part="scrim"></div>
  <slot name="custom" class="wrapper" part="wrapper">
    <div class="container" part="container">
      <slot name="headline"></slot>
      <s-scroll-view class="text" part="view">
        <slot></slot>
        <slot name="text"></slot>
      </s-scroll-view>
      <div class="action" part="action">
        <slot name="action"></slot>
      </div>
    </div>
  </slot>
</dialog>
`

type BuildActions = { text: string, click?: (event: MouseEvent) => unknown }

const builder = (options: string | {
  root?: Element
  headline?: string
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
    if (options.headline) {
      const headline = document.createElement('div')
      headline.slot = 'headline'
      headline.textContent = options.headline
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
      const action = document.createElement('s-button')
      action.slot = 'action'
      action.type = 'text'
      action.textContent = item.text
      if (item.click) action.onclick = item.click
      dialog.appendChild(action)
    }
  }
  dialog.showed = true
  dialog.addEventListener('closed', () => root.removeChild(dialog))
  root.appendChild(dialog)
  return dialog
}

export class Dialog extends useElement({
  style, template, props, events, methods: { builder },
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector<HTMLDialogElement>('dialog')!
    const scrim = shadowRoot.querySelector<HTMLDivElement>('.scrim')!
    const wrapper = shadowRoot.querySelector<HTMLDivElement>('.wrapper')!
    const containerStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = containerStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = containerStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    shadowRoot.querySelector<HTMLSlotElement>('slot[name=trigger]')!.onclick = () => {
      if (this.showed || !this.dispatchEvent(new CustomEvent('show', { cancelable: true, detail: { source: 'TRIGGER' } }))) return console.log('拒绝')
      this.showed = true
    }
    const onClose = (source: EventCloseSource) => {
      if (!this.showed || !this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source } }))) return
      this.showed = false
    }
    shadowRoot.querySelector<HTMLElement>('.scrim')!.onclick = () => onClose('SCRIM');
    shadowRoot.querySelector<HTMLSlotElement>('slot[name=action]')!.onclick = () => onClose('ACTION')
    const show = () => {
      if (!this.isConnected || dialog.open) return
      const animateOptions = getAnimateOptions()
      dialog.showModal()
      dialog.classList.add('show')
      scrim.animate({ opacity: [0, 1] }, animateOptions)
      const animation = wrapper.animate({ transform: ['scale(.9)', 'scale(1)'], opacity: [0, 1] }, animateOptions)
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open) return
      const animateOptions = getAnimateOptions()
      scrim.animate({ opacity: [1, 0] }, animateOptions)
      const animation = wrapper.animate({ transform: ['scale(1)', 'scale(.9)'], opacity: [1, 0] }, animateOptions)
      animation.addEventListener('finish', () => {
        dialog.close()
        dialog.classList.remove('show')
        this.dispatchEvent(new Event('closed'))
      })
    }
    return {
      onMounted: () => this.showed && !dialog.open && show(),
      showed: (value) => value ? show() : close()
    }
  }
}) { }

Dialog.define(name)

type JSXEvents<UP extends boolean = false> = {
  [K in keyof typeof events as `on${UP extends false ? K : K extends `${infer F}${infer L}` ? `${Uppercase<F>}${L}` : never}`]?: (ev: typeof events[K]) => void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: Dialog
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props> & Events
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
      $props: HTMLAttributes & Partial<typeof props> & JSXEvents<true>
    } & Dialog
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props> & JSXEvents<true>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props> & Events
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props> & Events
    }
  }
}