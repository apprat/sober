import { useElement } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-chip'
const props = {
  type: 'outlined' as 'outlined' | 'elevated' | 'filled-tonal',
  clickable: false
}

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 16px;
  flex-shrink: 0;
  height: 32px;
  border: solid 1px var(--s-color-color-outline, ${Theme.colorOutline});
  border-radius: 8px;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
:host([type=elevated]){
  border: none;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  border: none;
}
.ripple{
  display: none;
  border-radius: 0;
}
:host([clickable=true]) .ripple{
  display: block;
}
::slotted(*){
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin: 0 8px 0 -8px;
}
::slotted([slot=end]){
  margin: 0 -8px 0 8px;
}
::slotted(s-icon-button[slot=action]){
  margin: 0 -12px 0 8px;
  width: 24px;
  height: 24px;
  padding: 3px;
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<slot name="action"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class Chip extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    shadowRoot.querySelector('slot[name=action]')!.addEventListener('pointerdown', (e) => e.stopPropagation())
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
  export interface GlobalComponents {
    [name]: typeof props
  }
}