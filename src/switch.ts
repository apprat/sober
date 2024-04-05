import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: var(--s-color-primary, #006495);
  font-size: 32px;
  width: 1.625em;
  height: 1em;
  border-radius: .5em;
}
:host([disabled=true]){
  pointer-events: none;
}
.track{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--s-color-outline, #72787e);
  position: absolute;
  padding: 4%;
  overflow: hidden;
  box-sizing: border-box;
  transition: background .2s;
}
:host([checked=true]) .track{
  background: currentColor;
}
:host([disabled=true]) .track{
  background: var(--s-color-on-surface, #1a1c1e);
  opacity: .12;
}
:host([checked=true][disabled=true]) .track{
  background: var(--s-color-on-surface, #1a1c1e);
}
.track::before{
  content: '';
  display: block;
  height: 100%;
  background: var(--s-color-surface-container-highest, #e2e2e5);
  border-radius: inherit;
}
:host([checked=true]) .track::before{
  opacity: 0;
}
:host([disabled=true]) .track::before{
  background: var(--s-color-surface, #fcfcff);
}
.ripple{
  height: 125%;
  width: 76.92307692307692%;
  border-radius: 50%;
  top: auto;
  margin-left: -7.6923076923076925%;
  transition: transform .2s;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: var(--s-color-outline, #72787e);
}
:host([checked=true]) .ripple{
  transform: translateX(50%);
  color: currentColor;
}
.thumb{
  background: var(--s-color-outline, #72787e);
  border-radius: 50%;
  width: 60%;
  height: 60%;
  transform: scale(.6666666666666667) translateX(0px);
  transform-origin: center;
  transition: transform .2s,box-shadow .2s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary, #ffffff);
  transform: scale(1);
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
:host([disabled=true]) .thumb{
  background: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent);
  box-shadow: none;
}
:host([checked=true][disabled=true]) .thumb{
  background: var(--s-color-surface, #fcfcff);
}
.icon{
  width: 66.66666666666667%;
  height: 66.66666666666667%;
  fill: currentColor;
  opacity: 0;
  transition: opacity .2s;
}
:host([checked=true]) .icon{
  opacity: 1;
}
:host([checked=true][disabled=true]) .icon{
  fill: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent);
}
`

const name = 's-switch'
const props = {
  disabled: false,
  checked: false
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    this.addEventListener('click', () => {
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      render: () => html`
        <div class="track">
        </div>
        <s-ripple attached="true" centered="true" class="ripple">
          <div class="thumb">
            <svg class="icon" viewBox="0 -960 960 960">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path>
            </svg>
          </div>
        </s-ripple>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}