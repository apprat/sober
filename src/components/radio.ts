import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  checked: false,
  readOnly: false,
  defaultChecked: false,
  name: '',
  $value: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  gap: 8px;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  height: 24px;
  line-height: calc(100% + 4px);
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  outline-color: currentColor;
  color: ${scheme.color.onSurfaceVariant};
  transition-timing-function: ${scheme.motion.easing.standardAccelerate};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  flex-shrink: 0;
  outline-offset: 6px;
  border-radius: 50%;
  &::before,
  .ripple{
    content: '';
    position: absolute;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    height: calc(100% + 16px);
    width: auto;
    inset: auto;
    border-radius: 50%;
  }
}
.icon{
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  svg{
    width: 100%;
    height: 100%;
    overflow: visible;
    transition-timing-function: inherit;
    transition-duration: inherit;
    contain: size layout;
    circle{
      stroke: currentColor;
      transform-box: view-box;
      transform-origin: center;
      transition-timing-function: inherit;
      transition-duration: inherit;
    }
    .outline{
      stroke-width: 2px;
      fill: transparent;
    }
    .fill{
      fill: currentColor;
      opacity: 0;
      transform: scale(2);
    }
  }
}
:host([checked]){
  color: ${scheme.color.primary};
  .fill{
    transform: scale(1);
    opacity: 1;
  }
}
:host([readOnly]){
  pointer-events: none;
}
:host([disabled]){
  pointer-events: none;
  .layout{
    color: ${scheme.color.onSurface} !important;
    opacity: .38 !important;
  }
}
:host(:focus-visible){
  outline-style: none;
  .layout{
    outline-style: solid;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <div class="icon" part="icon">
    <svg viewBox="0 0 20 20" shape-rendering="geometricPrecision">
      <circle class="outline" cx="10" cy="10" r="9" />
      <circle class="fill" cx="10" cy="10" r="5" />
    </svg>
  </div>
  <s-ripple class="ripple" part="ripple" parentDepth="1"></s-ripple>
</div>
<slot></slot>
`

export class Radio extends useElement({
  states: ['focusable', 'pressable', 'hoverable', 'formable'],
  style, template, props,
  setup(shadowRoot, info) {
    const icon = shadowRoot.querySelector<HTMLDivElement>('.icon')!
    const outline = shadowRoot.querySelector<SVGCircleElement>('.outline')!
    const fill = shadowRoot.querySelector<SVGCircleElement>('.fill')!
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      this.checked = true
      this.dispatchEvent(new Event('change'))
      this.name && (this.getRootNode() as ShadowRoot).querySelectorAll<typeof this>(`${this.tagName}[name='${this.name}']`).forEach((item) => {
        if (item === this || !item.checked) return
        item.checked = false
      })
    })
    return {
      onFormReset: () => this.checked = this.defaultChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom(),
      checked: (v) => {
        if (!info.isConnected) return
        if (v) {
          const dur = 400
          //icon.animate([{ transform: 'scale(1)' }, { transform: 'scale(1)' }], { duration: dur })
          //outline.animate([{ offset: 0, storkeWidth: 4 }, { offset: 0.5, strokeWidth: 18 }, { offset: 0.5, strokeWidth: 4 }, { offset: 1, strokeWidth: 4 }], { duration: dur })
          //fill.animate([{ offset: 0, transform: 'scale(0)' }, { offset: 0.5, transform: 'scale(0)' }, { offset: 0.5, transform: 'scale(1)' }, { offset: 1, transform: 'scale(.5)' }], { duration: dur })
        }
      }
    }
  }
}) { }

const name = Radio.define('s-radio')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Radio
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
    } & Radio
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