import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['surface', 'primary'],
  $compactBreakpoint: 1024
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  height: 64px;
  padding: 0 16px;
  background: ${scheme.color.surfaceContainer};
}
.headline{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}
.view{
  flex-grow: 1;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted([slot=logo]){
  height: 32px;
  color: ${scheme.color.primary};
  fill: currentColor;
}
::slotted([slot=action]:last-child){
  margin-right: -4px;
}
::slotted(:is([slot=title], [slot=subtitle])){
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  line-height: calc(100% + 4px);
}
::slotted([slot=title]){
  font-size: calc(var(--s-font-size) * 24px);
  font-weight: 600;
  text-transform: capitalize;
  color: ${scheme.color.primary};
}
::slotted([slot=subtitle]){
  font-size: calc(var(--s-font-size) * 12px);
  font-weight: 400;
  color: ${scheme.color.onSurfaceVariant};
}
:host([variant=primary]){
  background: ${scheme.color.primary};
  color: ${scheme.color.onPrimary};
  ::slotted(:is([slot=nav], [slot=logo], [slot=title], [slot=subtitle], [slot=action])){
    color: inherit;
  }
  ::slotted(:is([slot=nav], [slot=action]):focus-visible){
    outline: solid 2px currentColor;
  }
}
:host([compacted]){
  height: 56px;
  gap: 8px;
  padding: 0 12px;
  .headline{
    ::slotted([slot=title]){
      font-size: calc(var(--s-font-size) * 20px);
    }
    ::slotted([slot=subtitle]){
      font-size: calc(var(--s-font-size) * 10px);
    }
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
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
<slot name="end"></slot>
`

export class Appbar extends useElement({
  props, style, template,
  setup() {
    new ResizeObserver(() => {
      this.toggleAttribute('compacted', this.offsetWidth <= this.compactBreakpoint)
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