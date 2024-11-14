import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-fab'
const props = {
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
  border-radius: 16px;
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
  transition: box-shadow .1s ease-out;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  text-transform: capitalize;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  padding: 0 16px;
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

export class FAB extends useElement({ style, template, props }) { }

FAB.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: FAB
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}