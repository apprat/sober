import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['assist', 'filter', 'input'],
  type: ['chip', 'checkbox'],
  disabled: false,
  checked: false,
  $name: '',
  $defualtChecked: false,
  $value: '',
})

const style = /*css*/`
:host{
  gap: 8px;
  height: 32px;
  border-radius: 8px;
  padding: 0 16px;
  &::before{
    content: '';
    position: absolute;
    border-radius: inherit;
    inset: 0;
    border: 1px solid ${scheme.color.outlineVariant};
  }
}
:host([type=checkbox]){
  &:host([checked]){
    background: ${scheme.color.secondaryContainer};
    color: ${scheme.color.onSecondaryContainer};
    outline-color: ${scheme.color.primary};
    &::before{
      content: none;
    }
  }
}
::slotted(:is(svg, s-icon, s-loading, s-circular-progress)){
  width: 18px;
}
::slotted(:is(svg, s-icon, s-loading, s-circular-progress)[slot=start]){
  margin-left: -8px;
}
::slotted(:is(svg, s-icon, s-loading, s-circular-progress)[slot=end]){
  margin-right: -8px;
}
::slotted(s-avatar){
  width: 24px;
  height: 24px;
  font-size: calc(var(--s-font-size) * 12px);
}
::slotted(s-avatar[slot=start]){
  margin-left: -12px;
}
::slotted(s-avatar[slot=end]){
  margin-right: -12px;
}
::slotted(s-icon-button[slot=action]){
  width: 24px;
  height: 24px;
  margin-right: -11px;
  margin-left: -3px;
  padding: 3px;
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<slot name="action"></slot>
<s-ripple></s-ripple>
`

export class Chip extends useElement({
  style: [buttonStyle, style],
  states: ['focusable', 'formable'],
  template, props,
  setup(shadowRoot, info) {
    const action = shadowRoot.querySelector<HTMLSlotElement>('slot[name=action]')!
    action.onpointerdown = (e) => e.stopPropagation()
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      if (this.type !== 'checkbox') return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      onFormReset: () => this.checked = this.defualtChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom(),
    }
  }
}) { }

const name = Chip.define('s-chip')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Chip
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
    } & Chip
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