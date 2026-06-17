import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  floating: false,
  focused: false
})

const style = /*css*/`
:host{
  display: flex;
  font-size: calc(var(--s-font-size, 1) * 14px);
  line-height: calc(100% + 8px);
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.outline{
  position: relative;
  &::before,
  &::after{
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-style: none;
    box-sizing: border-box;
    transition-property: opacity;
    border-width: var(--s_fieldset-border-width);
    border-color: ${scheme.color.outline};
  }
  &::after{
    border-width: var(--s_fieldset-border-focused-width);
    opacity: 0;
    border-color: ${scheme.color.primary};
  }
}
.layout{
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-height: inherit;
  --s_fieldset-padding: var(--s-fieldset-padding);
  --s_fieldset-padding-top: var(--s-fieldset-padding-top, var(--s_fieldset-padding, 14px));
  --s_fieldset-padding-bottom: var(--s-fieldset-padding-bottom, var(--s_fieldset-padding, 14px));
  --s_fieldset-padding-left: var(--s-fieldset-padding-left, var(--s_fieldset-padding, 16px));
  --s_fieldset-padding-right: var(--s-fieldset-padding-right, var(--s_fieldset-padding, 16px));
  --s_fieldset-border-width: var(--s-fieldset-border-width, 1px);
  --s_fieldset-border-focused-width: var(--s-fieldset-border-focused-width, 2px);
  --s_fieldset-border-radius: var(--s-fieldset-border-radius, 4px);
  --s_fieldset-border-top-left-radius: var(--s-fieldset-border-top-left-radius, var(--s_fieldset-border-radius));
  --s_fieldset-border-top-right-radius: var(--s-fieldset-border-top-right-radius, var(--s_fieldset-border-radius));
  --s_fieldset-border-bottom-left-radius: var(--s-fieldset-border-bottom-left-radius, var(--s_fieldset-border-radius));
  --s_fieldset-border-bottom-right-radius: var(--s-fieldset-border-bottom-right-radius, var(--s_fieldset-border-radius));
  --s_fieldset-title_gap: var(--s-fieldset-title-gap, 4px);
}
.start,
.end{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
}
.start{
  min-width: max(var(--s_fieldset-border-top-left-radius), var(--s_fieldset-border-bottom-left-radius));
  &::before,
  &::after{
    border-style: solid;
    border-right: none;
    border-top-left-radius: var(--s_fieldset-border-top-left-radius);
    border-bottom-left-radius: var(--s_fieldset-border-bottom-left-radius);
  }
}
.end{
  min-width: max(var(--s_fieldset-border-top-right-radius), var(--s_fieldset-border-bottom-right-radius));
  &::before,
  &::after{
    border-style: solid;
    border-left: none;
    border-top-right-radius: var(--s_fieldset-border-top-right-radius);
    border-bottom-right-radius: var(--s_fieldset-border-bottom-right-radius);
  }
}
.wrapper{
  display: grid;
  grid-template-areas: "a" "a";
  flex-grow: 1;
  max-height: inherit;
  height: 100%;
  &::before,
  &::after{
    border-bottom-style: solid;
  }
}
.head,
.body{
  grid-area: a;
  margin-left: calc(max(var(--s_fieldset-border-top-left-radius), var(--s_fieldset-border-bottom-left-radius)) * -1);
  margin-right: calc(max(var(--s_fieldset-border-top-right-radius), var(--s_fieldset-border-bottom-right-radius)) * -1);
}
.head{
  transform: translateY(-50%);
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 200%;
  pointer-events: none;
}
.left,
.right{
  transform: translateY(50%);
  height: 100%;
  flex-shrink: 0;
}
.left{
  width: calc(var(--s_fieldset-padding-left) - var(--s_fieldset-title_gap) - var(--s_fieldset-border-top-left-radius));
  margin-left: var(--s_fieldset-border-top-left-radius);
  &::before,
  &::after{
    border-top-style: solid;
  }
}
.right{
  width: calc(var(--s_fieldset-padding-right) - var(--s_fieldset-title_gap) - var(--s_fieldset-border-top-right-radius));
  margin-right: var(--s_fieldset-border-top-right-radius);
  &::before,
  &::after{
    border-top-style: solid;
  }
}
.title{
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: hidden;
}
.line{
  flex-grow: 1;
  height: 100%;
  transform: translateY(50%);
  &::before,
  &::after{
    border-top-style: solid;
  }
}
.body{
  position: relative;
  max-height: inherit;
}
::slotted(div:not([slot])){
  padding: var(--s_fieldset-padding-top) var(--s_fieldset-padding-right) var(--s_fieldset-padding-bottom) var(--s_fieldset-padding-left);
}
::slotted([slot=title]){
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  white-space: nowrap;
  overflow: hidden;
  overflow: clip visible;
  text-overflow: ellipsis;
  padding-top: var(--s_fieldset-padding-top);
  padding-bottom: var(--s_fieldset-padding-bottom);
  margin-left: min(var(--s_fieldset-title_gap), var(--s_fieldset-padding-left));
  margin-right: min(var(--s_fieldset-title_gap), var(--s_fieldset-padding-right));
  font-size: calc(var(--s-font-size, 1) * 12px);
  transition-property: all;
  line-height: 1;
  transition-duration: inherit;
  transition-timing-function: inherit;
  box-sizing: border-box;
  color: ${scheme.color.outline};
}
::slotted([slot=title]:empty){
  display: none;
}
:host([floating]){
  ::slotted([slot=title]){
    font-size: inherit;
    transform: translateY(50%);
  }
  .line{
    position: absolute;
    width: 100%;
  }
}
:host([focused]){
  .outline::after{
    opacity: 1;
  }
  ::slotted([slot=title]){
    color: ${scheme.color.primary};
  }
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <div class="start outline" part="start">
    <slot name="start"></slot>
  </div>
  <div class="wrapper outline">
    <div class="head">
      <div class="left outline"></div>
      <div class="title outline">
        <slot name="title"></slot>
        <div class="line outline"></div>
      </div>
      <div class="right outline"></div>
    </div>
    <div class="body" part="body">
      <slot></slot>
    </div>
  </div>
  <div class="end outline" part="end">
    <slot name="end"></slot>
  </div>
</div>
`

export class Fieldset extends useElement({
  props, style, template,
}) { }

const name = Fieldset.define('s-fieldset')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Fieldset
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
    } & Fieldset
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