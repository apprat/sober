import { useProps, useElement, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  variant: ['filled', 'elevated', 'tonal', 'outlined'],
  size: ['small', 'extra-small', 'medium', 'large', 'extra-large'],
  disabled: false,
  checked: false,
})
const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  height: 40px;
  gap: 2px;
  border-radius: 20px;
  pointer-events: none;
  text-transform: capitalize;
  cursor: pointer;
  font-size: calc(var(--s-font-size, 1) * 14px);
  font-weight: 500;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  transition-property: height, font-size, color;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.btn{
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  cursor: inherit;
  outline-offset: inherit;
  outline-width: 3px;
  outline-color: currentColor;
  overflow: hidden;
  transition-property: padding, gap, border-radius, background-color, box-shadow;
  &:focus-visible{
    outline-style: solid;
  }
}
.layout{
  padding: 0 12px 0 16px;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  gap: 8px;
  &:is([pressed], [hover]){
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .text{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
}
.toggle{
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  &:is([hover], [pressed]){
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
}
svg,
::slotted(:is(svg, s-icon)[slot=toggle-icon]){
  fill: currentColor;
  color: currentColor;
  width: 22px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  transition-duration: inherit;
  transition-timing-function: inherit;
  margin-left: -1px;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon, s-loading, s-spinner)){
  fill: currentColor;
  color: currentColor;
  width: 20px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
:host([disabled]) .btn{
  pointer-events: none;
  background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  box-shadow: none !important;
}
:host([checked]) .toggle{
  border-radius: inherit;
  svg,
  ::slotted(:is(s-icon, svg)[slot=toggle-icon]){
    transform: rotate(-180deg);
    margin-left: 0;
  }
}
/**Variant**/
:host(:not([variant])){
  color: ${scheme.color.onPrimary};
  .btn{
    background: ${scheme.color.primary};
    outline-color: ${scheme.color.primary};
  }
}
:host([variant=elevated]){
  color: ${scheme.color.primary};
  .btn{
    background: ${scheme.color.surfaceContainerLow};
    box-shadow: ${scheme.elevation.level1};
  }
}
:host([variant=tonal]){
  color: ${scheme.color.onSecondaryContainer};
  .btn{
    background: ${scheme.color.secondaryContainer};
  }
}
:host([variant=outlined]){
  color: ${scheme.color.onSurfaceVariant};
  .btn{
    background: none;
    &::before{
      content: '';
      position: absolute;
      pointer-events: none;
      inset: 0;
      border: solid 1px ${scheme.color.outlineVariant};
      border-radius: inherit;
    }
  }
}
/**Size**/
:host([size=extra-small]){
  height: 32px;
  font-size: calc(var(--s-font-size, 1) * 12px);
  border-radius: 16px;
  .layout{
    gap: 4px;
    padding: 0 10px 0 12px;
    &:is([pressed], [hover]){
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  &:host(:not([checked])) .toggle:is([pressed], [hover]){
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
:host([size=medium]){
  height: 56px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  border-radius: 28px;
  .layout{
    padding: 0 24px;
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 24px;
  }
  svg,
  ::slotted(:is(svg, s-icon)[slot=toggle-icon]){
    width: 26px;
    margin-left: -2px;
  }
}
:host([size=large]){
  height: 96px;
  font-size: calc(var(--s-font-size, 1) * 26px);
  border-radius: 48px;
  .layout{
    padding: 0 48px;
    gap: 12px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    &:is([pressed], [hover]){
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
  &:host(:not([checked])) .toggle{
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    &:is([pressed], [hover]){
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 32px;
  }
  svg,
  ::slotted(:is(svg, s-icon)[slot=toggle-icon]){
    width: 38px;
    margin-left: -3px;
  }
}
:host([size=extra-large]){
  height: 136px;
  font-size: calc(var(--s-font-size, 1) * 32px);
  border-radius: 68px;
  .layout{
    padding: 0 64px;
    gap: 16px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    &:is([pressed], [hover]){
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
  &:host(:not([checked])) .toggle{
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    &:is([pressed], [hover]){
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  }
  ::slotted(:is(svg, s-icon, s-loading, s-spinner)){
    width: 40px;
  }
  svg,
  ::slotted(:is(svg, s-icon)[slot=toggle-icon]){
    width: 50px;
    margin-left: -6px;
  }
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]) .btn{
    background: ${scheme.color.surfaceContainerHigh} !important;
    color: ${scheme.color.outline} !important;
    box-shadow: none !important;
  }
}
`

const template = /*html*/`
<div class="layout btn" part="layout" tabindex="0" role="button">
  <slot name="start"></slot>
  <div class="text" part="text">
    <slot></slot>
  </div>
  <slot name="end"></slot>
  <s-ripple></s-ripple>
</div>
<div class="toggle btn" part="toggle" tabindex="0" role="toggle">
  <slot name="toggle"></slot>
  <slot name="toggle-icon">
    <svg viewBox="0 -960 960 960">
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
    </svg>
  </slot>
  <s-ripple></s-ripple>
</div>
`

export class SplitButton extends useElement({
  props, template, style,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const toggle = shadowRoot.querySelector<HTMLDivElement>('.toggle')!
    toggle.onclick = (e) => {
      e.stopPropagation()
      this.checked = !this.checked
      this.dispatchEvent(new Event('toggle'))
    }
    focusKeydownClick(layout, toggle)
    return {
      disabled: (v) => {
        layout.tabIndex = v ? -1 : 0
        toggle.tabIndex = v ? -1 : 0
      }
    }
  }
}) { }

const name = SplitButton.define('s-split-button')

declare global {
  interface HTMLElementTagNameMap {
    [name]: SplitButton
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
    } & SplitButton
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