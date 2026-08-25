import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  floating: false,
  focused: false
})

const style = /*css*/`
:host{
  display: flex;
  line-height: calc(100% + 8px);
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.line{
  pointer-events: none;
  position: absolute;
  inset: 0;
  transition-property: opacity;
  border-radius: inherit;
  border-style: none;
  border-width: var(--s_field-set-border-width);
  border-color: var(--s_field-set-border-color);
  &.focused{
    opacity: 0;
    border-width: var(--s_field-set-border-width-focused);
  }
  &.top{
    border-top-style: solid;
  }
  &.bottom{
    border-bottom-style: solid;
  }
  &.right{
    border-right-style: solid;
  }
  &.left{
    border-left-style: solid;
  }
}
.layout{
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-width: 0;
  min-height: inherit;
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
  --s_field-set-border-radius: var(--s-field-set-border-radius, ${scheme.shape.corner.extraSmall});
  --s_field-set-border-top-left-radius: var(--s-field-set-border-top-left-radius, var(--s_field-set-border-radius));
  --s_field-set-border-top-right-radius: var(--s-field-set-border-top-right-radius, var(--s_field-set-border-radius));
  --s_field-set-border-bottom-left-radius: var(--s-field-set-border-bottom-left-radius, var(--s_field-set-border-radius));
  --s_field-set-border-bottom-right-radius: var(--s-field-set-border-bottom-right-radius, var(--s_field-set-border-radius));
  --s_field-set-legend-gap: var(--s-field-set-legend-gap, 4px);
}
.start,
.end{
  display: flex;
  position: relative;
  height: 100%;
  flex-shrink: 0;
}
.start{
  min-width: max(var(--s_field-set-border-top-left-radius), var(--s_field-set-border-bottom-left-radius));
  border-top-left-radius: var(--s_field-set-border-top-left-radius);
  border-bottom-left-radius: var(--s_field-set-border-bottom-left-radius);
}
.end{
  min-width: max(var(--s_field-set-border-top-right-radius), var(--s_field-set-border-bottom-right-radius));
  border-top-right-radius: var(--s_field-set-border-top-right-radius);
  border-bottom-right-radius: var(--s_field-set-border-bottom-right-radius);
}
.center{
  flex-grow: 1;
  min-width: 0;
  position: relative;
  min-height: inherit;
}
.body{
  display: grid;
  height: 100%;
  grid-template-areas: "a" "a";
  min-height: inherit;
  margin-left: calc(max(var(--s_field-set-border-top-left-radius), var(--s_field-set-border-bottom-left-radius)) * -1);
  margin-right: calc(max(var(--s_field-set-border-top-right-radius), var(--s_field-set-border-bottom-right-radius)) * -1);
}
.header,
.view{ 
  grid-area: a;
  min-width: 0;
}
.header{
  display: flex;
  height: fit-content;
  pointer-events: none;
  --s_field-set-legend-left: max(0px, var(--s_field-set-padding-left) - var(--s_field-set-legend-gap) - var(--s_field-set-border-top-left-radius));
  --s_field-set-legend-right: max(0px, var(--s_field-set-padding-right) - var(--s_field-set-legend-gap) - var(--s_field-set-border-top-right-radius));
}
.header-left{
  position: relative;
  flex-shrink: 0;
  width: var(--s_field-set-legend-left);
  margin-left: var(--s_field-set-border-top-left-radius);
}
.header-right{
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  width: var(--s_field-set-legend-right);
  margin-right: var(--s_field-set-border-top-right-radius);
}
.legend{ 
  min-width: 0;
  position: relative;
  .line{
    transform-origin: right;
    transform: scaleX(0);
    transition-property: opacity, transform;
  }
}
::slotted([slot=legend]){
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  white-space: nowrap;
  overflow: hidden;
  overflow: clip visible;
  text-overflow: ellipsis;
  padding-top: var(--s_field-set-padding-top);
  padding-bottom: var(--s_field-set-padding-bottom);
  margin-left: var(--s_field-set-legend-gap);
  margin-right: var(--s_field-set-legend-gap);
  font-size: calc(1em * .75);
  transform: translateY(-50%);
  transition-duration: inherit;
  transition-timing-function: inherit;
  box-sizing: border-box;
  color: var(--s_field-set-border-color);
}
::slotted([slot=body]){
  box-sizing: border-box;
  padding-left: var(--s_field-set-padding-left);
  padding-right: var(--s_field-set-padding-right);
  padding-top: var(--s_field-set-padding-top);
  padding-bottom: var(--s_field-set-padding-bottom);
}
:host([focused]){
  .line.focused{
    opacity: 1;
    border-color: var(--s_field-set-border-color-focused);
  }
  ::slotted([slot=legend]){
    color: var(--s_field-set-border-color-focused);
  }
}
:host([floating]){
  .legend .line{
    transform: scaleX(1);
  }
  ::slotted([slot=legend]){
    font-size: inherit;
    margin-left: calc((var(--s_field-set-legend-left) + var(--s_field-set-border-top-right-radius)) * -1 + var(--s_field-set-padding-left));
    margin-right: calc((var(--s_field-set-legend-right) + var(--s_field-set-border-top-left-radius)) * -1 + var(--s_field-set-padding-right));
    transform: translateY(0%);
  }
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <div class="start">
    <slot name="start"></slot>
    <span class="line left top bottom" part="outline"></span>
    <span class="line focused left top bottom" part="outline"></span>
  </div>
  <div class="center">
    <div class="body">
      <div class="header">
        <div class="header-left">
          <span class="line top" part="outline"></span>
          <span class="line focused top" part="outline"></span>
        </div>
        <div class="legend">
          <slot name="legend"></slot>
          <div class="line top" part="outline"></div>
          <div class="line focused top" part="outline"></div>
        </div>
        <div class="header-right">
          <span class="line top" part="outline"></span>
          <span class="line focused top" part="outline"></span>
        </div>
      </div>
      <div class="view">
        <slot name="body"></slot>
      </div>
    </div>
    <span class="line bottom" part="outline"></span>
    <span class="line focused bottom" part="outline"></span>
  </div>
  <div class="end">
    <slot name="end"></slot>
    <span class="line top right bottom" part="outline"></span>
    <span class="line focused top right bottom" part="outline"></span>
  </div>
</div>
`

export class Sheet extends useElement({
  props, style, template,
}) { }

const name = Sheet.define('s-sheet')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Sheet
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
    } & Sheet
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