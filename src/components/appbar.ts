import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  breakpointCompact: 1024,
  centerTitle: false
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  height: 64px;
  padding: 0 16px;
  background: var(--s-color-surface-container, ${scheme.color.surfaceContainer});
}
:host([compacted]){
  padding: 0 16px;
  height: 56px;
}
.headline{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  gap: 2px;
  overflow: hidden;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted([slot=nav]){
  --margin-left: -8px;
}
::slotted([slot=logo]){
  height: 32px;
  color: var(--s-color-primary, ${scheme.color.primary});
  fill: currentColor;
}
::slotted(:is([slot=title], [slot=subtitle])){
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
::slotted([slot=title]){
  font-size: 1.375rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--s-color-primary, ${scheme.color.primary});
}
::slotted([slot=subtitle]){
  font-size: .75rem;
  font-weight: 400;
  letter-spacing: .5px;
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
}
::slotted([slot=action]:last-child){
  margin-right: -8px;
}
.view{
  flex-grow: 1;
}
`

const template = /*html*/`
<slot name="leading"></slot>
<slot name="nav"></slot>
<slot name="logo"></slot>
<div class="headline" part="headline">
  <slot name="title"></slot>
  <slot name="subtitle"></slot>
</div>
<div class="view" part="view">
  <slot></slot>
</div>
<slot name="action"></slot>
<slot name="trailing"></slot>
`

export class Appbar extends useElement({
  style, template,
  setup(shadowRoot) {
    //const view = shadowRoot.querySelector<HTMLDivElement>('.view')!
    new ResizeObserver(() => {
      //view.classList.toggle('s-laptop', this.offsetWidth <= 1024)
      //view.classList.toggle('s-tablet', this.offsetWidth <= 768)
    }).observe(this)
  }
}) { }

const name = Appbar.define('s-appbar')

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