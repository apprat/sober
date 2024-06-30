import { useElement, JSXAttributes } from './core/element.js'

const name = 's-appbar'
const props = {
}

const style = /*css*/`
:host{
  display: flex;
  height: 64px;
  background: var(--s-color-surface-container, #f0edf1);
  color: var(--s-color-on-surface, #1c1b1f);
  align-items: center;
  padding: 0 8px;
}
slot[name=navigation]{
  display: block;
  flex-shrink: 0;
}
::slotted([slot=navigation]){
  margin: 0 4px;
}
slot[name=action]{
  display: block;
  flex-shrink: 0;
}
::slotted([slot=action]){
  margin: 0 4px;
}
::slotted(s-search){
  background: var(--s-color-surface, #fffbff);
}
::slotted(s-appbar){
  height: 100%;
  width: 100%;
  max-width: 1280px;
  padding: 0;
  background: none;
  margin: 0 auto;
}
.headline{
  overflow: hidden;
}
.grow{
  flex-grow: 1;
  min-width: 0;
  height: 100%;
}
::slotted([slot=headline]){
  font-size: 1.375rem;
  font-weight: 400;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 16px;
}
@media(max-width: 840px){
  :host{
    height: 56px;
  }
}
`

const template = /*html*/`
<slot name="navigation"></slot>
<div class="headline">
  <slot name="headline"></slot>
</div>
<div class="grow" part="view">
  <slot></slot>
</div>
<slot name="action"></slot>
`

export class Appbar extends useElement({ style, template, props }) { }

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