import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle, buttonVariant } from '../core/style/button.js'

const props = useProps({
  variant: ['filled', 'elevated', 'tonal', 'outlined', 'text'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  disabled: false,
  checkable: false,
  checked: false,
  $value: ''
})

const style = /*css*/`
:host{
  padding: 0 18px;
  height: 40px;
  gap: 6px;
  min-width: 56px;
  transition-property: border-radius, color, background-color, box-shadow;
  border-radius: 20px;
  .text{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
  ::slotted(:is(svg, s-icon)){
    width: 20px;
  }
  ::slotted(:is(svg, s-icon)[slot=start]){
    margin-left: -4px;
  }
  ::slotted(:is(svg, s-icon)[slot=end]){
    margin-right: -4px;
  }
}
:host(:not([variant])){
  background: ${scheme.color.primary};
  color: ${scheme.color.onPrimary};
}
:host([variant=elevated]){
  background: ${scheme.color.surfaceContainerLow};
  color: ${scheme.color.primary};
  box-shadow: ${scheme.elevation.level1};
  &:host([pressed]){
    box-shadow: ${scheme.elevation.level2};
  }
}
:host([variant=text]){
  color: ${scheme.color.primary};
}
/**Checkable**/
:host([checkable]){
  &:host(:is([checked]:not([pressed]), [pressed]:not([checked]))){
    border-radius: 12px;
  }
  &:host(:not([variant])){
    background: ${scheme.color.surfaceContainer};
    color: ${scheme.color.onSurfaceVariant};
  }
  &:host([checked]){
    &:host(:is(:not([variant]), [variant=elevated])){
      background: ${scheme.color.primary};
      color: ${scheme.color.onPrimary};
    }
    &:host([variant=tonal]){
      background: ${scheme.color.secondary};
      color: ${scheme.color.onSecondary};
    }
    &:host([variant=outlined]){
      box-shadow: none;
      background: ${scheme.color.inverseSurface};
      color: ${scheme.color.inverseOnSurface};
    }
    &:host([variant=text]){
      background: ${scheme.color.primaryContainer};
      color: ${scheme.color.onPrimaryContainer};
    }
  }
}
/*Size*/
:host([size=extra-small]){
  height: 32px;
  gap: 4px;
  font-size: calc(var(--s-font-size, 1) * 11px);
  padding: 0 12px;
  border-radius: 16px;
  ::slotted(:is(svg, s-icon)){
    width: 16px;
  }
}
:host([size=small]){
  height: 36px;
  gap: 4px;
  font-size: calc(var(--s-font-size, 1) * 12px);
  padding: 0 16px;
  border-radius: 18px;
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
}
:host([size=large]){
  height: 48px;
  gap: 8px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  padding: 0 22px;
  border-radius: 24px;
  ::slotted(:is(svg, s-icon)){
    width: 24px;
  }
}
:host([size=extra-large]){
  height: 56px;
  gap: 8px;
  font-size: calc(var(--s-font-size, 1) * 18px);
  padding: 0 28px;
  border-radius: 28px;
  ::slotted(:is(svg, s-icon)){
    width: 28px;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot class="text" part="text"></slot>
<slot name="end"></slot>
<s-ripple part="ripple"></s-ripple>
`

export class Button extends useElement({
  style: [buttonStyle, buttonVariant, style],
  pressed: true,
  hovered: true,
  focused: true,
  props, template,
  setup() {
    this.addEventListener('click', () => {
      if (!this.checkable) return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
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
    } & Button
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