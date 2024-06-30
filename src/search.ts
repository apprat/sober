import { useElement, JSXAttributes } from './core/element.js'

const name = 's-search'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large'
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  max-width: 520px;
  min-width: 240px;
  height: 48px;
  background: var(--s-color-surface-container-high, #eae7ec);
  color: var(--s-color-on-surface, #1c1b1f);
  border-radius: 24px;
  font-size: .875rem;
  position: relative;
}
:host([size=small]){
  height: 40px;
  min-width: 196px;
  border-radius: 20px;
}
:host([size=large]){
  height: 56px;
  min-width: 280px;
  font-size: 1rem;
  border-radius: 28px;
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  flex-grow: 1;
}
:host(:focus-within) .container{
  z-index: 1;
}
.dropdown{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  background: inherit;
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  border-radius: 4px;
  opacity: 0;
  transition: opacity .12s;
}
:host(:focus-within) .dropdown{
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}
::slotted([slot=dropdown]){
  border-top: solid 1px var(--s-color-outline-variant, #c7c5d0);
  margin-top: 48px;
  border-radius: 4px;
}
:host([size=small]:focus-within) ::slotted([slot=dropdown]){
  margin-top: 40px;
}
:host([size=large]:focus-within) ::slotted([slot=dropdown]){
  margin-top: 56px;
}
::slotted(input[type=text]){
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 100%;
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
  color: var(--s-color-outline, #777680);
}
:host([size=large]) ::slotted(input[type=text]){
  padding: 0 24px;
}
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
`

const template = /*html*/`
<div class="dropdown" part="dropdown">
  <slot name="dropdown"></slot>
</div>
<div class="container" part="container">
  <slot name="start"></slot>
  <slot></slot>
  <slot name="end"></slot>
</div>
`

export class Search extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const dropdown = shadowRoot.querySelector('[name=dropdown]') as HTMLSlotElement
    dropdown.addEventListener('mousedown', (e) => e.preventDefault())
  }
}) { }

Search.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Search
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}