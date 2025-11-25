import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  floated: false,
  focused: false
})

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  min-height: 40px;
  font-size: calc(var(--s-font-size, 1) * 14px);
  line-height: 1.5;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: flex;
  flex-grow: 1;
  --s_padding: var(--s-fieldset-padding, 16px);
  --s_padding-top: var(--s-fieldset-padding-top, var(--s_padding));
  --s_padding-bottom: var(--s-fieldset-padding-bottom, var(--s_padding));
  --s_padding-left: var(--s-fieldset-padding-left, var(--s_padding));
  --s_padding-right: var(--s-fieldset-padding-right, var(--s_padding));
  --s_border-width: var(--s-fieldset-border-width, 1px);
  --s_border-focused-width: var(--s-fieldset-border-focused-width, 2px);
  --s_border-radius: var(--s-fieldset-border-radius, 4px);
  --s_border-top-left-radius: var(--s-fieldset-border-top-left-radius, var(--s_border-radius));
  --s_border-top-right-radius: var(--s-fieldset-border-top-right-radius, var(--s_border-radius));
  --s_border-bottom-left-radius: var(--s-fieldset-border-bottom-left-radius, var(--s_border-radius));
  --s_border-bottom-right-radius: var(--s-fieldset-border-bottom-right-radius, var(--s_border-radius));
  --s_title_gap: var(--s-fieldset-title-gap, 4px);
}
.outline{
  position: relative;
  &::before,
  &::after{
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-style: solid;
    border-width: var(--s_border-width);
    border-color: ${scheme.color.outline};
  }
  &::after{
    border-width: var(--s_border-focused-width);
    opacity: 0;
    border-color: ${scheme.color.primary};
    transition-property: opacity;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
.start,
.end{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.start{
  min-width: max(var(--s_border-top-left-radius), var(--s_border-bottom-left-radius));
  &::before,
  &::after{
    border-right: none;
    border-top-left-radius: var(--s_border-top-left-radius);
    border-bottom-left-radius: var(--s_border-bottom-left-radius);
  }
}
.end{
  min-width: max(var(--s_border-top-right-radius), var(--s_border-bottom-right-radius));
  &::before,
  &::after{
    border-left: none;
    border-top-right-radius: var(--s_border-top-right-radius);
    border-bottom-right-radius: var(--s_border-bottom-right-radius);
  }
}
.wrapper{
  display: grid;
  grid-template-areas: "a" "a";
  flex-grow: 1;
  &::before,
  &::after{
    border-style: none;
    border-bottom-style: solid;
  }
}
.head,
.content{
  grid-area: a;
  display: flex;
  height: 100%;
  margin-left: calc(max(var(--s_border-top-left-radius), var(--s_border-bottom-left-radius)) * -1);
  margin-right: calc(max(var(--s_border-top-right-radius), var(--s_border-bottom-right-radius)) * -1);
}
.head{
  line-height: 1;
  pointer-events: none;
  div{
    &::before,
    &::after{
      border-style: none;
      border-top-style: solid;
    }
  }
  .left{
    width: calc(var(--s_padding-left) - var(--s_title_gap));
    &::before,
    &::after{
      clip-path: polygon(var(--s_border-top-left-radius) 100%, var(--s_border-top-left-radius) 0, 100% 0, 100% 100%);
    }
  }
  .right{
    flex-grow: 1;
    min-width: calc(var(--s_padding-right) - var(--s_title_gap));
    &::before,
    &::after{
      clip-path: polygon(0 100%, 0 0, calc(100% - var(--s_border-top-right-radius)) 0, calc(100% - var(--s_border-top-right-radius)) 100%);
    }
  }
  .title{
    &::before,
    &::after{
      display: none;
    }
    ::slotted([slot=title]){
      display: flex;
      align-items: center;
      font-size: calc(var(--s-font-size, 1) * 12px);
      margin-left: min(var(--s_title_gap), var(--s_padding-left));
      margin-right: min(var(--s_title_gap), var(--s_padding-right));
      padding-top: var(--s_padding-top);
      padding-bottom: var(--s_padding-bottom);
      color: ${scheme.color.outline};
      box-sizing: border-box;
      transform: translateY(-50%);
      transition-property: transform, font-size, color;
      transition-duration: inherit;
      transition-timing-function: inherit;
    }
    ::slotted([slot=title]:empty){
      display: none;
    }
  }
}
.content{
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  ::slotted(:not([slot])){
    padding: var(--s_padding-top) var(--s_padding-right) var(--s_padding-bottom) var(--s_padding-left);
  }
}
:host([floated]){
  .title{
    &::before,
    &::after{
      display: block;
    }
    ::slotted([slot=title]){
      font-size: inherit;
      transform: translateY(0);
    }
  }
}
:host([focused]){
  .outline{
    &::after{
      opacity: 1;
    }
  }
  ::slotted([slot=title]){
    color: ${scheme.color.primary};
  }
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <div class="start outline"  part="start">
    <slot name="start"></slot>
  </div>
  <div class="wrapper outline">
    <div class="head">
      <div class="left outline"></div>
      <div class="title outline">
        <slot name="title"></slot>
      </div>
      <div class="right outline"></div>
    </div>
    <div class="content" part="content">
      <slot></slot>
    </div>
  </div>
  <div class="end outline" part="end">
    <slot name="end"></slot>
  </div>
</div>
`

export class Fieldset extends useElement({
  props, style, template
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
    } & Fieldset
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