import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Field } from './field.js'

type Props = {
  label: string
  placeholder: string
  disabled: boolean
  type: 'text' | 'number' | 'password'
  error: boolean
  value: string
  maxLength: number
  readOnly: boolean
  multiLine: boolean
  countered: boolean
}

const name = 's-text-field'
const props: Props = {
  label: '',
  placeholder: '',
  disabled: false,
  type: 'text',
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
  min-height: 48px;
  width: 280px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  --text-field-border-radius: 4px;
  --text-field-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --text-field-padding: 16px;
  --text-field-padding-top: var(--text-field-padding);
  --text-field-padding-bottom: var(--text-field-padding);
  --text-field-padding-left: var(--text-field-padding);
  --text-field-padding-right: var(--text-field-padding);
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
:host([multiline=true]){
  line-height: 1.6;
  --text-field-padding-top: 12px;
  --text-field-padding-bottom: 12px;
}
.field{
  display: block;
  min-height: inherit;
  font-size: inherit;
  --field-border-radius: var(--text-field-border-radius);
  --field-border-color: var(--text-field-border-color);
  --field-padding: var(--text-field-padding);
  --field-padding-top: var(--text-field-padding-top);
  --field-padding-bottom: var(--text-field-padding-bottom);
  --field-padding-left: var(--text-field-padding-left);
  --field-padding-right: var(--text-field-padding-right);
}
:host([error=true]) .field{
  --s-color-primary: var(--s-color-error, ${Theme.colorError});
  --field-border-color: var(--s-color-error, ${Theme.colorError});
  --field-border-width: 2px;
}
:host([multiline=true]) .label{
  height: fit-content;
  box-sizing: border-box;
  padding-top: var(--text-field-padding-top);
  padding-bottom: var(--text-field-padding-bottom);
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
  padding-left: var(--field-padding-left);
  padding-right: var(--field-padding-right);
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
  padding-top: var(--text-field-padding-top);
  padding-bottom: var(--text-field-padding-bottom);
  padding-left: var(--text-field-padding-left);
  padding-right: var(--text-field-padding-right);
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
input::-ms-clear,
input::-ms-reveal{
  display: none;
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
  margin-top: 8px;
}
::slotted(svg){
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  height: 24px;
  width: 24px;
}
::slotted(s-icon-button[slot=start]){
  margin-left: 4px;
  margin-right: calc(var(--text-field-border-radius) - var(--text-field-padding-left) + 4px);
}
::slotted(s-icon-button[slot=end]){
  margin-right: 4px;
  margin-left: calc(var(--text-field-border-radius) - var(--text-field-padding-right) + 4px);
}
::slotted(:is(s-icon[slot=start], svg[slot=start])){
  margin-left: 12px;
  margin-right: calc(var(--text-field-border-radius) - var(--text-field-padding-left) + 8px);
}
::slotted(:is(s-icon[slot=end], svg[slot=end])){
  margin-right: 12px;
  margin-left: calc(var(--text-field-border-radius) - var(--text-field-padding-right) + 8px);
}
`

const template = /*html*/`
<s-field class="field" fixed="false">
  <div slot="label" class="label"></div>
  <div class="view">
    <div class="shadow"></div>
    <input type="text" part="input">
    <textarea part="textarea"></textarea>
  </div>
  <slot slot="start" name="start"></slot>
  <slot slot="end" name="end"></slot>
</s-field>
<div class="text" part="text">
  <slot name="text"></slot>
  <div class="counter" part="counter"></div>
</div>
`

class TextField extends useElement({
  style, template, props, syncProps: ['disabled', 'error', 'multiLine', 'countered'],
  setup(shadowRoot) {
    const field = shadowRoot.querySelector<Field>('.field')!
    const label = shadowRoot.querySelector<HTMLDivElement>('.label')!
    const textAreaShadow = shadowRoot.querySelector<HTMLDivElement>('.shadow')!
    const counter = shadowRoot.querySelector<HTMLDivElement>('.counter')!
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
      field.fixed = true
      field.focused = true
    }
    const onBlur = () => {
      field.focused = false
      if (getInput().value === '' && !this.error) field.fixed = false
    }
    inputs.input.oninput = onCounter
    inputs.input.onfocus = onFocus
    inputs.input.onblur = onBlur
    inputs.input.onchange = onChange
    inputs.textarea.onfocus = onFocus
    inputs.textarea.onblur = onBlur
    inputs.textarea.onchange = onChange
    inputs.textarea.oninput = () => {
      textAreaShadow.textContent = inputs.textarea.value
      onCounter()
    }
    return {
      expose: {
        get native() {
          return getInput()
        }
      },
      label: (value) => label.textContent = value,
      type: (value) => inputs.input.type = value,
      error: (value) => {
        if (value) {
          field.fixed = true
          return
        }
        if (getInput().value === '') field.fixed = false
      },
      value: {
        get: () => getInput().value,
        set: (value) => {
          inputs.input.value = value
          inputs.textarea.value = value
          textAreaShadow.textContent = value
          onCounter()
          if (!this.error) field.fixed = value !== ''
        }
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
}) { }

TextField.define(name)

export { TextField }

declare global {
  interface HTMLElementTagNameMap {
    [name]: TextField
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
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
      $props: HTMLAttributes & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}