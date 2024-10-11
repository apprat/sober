import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-fab'
const props = {
  size: 'medium' as 'medium' | 'small',
  extended: false,
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
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  width: 56px;
  border-radius: 16px;
  background: var(--s-color-primary-container, ${Theme.colorPrimaryContainer});
  color: var(--s-color-on-primary-container, ${Theme.colorOnPrimaryContainer});
  transition: box-shadow .1s ease-out;
  font-size: .875rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  text-transform: capitalize;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
}
:host([size=small]){
  width: 48px;
  border-radius: 12px;
}
:host([extended=true]){
  padding: 0 16px;
  aspect-ratio: auto;
  -webkit-aspect-ratio: auto;
  width: auto;
  height: 48px;
}
::slotted(s-icon){
  color: currentColor;
}
::slotted(svg){
  width: 24px;
  height: 24px;
  fill: currentColor;
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

export class FAB extends useElement({ style, template, props, syncProps: true }) { }

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