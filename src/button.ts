import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-button'
const props = {
  disabled: false,
  type: 'filled' as 'filled' | 'elevated' | 'filled-tonal' | 'outlined' | 'text'
}

const style = /*css*/`
:host{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  vertical-align: middle;
  border-radius: 20px;
  padding: 0 24px;
  height: 40px;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  white-space: nowrap;
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
  -webkit-transition: -webkit-box-shadow .1s ease-out;
  transition: -webkit-box-shadow .1s ease-out;
  -o-transition: box-shadow .1s ease-out;
  transition: box-shadow .1s ease-out;
  transition: box-shadow .1s ease-out, -webkit-box-shadow .1s ease-out;
  overflow: hidden;
}
:host([disabled=true]){
  pointer-events: none !important;
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
}
:host([type=elevated]){
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  color: var(--s-color-primary, ${Theme.colorPrimary});
  -webkit-box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=elevated][disabled=true]){
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline, ${Theme.colorOutline});
  background: none;
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
:host([type=text]){
  background: none;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  padding: 0 16px;
}
:host([type=text][disabled=true]){
  background: none !important;
}
.ripple{
  border-radius: 0;
}
::slotted(*){
  fill: currentColor;
  color: currentColor;
  width: 18px;
  height: 18px;
}
::slotted(s-icon[slot=start]),
::slotted(svg[slot=start]){
  margin: 0 4px 0 -8px;
}
::slotted(s-icon[slot=end]),
::slotted(svg[slot=end]){
  margin: 0 -8px 0 4px;
}
::slotted(s-circular-progress[slot=start]){
  margin: 0 8px 0 -8px;
}
::slotted(s-circular-progress[slot=end]){
  margin: 0 -8px 0 8px;
}
:host([type=text]) ::slotted(s-icon[slot=start]),
:host([type=text]) ::slotted(svg[slot=start]){
  margin: 0 4px 0 -4px;
}
:host([type=text]) ::slotted(s-icon[slot=end]),
:host([type=text]) ::slotted(svg[slot=end]){
  margin: 0 -4px 0 4px;
}
:host([rippled]){
  -webkit-box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=elevated][rippled]){
  -webkit-box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
}
:host([type=filled-tonal][rippled]),
:host([type=outlined][rippled]),
:host([type=text][rippled]){
  -webkit-box-shadow: none;
  box-shadow: none;
}
@media (pointer: fine){
  :host([type=elevated]:hover){
    -webkit-box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
    box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  }
  :host(:hover){
    -webkit-box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
    box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  }
  :host([type=filled-tonal]:hover),
  :host([type=outlined]:hover),
  :host([type=text]:hover){
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
`

const template = /*html*/ `
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class Button extends useElement({ style, template, props, syncProps: true, }) { }

Button.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Button
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}