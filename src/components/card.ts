import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  variant: ['elevated', 'filled', 'outlined'],
  disabled: false,
  readOnly: false
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 360px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition-property: box-shadow, background-color, color, opacity;
  background: ${scheme.color.surfaceContainerLow};
  box-shadow: ${scheme.elevation.level1};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.onSurface};
  outline-color: ${scheme.color.secondary};
}
.header{
  display: flex;
  align-items: center;
  .text{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
.actions{
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted([slot=header-avatar]){
  margin: 16px;
}
::slotted([slot=header-title]){
  font-size: calc(var(--s-font-size, 1) * 14px);
  line-height: calc(100% + 4px);
}
::slotted([slot=header-subtitle]){
  font-size: calc(var(--s-font-size, 1) * 12px);
  line-height: calc(100% + 4px);
  color: ${scheme.color.onSurfaceVariant};
}
::slotted(:is(s-icon-button)[slot=header-action]){
  margin: 16px 8px;
}
::slotted([slot=media]){
  height: 120px;
  background: ${scheme.color.surfaceContainerHigh};
}
::slotted([slot=title]){
  margin: 12px 16px;
  line-height: calc(100% + 8px);
  font-size: calc(var(--s-font-size, 1) * 20px);
}
::slotted([slot=subtitle]){
  margin: 12px 16px;
  line-height: calc(100% + 8px);
  font-size: calc(var(--s-font-size, 1) * 14px);
}
::slotted([slot=text]){
  margin: 12px 16px;
  font-size: calc(var(--s-font-size, 1) * 14px);
  line-height: calc(100% + 8px);
  color: ${scheme.color.onSurfaceVariant};
}
::slotted([slot=action]){
  margin: 16px 0;
}
:host([disabled]){
  opacity: .38 !important;
  pointer-events: none;
  background: ${scheme.color.surface} !important;
}
:host([variant=filled]){
  box-shadow: none;
  background: ${scheme.color.surfaceContainerHighest};
  &:host([disabled]){
    background: ${scheme.color.surfaceVariant} !important;
  }
}
:host([variant=outlined]){
  box-shadow: none;
  background: none;
  &::after{
    content: '';
    position: absolute;
    pointer-events: none;
    inset: 0;
    border-radius: inherit;
    border: solid 1px ${scheme.color.outlineVariant};
  }
  &:host([disabled]){
    &::after{
      opacity: .12;
      border-color: ${scheme.color.outline};
    }
  }
}
:host([readOnly]){
  cursor: auto;
  .ripple{
    --s-ripple-disabled: true;
    --s-ripple-disabled-hover: true;
  }
}
`


const template = /*html*/`
<div class="header" part="header">
  <slot name="header-avatar"></slot>
  <div class="text" part="header-text">
    <slot name="header-title"></slot>
    <slot name="header-subtitle"></slot>
  </div>
  <slot name="header-action"></slot>
</div>
<slot></slot>
<slot name="media"></slot>
<slot name="title"></slot>
<slot name="subtitle"></slot>
<slot name="text"></slot>
<div class="actions" part="actions">
  <slot name="action"></slot>
</div>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class Card extends useElement({
  states: ['focusable'],
  props, style, template,
  setup(shadowRoot) {
    const headerAction = shadowRoot.querySelector<HTMLSlotElement>('slot[name=header-action]')!
    const action = shadowRoot.querySelector<HTMLSlotElement>('slot[name=action]')!
    action.onpointerdown = headerAction.onpointerdown = (e) => e.stopPropagation()
  }
}) { }

const name = Card.define('s-card')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Card
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
    } & Card
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