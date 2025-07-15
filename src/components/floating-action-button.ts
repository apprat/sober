import { useProps, useEvents, useElement } from '../core/element.js'
import { buttonStyle } from '../core/style/button.js'
import { Theme } from '../core/theme.js'
import './ripple.js'

const props = useProps({
  variant: ['primary', 'secondary', 'tertiary', 'tonal-primary', 'tonal-secondary', 'tonal-tertiary'],
  size: ['medium', 'small', 'large'],
  disabled: false,
})
const events = useEvents({
  show: Event,
  change: CustomEvent
})

const style = /*css*/`
:host{
  min-height: 56px;
  min-width: 56px;
  padding: 0 20px;
  border-radius: 16px;
  gap: 6px;
  font-size: 1rem;
  transition-property: border-radius, color, background-color, box-shadow;
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  --fab-icon-transform: none;
  --fab-icon-transition: none;
}
:host(:not([variant])){
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
:host([variant=secondary]){
  background: var(--s-color-secondary, ${Theme.colorSecondary});
  color: var(--s-color-on-secondary, ${Theme.colorOnSecondary});
}
:host([variant=tertiary]){
  background: var(--s-color-tertiary, ${Theme.colorTertiary});
  color: var(--s-color-on-tertiary, ${Theme.colorOnTertiary});
}
:host([variant=tonal-primary]){
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
}
:host([variant=tonal-secondary]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([variant=tonal-tertiary]){
  background: var(--s-color-tertiary-container, ${Theme.colorTertiaryContainer});
  color: var(--s-color-on-tertiary-container, ${Theme.colorOnTertiaryContainer});
}
:host([disabled=true]){
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2}) !important;
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
  box-shadow: var(--s-elevation-level4, ${Theme.elevationLevel4});
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class FloatingActionButton extends useElement({
  name: 's-fab',
  style: [buttonStyle, style],
  focused: true,
  props, template, events,
}) { }

export { FloatingActionButton as FAB }

declare global {
  interface HTMLElementTagNameMap {
    [FloatingActionButton.tagName]: FloatingActionButton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [FloatingActionButton.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [FloatingActionButton.tagName]: new () => {
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
      [FloatingActionButton.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [FloatingActionButton.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [FloatingActionButton.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}