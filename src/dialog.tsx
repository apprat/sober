import { defineComponent, IntrinsicElement, css } from './base/core'
import Button from './button'
import Checkbox from './checkbox'
import RadioButton from './radio-button'
import Label from './label'

const style = css`
:host{
  display:inline-block;
  vertical-align: middle;
  z-index: 1;
}
.container{
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: inherit;
}
.show{
  pointer-events: auto;
}
.mask{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, .4);
  cursor: pointer;
  filter: opacity(0);
  transition: filter .2s;
}
.show .mask{
  filter: opacity(1);
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  filter: opacity(0);
  transform: scale(.8);
  transition: filter .2s,transform .2s;
  pointer-events: none;
}
.show .wrapper{
  filter: opacity(1);
  transform: scale(1);
}
.body{
  -webkit-user-select: none;
  user-select: none;
  background: var(--s-color-background);
  width: calc(100% - 48px);
  max-width: 560px;
  min-width: 280px;
  max-height: calc(100% - 48px);
  border-radius: 28px;
  position: relative;
  box-shadow: 0 5px 5px -3px rgb(0, 0, 0, .2), 0 8px 10px 1px rgb(0, 0, 0, .14), 0 3px 14px 2px rgb(0, 0, 0, .12);
  display: flex;
  flex-direction: column;
}
.show .body{
  pointer-events: auto;
}
.head{
  display: contents;
  position: relative;
}
.title{
  display: flex;
  font-size: 1.5rem;
  color: var(--s-color-on-surface);
  flex-grow: 1;
}
.content{
  -webkit-user-select: text;
  user-select: text;
  font-size: 1rem;
  color: var(--s-color-on-surface-variant);
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
  background: var(--s-color-outline-variant);
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
  type: 'normal' as 'normal' | 'large' | 'full-screen',
  positiveButton: '',
  negativeButton: ''
}

const enum EventCode { 'none', 'positive', 'negative', 'mask', 'hash' }

class Builder {
  #dialog: Component
  #title: HTMLDivElement
  #message: HTMLDivElement
  #onPositive?: () => void | false
  #onNegative?: () => void | false
  #view: Node
  #items?: NodeList
  constructor(view?: Node) {
    this.#view = view ?? document.body
    this.#dialog = document.createElement('s-dialog') as Component
    this.#title = document.createElement('div')
    this.#message = document.createElement('div')
    this.#title.slot = 'title'
    this.#message.slot = 'message'
    this.#dialog.appendChild(this.#title)
    this.#dialog.appendChild(this.#message)
    this.#dialog.addEventListener('blur', () => this.#view.removeChild(this.#dialog))
    this.#dialog.addEventListener('dimiss', (event) => {
      switch (event.code) {
        case EventCode.positive:
          if (this.#onPositive?.apply(this) === false) return
          break
        case EventCode.negative:
          if (this.#onNegative?.apply(this) === false) return
          break
      }
    })
  }
  setTitle(value: string) {
    this.#title.textContent = value
    return this
  }
  setMessage(value: string | Node) {
    this.#message.innerHTML = ''
    this.#message.append(value)
    return this
  }
  setItems<T extends { title: string, subtitle?: string, disabled?: boolean }>(
    options: {
      data: T[]
      onItem?: (value: T) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const fragment = document.createDocumentFragment()
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const title = document.createElement('div')
      title.slot = 'title'
      title.textContent = item.title
      label.appendChild(title)
      if (item.disabled !== undefined) label.disabled = item.disabled
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      label.addEventListener('click', () => {
        const out = options.onItem?.(item)
        if (out === false) return
        this.#dialog.dimiss()
      })
      fragment.appendChild(label)
    }
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setMultiChoiceItems<T extends { title: string, subtitle?: string, defaultChecked?: boolean, disabled?: boolean }>(
    options: {
      data: T[],
      onPositive?: (value: T[]) => void | false
      onNegative?: (value: T[]) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const selects: T[] = []
    const fragment = document.createDocumentFragment()
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const checkbox = document.createElement('s-checkbox')
      const title = document.createElement('div')
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          !selects.includes(item) && selects.push(item)
          return
        }
        const index = selects.indexOf(item)
        index !== -1 && selects.splice(index, 1)
      })
      if (item.defaultChecked) {
        checkbox.checked = item.defaultChecked
        selects.push(item)
      }
      checkbox.slot = 'start'
      title.slot = 'title'
      title.textContent = item.title
      label.appendChild(checkbox)
      label.appendChild(title)
      if (item.disabled !== undefined) label.disabled = item.disabled
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      fragment.appendChild(label)
    }
    this.#onPositive = () => options.onPositive?.(selects)
    this.#onNegative = () => options.onNegative?.(selects)
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setSingleChoiceItems<T extends { title: string, subtitle?: string, disabled?: boolean }>(
    options: {
      data: T[],
      select?: number
      onItem?: (value: T) => void | false
      onPositive?: (value: T[]) => void | false
      onNegative?: (value: T[]) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const fragment = document.createDocumentFragment()
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const title = document.createElement('div')
      title.slot = 'title'
      title.textContent = item.title
      label.appendChild(title)
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      label.addEventListener('click', () => {
        const out = options.onItem?.(item)
        if (out === false) return
        this.#dialog.dimiss()
      })
      fragment.appendChild(label)
    }
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setPositiveButton(text: string, listener?: () => void | false) {
    this.#dialog.positiveButton = text
    if (listener) this.#onPositive = listener
    return this
  }
  setNegativeButton(text: string, listener?: () => void | false) {
    this.#dialog.negativeButton = text
    if (listener) this.#onNegative = listener
    return this
  }
  show() {
    this.#view.appendChild(this.#dialog)
    window.getComputedStyle(this.#dialog).top
    this.#dialog.show()
    return this
  }
  dimiss() {
    this.#dialog.dimiss()
    return this
  }
}

// type AlertOptions = {
//   title?: string
//   message?: string
//   positive?: {
//     text: string
//     on?: Function
//   }
//   negative?: {
//     text: string
//     on?: Function | undefined
//   }
// }

const alert = (options: {}) => {
  const dialog = document.createElement('s-dialog')
}

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
  dependencies: [Button, Checkbox, RadioButton, Label],
  setup() {
    const showed = (is = true) => this.refs.container.classList[is ? 'add' : 'remove']('show')
    const dispatch = (type: 'focus' | 'blur') => {
      this.refs.wrapper.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent(type))
      }, { once: true })
    }
    const dispatchShow = () => this.host.dispatchEvent(new Event('show', { cancelable: true }))
    const dispatchDimiss = (code: EventCode) => this.host.dispatchEvent(new DimissEvent('dimiss', code, { cancelable: true }))
    const show = () => {
      if (!this.host.isConnected || !dispatchShow()) return
      dispatch('focus')
      showed()
    }
    const dimiss = (code: EventCode = EventCode.none) => {
      if (!this.host.isConnected || !dispatchDimiss(code)) return
      dispatch('blur')
      showed(false)
    }
    return {
      expose: { show, dimiss: () => dimiss() },
      changed: (name) => {
        switch (name) {
          case 'negativeButton':
            this.refs.negative.textContent = this.props.negativeButton
            break
          case 'positiveButton':
            this.refs.positive.textContent = this.props.positiveButton
            break
        }
      },
      render: () => <>
        <style>{style}</style>
        <slot name="trigger" onClick={show}></slot>
        <div class="container" part="container" ref="container">
          <div class="mask" part="mask" onClick={() => dimiss(EventCode.mask)}></div>
          <div class="wrapper" part="wrapper" ref="wrapper">
            <div class="body" part="body">
              <div class="head">
                <div class="icon">
                  <slot name="icon"></slot>
                </div>
                <div class="title">
                  <slot name="title"></slot>
                </div>
                <div class="action">
                  <s-button theme="text" class="item" onClick={() => dimiss(EventCode.negative)} ref="negative"></s-button>
                  <s-button theme="text" class="item" onClick={() => dimiss(EventCode.positive)} ref="positive"></s-button>
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