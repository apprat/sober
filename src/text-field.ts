import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import { Field } from './field.js'

const name = 's-text-field'
const props = {
  label: '',
  placeholder: '',
  disabled: false,
  type: 'text' as 'text' | 'number' | 'password',
  error: false,
  value: '',
  maxLength: -1,
  readOnly: false,
  multiLine: false,
  countered: false
}

const style = /*css*/`
:host{
  display: inline-grid;
  vertical-align: middle;
  font-size: .875rem;
  flex-shrink: 0;
  line-height: 1.6;
  min-height: 48px;
  width: 280px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  --text-field-border-radius: 4px;
  --text-field-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --text-field-padding: 16px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
:host([multiline=true]){
  height: auto;
  min-height: 96px;
  --text-field-padding: 12px;
}
.field{
  display: block;
  height: 100%;
  font-size: inherit;
  --field-border-radius: var(--text-field-border-radius);
  --field-border-color: var(--text-field-border-color);
  --field-padding: var(--text-field-padding);
}
:host([error=true]) .field{
  --s-color-primary: var(--s-color-error, ${Theme.colorError});
  --field-border-color: var(--s-color-error, ${Theme.colorError});
  --field-border-width: 2px;
}
.label{
  height: 100%;
}
:host([multiline=true]) .label{
  height: fit-content;
  box-sizing: border-box;
  padding: var(--text-field-padding) 0;
  max-height: 100%;
}
.view{
  flex-grow: 1;
  padding: 0;
  flex-direction: column;
  position: relative;
}
input,
textarea{
  border: none;
  height: 100%;
  width: 100%;
  padding: 0 var(--text-field-padding);
  background: none;
  outline: none;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  line-height: inherit;
  font-family: inherit;
  caret-color: var(--s-color-primary, ${Theme.colorPrimary});
  display: block;
  -moz-appearance: textfield;
}
textarea{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  resize: none;
  scrollbar-width: none;
  display: none;
}
input::placeholder,
textarea::placeholder{
  color: var(--text-field-border-color);
}
input::selection,
textarea::selection{
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
:host([multiline=true]) input,
.text>.counter{
  display: none;
}
textarea,
.shadow{
  line-height: inherit;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  box-sizing: border-box;
  padding: var(--text-field-padding);
}
:host([multiline=true]) textarea,
:host([multiline=true]) .shadow,
:host([countered=true]) .counter{
  display: block;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
.shadow{
  pointer-events: none;
  display: none;
  opacity: 0;
  width: 100%;
  min-height: 100%;
}
.shadow::after{
  content: ' ';
}
.text{
  display: flex;
  align-items: flex-end;
  width: 100%;
  box-sizing: border-box;
  padding: 0 var(--text-field-padding);
  font-size: .75rem;
  color: var(--text-field-border-color);
}
:host([error=true]) .text{
  color: var(--s-color-error, ${Theme.colorError});
}
.text>slot[name=text]{
  display: block;
  flex-grow: 1;
}
.text>.counter,
::slotted([slot=text]){
  margin-top: 4px;
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
<s-field class="field" labelFixed="false">
  <div slot="label" class="label"></div>
  <div slot="view" class="view">
    <div class="shadow"></div>
    <input type="text">
    <textarea></textarea>
  </div>
  <slot slot="start" name="start"></slot>
  <slot slot="end" name="end"></slot>
</s-field>
<div class="text">
  <slot name="text"></slot>
  <div class="counter"></div>
</div>
`

export class TextField extends useElement({
  style, template, props, syncProps: ['disabled', 'error', 'multiLine', 'countered'],
  setup(shadowRoot) {
    const field = shadowRoot.querySelector('.field') as Field
    const label = shadowRoot.querySelector('.label') as HTMLDivElement
    const textAreaShadow = shadowRoot.querySelector('.shadow')!
    const counter = shadowRoot.querySelector('.counter')!
    const inputs = {
      input: shadowRoot.querySelector('input')!,
      textarea: shadowRoot.querySelector('textarea')!
    }
    const getInput = () => this.multiLine ? inputs.textarea : inputs.input
    const onCounter = () => {
      if (!this.countered) return
      counter.textContent = `${getInput().value.length}/${this.maxLength}`
    }
    const onChange = () => this.dispatchEvent(new Event('change'))
    const onFocus = () => {
      field.labelFixed = true
      field.focused = true
    }
    const onBlur = () => {
      field.focused = false
      if (getInput().value === '' && !this.error) field.labelFixed = false
    }
    inputs.input.addEventListener('input', onCounter)
    inputs.input.addEventListener('focus', onFocus)
    inputs.input.addEventListener('blur', onBlur)
    inputs.input.addEventListener('change', onChange)
    inputs.textarea.addEventListener('focus', onFocus)
    inputs.textarea.addEventListener('blur', onBlur)
    inputs.textarea.addEventListener('change', onChange)
    inputs.textarea.addEventListener('input', () => {
      textAreaShadow.textContent = inputs.textarea.value
      onCounter()
    })
    return {
      expose: {
        get native() {
          return getInput()
        },
        get value() {
          return getInput().value
        }
      },
      props: {
        label: (value) => label.textContent = value,
        type: (value) => inputs.input.type = value,
        error: (value) => {
          if (value) {
            field.labelFixed = true
            return
          }
          if (getInput().value === '') field.labelFixed = false
        },
        value: (value) => {
          inputs.input.value = value
          inputs.textarea.value = value
          textAreaShadow.textContent = value
          onCounter()
          if (!this.error) field.labelFixed = value !== ''
        },
        placeholder: (value) => {
          inputs.input.placeholder = value
          inputs.textarea.placeholder = value
        },
        readOnly: (value) => {
          inputs.input.readOnly = value
          inputs.textarea.readOnly = value
        },
        maxLength: (value) => {
          inputs.input.maxLength = value
          inputs.textarea.maxLength = value
          onCounter()
        },
        multiLine: (value) => {
          if (value) {
            inputs.textarea.value = inputs.input.value
            textAreaShadow.textContent = inputs.input.value
            return
          }
          inputs.input.value = inputs.textarea.value
        },
        countered: onCounter
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