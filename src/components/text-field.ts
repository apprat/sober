import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { Fieldset } from './fieldset.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  value: '',
  placeholder: '',
  maxLength: -1,
  type: ['text', 'password', 'number', 'multiline']
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  min-height: 48px;
  min-width: 280px;
  font-size: calc(var(--s-font-size) * 16px);
  color: ${scheme.color.onSurface};
  transition-timing-function: ${scheme.motion.easing.emphasized};
  transition-duration: ${scheme.motion.duration.short4};
}
.fieldset{
  display: flex;
  font-size: inherit;
  color: inherit;
  height: 100%;
  font-family: inherit;
  min-height: inherit;
  --s_padding: var(--s-text-field-padding);
  --s_padding-top: var(--s-text-field-padding-top);
  --s_padding-bottom: var(--s-text-field-padding-bottom);
  --s_padding-left: var(--s-text-field-padding-left);
  --s_padding-right: var(--s-text-field-padding-right);
  --s-fieldset-title-gap: 4px;
  --s-fieldset-padding: var(--s_padding);
  --s-fieldset-padding-top: var(--s_padding-top);
  --s-fieldset-padding-right: var(--s_padding-right);
  --s-fieldset-padding-bottom: var(--s_padding-bottom);
  --s-fieldset-padding-left: var(--s_padding-left);
  ::slotted([slot=label]){
    display: flex;
    height: 100%;
    align-items: center;
    font-size: inherit;
    box-sizing: border-box;
    margin-left: min(var(--s_title_gap), var(--s_padding-left));
    margin-right: min(var(--s_title_gap), var(--s_padding-right));
    color: var(--s_border-color);
    transform: translateY(0%);
    transition-property: transform, font-size, color;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
  ::slotted([slot=label]:empty){
    display: none;
  }
  &:not([floated]){
    ::slotted([slot=label]){
      transform: translateY(-50%);
      font-size: calc(var(--s-font-size) * 12px);
      height: auto;
      padding-top: var(--s_padding-top);
      padding-bottom: var(--s_padding-bottom);
      color: var(--s-color-primary, ${scheme.color.primary});
    }
  }
}
input,
textarea{
  width: 100%;
  height: 100%;
  display: block;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  padding: 0 var(--s_padding-right) 0 var(--s_padding-left);
  line-height: 1;
  font-size: inherit;
  color: inherit;
  caret-color: var(--s-color-primary, ${scheme.color.primary});
  &::selection{
    background: var(--s-color-primary, ${scheme.color.primary});
    color: var(--s-color-on-primary, ${scheme.color.onPrimary});
  }
}
textarea{
  padding-top: var(--s_padding-top);
  padding-bottom: var(--s_padding-bottom);
  resize: none;
}
:host([type=multiline]){
  min-height: 120px;
}
`
const template = /*html*/`
<s-fieldset class="fieldset" floated>
  <slot name="label" class="label" slot="title"></slot>
  <input type="text" name="input" autocomplete="off" tabindex="-1">
</s-fieldset>
`

export class TextField extends useElement({
  focused: true,
  style, template, props,
  setup(shadowRoot, info) {
    const fieldset = shadowRoot.querySelector<Fieldset>(`s-fieldset`)!
    const textarea = document.createElement('textarea') as HTMLTextAreaElement
    textarea.name = 'input'
    textarea.rows = 1
    const input = shadowRoot.querySelector<HTMLInputElement>('input')!
    const getInput = () => this.type === 'multiline' ? textarea : input
    const onInput = () => {
      this.dispatchEvent(new Event('input'))
    }
    const onChange = () => {
      this.dispatchEvent(new Event('change'))
    }
    const onFocus = () => {
      if (getInput().value === '') fieldset.floated = false
      fieldset.focused = true
    }
    const onBlur = () => {
      if (getInput().value === '') fieldset.floated = true
      fieldset.focused = false
    }
    input.oninput = textarea.oninput = onInput
    input.onchange = textarea.onchange = onChange
    input.onfocus = textarea.onfocus = onFocus
    input.onblur = textarea.onblur = onBlur
    this.addEventListener('focus', () => getInput().focus())
    return {
      getValue: () => getInput().value,
      setValue: (v) => getInput().value = v,
      setPlaceholder: (v) => input.placeholder = textarea.placeholder = v,
      setMaxLength: (v) => input.maxLength = textarea.maxLength = v,
      setType: (v, old) => {
        if ([v, old].includes('multiline')) {
          const arr = [input, textarea]
          if (old === 'multiline') arr.reverse()
          arr[0].after(arr[1])
          arr[0].remove()
          arr[1].value = arr[1].value
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
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
      $props: HTMLAttributes & Partial<typeof props>
    } & TextField
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}