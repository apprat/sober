import { useElement, useProps } from './core/element.js'
import { Theme } from './core/theme.js'
import { buttonStyle, buttonVariant } from './core/style/button.js'
import './ripple.js'

const name = 's-button'
const props = useProps({
  variant: ['filled', 'elevated', 'tonal', 'outlined', 'text'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
  disabled: false,
  checkable: false,
  checked: false,
})

const style = /*css*/`
:host{
  border-radius: 20px;
  padding: 0 18px;
  height: 40px;
  gap: 6px;
  min-width: 56px;
  transition-property: border-radius, color, background-color, box-shadow;
}
:host(:not([variant])),
:host([checkable=true][checked=true]:not([variant])),
:host([variant=elevated][checkable=true][checked=true]){
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
:host([variant=elevated]){
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  color: var(--s-color-primary, ${Theme.colorPrimary});
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([variant=text]){
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
/**Checkable**/
:host(:not([variant])[checkable=true]){
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
  color: var(--s-color-on-surface-variant,${Theme.colorOnSurfaceVariant});
}
:host([checkable=true][checked=true]:not([pressed])),
:host([checkable=true][pressed]:not([checked=true])){
  border-radius: 12px;
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
:host([variant=text][checkable=true][checked=true]){
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
}
/*Size*/
:host([size=extra-small]){
  height: 32px;
  gap: 4px;
  font-size: .6875rem;
  padding: 0 12px;
  border-radius: 16px;
  ::slotted(:is(svg, s-icon)){
    width: 16px;
  }
}
:host([size=small]){
  height: 36px;
  gap: 4px;
  font-size: .75rem;
  padding: 0 16px;
  border-radius: 18px;
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
}
:host([size=large]){
  height: 48px;
  gap: 8px;
  font-size: 1rem;
  padding: 0 20px;
  border-radius: 24px;
  ::slotted(:is(svg, s-icon)){
    width: 24px;
  }
}
:host([size=extra-large]){
  height: 56px;
  gap: 8px;
  font-size: 1.125rem;
  padding: 0 24px;
  border-radius: 28px;
  ::slotted(:is(svg, s-icon)){
    width: 28px;
  }
}
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
  margin-left: -2px;
}
::slotted(:is(svg, s-icon)[slot=end]){
  margin-right: -2px;
}
:host([variant=elevated][pressed]){
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
}

`

const template = /*html*/`
<slot name="start"></slot>
<slot class="text" part="text"></slot>
<slot name="end"></slot>
<s-ripple attached="true" part="ripple"></s-ripple>
`

export class Button extends useElement({
  props, template, focused: true, style: [buttonStyle, buttonVariant, style],
  setup() {
    this.addEventListener('click', () => {
      if (!this.checkable || !this.dispatchEvent(new Event('change', { cancelable: true, bubbles: true }))) return
      this.checked = !this.checked
    })
  }
}) { }

Button.define(name)

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