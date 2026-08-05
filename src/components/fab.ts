import { useProps, useElement } from '../core/elements.js'
import { buttonStyle } from '../core/style/button.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  variant: ['primary', 'secondary', 'tertiary', 'surface', 'tonal-primary', 'tonal-secondary', 'tonal-tertiary'],
  size: ['small', 'medium', 'large'],
  disabled: false,
  hidden: false
})

const style = /*css*/`
:host{
  height: 56px;
  min-width: 56px;
  padding: 0 16px;
  gap: 8px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  border-radius: ${scheme.shape.corner.large};
  transition-property: height, min-width, color, background-color, box-shadow, padding, gap, border-radius, font-size, transform;
  box-shadow: ${scheme.elevation.level3};
}
:host(:not([variant])){
  background: ${scheme.color.primary};
  color: ${scheme.color.onPrimary};
  outline-color: ${scheme.color.primary};
}
:host([variant=secondary]){
  background: ${scheme.color.secondary};
  color: ${scheme.color.onSecondary};
  outline-color: ${scheme.color.secondary};
}
:host([variant=tertiary]){
  background: ${scheme.color.tertiary};
  color: ${scheme.color.onTertiary};
  outline-color: ${scheme.color.tertiary};
}
:host([variant=surface]){
  background: ${scheme.color.surfaceContainerHigh};
  color: ${scheme.color.onSurface};
}
:host([variant=tonal-primary]){
  background: ${scheme.color.primaryContainer};
  color: ${scheme.color.onPrimaryContainer};
}
:host([variant=tonal-secondary]){
  background: ${scheme.color.secondaryContainer};
  color: ${scheme.color.onSecondaryContainer};
}
:host([variant=tonal-tertiary]){
  background: ${scheme.color.tertiaryContainer};
  color: ${scheme.color.onTertiaryContainer};
}
:host([disabled]){
  box-shadow: ${scheme.elevation.level1} !important;
}
:host([hidden]){
  transform: scale(0);
  pointer-events: none;
}
:host([hover]){
  box-shadow: ${scheme.elevation.level4};
}
/*Size*/
:host([size=medium]){
  height: 80px;
  min-width: 80px;
  gap: 12px;
  border-radius: 20px;
  font-size: calc(var(--s-font-size, 1) * 22px);
  padding: 0 26px;
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
    width: 28px;
  }
}
:host([size=large]){
  height: 96px;
  min-width: 96px;
  gap: 16px;
  border-radius: 28px;
  font-size: calc(var(--s-font-size, 1) * 24px);
  padding: 0 28px;
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
    width: 36px;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class Fab extends useElement({
  style: [buttonStyle, style],
  states: ['focusable'],
  props, template,
}) { }

const name = Fab.define('s-fab')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Fab
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
    } & Fab
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