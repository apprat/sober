import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-fab'
const props = {
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
  flex-shrink: 0;
  height: 56px;
  font-size: .875rem;
  border-radius: 16px;
  transition: box-shadow .1s ease-out, transform .1s ease-out;
  font-weight: 500;
  white-space: nowrap;
  text-transform: capitalize;
  padding: 0 16px;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
}
:host([disabled=true]){
  pointer-events: none;
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([hidden=true]){
  transform: scale(0);
  pointer-events: none;
}
::slotted(*){
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: currentColor;
}
::slotted(s-icon[slot=start]),
::slotted(svg[slot=start]){
  margin: 0 8px 0 0;
}
::slotted(s-icon[slot=end]),
::slotted(svg[slot=end]){
  margin: 0 0 0 8px;
}
:host([rippled]){
  box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level3, ${Theme.elevationLevel3});
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple attached="true" part="ripple"></s-ripple>
`

class SFloatingActionButton extends useElement({ style, template, props, syncProps: true }) { }

SFloatingActionButton.define(name)

export { SFloatingActionButton as FAB }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SFloatingActionButton
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
  export interface GlobalComponents {
    [name]: typeof props
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