import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './core/enum.js'
import { Field } from './field.js'

const name = 's-text-field'
const props = {
  label: '',
  disabled: false,
  error: false,
}


const style = /*css*/`
:host{
  display: inline-grid;
  vertical-align: middle;
  font-size: .875rem;
  line-height: 16px;
  min-width: 280px;
  min-height: var(--text-field-height);
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  --text-field-border-radius: 4px;
  --text-field-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --text-field-padding: 16px;
  --text-field-height: 48px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.container{
  display: block;
  height: 100%;
  font-size: inherit;
  --field-border-radius: var(--text-field-border-radius);
  --field-border-color: var(--text-field-border-color);
  --field-padding: var(--text-field-padding);
}
:host([error=true]) .container{
  --s-color-primary: var(--s-color-error, ${Theme.colorError});
  --field-border-color: var(--s-color-error, ${Theme.colorError});
  --field-border-width: 2px;
}
.label{
  height: var(--text-field-height);
}
.multi .label{
  height: calc(var(--text-field-padding) * 2 + 1em);
}
.view{
  flex-grow: 1;
  padding: 0;
  flex-direction: column;
}
::slotted(input),
::slotted(textarea){
  border: none;
  height: 100%;
  width: 100%;
  padding: 0 var(--text-field-padding);
  background: none;
  outline: none;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
  display: block;
}
::slotted(textarea){
  resize: none;
  scrollbar-width: none;
  line-height: inherit;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  min-height: 100%;
  padding: var(--text-field-padding);
  height: 0;
}
::slotted(input)::placeholder,
::slotted(textarea)::placeholder{
  color: var(--text-field-border-color);
}
.shadow{
  width: 100%;
  height: 0;
  pointer-events: none;
  display: none;
  position: relative;
}
.multi .shadow{
  display: block;
}
.shadow>span{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: block;
  box-sizing: border-box;
  line-height: inherit;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  padding: var(--text-field-padding);
  height: auto;
  visibility: hidden;
  pointer-events: none;
}
.shadow>span::after{
  content: ' ';
}
::slotted(svg){
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  height: 24px;
  width: 24px;
}
::slotted(s-icon-button[slot=start]){
  margin-left: 4px;
  margin-right: calc(var(--text-field-border-radius) - var(--text-field-padding) + 4px);
}
::slotted(s-icon-button[slot=end]){
  margin-right: 4px;
  margin-left: calc(var(--text-field-border-radius) - var(--text-field-padding) + 4px);
}
::slotted(s-icon[slot=start]),
::slotted(svg[slot=start]){
  margin-left: 12px;
  margin-right: calc(var(--text-field-border-radius) - var(--text-field-padding) + 8px);
}
::slotted(s-icon[slot=end]),
::slotted(svg[slot=end]){
  margin-right: 12px;
  margin-left: calc(var(--text-field-border-radius) - var(--text-field-padding) + 8px);
}
`

const template = /*html*/`
<s-field class="container" labelFixed="false">
  <div slot="label" class="label"></div>
  <div slot="view" class="view">
    <div class="shadow">
      <span></span>
    </div>
    <slot id="inputSlot"></slot>
  </div>
  <slot slot="start" name="start"></slot>
  <slot slot="end" name="end"></slot>
</s-field>
`

export class TextField extends useElement({
  style, template, props, syncProps: ['disabled', 'error'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as Field
    const label = shadowRoot.querySelector('.label') as HTMLDivElement
    const inputSlot = shadowRoot.querySelector('#inputSlot') as HTMLSlotElement
    const inputShaodw = shadowRoot.querySelector('.shadow>span') as HTMLDivElement
    let input: HTMLInputElement | HTMLTextAreaElement
    let oldDescriptorSet: ((v: any) => void) | undefined = undefined
    const onInput = () => {
      if (input.value !== '') container.labelFixed = true
      if (input instanceof HTMLTextAreaElement) {
        inputShaodw.textContent = input.value
        if (input.offsetHeight !== inputShaodw.offsetHeight) input.style.height = `${inputShaodw.offsetHeight}px`
      }
    }
    const obs = new MutationObserver(onInput)
    const onFocus = () => {
      container.labelFixed = true
      container.focused = true
    }
    const onBlur = () => {
      if (input.value === '') container.labelFixed = false
      container.focused = false
    }
    const addEvent = () => {
      input.addEventListener('input', onInput)
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', onBlur)
      obs.observe(input, { attributeFilter: ['value'] })
    }
    const removeEvent = () => {
      if (!input) return
      input.removeEventListener('input', onInput)
      input.removeEventListener('focus', onFocus)
      input.removeEventListener('blur', onBlur)
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')
      if (descriptor && oldDescriptorSet) descriptor.set = oldDescriptorSet
      input = undefined as never
      inputShaodw.textContent = ''
    }
    inputSlot.addEventListener('slotchange', () => {
      const [element] = inputSlot.assignedElements()
      if (!element || (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement))) return removeEvent()
      element instanceof HTMLTextAreaElement ? container.classList.add('multi') : container.classList.remove('multi')
      input = element
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')
      if (descriptor) {
        oldDescriptorSet = descriptor.set
        descriptor.set = (val: string) => {
          oldDescriptorSet?.apply(input, [val])
          onInput()
        }
        Object.defineProperty(input, 'value', descriptor)
      }
      onInput()
      addEvent()
    })
    return {
      props: {
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