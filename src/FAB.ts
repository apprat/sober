import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

type Props = {
  hidden: boolean,
  disabled: boolean,
}

const name = 's-fab'
const props: Props = {
  hidden: false,
  disabled: false,
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  min-height: 48px;
  font-size: .875rem;
  border-radius: 28px;
  font-weight: 500;
  white-space: nowrap;
  text-transform: capitalize;
  padding: 0 24px;
  transition-property: box-shadow, transform;
  transition-duration: var(--s-motion-duration-short4, ${Theme.motionDurationShort4});
  transition-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
}
:host([disabled=true]){
  pointer-events: none;
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
}
:host([hidden=true]){
  transform: scale(0);
  pointer-events: none;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon)){
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: currentColor;
}
::slotted(:is(svg, s-icon):not([slot])){
  margin: 16px -8px;
}
::slotted(:is(svg[slot=start], s-icon[slot=start])){
  margin-left: -8px;
  margin-right: 8px;
}
::slotted(:is(svg[slot=end], s-icon[slot=end])){
  margin-left: 8px;
  margin-right: -8px;
}
:host([pressed]){
  box-shadow: var(--s-elevation-level4, ${Theme.elevationLevel4});
}
@media (any-pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level4, ${Theme.elevationLevel4});
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple attached="true" part="ripple"></s-ripple>
`

class FloatingActionButton extends useElement({ style, template, props, syncProps: true }) { }

FloatingActionButton.define(name)

export { FloatingActionButton as FAB }

declare global {
  interface HTMLElementTagNameMap {
    [name]: FloatingActionButton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: Props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}