import { useElement, useProps } from '../core/element.js'
import { Theme } from '../core/theme.js'
import { buttonStyle, buttonVariant } from '../core/style/button.js'
import './ripple.js'

const name = 's-icon-button'
const props = useProps({
  variant: ['standard', 'filled', 'tonal', 'outlined'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  width: ['default', 'wide', 'narrow'],
  disabled: false,
  checkable: false,
  checked: false,
})

const style = /*css*/`
:host{
  border-radius: 20px;
  width: 40px;
  height: 40px;
  transition-property: all;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  --icon-button-icon-transform: none;
  --icon-button-icon-transition: none;
}
:host([variant=filled]){
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
/**Checkable**/
:host([checkable=true][checked=true]:not([pressed])),
:host([checkable=true][pressed]:not([checked=true])){
  border-radius: 12px;
}
:host(:not([variant])[checkable=true][checked=true]){
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
}
:host([variant=filled][checkable=true]:not([checked=true])){
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
  color: var(--s-color-on-surface-variant,${Theme.colorOnSurfaceVariant});
}
:host([variant=tonal][checkable=true][checked=true]){
  background: var(--s-color-secondary, ${Theme.colorSecondary});
  color: var(--s-color-on-secondary, ${Theme.colorOnSecondary});
}
:host([variant=outlined][checkable=true][checked=true]){
  box-shadow: none;
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
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
}
:host([width=wide][size=extra-small]){
  width: 40px;
}
:host([width=wide][size=small]){
  width: 44px;
}
:host([width=wide][size=large]){
  width: 64px;
}
:host([width=wide][size=extra-large]){
  width: 72px;
}
:host([width=narrow]){
  width: 32px;
}
:host([width=narrow][size=extra-small]){
  width: 28px;
}
:host([width=narrow][size=small]){
  width: 30px;
}
:host([width=narrow][size=large]){
  width: 40px;
}
:host([width=narrow][size=extra-large]){
  width: 48px;
}
::slotted(:is(svg, s-icon)){
  flex-shrink: 1;
}
::slotted(s-badge){
  position: absolute;
  right: 2px;
  top: 2px; 
}
`

const template = /*html*/`
<slot></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class IconButton extends useElement({
  props, template, focused: true, style: [buttonStyle, buttonVariant, style],
  setup() {
    this.addEventListener('click', () => {
      if (!this.checkable || !this.dispatchEvent(new Event('change', { cancelable: true, bubbles: true }))) return
      this.checked = !this.checked
    })
  }
}) { }

IconButton.define(name)

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