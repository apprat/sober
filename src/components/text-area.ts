import { useElement, useProps, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { FieldSet } from './field-set.js'
import { textEditorStyle } from '../core/style/text-editor.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  showClear: false,
  showError: false,
  showCount: false,
  label: '',
  $placeholder: '',
  name: '',
  $value: '',
  $defaultValue: '',
  maxLength: -1,
  $autoComplete: 'off',
  $inputMode: '',
  size: ['medium', 'small', 'large']
})

const style = /*css*/`
:host{
  line-height: calc(100% + 8px);
  font-size: calc(var(--s-font-size, 1) * 16px);
}
.wrapper{
  --s_text-area-padding-top: var(--s-text-area-padding-top, var(--s-text-area-padding, 12px));
  --s_text-area-padding-bottom: var(--s-text-area-padding-bottom, var(--s-text-area-padding, 12px));
  --s_text-area-padding-left: var(--s-text-area-padding-left, var(--s-text-area-padding, 16px));
  --s_text-area-padding-right: var(--s-text-area-padding-right, var(--s-text-area-padding, 16px));
  --s_text-area-border-radius: var(--s-text-area-border-radius, ${scheme.shape.corner.extraSmall});
  --s_text-area-border-top-left-radius: var(--s-text-area-border-top-left-radius, var(--s_text-area-border-radius));
  --s_text-area-border-top-right-radius: var(--s-text-area-border-top-right-radius, var(--s_text-area-border-radius));
  --s_text-area-border-bottom-left-radius: var(--s-text-area-border-bottom-left-radius, var(--s_text-area-border-radius));
  --s_text-area-border-bottom-right-radius: var(--s-text-area-border-bottom-right-radius, var(--s_text-area-border-radius));
  --s_text-area-border-color: var(--s-text-area-border-color, ${scheme.color.outline});
  --s_text-area-border-color-focused: var(--s-text-area-border-color-focused, ${scheme.color.primary});
  --s_text-area-border-width: var(--s-text-area-border-width, 1px);
  --s_text-area-border-width-focused: var(--s-text-area-border-width-focused, 2px);
  --s_text-area-label-gap: var(--s-text-area-label-gap, 4px);
}
.field-set{
  --s-field-set-padding-top: var(--s_text-area-padding-top);
  --s-field-set-padding-bottom: var(--s_text-area-padding-bottom);
  --s-field-set-padding-left: var(--s_text-area-padding-left);
  --s-field-set-padding-right: var(--s_text-area-padding-right);
  --s-field-set-border-top-left-radius: var(--s_text-area-border-top-left-radius);
  --s-field-set-border-top-right-radius: var(--s_text-area-border-top-right-radius);
  --s-field-set-border-bottom-left-radius: var(--s_text-area-border-bottom-left-radius);
  --s-field-set-border-bottom-right-radius: var(--s_text-area-border-bottom-right-radius);
  --s-field-set-border-color: var(--s_text-area-border-color);
  --s-field-set-border-color-focused: var(--s_text-area-border-color-focused);
  --s-field-set-border-width: var(--s_text-area-border-width);
  --s-field-set-border-width-focused: var(--s_text-area-border-width-focused);
  --s-field-set-legend-gap: var(--s_text-area-label-gap);
  &.no-field-sizing .editor:not(.shadow){
    position: absolute;
    inset: 0;
  }
}
.editor{
  resize: none;
  overflow: visible;
  white-space: pre-wrap;
  word-break: break-word;
  word-spacing: normal;
  word-break: break-all;
  overflow-wrap: break-word;
  field-sizing: content;
  padding: var(--s_text-area-padding-top) var(--s_text-area-padding-right) var(--s_text-area-padding-bottom) var(--s_text-area-padding-left);
  &::placeholder{
    color: var(--s_text-area-border-color);
  }
}
.shadow{
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  &::after{
    content: '\u200B';
  }
}
::slotted(*){
  align-self: flex-end;
}
:host([showError]){
  .wrapper{
    --s_text-area-border-color: ${scheme.color.error};
    --s_text-area-border-color-focused: ${scheme.color.error};
  }
  .icon-button{
    color: ${scheme.color.error};
  }
}
:host([size=small]){
  .field-set{
    --s_text-area-padding-top: var(--s-text-area-padding-top, 9px);
    --s_text-area-padding-bottom: var(--s-text-area-padding-bottom, 9px);
    --s_text-area-padding-left: var(--s-text-area-padding-left, 12px);
    --s_text-area-padding-right: var(--s-text-area-padding-right, 12px);
  }
}
:host([size=large]){
  .field-set{
    --s_text-area-padding-top: var(--s-text-area-padding-top, 16px);
    --s_text-area-padding-bottom: var(--s-text-area-padding-bottom, 16px);
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
    <div class="label" slot="legend" part="label"></div>
    <div slot="body" class="layout" part="layout">
      <textarea name="textarea" rows="1" tabindex="-1" class="editor" part="textarea" autocomplete="off"></textarea>
    </div>
    <div slot="end" class="end" part="end">
      <div class="icon-button hide clear" tabindex="0" part="action clear">
        <svg viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
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

const fieldSizing = CSS.supports('field-sizing: content')

export class TextArea extends useElement({
  template, props,
  style: [textEditorStyle, style],
  states: ['hoverable', 'focusableOnly', 'formable'],
  setup(shadowRoot, info) {
    const fieldSet = shadowRoot.querySelector<FieldSet>('.field-set')!
    const label = shadowRoot.querySelector('.label')!
    const textarea = shadowRoot.querySelector<HTMLTextAreaElement>('.editor')!
    const shadow = document.createElement('div')
    const end = shadowRoot.querySelector<HTMLDivElement>('.end')!
    const count = shadowRoot.querySelector<HTMLDivElement>('.count')!
    const clear = shadowRoot.querySelector<HTMLDivElement>('.clear')!
    const dispatchInput = (data: string | null) => this.dispatchEvent(new InputEvent('input', { data }))
    const dispatchChange = () => this.dispatchEvent(new Event('change'))
    const updateCount = () => count.textContent = `${textarea.value.length}${this.maxLength > -1 ? `/${this.maxLength}` : ''}`
    const updateFrom = () => info.internals.setFormValue(this.disabled ? null : this.value)
    const setValue = (value: string) => {
      if (value !== textarea.value) textarea.value = shadow.textContent = value
      fieldSet.classList.toggle('no-value', value !== '')
      updateCount()
      updateFrom()
    }
    this.addEventListener('focus', () => {
      fieldSet.floating = false
      fieldSet.focused = true
      textarea.focus()
    })
    this.addEventListener('blur', () => {
      fieldSet.focused = false
      if (textarea.value === '') fieldSet.floating = true
    })
    textarea.addEventListener('input', (e) => {
      setValue(textarea.value)
      dispatchInput(e.data)
    })
    textarea.addEventListener('change', dispatchChange)
    clear.onclick = () => {
      setValue('')
      dispatchInput('')
      dispatchChange()
    }
    if (!fieldSizing) {
      fieldSet.classList.add('no-field-sizing')
      shadow.className = 'shadow editor'
      textarea.after(shadow)
      textarea.addEventListener('input', () => shadow.textContent = textarea.value)
    }
    end.onmousedown = (e) => e.preventDefault()
    focusKeydownClick(clear)
    return {
      expose: {
        get textarea() {
          return textarea
        },
        get value() {
          return textarea.value
        }
      },
      onFormReset: () => this.value = this.defaultValue,
      placeholder: (v) => textarea.placeholder = v,
      autoComplete: (v) => textarea.autocomplete = v as AutoFill,
      inputMode: (v) => textarea.inputMode = v,
      maxLength: (v) => {
        textarea.maxLength = v
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

const name = TextArea.define('s-text-area')

declare global {
  interface HTMLElementTagNameMap {
    [name]: TextArea
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
    } & TextArea
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