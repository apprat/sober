import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle, buttonVariant } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['standard', 'filled', 'tonal', 'outlined'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  width: ['default', 'wide', 'narrow'],
  disabled: false,
  checkable: false,
  checked: false,
  $value: ''
})

const style = /*css*/`
:host{
  border-radius: 20px;
  width: 40px;
  height: 40px;
  transition-property: all;
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
  ::slotted(:is(svg, s-icon)){
    flex-shrink: 1;
  }
  ::slotted(s-badge){
    position: absolute;
    right: 2px;
    top: 2px; 
  }
}
:host([variant=filled]){
  background: var(--s-color-primary, ${scheme.color.primary});
  color: var(--s-color-on-primary, ${scheme.color.onPrimary});
}
/**Checkable**/
:host([checkable]){
  &:host(:is([checked]:not([pressed]), [pressed]:not([checked]))){
    border-radius: 12px;
  }
  &:host(:is(:not([variant]), [variant=filled])){
    background: var(--s-color-surface-container, ${scheme.color.surfaceContainer});
    color: var(--s-color-on-surface-variant,${scheme.color.onSurfaceVariant});
  }
  &:host([checked]){
    &:host(:not([variant])){
      background: var(--s-color-primary-container, ${scheme.color.primaryContainer});
      color: var(--s-color-on-primary-container, ${scheme.color.onPrimaryContainer});
    }
    &:host([variant=filled]){
      background: var(--s-color-primary, ${scheme.color.primary});
      color: var(--s-color-on-primary,${scheme.color.onPrimary});
    }
    &:host([variant=tonal]){
      background: var(--s-color-secondary, ${scheme.color.secondary});
      color: var(--s-color-on-secondary, ${scheme.color.onSecondary});
    }
    &:host([variant=outlined]){
      box-shadow: none;
      background: var(--s-color-inverse-surface, ${scheme.color.inverseSurface});
      color: var(--s-color-inverse-on-surface, ${scheme.color.inverseOnSurface});
    }
  }
}
/*Size*/
:host([size=extra-small]){
  width: 32px;
  height: 32px;
  border-radius: 16px;
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
}
:host([size=small]){
  width: 36px;
  height: 36px;
  border-radius: 18px;
  ::slotted(:is(svg, s-icon)){
    width: 20px;
  }
}
:host([size=large]){
  width: 48px;
  height: 48px;
  border-radius: 24px;
}
:host([size=extra-large]){
  width: 56px;
  height: 56px;
  border-radius: 28px;
}
/*Width*/
:host([width=wide]){
  width: 52px;
  &:host([size=extra-small]){
    width: 40px;
  }
  &:host([size=small]){
    width: 44px;
  }
  &:host([size=large]){
    width: 64px;
  }
  &:host([size=extra-large]){
    width: 72px;
  }
}
:host([width=narrow]){
  width: 32px;
  &:host([size=extra-small]){
    width: 28px;
  }
  &:host([size=small]){
    width: 30px;
  }
  &:host([size=large]){
    width: 40px;
  }
  &:host([size=extra-large]){
    width: 48px;
  }
}
::slotted(:is(svg, s-icon)){
  transition-duration: inherit;
  transition-timing-function: inherit;
  transform: var(--s-icon-button-transform, none);
}
`

const template = /*html*/`
<slot></slot>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class IconButton extends useElement({
  style: [buttonStyle, buttonVariant, style],
  focused: true,
  pressed: true,
  hovered: true,
  props, template,
  setup() {
    this.addEventListener('click', () => {
      if (!this.checkable) return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
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
    } & IconButton
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