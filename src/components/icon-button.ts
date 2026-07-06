import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['standard', 'filled', 'tonal', 'outlined'],
  size: ['small', 'medium', 'extra-small', 'large', 'extra-large'],
  width: ['default', 'wide', 'narrow'],
  disabled: false,
  checked: false,
  type: ['icon-button', 'checkbox', 'submit', 'reset'],
  defaultChecked: false,
  name: '',
  $value: '',
  $requiring: ''
})

const style = /*css*/`
:host{
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: calc(var(--s-font-size, 1) * 24px);
  transition-property: height, width, color, background-color, padding, border-radius;
  color: ${scheme.color.onSurfaceVariant};
}
:host([pressed]){
  border-radius: 8px;
}
:host([variant=filled]){
  background: ${scheme.color.primary};
  color: ${scheme.color.onPrimary};
  outline-color: ${scheme.color.primary};
}
:host([variant=tonal]){
  background: ${scheme.color.secondaryContainer};
  color: ${scheme.color.onSecondaryContainer};
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
:host([type=checkbox]){
  &:host(:is(:not([variant]), [variant=filled])){
    background: ${scheme.color.surfaceContainer};
    color: ${scheme.color.onSurfaceVariant};
  }
  &:host([checked]){
    &:host(:not([pressed])){
      border-radius: 12px;
    }
    &:host(:not([variant])){
      background: ${scheme.color.primaryContainer};
      color: ${scheme.color.onPrimaryContainer};
    }
    &:host([variant=filled]){
      background: ${scheme.color.primary};
      color: ${scheme.color.onPrimary};
    }
    &:host([variant=tonal]){
      background: ${scheme.color.secondary};
      color: ${scheme.color.onSecondary};
      outline-color: ${scheme.color.secondary};
    }
    &:host([variant=outlined]){
      box-shadow: none;
      background: ${scheme.color.inverseSurface};
      color: ${scheme.color.inverseOnSurface};
      outline-color: ${scheme.color.inverseSurface};
      &::before{
        content: none;
      }
    }
  }
}
/**Size**/
:host([size=extra-small]){
  width: 32px;
  height: 32px;
  border-radius: 16px;
  font-size: calc(var(--s-font-size, 1) * 20px);
  &:host([pressed]){
    border-radius: 8px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 12px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 20px;
  }
}
:host([size=medium]){
  height: 56px;
  width: 56px;
  border-radius: 28px;
  &:host([pressed]){
    border-radius: 12px;
  }
  &:host([type=checkbox][checked]:not([pressed])){
    border-radius: 16px;
  }
}
:host([size=large]){
  height: 96px;
  width: 96px;
  border-radius: 48px;
  font-size: calc(var(--s-font-size, 1) * 32px);
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
  width: 136px;
  border-radius: 68px;
  font-size: calc(var(--s-font-size, 1) * 40px);
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
/*Width*/
:host([width=narrow]){
  width: 32px;
  &:host([size=extra-small]){
    width: 28px;
  }
  &:host([size=medium]){
    width: 48px;
    height: 56px;
  }
  &:host([size=large]){
    width: 64px;
    height: 96px;
  }
  &:host([size=extra-large]){
    width: 104px;
    height: 136px;
  }
}
:host([width=wide]){
  width: 52px;
  &:host([size=extra-small]){
    width: 40px;
  }
  &:host([size=medium]){
    width: 72px;
    height: 56px;
  }
  &:host([size=large]){
    width: 128px;
    height: 96px;
  }
  &:host([size=extra-large]){
    width: 184px;
    height: 136px;
  }
}
::slotted(:is(svg, s-icon, s-loading, s-spinner)) {
  flex-shrink: 1;
}
::slotted(s-badge){
  position: absolute;
  right: 15%;
  top: 15%;
  transform: translate(50%, -50%);
  outline-offset: 0;
  outline: solid 2px ${scheme.color.surface};
}
`

const template = /*html*/`
<slot></slot>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class IconButton extends useElement({
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
      onFormReset: () => this.checked = this.defaultChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom()
    }
  }
}) { }

const name = IconButton.define('s-icon-button')

declare global {
  interface HTMLElementTagNameMap {
    [name]: IconButton
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
    } & IconButton
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