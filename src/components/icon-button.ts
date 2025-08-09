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
})

const style = /*css*/`
:host{
  border-radius: 20px;
  width: 40px;
  height: 40px;
  transition-property: all;
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
  --icon-button-transform: none;
}
:host([variant=filled]){
  background: var(--s-color-primary, ${scheme.color.primary});
  color: var(--s-color-on-primary, ${scheme.color.onPrimary});
}
/**Checkable**/
:host([checkable=true][checked=true]:not([pressed])),
:host([checkable=true][pressed]:not([checked=true])){
  border-radius: 12px;
}
:host(:not([variant])[checkable=true][checked=true]){
  background: var(--s-color-primary-container, ${scheme.color.primaryContainer});
  color: var(--s-color-on-primary-container, ${scheme.color.onPrimaryContainer});
}
:host([variant=filled][checkable=true]:not([checked=true])){
  background: var(--s-color-surface-container, ${scheme.color.surfaceContainer});
  color: var(--s-color-on-surface-variant,${scheme.color.onSurfaceVariant});
}
:host([variant=tonal][checkable=true][checked=true]){
  background: var(--s-color-secondary, ${scheme.color.secondary});
  color: var(--s-color-on-secondary, ${scheme.color.onSecondary});
}
:host([variant=outlined][checkable=true][checked=true]){
  box-shadow: none;
  background: var(--s-color-inverse-surface, ${scheme.color.inverseSurface});
  color: var(--s-color-inverse-on-surface, ${scheme.color.inverseOnSurface});
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
  name: 's-icon-button',
  style: [buttonStyle, buttonVariant, style],
  focused: true,
  props, template,
  setup() {
    this.addEventListener('click', () => {
      if (!this.checkable || !this.dispatchEvent(new Event('change', { cancelable: true, bubbles: true }))) return
      this.checked = !this.checked
    })
  }
}) { }

IconButton.define()

declare global {
  interface HTMLElementTagNameMap {
    [IconButton.tagName]: IconButton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [IconButton.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [IconButton.tagName]: new () => {
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
      [IconButton.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [IconButton.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [IconButton.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}