import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-icon-button'
const props = {
  disabled: false,
  type: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  flex-shrink: 0;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  position: relative;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
}
:host([type=filled]){
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
:host([type=filled][disabled=true]){
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
:host([type=filled]) ::slotted(s-badge[slot=badge]){
  outline: solid 2px currentColor;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([type=filled-tonal][disabled=true]){
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline, ${Theme.colorOutline})
}
:host([type=outlined][disabled=true]){
  border-color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface})) !important;
}
.ripple{
  border-radius: inherit;
}
.badge{
  position: absolute;
  top: -4px;
  right: -4px;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::slotted(:not([slot=badge])){
  color: inherit;
}
::slotted(svg){
  width: 24px;
  height: 24px;
  fill: currentColor;
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
<div class="badge">
  <slot name="badge"></slot>
</div>
`

export class IconButton extends useElement({ style, template, props, syncProps: true, }) { }

IconButton.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: IconButton
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
  export interface GlobalComponents {
    [name]: typeof props
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