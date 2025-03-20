import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

type Props = {
  disabled: boolean
  type: 'filled' | 'elevated' | 'filled-tonal' | 'outlined' | 'text'
}

const name = 's-button'
const props: Props = {
  disabled: false,
  type: 'filled'
}

const style = /*css*/`
:host{
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
  max-width: 100%;
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
  transition: box-shadow var(--s-motion-duration-short4, ${Theme.motionDurationShort4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
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
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=elevated][disabled=true]){
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
::slotted(*){
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon, s-circular-progress)){
  fill: currentColor;
  color: currentColor;
  width: 18px;
  height: 18px;
}
::slotted(:is(svg[slot=start], s-icon[slot=start])){
  margin-right: 4px;
  margin-left: -8px;
}
::slotted(:is(svg[slot=end], s-icon[slot=end])){
  margin-right: -8px;
  margin-left: 4px;
}
::slotted(s-circular-progress[slot=start]){
  margin-left: -8px;
  margin-right: 8px;
}
::slotted(s-circular-progress[slot=end]){
  margin-left: 8px;
  margin-right: -8px;
}
:host([type=text]) ::slotted(:is(s-icon[slot=start], svg[slot=start])){
  margin-left: -4px;
  margin-right: 4px;
}
:host([type=text]) ::slotted(:is(s-icon[slot=end], svg[slot=end])){
  margin-left: 4px;
  margin-right: -4px;
}
:host(:not([type])[pressed]){
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=elevated][pressed]){
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
}
.text{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
@media (any-pointer: fine){
  :host(:not([type]):hover){
    box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  }
  :host([type=elevated]:hover){
    box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

class Button extends useElement({ style, template, props, syncProps: true, }) { }

Button.define(name)

export { Button }


declare global {
  interface HTMLElementTagNameMap {
    [name]: Button
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
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      $props: HTMLAttributes & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
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