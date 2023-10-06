import { defineComponent } from './core/runtime'
import './layer'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-block;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.show{
  pointer-events: auto;
}
.scrim{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--s-color-scrim);
  cursor: pointer;
  filter: opacity(0);
  transition: filter .2s;
}
.show .scrim{
  filter: opacity(.5);
}
.wrapper-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: filter .2s,transform .2s;
  pointer-events: none;
  filter: opacity(0);
  transform: scale(.8);
}
.show .wrapper-container{
  filter: opacity(1);
  transform: scale(1);
}
.container{
  background: var(--s-color-surface-container-high);
  width: calc(100% - 48px);
  max-width: 560px;
  min-width: 280px;
  max-height: calc(100% - 48px);
  border-radius: 28px;
  box-shadow: var(--s-elevation-level3);
  display: flex;
  flex-direction: column;
}
.show .container{
  pointer-events: auto;
}
.header{
  display: contents;
}
::slotted([slot=icon]){
  margin: 24px;
  color: var(--s-color-secondary);
  flex-shrink: 0;
}
.icon ::slotted([slot=icon]){
  align-self: center;
  margin: 24px 24px -8px 24px;
}
::slotted([slot=headline]){
  font-size: 1.5rem;
  color: var(--s-color-on-surface);
  line-height: 1.3;
  font-weight: 400;
  padding: 24px;
}
.icon ::slotted([slot=headline]){
  text-align: center;
}
.action{
  display: flex;
  justify-content: flex-end;
  margin: 0 24px;
  flex-shrink: 0;
  order: 2;
}
.text-button{
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 20px;
  font-weight: 500;
  text-transform: capitalize;
  font-size: .875rem;
  line-height: 1;
  white-space: nowrap;
  color: var(--s-color-primary);
  min-width: 72px;
  margin: 24px 0;
}
.text-button:empty{
  display: none;
}
::slotted(p:not([slot])){
  user-select: text;
  margin: -8px 24px;
  line-height: 1.5;
  font-size: .875rem;
  font-weight: 400;
  color: var(--s-color-on-surface-variant);
}
::slotted(s-label){
  padding: 0 16px;
}
:host([size=full-screen]) .container{
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 0;
}
:host([size=full-screen]) ::slotted([slot=icon]){
  margin: 0 0 0 24px;
}
:host([size=full-screen]) ::slotted([slot=headline]){
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 24px;
  text-align: left;
}
:host([size=full-screen]) .header{
  max-height: 56px;
  display: flex;
  align-items: center;
}
:host([size=full-screen]) ::slotted(p:not([slot])){
  margin: 0;
  padding: 24px;
  border-top: solid 1px var(--s-color-outline-variant);
}
:host([size=full-screen]) .action{
  margin: 0 8px 0 0;
  order: 0;
}
:host([size=full-screen]) .text-button{
  margin: 8px 0;
}
`

const name = 's-dialog'
const props = {
  size: 'basic' as 'basic' | 'full-screen',
  positive: '',
  negative: ''
}

export const enum EventCode {
  SCRIM,
  POSITIVE_BUTTON,
  NEGATIVE_BUTTON
}

const alert = (options: {
  view?: Node
  headline: string
  text?: string | Node | ((container: HTMLElement) => void)
  negative?: string
  positive?: string
  size?: typeof props.size
  onNegative?: () => boolean | undefined
  onPositive?: () => boolean | undefined
}) => {
  const view = options.view ?? document.body
  const dialog = document.createElement('s-dialog') as Self
  dialog.negative = options.negative
  dialog.positive = options.positive
  dialog.size = options.size
  switch (typeof options.text) {
    case 'undefined':
      break
    case 'function':
      options.text(dialog)
      break
    case 'string':
      const p = document.createElement('p')
      p.textContent = options.text
      dialog.appendChild(p)
      break
    default:
      dialog.append(options.text)
  }
  dialog.addEventListener('dimiss', (event) => {
    if (event.detail.code === EventCode.NEGATIVE_BUTTON) {
      const stoped = options.onNegative?.()
      if (stoped === false) event.preventDefault()
    }
    if (event.detail.code === EventCode.POSITIVE_BUTTON) {
      const stoped = options.onPositive?.()
      if (stoped === false) event.preventDefault()
    }
  })
  view.appendChild(dialog)
  window.getComputedStyle(dialog).top
  dialog.show()
}

const Component = defineComponent({
  name, props, propSyncs: ['size'],
  statics: { alert },
  setup() {
    const show = () => this.refs.wrapper.classList.add('show')
    const dimiss = () => this.refs.wrapper.classList.remove('show')
    const onShow = () => {
      this.host.dispatchEvent(new Event('show'))
      show()
    }
    const onDimiss = (code: EventCode) => {
      if (!this.host.dispatchEvent(new CustomEvent('dimiss', { detail: { code }, cancelable: true }))) return
      dimiss()
    }
    const onIconSlotChange = () => {
      const icon = this.refs.icon as HTMLSlotElement
      icon.assignedElements().length > 0 ? this.refs.wrapper.classList.add('icon') : this.refs.wrapper.classList.remove('icon')
    }
    return {
      expose: { show, dimiss },
      watches: {
        negative: () => this.refs.negative.textContent = this.props.negative,
        positive: () => this.refs.positive.textContent = this.props.positive
      },
      render: () => <>
        <style>{style}</style>
        <slot name="trigger" onClick={onShow}></slot>
        <div class="wrapper" ref="wrapper">
          <div class="scrim" onClick={() => onDimiss(EventCode.SCRIM)}></div>
          <div class="wrapper-container">
            <div class="container">
              <div class="header">
                <slot name="icon" ref="icon" onSlotChange={onIconSlotChange}></slot>
                <slot name="headline"></slot>
                <div class="action">
                  <s-layer class="text-button" ref="negative" onClick={() => onDimiss(EventCode.NEGATIVE_BUTTON)}></s-layer>
                  <s-layer class="text-button" ref="positive" onClick={() => onDimiss(EventCode.POSITIVE_BUTTON)}></s-layer>
                </div>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </>
    }
  }
})

export default class Self extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface GlobalEventHandlersEventMap {
    dimiss: CustomEvent<{ code: EventCode }>
    show: Event
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}