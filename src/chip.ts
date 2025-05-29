import { useElement, useProps } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-chip'
const props = useProps({
  type: ['filled', 'outlined'],
  $value: '',
  checked: false,
  disabled: false,
  clickable: false,
})

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 16px;
  height: 32px;
  border-radius: 16px;
  box-sizing: border-box;
  font-size: .8125rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  transition-property: color, background-color, box-shadow;
  transition-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  transition-duration: var(--s-motion-duration-short4, ${Theme.motionDurationShort4});
}
:host([disabled=true]){
  pointer-events: none !important;
  border-color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
  background: color-mix(in srgb, var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) 38%, transparent) !important;
}
:host([checked=true]){
  border: none;
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([type=outlined]){
  background: none;
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
:host([type=outlined][checked=true]){
  border-color: var(--s-color-primary, ${Theme.colorPrimary});
}
::slotted(:is(s-icon, svg)){
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: currentColor;
  color: currentColor;
}
::slotted(:is(s-icon[slot=start], svg[slot=start])){
  margin-left: -8px;
  margin-right: 8px;
}
::slotted(:is(s-icon[slot=end], svg[slot=end])){
  margin-left: 8px;
  margin-right: -8px;
}
::slotted(s-avatar){
  width: 24px;
  height: 24px;
  font-size: .75rem;
}
::slotted(s-avatar[slot=start]){
  margin-left: -12px;
  margin-right: 8px;
}
::slotted(s-icon-button[slot=action]){
  margin: 0 -12px 0 8px;
  width: 24px;
  height: 24px;
  padding: 3px;
  color: currentColor;
}
.text{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
:host(:not([clickable=true])) .ripple{
  display: none;
}
@supports not (color: color-mix()){
  :host([disabled=true]){
    background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) !important;
    color: var(--s-color-outline, ${Theme.colorOutline}) !important;
    border-color: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) !important;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<slot name="action"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class Chip extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const action = shadowRoot.querySelector<HTMLElement>('slot[name=action]')!
    action.onclick = (e) => e.stopPropagation()
    action.onpointerdown = (e) => e.stopPropagation()
    this.addEventListener('click', () => {
      if (!this.clickable) return
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
  }
}) { }

Chip.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Chip
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
      $props: HTMLAttributes & Partial<typeof props>
    } & Chip
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}