import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  max-width: 520px;
  min-width: 240px;
  height: 48px;
  background: var(--s-color-surface-container-high, #e8e8eb);
  color: var(--s-color-on-surface, #1a1c1e);
  border-radius: var(--s-shape-corner-full, 7680px);
  font-size: .875rem;
  position: relative;
}
:host([size=small]){
  height: 40px;
  min-width: 196px;
}
:host([size=large]){
  height: 56px;
  min-width: 280px;
  font-size: 1rem;
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}
::slotted([slot=drop]){
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity .1s;
  overflow-y: auto;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  padding-top: 48px;
  background: var(--s-color-surface-container-high, #e8e8eb);
}
:host(:focus-within) ::slotted([slot=drop]){
  opacity: 1;
  pointer-events: auto;
}
:host(:focus-within) ::slotted([slot=drop])::before{
  content: '';
  height: 48px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: solid 1px var(--s-color-outline-variant, #c1c7ce);
}
:host([size=small]:focus-within) ::slotted([slot=drop])::before{
  height: 40px;
}
:host([size=large]:focus-within) ::slotted([slot=drop])::before{
  height: 56px;
}
::slotted(input[type=text]){
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  max-width: 240px;
  flex-grow: 1;
  background: none;
  outline: none;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
}
::slotted(input[type=text])::placeholder{
  color: var(--s-color-outline, #72787e);
}
:host([size=large]) ::slotted(input[type=text]){
  padding: 0 24px;
}
::slotted([slot]),
::slotted([slot]){
  flex-shrink: 0;
}
::slotted(s-icon[slot=start]){
  margin: 0 -6px 0 12px;
}
::slotted(s-icon[slot=end]){
  margin: 0 12px 0 -6px;
}
:host([size=small]) ::slotted(s-icon-button[slot=start]),
:host([size=small]) ::slotted(s-icon-button[slot=end]){
  width: 40px;
  height: 40px;
}
::slotted(s-icon-button[slot=start]){
  margin: 0 -12px 0 4px;
}
::slotted(s-icon-button[slot=end]){
  margin: 0 4px 0 -12px;
}
:host([size=small]) ::slotted(s-icon-button[slot=start]){
  margin: 0 -12px 0 0;
}
:host([size=small]) ::slotted(s-icon-button[slot=end]){
  margin: 0 0 0 -12px;
}
:host([size=small]) ::slotted(s-icon[slot=start]){
  margin: 0 -6px 0 8px;
}
:host([size=small]) ::slotted(s-icon[slot=end]){
  margin: 0 8px 0 -6px;
}
:host([size=large]) ::slotted(s-icon-button[slot=start]){
  margin: 0 -16px 0 8px;
}
:host([size=large]) ::slotted(s-icon-button[slot=end]){
  margin: 0 8px 0 -16px;
}
:host([size=large]) ::slotted(s-icon[slot=start]){
  margin: 0 -8px 0 16px;
}
:host([size=large]) ::slotted(s-icon[slot=end]){
  margin: 0 16px 0 -8px;
}
@media (pointer: fine){
  ::slotted([slot=drop])::-webkit-scrollbar{
    display: none;
  }
}
`

const name = 's-search'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large'
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <slot name="drop" @pointerdown.prevent></slot>
        <div class="container">
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </div>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}