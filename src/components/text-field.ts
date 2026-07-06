import { useElement, useProps, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { FieldSet } from './field-set.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  showError: false,
  showClear: false,
  showCount: false,
  showPasswordToggle: false,
  showMic: false,
  micLang: '',
  name: '',
  $autoComplete: 'off',
  $value: '',
  $defaultValue: '',
  $label: '',
  $placeholder: '',
  maxLength: -1,
  type: ['text', 'password', 'number', 'email', 'tel', 'multiline'],
  $inputMode: ['', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
  size: ['medium', 'small', 'large'],
})

const style = /*css*/`
:host{
  display: block;
  min-height: 48px;
  font-size: calc(var(--s-font-size) * 16px);
  line-height: calc(100% + 8px);
  color: ${scheme.color.onSurface};
  caret-color: currentColor;
  transition-timing-function: ${scheme.motion.easing.standardDecelerate};
  transition-duration: ${scheme.motion.duration.short4};
}
.field-set{
  line-height: inherit;
  font-size: inherit;
  min-height: inherit;
  max-height: inherit;
  transition-timing-function: inherit;
  transition-duration: inherit;
  --s-field-set-padding: var(--s-text-field-padding);
  --s-field-set-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding));
  --s-field-set-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding));
  --s-field-set-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding));
  --s-field-set-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding));
  --s_field-set-border-color: var(--s-text-field-border-color);
  --s_field-set-border-color-focused: var(--s-text-field-border-color-focused);
  --s-field-set-border-width: var(--s-text-field-border-width);
  --s-field-set-border-focused-width: var(--s-text-field-border-focused-width);
  --s-field-set-border-radius: var(--s-text-field-border-radius);
  --s-field-set-border-top-left-radius: var(--s-text-field-border-top-left-radius, var(--s-text-field-border-radius));
  --s-field-set-border-top-right-radius: var(--s-text-field-border-top-right-radius, var(--s-text-field-border-radius));
  --s-field-set-border-bottom-left-radius: var(--s-text-field-border-bottom-left-radius, var(--s-text-field-border-radius));
  --s-field-set-border-bottom-right-radius: var(--s-text-field-border-bottom-right-radius, var(--s-text-field-border-radius));
  --s-field-set-title-gap: var(--s-text-field-label-gap);
  &.multi-line{
    input{
      display: none;
    }
    .layout{
      display: grid;
    }
  }
  &:not(.multi-line){
    .label{
      padding-top: 0;
      padding-bottom: 0;
      height: 50%;
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
}
.label{
  display: block;
  &[data-label='']{
    display: none !important;
  }
  &::before{
    content: attr(data-label);
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;
  }
}
.layout{
  padding: 0;
  max-height: inherit;
  height: 100%;
  display: none;
}
input,
textarea,
.shadow{
  outline: none;
  border: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 0;
  margin: 0;
  padding-left: var(--s_field-set-padding-left);
  padding-right: var(--s_field-set-padding-right);
  box-sizing: border-box;
  caret-color: inherit;
  &::placeholder{
    color: ${scheme.color.outline};
    line-height: inherit;
  }
}
textarea,
.shadow{
  grid-area: 1 / 1 / 2 / 2;
  overflow: auto;
  padding: var(--s_field-set-padding-top) var(--s_field-set-padding-right) var(--s_field-set-padding-bottom) var(--s_field-set-padding-left);
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  max-height: inherit;
  field-sizing: content;
}
.shadow{
  opacity: 0;
  pointer-events: none;
  &::after{
    content: '\u200B';
  }
}
.actions{
  display: flex;
  margin: 0 4px 0 -8px;
}
.action{
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: none;
  &[pressed]{
    border-radius: 8px;
  }
}
svg,
::slotted(:is(svg, s-icon)){
  width: 24px;
  height: 24px;
  color: currentColor;
  fill: currentColor;
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon)[slot=start]){
  margin-left: 16px;
}
::slotted([slot=end]){
  margin-right: 4px;
}
:host(:focus-visible){
  outline: none;
}
:host([size=small]){
  font-size: calc(var(--s-font-size) * 14px);
  min-height: 40px;
  .field-set{
    --s-field-set-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding, 8px));
    --s-field-set-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding, 8px));
    --s-field-set-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 12px));
    --s-field-set-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 12px));
  }
}
:host([size=large]){
  font-size: calc(var(--s-font-size) * 18px);
  min-height: 56px;
  .field-set{
    --s-field-set-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding, 16px));
    --s-field-set-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding, 16px));
    --s-field-set-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 20px));
    --s-field-set-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 20px));
  }
}
`
const template = /*html*/`
<s-field-set class="field-set" floating>
  <slot name="start" slot="start"></slot>
  <input type="text" part="input" name="input" autocomplete="${props.values.autoComplete}" tabindex="-1">
  <div slot="title" class="label" part="label" data-label=""></div>
  <div class="layout" part="layout">
    <textarea name="textarea" part="textarea" rows="1" autocomplete="${props.values.autoComplete}" tabindex="-1"></textarea>
  </div>
  <div slot="end" class="actions" part="actions">
    <div class="action clear" tabindex="0" part="action">
      <svg viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
      <s-ripple></s-ripple>
    </div>
    <div class="action password-toggle" tabindex="0" part="action">
      <svg viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"></path></svg>
      <s-ripple></s-ripple>
    </div>
    <slot name="end"></slot>
  </div>
</s-field-set>
`

const support = CSS.supports('field-sizing: content')

export class TextField extends useElement({
  style, template, props,
  states: ['focusableOnly', 'formable'],
  setup(shadowRoot) {
    const fieldSet = shadowRoot.querySelector<FieldSet>('.field-set')!
    const label = shadowRoot.querySelector<HTMLSpanElement>('.label')!
    const input = shadowRoot.querySelector('input')!
    const textarea = shadowRoot.querySelector('textarea')!
    const actions = shadowRoot.querySelector<HTMLDivElement>('.actions')!
    const clearAction = shadowRoot.querySelector<HTMLDivElement>('.action.clear')!
    const getEditor = () => this.type !== 'multiline' ? input : textarea
    const shadow = document.createElement('div')
    const focus = () => {
      fieldSet.focused = true
      const editor = getEditor()
      fieldSet.floating = false
      editor.focus()
    }
    const blur = () => {
      const editor = getEditor()
      if (editor.value === '' && editor.validity.valid) fieldSet.floating = true
      fieldSet.focused = false
    }
    input.onfocus = focus
    input.onblur = blur
    textarea.onfocus = focus
    textarea.onblur = blur
    input.oninput = (e) => {
      this.dispatchEvent(new InputEvent('input'))
    }
    input.onchange = (e) => {
      this.dispatchEvent(new Event('change'))
    }
    this.addEventListener('focus', focus)
    this.addEventListener('blur', blur)
    actions.onpointerdown = (e) => e.preventDefault()
    clearAction.onclick = () => this.value = ''
    focusKeydownClick(clearAction)
    if (!support) {
      shadow.className = 'shadow'
      shadow.part = 'textarea-shadow'
      textarea.before(shadow)
      textarea.addEventListener('input', () => shadow.textContent = textarea.value)
    }
    return {
      expose: {
        getEditor,
        get value() {
          return getEditor().value
        }
      },
      label: (v) => label.setAttribute('data-label', v),
      type: (v) => {
        input.type = v
        fieldSet.classList.toggle('multi-line', v === 'multiline')
      },
      placeholder: (v) => {
        input.placeholder = v
        textarea.placeholder = v
      },
      autoComplete: (v) => {
        input.autocomplete = v as AutoFill
        textarea.autocomplete = v as AutoFill
      },
      inputMode: (v) => input.inputMode = v,
      value: (v) => {
        input.value = v
        textarea.value = v
        shadow.textContent = v
        fieldSet.floating = v === '' && !this.matches(':focus')
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