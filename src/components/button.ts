import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['filled', 'elevated', 'tonal', 'outlined', 'text'],
  size: ['small', 'extra-small', 'medium', 'large', 'extra-large'],
  type: ['button', 'checkbox', 'submit', 'reset'],
  disabled: false,
  checked: false,
  name: '',
  $defualtChecked: false,
  $value: '',
})

const style = /*css*/`
:host{
  padding: 0 16px;
  height: 40px;
  gap: 8px;
  min-width: 56px;
  border-radius: 20px;
  transition-property: height, color, background-color, box-shadow, padding, gap, border-radius, font-size;
}
:host([pressed]){
  border-radius: 8px;
}
:host(:not([variant])){
  background: ${scheme.color.primary};
  color: ${scheme.color.onPrimary};
  outline-color: ${scheme.color.primary};
}
:host([variant=elevated]){
  background: ${scheme.color.surfaceContainerLow};
  color: ${scheme.color.primary};
  box-shadow: ${scheme.elevation.level1};
  &:host([disabled]){
    box-shadow: none;
  }
}
:host([variant=tonal]){
  background: ${scheme.color.secondaryContainer};
  color: ${scheme.color.onSecondaryContainer};
  &:host([hover]:not([pressed])){
    box-shadow: ${scheme.elevation.level1};
  }
}
:host([variant=outlined]){
  color: ${scheme.color.onSurfaceVariant};
  &::before{
    content: '';
    position: absolute;
    pointer-events: none;
    inset: 0;
    border: solid 1px ${scheme.color.outlineVariant};
    border-radius: inherit;
  }
}
:host([variant=text]){
  color: ${scheme.color.primary};
}
:host([type=checkbox]){
  &:host(:not([variant])){
    background: ${scheme.color.surfaceContainer};
    color: ${scheme.color.onSurfaceVariant};
  }
  &:host([checked]){
    &:host(:not([pressed])){
      border-radius: 12px;
    }
    &:host(:is(:not([variant]), [variant=elevated])){
      background: ${scheme.color.primary};
      color: ${scheme.color.onPrimary};
    }
    &:host([variant=elevated]){
      outline-color: ${scheme.color.primary};
    }
    &:host([variant=tonal]){
      background: ${scheme.color.secondary};
      color: ${scheme.color.onSecondary};
      outline-color: ${scheme.color.secondary};
    }
    &:host([variant=outlined]){
      background: ${scheme.color.inverseSurface};
      color: ${scheme.color.inverseOnSurface};
      outline-color: ${scheme.color.inverseSurface};
      &::before{
        content: none;
      }
    }
    &:host([variant=text]){
      background: ${scheme.color.primaryContainer};
      color: ${scheme.color.onPrimaryContainer};
    }
  }
}
/**Size**/
:host([size=extra-small]){
  height: 32px;
  gap: 4px;
  padding: 0 12px;
  border-radius: 16px;
  &:host([pressed]){
    border-radius: 8px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 12px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 16px;
  }
}
:host([size=medium]){
  height: 56px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  padding: 0 24px;
  border-radius: 28px;
  &:host([pressed]){
    border-radius: 12px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 16px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 24px;
  }
}
:host([size=large]){
  height: 96px;
  gap: 12px;
  font-size: calc(var(--s-font-size, 1) * 24px);
  padding: 0 48px;
  border-radius: 48px;
  &:host([pressed]){
    border-radius: 16px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 28px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 32px;
  }
}
:host([size=extra-large]){
  height: 136px;
  gap: 16px;
  font-size: calc(var(--s-font-size, 1) * 32px);
  padding: 0 64px;
  border-radius: 68px;
  &:host([pressed]){
    border-radius: 16px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 28px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 40px;
  }
}
::slotted(:is(svg, s-icon, s-loading, s-spinner)){
  width: 20px;
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot class="text" part="text"></slot>
<slot name="end"></slot>
<s-ripple part="ripple"></s-ripple>
`

export class Button extends useElement({
  style: [buttonStyle, style],
  states: ['focusable', 'formable'],
  props, template,
  setup(_, info) {
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      if (this.type === 'reset') return info.internals.form?.reset()
      if (this.type === 'submit') return info.internals.form?.requestSubmit()
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

const name = Button.define('s-button')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Button
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
    } & Button
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