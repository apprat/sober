import { supports, useProps, useEvents, useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'

const name = 's-appbar'
const props = useProps({})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  box-sizing: border-box;
  container-name: s-appbar;
  container-type: inline-size;
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
::slotted([slot=nav]){
  flex-shrink: 0;
}
::slotted([slot=logo]){
  height: 32px;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  fill: currentColor;
  flex-shrink: 0;
}
::slotted([slot=headline]){
  font-size: 1.5rem;
  font-weight: bold;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--s-color-primary, ${Theme.colorPrimary});
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
@container s-appbar (max-width: 1024px){
  .view{
    height: 56px;
  }
}
@container s-appbar (max-width: 768px){
  ::slotted(s-search[slot=search]){
    width: auto;
    flex-grow: 1;
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot name="nav"></slot>
<slot name="logo"></slot>
<slot name="headline"></slot>
<div class="view" part="view">
  <slot></slot>
  <slot name="search"></slot>
</div>
<slot name="action"></slot>
<slot name="end"></slot>
`

export class Appbar extends useElement({
  style, template,
  setup(shadowRoot) {
    const view = shadowRoot.querySelector<HTMLDivElement>('.view')!
    if (!supports.CSSContainer) {
      new ResizeObserver(() => {
        view.classList.toggle('s-laptop', this.offsetWidth <= 1024)
        view.classList.toggle('s-tablet', this.offsetWidth <= 768)
      }).observe(this)
    }
  }
}) { }

Appbar.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Appbar
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
    } & Appbar
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