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
    border-width: var(--s_field-set-border-width);
    border-color: var(--s_field-set-border-color);
  }
  &::after{
    opacity: 0;
    border-width: var(--s_field-set-border-width-focused);
    border-color: var(--s_field-set-border-color-focused);
  }
}
.layout{
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-height: inherit;
  --s_field-set-padding: var(--s-field-set-padding);
  --s_field-set-padding-top: var(--s-field-set-padding-top, var(--s_field-set-padding, 12px));
  --s_field-set-padding-bottom: var(--s-field-set-padding-bottom, var(--s_field-set-padding, 12px));
  --s_field-set-padding-left: var(--s-field-set-padding-left, var(--s_field-set-padding, 16px));
  --s_field-set-padding-right: var(--s-field-set-padding-right, var(--s_field-set-padding, 16px));
  --s_field-set-border-color: var(--s-field-set-border-color, ${scheme.color.outline});
  --s_field-set-border-color-focused: var(--s-field-set-border-color-focused, ${scheme.color.primary});
  --s_field-set-border-width: var(--s-field-set-border-width, 1px);
  --s_field-set-border-width-focused: var(--s-field-set-border-width-focused, 2px);
  --s_field-set-border-radius: var(--s-field-set-border-radius, 4px);
  --s_field-set-border-top-left-radius: var(--s-field-set-border-top-left-radius, var(--s_field-set-border-radius));
  --s_field-set-border-top-right-radius: var(--s-field-set-border-top-right-radius, var(--s_field-set-border-radius));
  --s_field-set-border-bottom-left-radius: var(--s-field-set-border-bottom-left-radius, var(--s_field-set-border-radius));
  --s_field-set-border-bottom-right-radius: var(--s-field-set-border-bottom-right-radius, var(--s_field-set-border-radius));
  --s_field-set-title-gap: var(--s-field-set-title-gap, 4px);
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
  min-width: max(var(--s_field-set-border-top-left-radius), var(--s_field-set-border-bottom-left-radius));
  &::before,
  &::after{
    border-style: solid;
    border-right: none;
    border-top-left-radius: var(--s_field-set-border-top-left-radius);
    border-bottom-left-radius: var(--s_field-set-border-bottom-left-radius);
  }
}
.end{
  min-width: max(var(--s_field-set-border-top-right-radius), var(--s_field-set-border-bottom-right-radius));
  &::before,
  &::after{
    border-style: solid;
    border-left: none;
    border-top-right-radius: var(--s_field-set-border-top-right-radius);
    border-bottom-right-radius: var(--s_field-set-border-bottom-right-radius);
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
  margin-left: calc(max(var(--s_field-set-border-top-left-radius), var(--s_field-set-border-bottom-left-radius)) * -1);
  margin-right: calc(max(var(--s_field-set-border-top-right-radius), var(--s_field-set-border-bottom-right-radius)) * -1);
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
  width: calc(var(--s_field-set-padding-left) - var(--s_field-set-title-gap) - var(--s_field-set-border-top-left-radius));
  margin-left: var(--s_field-set-border-top-left-radius);
  &::before,
  &::after{
    border-top-style: solid;
  }
}
.right{
  width: calc(var(--s_field-set-padding-right) - var(--s_field-set-title-gap) - var(--s_field-set-border-top-right-radius));
  margin-right: var(--s_field-set-border-top-right-radius);
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
  padding: var(--s_field-set-padding-top) var(--s_field-set-padding-right) var(--s_field-set-padding-bottom) var(--s_field-set-padding-left);
}
::slotted([slot=title]){
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  white-space: nowrap;
  overflow: hidden;
  overflow: clip visible;
  text-overflow: ellipsis;
  padding-top: var(--s_field-set-padding-top);
  padding-bottom: var(--s_field-set-padding-bottom);
  margin-left: min(var(--s_field-set-title-gap), var(--s_field-set-padding-left));
  margin-right: min(var(--s_field-set-title-gap), var(--s_field-set-padding-right));
  font-size: calc(1em * .75);
  transition-property: all;
  transition-duration: inherit;
  transition-timing-function: inherit;
  box-sizing: border-box;
  color: var(--s_field-set-border-color);
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
    color: var(--s_field-set-border-color-focused);
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

export class FieldSet extends useElement({
  props, style, template,
}) { }

const name = FieldSet.define('s-field-set')

declare global {
  interface HTMLElementTagNameMap {
    [name]: FieldSet
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
    } & FieldSet
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