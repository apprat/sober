import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import { defaultStyle } from './fragment/dialog-style'
import { Builder } from './fragment/dialog-function'
import Button from './button'

const style = /*css*/`
.head{
  position: relative;
  display: contents;
}
.title{
  display: flex;
  font-size: 1.5rem;
  color: var(--s-color-on-surface,#1C1B1F);
  flex-grow: 1;
}
.content{
  -webkit-user-select: text;
  user-select: text;
  font-size: 1rem;
  color: var(--s-color-on-surface-variant,#49454E);
}
.action{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  order: 2;
}
.action>.item{
  min-width: 72px;
  margin: 8px 0 16px 0;
}
.action>.item:empty{
  display: none;
}
.action>.item:last-child{
  margin-right: 16px;
  margin-left: 8px;
}
:host([size=large]) .body{
  max-width: 1080px;
}
:host([size=full-screen]) .body{
  max-width: none;
  max-height: none;
  width: 100%;
  height: 100%;
  border-radius: 0;
}
:host([size=full-screen]) .head{
  display: flex;
}
:host([size=full-screen]) .head::before{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--s-color-outline-variant,#C4C7C5);
  height: 1px;
}
:host([size=full-screen]) ::slotted([slot=title]:not(:empty)){
  margin: 16px 24px;
}
:host([size=full-screen]) .action>.item{
  margin-top: 0;
  margin-bottom: 0;
}
:host([size=full-screen]) .action>.item:last-child{
  margin-right: 8px;
}

::slotted([slot=title]:not(:empty)){
  margin: 24px 24px 16px 24px;
}
::slotted([slot=message]:not(:empty)){
  margin: 0 24px 8px 24px;
  line-height: 1.6;
}
::slotted(s-label){
  padding-left: 16px;
  padding-right: 16px;
}
`

const name = 's-dialog'
const props = {
  size: 'normal' as 'normal' | 'large' | 'full-screen',
  positiveButton: '',
  negativeButton: ''
}

export const enum EventCode { 'none', 'positiveButton', 'negativeButton', 'mask', 'keyboard' }

class DimissEvent extends Event {
  constructor(type: string, public readonly code: EventCode, eventInitDict?: EventInit) {
    super(type, eventInitDict)
  }
}

/**
 * @slot trigger icon title message anonymous
 * @event show dimiss focus blur
 */
const Component = defineComponent({
  name, props,
  prototypes: { alert, Builder },
  dependencies: [Button],
  setup() {
    const state = { showed: false }
    const toggle = (is = true) => this.refs.wrapper.classList[is ? 'add' : 'remove']('show')
    const dispatch = (type: 'focus' | 'blur') => {
      this.refs.container.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent(type))
      }, { once: true })
    }
    const dispatchShow = () => this.host.dispatchEvent(new Event('show', { cancelable: true }))
    const dispatchDimiss = (code: EventCode) => this.host.dispatchEvent(new DimissEvent('dimiss', code, { cancelable: true }))
    const show = () => {
      if (!this.host.isConnected || !dispatchShow()) return
      state.showed = true
      dispatch('focus')
      toggle()
    }
    const dimiss = (code: EventCode = EventCode.none) => {
      if (!this.host.isConnected || !dispatchDimiss(code)) return
      state.showed = false
      dispatch('blur')
      toggle(false)
    }
    document.addEventListener('keydown', (event) => {
      if (event.code !== 'Escape' || !this.refs.wrapper.classList.contains('show')) return
      dimiss(EventCode.keyboard)
    })
    return {
      expose: {
        show,
        dimiss: () => dimiss(),
        get showed() {
          return state.showed
        }
      },
      watches: {
        negativeButton: () => this.refs.negative.textContent = this.props.negativeButton,
        positiveButton: () => this.refs.positive.textContent = this.props.positiveButton
      },
      render: () => <>
        <style>{rootStyle}</style>
        <style>{defaultStyle}</style>
        <style>{style}</style>
        <slot name="trigger" onClick={show}></slot>
        <div class="wrapper" part="wrapper" ref="wrapper">
          <div class="mask" part="mask" onClick={() => dimiss(EventCode.mask)}></div>
          <div class="container" part="container" ref="container">
            <div class="body" part="body">
              <div class="head">
                <div class="icon">
                  <slot name="icon"></slot>
                </div>
                <div class="title">
                  <slot name="title"></slot>
                </div>
                <div class="action">
                  <s-button theme="text" class="item" onClick={() => dimiss(EventCode.negativeButton)} ref="negative"></s-button>
                  <s-button theme="text" class="item" onClick={() => dimiss(EventCode.positiveButton)} ref="positive"></s-button>
                </div>
              </div>
              <div class="content">
                <slot name="message"></slot>
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </>
    }
  }
})

export default Component

type Component = InstanceType<typeof Component>

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
  interface Document {
    createElement(tagName: typeof name, options?: ElementCreationOptions): Component
    getElementsByTagName(qualifiedName: typeof name): HTMLCollectionOf<Component>
  }
  namespace Sober {
    namespace Dialog {
      type DimissEvent = InstanceType<typeof DimissEvent>
    }
  }
  interface HTMLElement {
    addEventListener(type: 'dimiss', listener: (ev: DimissEvent) => void, options?: boolean | AddEventListenerOptions): void
  }
}