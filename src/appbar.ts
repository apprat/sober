import { useElement, supports } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { Theme } from './core/theme.js'

type Props = {}

const name = 's-appbar'
const props: Props = {}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 8px;
  container-name: s-appbar;
  container-type: inline-size;
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
  margin-left: 12px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.view{
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  max-height: 100%;
  justify-content: flex-end;
}
.view.s-laptop{
  height: 56px;
}
.view.s-tablet ::slotted(s-search[slot=search]){
  width: auto;
  flex-grow: 1;
}
::slotted([slot=action]){
  margin: 0 4px;
  flex-shrink: 0;
}
::slotted(s-search[slot=search]){
  flex-shrink: 0;
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
@container s-appbar (max-width: ${mediaQueries.laptop}px){
  .view{
    height: 56px;
  }
}
@container s-appbar (max-width: ${mediaQueries.tablet}px){
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

class Appbar extends useElement({
  style, template, props,
  setup(shadowRoot) {
    if (!supports.CSSContainer) {
      const view = shadowRoot.querySelector<HTMLDivElement>('.view')!
      new ResizeObserver(() => {
        view.classList.toggle('s-laptop', this.offsetWidth <= mediaQueries.laptop)
        view.classList.toggle('s-tablet', this.offsetWidth <= mediaQueries.tablet)
      }).observe(this)
    }
  }
}) { }

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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props>
    } & Appbar
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