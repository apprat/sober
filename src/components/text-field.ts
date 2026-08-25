import { useElement, useProps, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { FieldSet } from './field-set.js'
import { textEditorStyle } from '../core/style/text-editor.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  showError: false,
  showSearch: false,
  showClear: false,
  showNumberSpin: false,
  showCount: false,
  showPasswordToggle: false,
  name: '',
  $autoComplete: 'off',
  $value: '',
  $defaultValue: '',
  label: '',
  $placeholder: '',
  maxLength: -1,
  $inputMode: '',
  type: ['text', 'password', 'number', 'email', 'tel', 'search'],
  size: ['medium', 'small', 'large'],
})
const events = {
  search: Event
}

const style = /*css*/`
:host{
  min-height: 48px;
  line-height: 1;
}
.wrapper{
  min-height: inherit;
  display: contents;
  --s_text-field-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 16px));
  --s_text-field-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 16px));
  --s_text-field-border-radius: var(--s-text-field-border-radius, ${scheme.shape.corner.extraSmall});
  --s_text-field-border-top-left-radius: var(--s-text-field-border-top-left-radius, var(--s_text-field-border-radius));
  --s_text-field-border-top-right-radius: var(--s-text-field-border-top-right-radius, var(--s_text-field-border-radius));
  --s_text-field-border-bottom-left-radius: var(--s-text-field-border-bottom-left-radius, var(--s_text-field-border-radius));
  --s_text-field-border-bottom-right-radius: var(--s-text-field-border-bottom-right-radius, var(--s_text-field-border-radius));
  --s_text-field-border-color: var(--s-text-field-border-color, ${scheme.color.outline});
  --s_text-field-border-color-focused: var(--s-text-field-border-color-focused, ${scheme.color.primary});
  --s_text-field-border-width: var(--s-text-field-border-width, 1px);
  --s_text-field-border-width-focused: var(--s-text-field-border-width-focused, 2px);
  --s_text-field-label-gap: var(--s-text-field-label-gap, 4px);
}
.field-set{
  --s-field-set-padding-top: 0px;
  --s-field-set-padding-bottom: 0px;
  --s-field-set-padding-left: var(--s_text-field-padding-left);
  --s-field-set-padding-right: var(--s_text-field-padding-right);
  --s-field-set-border-top-left-radius: var(--s_text-field-border-top-left-radius);
  --s-field-set-border-top-right-radius: var(--s_text-field-border-top-right-radius);
  --s-field-set-border-bottom-left-radius: var(--s_text-field-border-bottom-left-radius);
  --s-field-set-border-bottom-right-radius: var(--s_text-field-border-bottom-right-radius);
  --s-field-set-border-color: var(--s_text-field-border-color);
  --s-field-set-border-color-focused: var(--s_text-field-border-color-focused);
  --s-field-set-border-width: var(--s_text-field-border-width);
  --s-field-set-border-width-focused: var(--s_text-field-border-width-focused);
  --s-field-set-legend-gap: var(--s_text-field-label-gap);
}
.label{
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 1;
  span{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.editor{
  line-height: 1;
  -moz-appearance: textfield;
  padding: 0 var(--s_text-field-padding-right) 0 var(--s_text-field-padding-left);
  &::placeholder{
    color: var(--s_text-field-border-color);
  }
  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration,
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }
  &::-ms-reveal{
    display: none;
  }
}
.number-spin{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  .up,
  .down{
    display: flex;
    height: 18px;
    width: 32px;
    margin: 0;
  }
  .up{
    align-items: flex-start;
  }
  .down{
    align-items: flex-end;
  }
}
:host([showError]){
  .wrapper{
    --s_text-field-border-color: ${scheme.color.error};
    --s_text-field-border-color-focused: ${scheme.color.error};
  }
  .icon-button{
    color: ${scheme.color.error};
  }
}
:host([type=password][showPasswordToggle]){
  .editor[type=password]+ .end>.password-toggle .on,
  .editor[type=text]+ .end>.password-toggle .off{
    display: block;
  }
  .password-toggle{
    display: flex;
  }
}
:host([type=search][showSearch]) .search,
:host([type=number][showNumberSpin]) .number-spin{
  display: flex;
}
:host([size=small]){
  min-height: 40px;
  .field-set{
    --s_text-area-padding-left: var(--s-text-area-padding-left, 12px);
    --s_text-area-padding-right: var(--s-text-area-padding-right, 12px);
  }
}
:host([size=large]){
  min-height: 56px;
  .field-set{
    --s_text-area-padding-left: var(--s-text-area-padding-left, 20px);
    --s_text-area-padding-right: var(--s-text-area-padding-right, 20px);
  }
}
`
const template = /*html*/`
<div class="wrapper" part="wrapper">
  <s-field-set class="field-set" part="field-set" floating>
    <div slot="start" class="start" part="start">
      <slot name="start"></slot>
    </div>
    <div class="label" slot="legend" part="label">
      <span></span>
    </div>
    <input name="input" slot="body" tabindex="-1" class="editor layout" part="input" autocomplete="off" />
    <div slot="end" class="end" part="end">
      <div class="icon-button hide clear" tabindex="0" part="action clear">
        <svg viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <div class="hide number-spin">
        <div class="icon-button up" tabindex="0" part="action number-spin-up">
          <svg viewBox="0 -960 960 960"><path d="m280-400 200-200 200 200H280Z"></path></svg>
          <s-ripple></s-ripple>
        </div>
        <div class="icon-button down" tabindex="0" part="action number-spin-down">
          <svg viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"></path></svg>
          <s-ripple></s-ripple>
        </div>
      </div>
      <div class="icon-button hide password-toggle" tabindex="0" part="action password-toggle">
        <svg viewBox="0 -960 960 960" class="on hide"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"></path></svg>
        <svg viewBox="0 -960 960 960" class="off hide"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <div class="icon-button hide search" tabindex="0" part="action search">
        <svg viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <slot name="end"></slot>
    </div>
  </s-field-set>
  <div class="helper" part="helper">
    <div class="text" part="helper-text">
      <slot></slot>
    </div>
    <div class="count hide">0</div>
  </div>
</div>
`

export class TextField extends useElement({
  template, props, events,
  style: [textEditorStyle, style],
  states: ['hoverable', 'focusableOnly', 'formable'],
  setup(shadowRoot, info) {
    const fieldSet = shadowRoot.querySelector<FieldSet>('.field-set')!
    const label = shadowRoot.querySelector<HTMLSpanElement>('.label>span')!
    const input = shadowRoot.querySelector<HTMLInputElement>('.editor')!
    const count = shadowRoot.querySelector<HTMLDivElement>('.count')!
    const end = shadowRoot.querySelector<HTMLDivElement>('.end')!
    const clear = shadowRoot.querySelector<HTMLDivElement>('.clear')!
    const passwordToggle = shadowRoot.querySelector<HTMLDivElement>('.password-toggle')!
    const search = shadowRoot.querySelector<HTMLDivElement>('.search')!
    const numberSpinUp = shadowRoot.querySelector<HTMLDivElement>('.number-spin>.up')!
    const numberSpinDown = shadowRoot.querySelector<HTMLDivElement>('.number-spin>.down')!
    const dispatchInput = (data: string | null) => this.dispatchEvent(new InputEvent('input', { data }))
    const dispatchChange = () => this.dispatchEvent(new Event('change'))
    const updateCount = () => count.textContent = `${input.value.length}${this.maxLength > -1 ? `/${this.maxLength}` : ''}`
    const updateFrom = () => info.internals.setFormValue(this.disabled ? null : this.value)
    const setValue = (value: string) => {
      if (value !== input.value) input.value = value
      fieldSet.classList.toggle('no-value', value !== '')
      updateCount()
      updateFrom()
    }
    this.addEventListener('focus', () => {
      fieldSet.floating = false
      fieldSet.focused = true
      input.focus()
    })
    this.addEventListener('blur', () => {
      fieldSet.focused = false
      if (input.value === '' && input.validity.valid) fieldSet.floating = true
    })
    input.addEventListener('input', (e) => {
      setValue(input.value)
      dispatchInput(e.data)
    })
    input.addEventListener('change', dispatchChange)
    clear.onclick = (e) => {
      setValue('')
      dispatchInput('')
      dispatchChange()
    }
    end.onmousedown = (e) => e.preventDefault()
    passwordToggle.onclick = () => input.type = input.type === 'password' ? 'text' : 'password'
    search.onclick = () => this.dispatchEvent(new Event('search'))
    numberSpinUp.onclick = numberSpinDown.onclick = (e) => {
      const num = e.target === numberSpinUp ? 1 : -1
      const value = parseFloat(input.value)
      this.value = String(isNaN(value) ? 0 : value + num)
      dispatchInput(input.value)
      dispatchChange()
    }
    focusKeydownClick(clear, passwordToggle, search)
    return {
      expose: {
        get input() {
          return input
        },
        get value() {
          return input.value
        }
      },
      onFormReset: () => this.value = this.defaultValue,
      placeholder: (v) => input.placeholder = v,
      autoComplete: (v) => input.autocomplete = v as AutoFill,
      inputMode: (v) => input.inputMode = v,
      type: (v) => input.type = v,
      maxLength: (v) => {
        input.maxLength = v
        updateCount()
      },
      label: (v) => label.textContent = v,
      value: (v) => {
        fieldSet.floating = v === ''
        setValue(v)
      }
    }
  }
}) { }

const name = TextField.define('s-text-field')

declare global {
  interface HTMLElementTagNameMap {
    [name]: TextField
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props.values>
    } & TextField
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}