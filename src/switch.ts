import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-switch'
const props = {
  disabled: false,
  checked: false
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  width: 52px;
  aspect-ratio: 1.625;
  -webkit-aspect-ratio: 1.625;
  border-radius: 26px;
  flex-shrink: 0;
}
:host([disabled=true]){
  pointer-events: none;
}
.track{
  width: 100%;
  height: 100%;
  border: solid 2px var(--s-color-outline, ${Theme.colorOutline});
  box-sizing: border-box;
  border-radius: inherit;
}
:host([disabled=true]) .track{
  border-color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
:host([checked=true]) .track{
  border-width: 0;
  background: currentColor;
}
:host([disabled=true][checked=true]) .track{
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
.ripple{
  height: 125%;
  width: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  top: auto;
  transition: transform .1s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: var(--s-color-outline, ${Theme.colorOutline});
  transform: translateX(-10%);
}
:host([checked=true]) .ripple{
  transform: translateX(40%);
  color: currentColor;
}
.thumb{
  background: var(--s-color-outline, ${Theme.colorOutline});
  border-radius: 50%;
  width: 40%;
  height: 40%;
  transition: transform .1s, box-shadow .1s;
  transition-timing-function: ease-out;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
:host([disabled=true]) .thumb{
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent);
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary, ${Theme.colorOnPrimary});
  transform: scale(1.5);
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
:host([disabled=true][checked=true]) .thumb{
  background: var(--s-color-surface, ${Theme.colorSurface});
  box-shadow: none;
}
.icon{
  width: 70%;
  height: 70%;
  fill: currentColor;
  opacity: 0;
  transition: opacity .1s ease-out;
}
:host([checked=true]) .icon{
  opacity: 1;
}
:host([checked=true][disabled=true]) .icon{
  fill: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent);
}
`

const template = /*html*/`
<div class="track" part="track"></div>
<s-ripple attached="true" centered="true" class="ripple" part="ripple">
  <div class="thumb" part="thumb">
    <svg class="icon" viewBox="0 -960 960 960">
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path>
    </svg>
  </div>
</s-ripple>
`

export class Switch extends useElement({
  style, template, props, syncProps: true,
  setup() {
    this.addEventListener('click', () => {
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
  }
}) { }

Switch.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Switch
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}