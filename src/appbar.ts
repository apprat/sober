import { useElement } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { Theme } from './core/theme.js'

type Props = {}

const name = 's-appbar'
const props: Props = {}

const style = /*css*/`
:host{
  display: flex;
  height: 64px;
  align-items: center;
  position: relative;
  padding: 0 8px;
  flex-shrink: 0;
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
::slotted([slot=navigation]){
  margin-left: 4px;
  flex-shrink: 0;
}
::slotted([slot=logo]){
  margin-left: 12px;
  height: 32px;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  fill: currentColor;
  flex-shrink: 0;
}
::slotted([slot=headline]){
  font-size: 1.375rem;
  font-weight: 400;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 12px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.view{
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::slotted([slot=action]){
  margin: 0 4px;
  flex-shrink: 0;
}
::slotted(s-search[slot=search]){
  flex-shrink: 0;
  height: 40px;
  border-radius: 20px;
  max-width: 100%;
  margin: 0 4px 0 8px;
}
::slotted(s-appbar){
  height: 100%;
  width: 100%;
  max-width: ${mediaQueries.laptopL}px;
  background: none;
  margin: 0 auto;
  padding: 0;
}
@media (max-width: ${mediaQueries.laptop}px) {
  :host{
    height: 56px;
  }
  ::slotted(s-search[slot=search]){
    width: auto;
    flex-grow: 1;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot name="navigation"></slot>
<slot name="logo"></slot>
<slot name="headline"></slot>
<div class="view" part="view">
  <slot></slot>
  <slot name="search"></slot>
</div>
<slot name="action"></slot>
<slot name="end"></slot>
`

class Appbar extends useElement({ style, template, props }) { }

Appbar.define(name)

export { Appbar }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Appbar
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