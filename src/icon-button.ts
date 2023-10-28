import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--s-color-on-surface-variant);
  position: relative;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([type=filled]){
  color: var(--s-color-on-primary);
  background: var(--s-color-primary);
}
:host([type=filled][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
}
:host([type=filled-tonal]){
  color: var(--s-color-on-secondary-container);
  background: var(--s-color-secondary-container);
}
:host([type=filled-tonal][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline);
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
`

const name = 's-icon-button'
const props = {
  disabled: false,
  type: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        ${RippleFragment(this, true)}
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}