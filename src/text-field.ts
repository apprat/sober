import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  min-width: 280px;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  position: relative;
  color: var(--s-color-primary, #006495);
}
.container{
  border-radius: inherit;
  color: var(--s-color-outline, #72787e);
  display: flex;
  align-items: center;
}
.focus{
  color: currentColor;
}
.outline{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: solid 1px currentColor;
  box-sizing: border-box;
  border-radius: inherit;
  pointer-events: none;
  border-top: none;
  transition: box-shadow .2s;
}
.focus .outline{
  box-shadow: 1px 0 currentColor inset, -1px 0 currentColor inset, 0 -1px currentColor inset;
}
.label{
  display: flex;
  align-items: flex-end;
  height: 16px;
  width: 100%;
  position: absolute;
  top: -8px;
  left: 0;
  pointer-events: none;
}
.label::before{
  content: '';
  border-color: currentColor;
  border-width: 1px;
  border-top-style: solid;
  border-left-style: solid;
  height: 8px;
  width: 12px;
  box-sizing: border-box;
  border-top-left-radius: var(--s-shape-corner-extra-small, 4px);
  transition: box-shadow .2s;
  flex-shrink: 0;
}
.focus .label::before{
  border-color: currentColor;
  box-shadow: 0 1px currentColor inset, 1px 0 currentColor inset;
}
.label::after{
  content: '';
  border-color: var(--s-color-outline, #72787e);
  border-width: 1px;
  border-top-style: solid;
  border-right-style: solid;
  height: 8px;
  flex-grow: 1;
  box-sizing: border-box;
  border-top-right-radius: var(--s-shape-corner-extra-small, 4px);
  transition: box-shadow .2s;
}
.focus .label::after{
  border-color: currentColor;
  box-shadow: -1px 0 currentColor inset, 0 1px currentColor inset;
}
.label>span{
  padding: 0 4px;
  transform-origin: left;
  transition: font-size .2s, color .2s, transform .2s;
  left: 12px;
  font-size: 1rem;
  transform: translateY(31px);
  position: absolute;
}
.not-empty .label>span,
.focus .label>span{
  transform: translateY(0);
  font-size: .75rem;
  position: static;
}
.label>span:empty{
  padding: 0;
}
.content{
  position: relative;
  flex-grow: 1;
}
::slotted(input[type=text]),
::slotted(textarea),
.textarea{
  border: none;
  padding: 0 16px;
  min-height: 56px;
  width: 100%;
  flex-grow: 1;
  background: none;
  outline: none;
  font-size: inherit;
  color: var(--s-color-on-surface, #1a1c1e);
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
  display: block;
}
::slotted(textarea){
  height: 0;
}
::slotted(textarea),
.textarea{
  padding: 16px;
  scrollbar-width: none;
  resize: none;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
.textarea{
  position: absolute;
  left: 0;
  top: 0;
  height: auto;
  pointer-events: none;
  visibility: hidden;
}
.textarea::after{
  content: ' ';
}
::slotted(input[type=text])::placeholder,
::slotted(textarea)::placeholder{
  color: var(--s-color-outline, #72787e);
}
::slotted([slot=end]){
  flex-shrink: 0;
}
::slotted(s-icon[slot=end]){
  margin: 0 12px 0 -8px;
}
::slotted(s-icon-button[slot=end]){
  margin: 0 4px 0 -12px;
}
.focus ::slotted([slot=end]){
  color: currentColor;
}
`

const name = 's-text-field'
const props = {
  label: ''
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let container: HTMLDivElement
    let label: HTMLSpanElement
    let inputSlot: HTMLSlotElement
    let input: HTMLInputElement | HTMLTextAreaElement
    let inputShaodw: HTMLDivElement
    const events = {
      focus: () => container.classList.add('focus'),
      blur: () => container.classList.remove('focus'),
      input: () => {
        input.value === '' ? container.classList.remove('not-empty') : container.classList.add('not-empty')
        if (input instanceof HTMLTextAreaElement) {
          inputShaodw.textContent = input.value
          if (input.offsetHeight !== inputShaodw.offsetHeight) input.style.height = `${inputShaodw.offsetHeight}px`
        }
      }
    }
    const on = (event: Event) => {
      if (!input || input.parentNode !== this) return
      events[event.type]()
    }
    const bindEvent = (el: HTMLInputElement | HTMLTextAreaElement) => {
      el.addEventListener('focus', on)
      el.addEventListener('blur', on)
      el.addEventListener('input', on)
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')
      if (descriptor) {
        const oldSet = descriptor.set
        descriptor.set = (val: string) => {
          oldSet?.apply(el, [val])
          events.input()
        }
        Object.defineProperty(el, 'value', descriptor)
      }
      input = el
      events.input()
    }
    const inputSlotChange = () => {
      const el = inputSlot.assignedElements()[0]
      if (!el || (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement))) return
      bindEvent(el)
    }
    return {
      watches: {
        label: (value) => label.textContent = value
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <div class="outline"></div>
          <div class="label">
            <span ref="${(el: HTMLSpanElement) => label = el}"></span>
          </div>
          <div class="content">
            <slot style="min-height: inherit;" @slotchange="${inputSlotChange}" ref="${(el: HTMLSlotElement) => inputSlot = el}"></slot>
            <div ref="${(el: HTMLDivElement) => inputShaodw = el}" class="textarea"></div>
          </div>
          <slot name="end"></slot>
        </div>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}