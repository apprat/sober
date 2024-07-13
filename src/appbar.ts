import { useElement, JSXAttributes } from './core/element.js'

const name = 's-appbar'
const props = {
}

const style = /*css*/`
:host{
  display: flex;
  height: 64px;
  background: var(--s-color-surface-container, #f0edf1);
  align-items: center;
  position: relative;
  padding: 0 8px;
}
::slotted([slot=navigation]){
  margin-left: 4px;
  flex-shrink: 0;
}
::slotted([slot=logo]){
  margin-left: 12px;
  height: 32px;
  fill: var(--s-color-on-surface-variant, #46464f);
  flex-shrink: 0;
}
::slotted([slot=headline]){
  font-size: 1.375rem;
  font-weight: 400;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 12px;
  color: var(--s-color-on-surface, #1c1b1f);
}
::slotted([slot=action]){
  margin: 0 4px;
  flex-shrink: 0;
}
.view{
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
::slotted(s-search){
  background: var(--s-color-surface, #fffbff);
}
::slotted(s-appbar){
  height: 100%;
  width: 100%;
  max-width: 1280px;
  background: none;
  margin: 0 auto;
  padding: 0;
}
@media(max-width: 840px){
  :host{
    height: 56px;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot name="navigation"></slot>
<slot name="logo"></slot>
<slot name="headline"></slot>
<div class="view" part="view">
  <slot></slot>
</div>
<slot name="action"></slot>
<slot name="end"></slot>
`

export class Appbar extends useElement({
  style, template, props
}) { }

Appbar.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Appbar
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}