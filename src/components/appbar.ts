import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['surface', 'primary'],
  size: ['auto', 'medium', 'small']
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  height: 64px;
  padding: 0 12px;
  transition-property: background-color, color, height, padding;
  background: ${scheme.color.surfaceContainer};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.headline{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 3px;
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
::slotted(:is([slot=title], [slot=subtitle])){
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  overflow: clip visible;
  line-height: 1;
  transition-property: font-size;
  transition-timing-function: inherit;
  transition-duration: inherit;
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
:host([size=small]){
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
@media (orientation: portrait){
  :host(:not([size])){
    height: 56px;
    gap: 8px;
    padding: 0 10px;
    .headline{
      ::slotted([slot=title]){
        font-size: calc(var(--s-font-size) * 20px);
      }
      ::slotted([slot=subtitle]){
        font-size: calc(var(--s-font-size) * 10px);
      }
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
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & Appbar
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}