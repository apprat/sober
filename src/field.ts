import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-field'
const props = {
  focused: false,
  fixed: true
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  --field-padding: 16px;
  --field-padding-top: var(--field-padding);
  --field-padding-bottom: var(--field-padding);
  --field-padding-left: var(--field-padding);
  --field-padding-right: var(--field-padding);
  --field-border-radius: 4px;
  --field-border-width: 1px;
  --field-focused-border-width: 2px;
  --field-border-color: var(--s-color-outline, ${Theme.colorOutline});
}
.container{
  display: flex;
  height: 100%;
  min-height: inherit;
}
.line{
  position: relative;
}
.line::before,
.line::after{
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-width: var(--field-border-width);
  border-color: var(--field-border-color);
  pointer-events: none;
}
.line::after{
  border-width: var(--field-focused-border-width);
  border-color: var(--s-color-primary, ${Theme.colorPrimary});
  opacity: 0;
  transition: opacity 2.2s ease-out;
}
:host([focused=true]) .line::after{
  opacity: 1;
}
.start,
.end{
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: var(--field-border-radius);
}
.start::before,
.end::before,
.start::after,
.end::after{
  border-top-style: solid;
  border-bottom-style: solid;
}
.start::before,
.start::after{
  border-left-style: solid;
  border-top-left-radius: var(--field-border-radius);
  border-bottom-left-radius: var(--field-border-radius);
}
.end::before,
.end::after{
  border-right-style: solid;
  border-top-right-radius: var(--field-border-radius);
  border-bottom-right-radius: var(--field-border-radius);
}
.box{
  display: grid;
  grid-template-areas: "a" "a";
  flex-grow: 1;
}
.box::before,
.box::after{
  border-bottom-style: solid;
}
.top,
.view{
  height: 100%;
  display: flex;
  grid-area: a;
}
.view{
  align-items: center;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(var(--field-border-radius) * -1);
  margin-right: calc(var(--field-border-radius) * -1);
}
.top{
  margin-left: calc(var(--field-border-radius) * -1);
  margin-right: calc(var(--field-border-radius) * -1);
  pointer-events: none;
  position: relative;
}
.top>.left::before,
.top>.right::before,
.top>.left::after,
.top>.right::after{
  border-top-style: solid;
}
.top>.left{
  width: var(--field-padding-left);
  flex-shrink: 0;
}
.top>.right{
  flex-grow: 1;
  min-width: var(--field-padding-right);
}
.top>.left{
  clip-path: polygon(var(--field-border-radius) 0, max(calc(100% - 4px), var(--field-border-radius)) 0, max(calc(100% - 4px), var(--field-border-radius)) 100%,var(--field-border-radius) 100%);
}
:host([fixed=false]) .top>.left{
  clip-path: polygon(var(--field-border-radius) 0, max(100%, var(--field-border-radius)) 0, max(100%, var(--field-border-radius)) 100%,var(--field-border-radius) 100%);
}
.top>.right{
  clip-path: polygon(4px 0, max(4px, calc(100% - var(--field-border-radius))) 0, max(4px, 100% - var(--field-border-radius)) 100%, 4px 100%);
}
:host([fixed=false]) .top>.right{
  clip-path: polygon(0 0, min(100%, calc(100% - var(--field-border-radius))) 0, min(100%, 100% - var(--field-border-radius)) 100%, 0 100%);
}
.label{
  display: block;
  height: 100%;
  flex-shrink: 0;
}
.label>.line{
  width: 8px;
  margin: 0 -4px;
}
.label>.line::before,
.label>.line::after{
  border-top-style: solid;
}
::slotted([slot=label]){
  display: flex;
  align-items: center;
  height: 100%;
  font-size: .75rem;
  align-items: center;
  transform: translateY(-50%);
  color: var(--field-border-color);
  transition: transform 2.2s ease-out, font-size 2.2s ease-out;
  box-sizing: border-box;
  position: relative;
}
:host([focused=true]) ::slotted([slot=label]){
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([fixed=false]) ::slotted([slot=label]){
  font-size: inherit;
  transform: translateY(0);
}
::slotted([slot=label]:not(:empty))::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: solid var(--field-border-width) var(--field-border-color);
  opacity: 0;
  transform: translateY(50%);
  transition: transform 2.2s ease-out;
  background: rgba(0,0,0,0.05);
  box-sizing: border-box;
}
:host([fixed=false]) ::slotted([slot=label]:not(:empty))::before{
  opacity: 1;
  transform: translateY(0%);
}
::slotted([slot=label]:empty){
  transition: none;
}
::slotted([slot=label]:empty)::before{
  content: '';
  width: 8px;
  margin: 0 -4px;
  border-top: solid var(--field-border-width) var(--field-border-color);
  position: relative;
  top: .5px;
}
:host([fixed=false]) ::slotted([slot=label]:empty)::before{
  content: none;
}
::slotted(:not([slot])){
  padding-left: var(--field-padding-left);
  padding-right: var(--field-padding-right);
  padding-top: var(--field-padding-top);
  padding-bottom: var(--field-padding-bottom);
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}
`

const template = /*html*/`
<div class="container" part="container">
  <div class="start line" part="start">
    <slot name="start"></slot>
  </div>
  <div class="box line" part="box">
    <slot class="view"></slot>
    <div class="top" part="top">
      <div class="line left"></div>
      <slot name="label" class="label">
        <div class="line"></div>
      </slot>
      <div class="line right"></div>
    </div>
  </div>
  <div class="end line" part="end">
    <slot name="end"></slot>
  </div>
</div>
`

export class Field extends useElement({
  style, template, props, syncProps: true
}) { }

Field.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Field
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
  export interface GlobalComponents {
    [name]: typeof props
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