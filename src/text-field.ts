import { useElement, JSXAttributes } from './core/element.js'

const name = 's-text-field'
const props = {
  label: '',
  disabled: false
}


const style = /*css*/`
:host{
  display: inline-grid;
  vertical-align: middle;
  color: var(--s-color-primary, #5256a9);
  font-size: .875rem;
  min-width: 280px;
  min-height: 48px;
  --border-radius: 4px;
  --border-color: var(--s-color-outline, #777680);
  --border-width: 1px;
  --padding: 16px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}
.start,
.end{
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  min-width: var(--border-radius);
  flex-shrink: 0;
}
.start::before,
.end::before,
.start::after,
.end::after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius);
  border: solid var(--border-width) var(--border-color);
  pointer-events: none;
  box-sizing: border-box;
}
.start::before,
.start::after{
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.end::before,
.end::after{
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.start::after,
.end::after{
  border-width: calc(var(--border-width) * 2);
  border-color: currentColor;
  opacity: 0;
  transition: opacity .12s;
}
:host(:focus-within) .start::after,
:host(:focus-within) .end::after{
  opacity: 1;
}
.text{
  display: flex;
  height: 100%;
  flex-grow: 1;
  position: relative;
  margin: 0 calc(var(--border-radius) * -1);
}
.text::before,
.text::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--border-radius);
  width: calc(100%  - (var(--border-radius)*2));
  border-bottom: solid var(--border-width) var(--border-color);
}
.text::after{
  border-bottom-width: calc(var(--border-width) * 2);
  border-bottom-color: currentColor;
  opacity: 0;
  transition: opacity .12s;
}
:host(:focus-within) .text::after{
  opacity: 1;
}
.top{
  position: absolute;
  pointer-events: none;
  left: var(--border-radius);
  top: 0;
  height: 100%;
  width: calc(100%  - (var(--border-radius) * 2));
  display: flex;
}
.outline{
  position: relative;
}
.outline.left{
  width: calc(var(--padding) - var(--border-radius));
}
.outline.right{
  flex-grow: 1;
}
.outline::before,
.outline::after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-top: solid var(--border-width) var(--border-color);
}
.outline::after{
  border-top-width: calc(var(--border-width) * 2);
  border-top-color: currentColor;
  opacity: 0;
  transition: opacity .12s;
}
:host(:focus-within) .outline::after{
  opacity: 1;
}
.label{
  color: var(--border-color);
  height: 100%;
  display: flex;
  white-space: nowrap;
  width: 0;
  align-items: center;
  transform: translateX(min(calc(var(--padding) - var(--border-radius)), 0px));
  transition: transform .12s;
}
.empty .label,
:host(:focus-within) .label{
  width: auto;
  transform: translateY(-50%) scale(.8571428571428571);
}
.multi .label{
  height: fit-content;
  padding: var(--padding) 0;
}
:host(:focus-within) .label{
  color: currentColor;
}
::slotted(input),
::slotted(textarea),
.shadow{
  border: none;
  height: 100%;
  width: 100%;
  padding: 0 var(--padding);
  background: none;
  outline: none;
  font-size: inherit;
  color: var(--s-color-on-surface, #1c1b1f);
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
  display: block;
}
::slotted(input)::placeholder,
::slotted(textarea)::placeholder{
  color: var(--s-color-outline, #777680);
}
::slotted(textarea),
.shadow{
  resize: none;
  scrollbar-width: none;
  line-height: 16px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  min-height: 100%;
  height: 0;
  padding: var(--padding);
}
.shadow{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  min-height: auto;
  visibility: hidden;
  pointer-events: none;
}
.shadow::after{
  content: ' ';
}
.input .shadow{
  display: none;
}
::slotted(s-icon-button[slot=start]){
  margin-left: 4px;
  margin-right: calc(var(--border-radius) - var(--padding) + 4px);
}
::slotted(s-icon-button[slot=end]){
  margin-right: 4px;
  margin-left: calc(var(--border-radius) - var(--padding) + 4px);
}
::slotted(s-icon[slot=start]){
  margin-left: 12px;
  margin-right: calc(var(--border-radius) - var(--padding) + 12px);
}
::slotted(s-icon[slot=end]){
  margin-right: 12px;
  margin-left: calc(var(--border-radius) - var(--padding) + 12px);
}
`

const template = /*html*/`
<div class="container" part="container">
  <div class="start">
    <slot name="start"></slot>
  </div>
  <div class="text">
    <div class="top">
      <div class="outline left"></div>
      <div class="label" part="label"></div>
      <div class="outline right"></div>
    </div>
    <slot class="input"></slot>
    <div class="shadow"></div>
  </div>
  <div class="end">
    <slot name="end"></slot>
  </div>
</div>
`

export class TextField extends useElement({
  style, template, props, syncProps: ['disabled'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const label = shadowRoot.querySelector('.label') as HTMLSpanElement
    const inputSlot = shadowRoot.querySelector('.input') as HTMLSlotElement
    const inputShaodw = shadowRoot.querySelector('.shadow') as HTMLDivElement
    let input: HTMLInputElement | HTMLTextAreaElement | null = null
    const onInput = () => {
      if (!input) return
      input.value === '' ? container.classList.remove('empty') : container.classList.add('empty')
      if (input instanceof HTMLTextAreaElement) {
        inputShaodw.textContent = input.value
        if (input.offsetHeight !== inputShaodw.offsetHeight) input.style.height = `${inputShaodw.offsetHeight}px`
      }
    }
    inputSlot.addEventListener('slotchange', () => {
      input = inputSlot.assignedElements()[0] as any
      if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLTextAreaElement)) {
        inputShaodw.textContent = ''
        container.classList.remove('multi', 'empty')
        input = null
        return
      }
      input instanceof HTMLTextAreaElement ? container.classList.add('multi') : container.classList.remove('multi')
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')
      if (descriptor) {
        const oldSet = descriptor.set
        descriptor.set = (val: string) => {
          oldSet?.apply(input, [val])
          if (!input || input.parentNode !== this) return
          onInput()
        }
        Object.defineProperty(input, 'value', descriptor)
      }
      onInput()
      input.addEventListener('input', onInput)
    })
    return {
      watches: {
        label: (value) => label.textContent = value
      }
    }
  }
}) { }

TextField.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: TextField
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}