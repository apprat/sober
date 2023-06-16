import { defineElement, IntrinsicElement, css } from './base/core'
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
.wrapper{
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  filter: opacity(0);
  transition: filter .2s,transform .2s;
  transform: scale(.9);
}
.show .body{
  filter: opacity(1);
  transform: scale(1);
}
.title{
  display: flex;
  font-size: 1.5rem;
  color: var(--s-color-on-surface);
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
::slotted([slot=title]){
  margin: 24px 24px 16px 24px;
}
::slotted([slot=message]){
  margin: 16px 24px;
  line-height: 1.6;
}
::slotted(s-label){
  padding: 0 16px;
}
`

const name = 's-dialog'
const props = {
  type: 'basic' as 'basic' | 'full-screen',
  align: 'center' as 'center' | 'top' | 'buttom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  positive: '',
  negative: ''
}

type Dialog = InstanceType<typeof component.Element>

type AlertOptions = {
  title?: string
  message?: string
  positive?: {
    text: string
    on?: Function
  }
  negative?: {
    text: string
    on?: Function
  }
}

const alert = (options: AlertOptions) => {
  const dialog = document.createElement('s-dialog') as Dialog
}

type DialogItem = { title: string, subtitle?: string }

class Builder {
  #dialog: Dialog
  #title: HTMLDivElement
  #message: HTMLDivElement
  constructor() {
    this.#dialog = document.createElement('s-dialog') as Dialog
    this.#title = document.createElement('div')
    this.#message = document.createElement('div')
  }
  setTitle(value: string) {
    this.#title.textContent = value
  }
  setMessage(value: string | Element) {
    this.#message.innerHTML = ''
    this.#message.append(value)
  }
  setItems(values: DialogItem[], on?: (value: DialogItem) => void) {

  }
  setMultiChoiceItems(values: DialogItem[], on?: (value: DialogItem[]) => void) {

  }
  setSingleChoiceItems(values: DialogItem[], on?: (value: DialogItem) => void) {

  }
  setView(element: Element) {

  }
  setPositiveButton(text: string, on?: Function) {

  }
  setNegativeButton(text: string, on?: Function) {

  }
  show() {

  }
  dimiss() {

  }
}

const component = defineElement({
  name, props,
  prototypes: { alert, builder: () => new Builder() },
  dependencies: [Button, Checkbox, RadioButton, Label],
  setup() {
    const show = () => this.refs.wrapper.classList.add('show')
    const dimiss = () => this.refs.wrapper.classList.remove('show')
    const onShow = () => {
      if (!this.host.dispatchEvent(new Event('open', { cancelable: true }))) return
      show()
    }
    const onDimiss = (type = 0) => {
      if (!this.host.dispatchEvent(new CloseEvent('close', { code: type, cancelable: true }))) return
      dimiss()
    }
    return {
      expose: { show, dimiss },
      changed: (name) => {
        switch (name) {
          case 'negative':
            this.refs.negative.textContent = this.props.negative
            break
          case 'positive':
            this.refs.positive.textContent = this.props.positive
            break
        }
      },
      render: () => <>
        <style>{style}</style>
        <slot name="trigger" onClick={onShow}></slot>
        <div class="wrapper" ref="wrapper" part="wrapper">
          <div class="mask" onClick={onDimiss}></div>
          <div class="body" part="body">
            <div class="icon">
              <slot name="icon"></slot>
            </div>
            <div class="title">
              <slot name="title"></slot>
            </div>
            <div class="content">
              <slot name="message"></slot>
              <slot></slot>
            </div>
            <div class="action">
              <s-button theme="text" class="item" onClick={() => onDimiss(2)} ref="negative"></s-button>
              <s-button theme="text" class="item" onClick={() => onDimiss(1)} ref="positive"></s-button>
            </div>
          </div>
        </div>
      </>
    }
  }
})

export default component

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}

const builder = new Builder()
builder.setTitle('Title')
builder.setMessage('Message')
builder.setPositiveButton('确定', () => console.log('Yes'))
builder.show()