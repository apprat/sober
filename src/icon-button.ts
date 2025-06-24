import { useElement, useProps } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'
import { buttonStyle, buttonVariant } from './core/style/button.js'

const name = 's-icon-button'
const props = useProps({
  variant: ['standard', 'filled', 'tonal', 'outlined'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  width: ['default', 'narrow', 'wide'],
  disabled: false,
  checkable: false,
  checked: false,
})

const style = /*css*/`
:host{
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
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
  color: var(--s-color-primary,${Theme.colorPrimary});
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
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
}
:host([size=small]){
  width: 36px;
  ::slotted(:is(svg, s-icon)){
    width: 20px;
  }
}
:host([size=large]){
  width: 48px;
}
:host([size=extra-large]){
  width: 56px;
}
::slotted(:is(svg, s-icon)){
  flex-shrink: 1;
  width: 24px;
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