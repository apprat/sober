import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

type Props = {
  type: 'elevated' | 'filled' | 'outlined'
  clickable: boolean
}

const name = 's-card'
const props: Props = {
  type: 'elevated',
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
  width: 280px;
  overflow: hidden;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([type=filled]){
  box-shadow: none;
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
}
:host([type=outlined]){
  box-shadow: none;
  background: var(--s-color-surface, ${Theme.colorSurface});
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
:host([clickable=true]){
  cursor: pointer;
  transition: box-shadow var(--s-motion-duration-short4, ${Theme.motionDurationShort4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
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
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
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
@media (any-pointer: fine){
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

class Card extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const action = shadowRoot.querySelector<HTMLElement>('slot[name=action]')!
    action.onpointerdown = (e) => e.stopPropagation()
  }
}) { }

Card.define(name)

export { Card }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Card
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