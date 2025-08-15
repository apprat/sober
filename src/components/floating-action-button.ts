import { useProps, useElement } from '../core/element.js'
import { buttonStyle } from '../core/style/button.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  variant: ['primary', 'secondary', 'tertiary', 'tonal-primary', 'tonal-secondary', 'tonal-tertiary'],
  size: ['medium', 'small', 'large'],
  disabled: false,
})
const events = {
  show: Event,
  change: CustomEvent
}

const style = /*css*/`
:host{
  min-height: 56px;
  min-width: 56px;
  padding: 0 20px;
  border-radius: 16px;
  gap: 6px;
  font-size: 1rem;
  transition-property: border-radius, color, background-color, box-shadow;
  box-shadow: var(--s-elevation-level3, ${scheme.elevation.level3});
  --fab-icon-transform: none;
  --fab-icon-transition: none;
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
:host([disabled=true]){
  box-shadow: var(--s-elevation-level2, ${scheme.elevation.level2}) !important;
}
/*Size*/
:host([size=small]){
  min-height: 48px;
  min-width: 48px;
  border-radius: 14px;
  font-size: .875rem;
  padding: 0 18px;
}
:host([size=large]){
  min-height: 64px;
  min-width: 64px;
  border-radius: 18px;
  font-size: 1.125rem;
  padding: 0 24px;
}
::slotted(:is(svg, s-icon)){
  transform: var(--fab-icon-transform);
  transition: var(--fab-icon-transition);
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
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class FloatingActionButton extends useElement({
  style: [buttonStyle, style],
  focused: true,
  props, template, events,
}) { }

export { FloatingActionButton as FAB }

const name = FloatingActionButton.define('s-fab')

declare global {
  interface HTMLElementTagNameMap {
    [name]: FloatingActionButton
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
    } & FloatingActionButton
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