import { useProps, useElement } from '../core/elements.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  $size: ['auto', 'medium', 'small'],
  $media: '(orientation: portrait)'
})

const style = /*css*/`
:host{
  display: block;
  position: relative;
  height: 64px;
  padding: 0 24px;
  transition-property: background-color, color, height, padding;
  background: ${scheme.color.surfaceContainer};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
  gap: inherit;
  height: 100%;
}
::slotted(:is([slot=nav], [slot=logo]):first-child){
  margin-left: -8px;
}
::slotted(:not(:is([slot=title], [slot=subtitle])):last-child){
  margin-right: -12px;
}
::slotted(:is([slot=nav], [slot=logo])){
  margin-right: 4px;
  flex-shrink: 0;
}
::slotted([slot=logo]){
  height: 32px;
  color: ${scheme.color.primary};
  fill: currentColor;
  flex-shrink: 0;
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
  font-size: calc(var(--s-font-size, 1) * 24px);
  font-weight: bold;
  font-family: system-ui;
  text-transform: capitalize;
  color: ${scheme.color.primary};
}
::slotted([slot=subtitle]){
  font-size: calc(var(--s-font-size, 1) * 12px);
  font-weight: 400;
  color: ${scheme.color.onSurfaceVariant};
}
::slotted(s-icon-button){
  flex-shrink: 0;
}
::slotted(s-nav-adaptive){
  justify-content: flex-end;
  flex-grow: 1;
}
:host([small]){
  height: 56px;
  padding: 0 20px;
  .headline{
    ::slotted([slot=title]){
      font-size: calc(var(--s-font-size, 1) * 20px);
    }
    ::slotted([slot=subtitle]){
      font-size: calc(var(--s-font-size, 1) * 10px);
    }
  }
  .layout{
    gap: 6px;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
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
</div>
`

export class AppBar extends useElement({
  props, style, template,
  setup() {
    const mediaQueryer = new MediaQueryer(this.media)
    mediaQueryer.onChange = (v) => this.size === 'auto' && this.toggleAttribute('small', v)
    const getSize = () => this.size === 'auto' ? (mediaQueryer.matches ? 'small' : 'medium') : this.size
    return {
      expose: { getSize },
      size: (v) => {
        if (v === 'auto') return mediaQueryer.call()
        this.toggleAttribute('small', v === 'small')
      },
      media: (v) => mediaQueryer.replace(v)
    }
  }
}) { }

const name = AppBar.define('s-app-bar')

declare global {
  interface HTMLElementTagNameMap {
    [name]: AppBar
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
    } & AppBar
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