import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Field } from './field.js'

type Props = {
  label: string
  placeholder: string
  disabled: boolean
  type: 'text' | 'number' | 'password' | 'multiline'
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
:host([type=multiline]){
  line-height: 24px;
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
:host([type=multiline]) .label{
  height: fit-content;
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
:host([type=multiline]) input,
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
:host([type=multiline]) :is(textarea, .shadow),
:host([countered=true]) .counter{
  display: block;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
input:is(::-ms-clear, ::-ms-reveal){
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
.toggle{
  flex-direction: column;
}
.toggle,
.toggle>s-ripple{
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle>s-ripple{
  display: none;
}
.toggle>.up,
.toggle>.down{
  height: 16px;
  width: 24px;
  border-radius: 4px;
  margin-right: 8px;
  margin-left: -4px;
}
.toggle>.visibility{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 4px 0 -4px;
}
.toggle>.visibility>svg{
  display: none;
}
:host([type=number]) .toggle>:is(.up, .down),
:host([type=password]) :is(.toggle>.visibility, .toggle:not(.show-password)>.visibility>.on, .toggle.show-password>.visibility>.off){
  display: flex;
}
svg,
::slotted(svg){
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  height: 24px;
  width: 24px;
  flex-shrink: 0;
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
  <slot slot="end" name="end">
    <div class="toggle" part="toggle">
      <s-ripple class="up">
        <svg viewBox="0 -960 960 960">
          <path d="m280-400 200-200 200 200H280Z"></path>
        </svg>
      </s-ripple>
      <s-ripple class="down">
        <svg viewBox="0 -960 960 960">
          <path d="M480-360 280-560h400L480-360Z"></path>
        </svg>
      </s-ripple>
      <s-ripple class="visibility">
        <svg viewBox="0 -960 960 960" class="on">
          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"></path>
        </svg>
        <svg viewBox="0 -960 960 960" class="off">
          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"></path>
        </svg>
      </s-ripple>
    </div>
  </slot>
</s-field>
<div class="text" part="text">
  <slot name="text"></slot>
  <div class="counter" part="counter"></div>
</div>
`

class TextField extends useElement({
  style, template, props, syncProps: ['type', 'disabled', 'error', 'multiLine', 'countered'],
  setup(shadowRoot) {
    const field = shadowRoot.querySelector<Field>('.field')!
    const label = shadowRoot.querySelector<HTMLDivElement>('.label')!
    const textAreaShadow = shadowRoot.querySelector<HTMLDivElement>('.shadow')!
    const counter = shadowRoot.querySelector<HTMLDivElement>('.counter')!
    const toggle = shadowRoot.querySelector<HTMLDivElement>('.toggle')!
    const inputs = {
      input: shadowRoot.querySelector('input')!,
      textarea: shadowRoot.querySelector('textarea')!
    }
    const getInput = () => this.type === 'multiline' ? inputs.textarea : inputs.input
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
    const setNumber = (num: number) => {
      this.value = `${parseInt(this.value || '0') + num}`
      this.dispatchEvent(new Event('input'))
      this.dispatchEvent(new Event('change'))
    }
    shadowRoot.querySelector<HTMLDivElement>('.up')!.onclick = () => setNumber(1)
    shadowRoot.querySelector<HTMLDivElement>('.down')!.onclick = () => setNumber(-1)
    shadowRoot.querySelector<HTMLDivElement>('.visibility')!.onclick = () => {
      inputs.input.type = toggle.classList.contains('show-password') ? 'password' : 'text'
      toggle.classList.toggle('show-password')
    }
    return {
      expose: {
        get native() {
          return getInput()
        }
      },
      label: (value) => label.textContent = value,
      type: (value) => inputs.input.type = value === 'password' ? (toggle.classList.contains('show-password') ? 'text' : 'password') : value,
      error: (value) => {
        if (value) return field.fixed = true
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
        this.type = value ? 'multiline' : 'text'
        // if (value) {
        //   inputs.textarea.value = inputs.input.value
        //   textAreaShadow.textContent = inputs.input.value
        //   return
        // }
        // inputs.input.value = inputs.textarea.value
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