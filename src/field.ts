import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './core/enum.js'
import './ripple.js'

const name = 's-field'
const props = {
  focused: false,
  labelFixed: true
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  height: 48px;
  font-size: .875rem;
  --field-padding: 16px;
  --field-border-radius: 4px;
  --field-border-width: 1px;
  --field-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --field-focused-border-width: 2px;
}
.container{
  display: flex;
  height: 100%;
}
.side{
  position: relative;
}
.side::before,
.side::after{
  content: '';
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-color: var(--field-border-color);
  border-width: var(--field-border-width);
  pointer-events: none;
}
.side::after{
  border-width: var(--field-focused-border-width);
  border-color: var(--s-color-primary, ${Theme.colorPrimary});
  opacity: 0;
  transition: opacity .1s ease-out;
}
:host([focused=true]) .side::after{
  opacity: 1;
}
.cell{
  display: flex;
  align-items: center;
  position: relative;
  min-width: var(--field-border-radius);
  flex-shrink: 0;
}
.cell::before,
.cell::after{
  border-style: solid;
}
.start::before,
.start::after{
  border-right: none;
  border-radius: var(--field-border-radius) 0 0 var(--field-border-radius);
}
.end::before,
.end::after{
  border-left: none;
  border-radius: 0 var(--field-border-radius) var(--field-border-radius) 0;
}
.box{
  margin: 0 calc(var(--field-border-radius) * -1);
  flex-grow: 1;
  position: static;
}
.box::before,
.box::after{
  border-bottom-style: solid;
  left: var(--field-border-radius);
  width: calc(100% - var(--field-border-radius) * 2);
}
.view{
  display: flex;
  height: 100%;
}
.legend{
  display: flex;
  pointer-events: none;
  position: relative;
  height: 0;
}
.legend::before,
.legend::after{
  border-top-style: solid;
  left: var(--field-border-radius);
  width: calc(100% - var(--field-border-radius) * 2);
  content: none;
}
:host([labelfixed=false]) .legend::before,
:host([labelfixed=false]) .legend::after{
  content: '';
}
.label{
  display: flex;
  align-items: center;
  transform: translateY(-50%) scale(.8571428571428571);
  color: var(--field-border-color);
  transition: color .1s ease-out, transform .1s ease-out;
  position: relative;
  height: fit-content;
}
::slotted([slot=label]){
  height: 48px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  line-height: 1;
}
:host([focused=true]) .label{
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([labelfixed=false]) .label{
  transform: translateY(0) scale(1);
}
.left,.right{
  height: 0;
  width: var(--field-padding);
}
.right{
  flex-grow: 1;
}
.left::before,
.left::after,
.right::before,
.right::after{
  border-top-style: solid;
  left: var(--field-border-radius);
  width: calc(100% - var(--field-border-radius));
}
.right::before,
.right::after{
  left: 0;
}
::slotted([slot=start]){
  margin-right: var(--field-border-radius);
}
::slotted([slot=view]){
  padding: 0 var(--field-padding);
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: var(--field-border-radius);
}
::slotted([slot=end]){
  margin-left: var(--field-border-radius);
}
`

const template = /*html*/`
<div class="container side">
  <slot name="start" class="start side cell"></slot>
  <div class="box side">
    <div class="legend side">
      <div class="left side"></div>
      <slot name="label" class="label"></slot>
      <div class="right side"></div>
    </div>
    <slot name="view" class="view"></slot>
  </div>
  <slot name="end" class="end side cell"></slot>
</div>
`

export class Field extends useElement({
  style, template, props, syncProps: true,
  setup() {
  }
}) { }

Field.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Field
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}