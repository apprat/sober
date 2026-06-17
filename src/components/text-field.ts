import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { Fieldset } from './fieldset.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  error: false,
  autocomplete: 'off',
  pattern: '',
  name: '',
  value: '',
  defualtValue: '',
  placeholder: '',
  requiring: '',
  maxLength: -1,
  type: ['text', 'password', 'number', 'email', 'tel', 'multiline']
})

const style = /*css*/`
:host{
  display: block;
  min-height: 48px;
  font-size: calc(var(--s-font-size) * 15px);
  color: ${scheme.color.onSurface};
  transition-timing-function: ${scheme.motion.easing.emphasized};
  transition-duration: ${scheme.motion.duration.short4};
}
.fieldset{
  height: 100%;
  min-height: inherit;
  max-height: inherit;
  line-height: inherit;
  font-size: inherit;
  ::slotted([slot=label]){
    height: 50%;
    align-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: min(var(--s_title_gap), var(--s_padding-left));
    margin-right: min(var(--s_title_gap), var(--s_padding-right));
    transition-property: all;
    transition-duration: inherit;
    transition-timing-function: inherit;
    box-sizing: border-box;
    transform: translateY(50%);
    color: ${scheme.color.outline};
  }
  &:not([floated]){
    ::slotted([slot=label]){
      font-size: calc(var(--s-font-size, 1) * 12px);
      transform: translateY(0%);
    }
  }
  &[focused]{
    ::slotted([slot=label]){
      color: ${scheme.color.primary};
    }
  }
  ::slotted(:is(s-icon, svg)[slot=start]){
    margin-left: 12px;
    margin-right: -4px;
  }
  ::slotted(:is(s-icon, svg)[slot=end]){
    margin-right: 12px;
    margin-left: -4px;
  }
  ::slotted(s-icon-button[slot=start]){
    margin-left: 4px;
    margin-right: -8px;
  }
  ::slotted(s-icon-button[slot=end]){
    margin-right: 4px;
    margin-left: -8px;
  }
}
input,
textarea,
.shadow{
  width: 100%;
  height: 100%;
  display: block;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  padding: 0 var(--s_padding-right) 0 var(--s_padding-left);
  line-height: inherit;
  font-size: inherit;
  color: inherit;
  caret-color: var(--s-color-primary, ${scheme.color.primary});
  &::selection{
    background: var(--s-color-primary, ${scheme.color.primary});
    color: var(--s-color-on-primary, ${scheme.color.onPrimary});
  }
}
textarea,
.shadow{
  overflow: visible;
  overflow-wrap: break-word;
  word-break: break-all;
  padding-top: var(--s_padding-top);
  padding-bottom: var(--s_padding-bottom);
  resize: none;
  min-height: 100%;
  white-space: pre-wrap;
}
textarea{
  position: absolute;
  inset: 0;
}
.shadow{
  height: 100%;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  &::after{
    content: ' ';
  }
}
:host([type=multiline]){
  min-height: 100px;
  line-height: 1.5;
  .fieldset{
    ::slotted([slot=label]){
      height: auto;
      padding-top: var(--s_padding-top);
      padding-bottom: var(--s_padding-bottom);
    }
  }
}
`
const template = /*html*/`
<s-fieldset class="fieldset" floated>
  <slot name="label" slot="title"></slot>
  <slot name="start" slot="start"></slot>
  <input type="text" name="input" autocomplete="off" tabindex="-1">
  <slot name="end" slot="end"></slot>
</s-fieldset>
`

export class TextField extends useElement({
  style, template, props,
  states: ['focusableOnly', 'formable'],
  setup(shadowRoot, info) {
    const fieldset = shadowRoot.querySelector<Fieldset>(`s-fieldset`)!
    const textarea = document.createElement('textarea') as HTMLTextAreaElement
    const shadow = document.createElement('div') as HTMLDivElement
    const input = shadowRoot.querySelector<HTMLInputElement>('input')!
    shadow.className = 'shadow'
    textarea.name = input.name
    textarea.rows = 1
    textarea.tabIndex = -1
    textarea.autocomplete = input.autocomplete
    const getInput = () => this.type === 'multiline' ? textarea : input
    const setValue = () => info.internals.setFormValue(!this.disabled ? this.value : null)
    const setRequired = () => this.requiring && info.internals.setValidity({ valueMissing: !this.value }, this.requiring, this)
    const onInput = () => {
      this.dispatchEvent(new Event('input'))
      shadow.textContent = textarea.value
      setValue()
      setRequired()
    }
    const onChange = () => this.dispatchEvent(new Event('change'))
    const onFocus = () => {
      if (getInput().value === '') fieldset.floating = false
      fieldset.focused = true
    }
    const onBlur = () => {
      if (getInput().value === '') fieldset.floating = true
      fieldset.focused = false
    }
    input.oninput = textarea.oninput = onInput
    input.onchange = textarea.onchange = onChange
    input.onfocus = textarea.onfocus = onFocus
    input.onblur = textarea.onblur = onBlur
    const focus = () => getInput().focus()
    this.addEventListener('focus', focus)
    return {
      expose: {
        get value() {
          return getInput().value
        }
      },
      onFormReset: () => this.value = this.defualtValue,
      value: (v) => {
        getInput().value = v
        fieldset.floating = v === ''
        setRequired()
        setValue()
      },
      disabled: setValue,
      requiring: setRequired,
      autocomplete: (v) => input.autocomplete = textarea.autocomplete = v as AutoFill,
      placeholder: (v) => input.placeholder = textarea.placeholder = v,
      maxLength: (v) => input.maxLength = textarea.maxLength = v,
      type: (v, old) => {
        if ([v, old].includes('multiline')) {
          if (old === 'multiline') {
            textarea.after(input)
            shadow.remove()
            textarea.remove()
            input.value = textarea.value
          } else {
            input.after(shadow)
            input.after(textarea)
            input.remove()
            textarea.value = input.value
          }
        }
        if (getInput() === textarea) return
        input.type = v
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