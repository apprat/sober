import { useElement } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-card'
const props = {
  type: 'standard' as 'standard' | 'filled' | 'outlined',
  clickable: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  border-radius: 12px;
  position: relative;
  font-size: .875rem;
  box-sizing: border-box;
  max-width: 280px;
  overflow: hidden;
  flex-shrink: 0;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=filled]){
  box-shadow: none;
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
}
:host([type=outlined]){
  box-shadow: none;
  background: var(--s-color-surface, ${Theme.colorSurface});
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
:host([clickable=true]){
  cursor: pointer;
  transition: box-shadow .1s ease-out;
}
:host([clickable=true]) .ripple{
  display: block;
}
.action{
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.ripple{
  display: none;
  border-radius: 0;
}
::slotted([slot=image]){
  display: block;
  height: 128px;
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
}
:host([type=filled]) ::slotted([slot=image]){
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
}
::slotted([slot=headline]){
  font-size: 1.5rem;
  line-height: 1.6;
  margin: 16px 16px 0 16px;
}
::slotted([slot=subhead]){
  font-size: 1rem;
  line-height: 1.6;
  margin: 4px 16px;
}
::slotted([slot=text]){
  line-height: 1.6;
  margin: 8px 16px;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
::slotted(s-button[slot=action]){
  margin: 16px 0;
}
::slotted(s-button[slot=action]:last-of-type){
  margin-right: 16px;
}
@media (pointer: fine){
  :host([clickable=true][type=filled]:hover),
  :host([clickable=true][type=outlined]:hover){
    box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  }
  :host([clickable=true]:hover){
    box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot name="image"></slot>
<slot name="headline"></slot>
<slot name="subhead"></slot>
<slot name="text"></slot>
<slot></slot>
<div class="action" part="action">
  <slot name="action"></slot>
</div>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class Card extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    action.addEventListener('pointerdown', (e) => e.stopPropagation())
  }
}) { }

Card.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Card
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