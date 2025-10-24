import { useProps, useElement } from '../core/element.js'
import { buttonStyle } from '../core/style/button.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  variant: ['primary', 'secondary', 'tertiary', 'tonal-primary', 'tonal-secondary', 'tonal-tertiary'],
  size: ['medium', 'small', 'large'],
  disabled: false,
  hidden: false
})

const style = /*css*/`
:host{
  min-height: 56px;
  min-width: 56px;
  padding: 0 20px;
  gap: 6px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  transition-property: border-radius, color, background-color, box-shadow, transform;
  box-shadow: var(--s-elevation-level3, ${scheme.elevation.level3});
  border-radius: 16px;
}
:host(:not([variant])){
  background: var(--s-color-primary, ${scheme.color.primary});
  color: var(--s-color-on-primary, ${scheme.color.onPrimary});
}
:host([variant=secondary]){
  background: var(--s-color-secondary, ${scheme.color.secondary});
  color: var(--s-color-on-secondary, ${scheme.color.onSecondary});
}
:host([variant=tertiary]){
  background: var(--s-color-tertiary, ${scheme.color.tertiary});
  color: var(--s-color-on-tertiary, ${scheme.color.onTertiary});
}
:host([variant=tonal-primary]){
  background: var(--s-color-primary-container, ${scheme.color.primaryContainer});
  color: var(--s-color-on-primary-container, ${scheme.color.onPrimaryContainer});
}
:host([variant=tonal-secondary]){
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
  color: var(--s-color-on-secondary-container, ${scheme.color.onSecondaryContainer});
}
:host([variant=tonal-tertiary]){
  background: var(--s-color-tertiary-container, ${scheme.color.tertiaryContainer});
  color: var(--s-color-on-tertiary-container, ${scheme.color.onTertiaryContainer});
}
:host([disabled]){
  box-shadow: var(--s-elevation-level2, ${scheme.elevation.level2}) !important;
}
:host([hidden]){
  transform: scale(0);
  pointer-events: none;
}
/*Size*/
:host([size=small]){
  min-height: 48px;
  min-width: 48px;
  border-radius: 14px;
  font-size: calc(var(--s-font-size, 1) * 14px);
  padding: 0 18px;
}
:host([size=large]){
  min-height: 64px;
  min-width: 64px;
  border-radius: 18px;
  font-size: calc(var(--s-font-size, 1) * 18px);
  padding: 0 24px;
}
::slotted(:is(svg, s-icon):not([slot])){
  margin: 0 -24px;
}
::slotted(:is(svg, s-icon)[slot=start]){
  margin-left: -2px;
}
::slotted(:is(svg, s-icon)[slot=end]){
  margin-right: -2px;
}
:host([pressed]){
  box-shadow: var(--s-elevation-level4, ${scheme.elevation.level4});
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class FAB extends useElement({
  style: [buttonStyle, style],
  focused: true,
  props, template,
}) { }

export { FAB as FloatingActionButton }

const name = FAB.define('s-fab')

declare global {
  interface HTMLElementTagNameMap {
    [name]: FAB
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
    } & FAB
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