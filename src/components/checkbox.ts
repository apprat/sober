import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  disabled: false,
  checked: false,
  readOnly: false,
  indeterminate: false,
  defaultChecked: false,
  name: '',
  $value: '',
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
  transition-timing-function: ${scheme.motion.easing.standardDecelerate};
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
  width: 100%;
  height: 100%;
  svg{
    width: 100%;
    height: 100%;
    overflow: visible;
    position: absolute;
    inset: 0;
    contain: size layout;
  }
}
.checked{
  opacity: 0;
  transform: scale(.5);
}
.indeterminate{
  opacity: 0;
}
:host([checked]){
  color: ${scheme.color.primary};
  &:host(:not([indeterminate])) .checked{
    opacity: 1;
    transform: scale(1);
  }
}
:host([indeterminate]){
  .indeterminate{
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
    <svg viewBox="0 -960 960 960" class="unchecked">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"></path>
    </svg>
    <svg viewBox="0 -960 960 960" class="checked">
      <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
    </svg>
    <svg viewBox="0 -960 960 960" class="indeterminate">
      <path d="M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
    </svg>
  </div>
  <s-ripple class="ripple" part="ripple" parentDepth="1"></s-ripple>
</div>
<slot></slot>
`

export class Checkbox extends useElement({
  states: ['focusable', 'formable', 'hoverable', 'pressable'],
  style, template, props,
  setup(shadowRoot, info) {
    const animate = shadowRoot.querySelector<SVGAnimateElement>('#animate')!
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      if (this.indeterminate) this.indeterminate = false
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      onFormReset: () => this.checked = this.defaultChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom(),
      indeterminate: (v) => {

      },
      checked: (v) => {
        if (!info.isConnected) return
        // if (v) {
        //   animate.setAttribute('from', paths.unchecked)
        //   animate.setAttribute('to', paths.checked)
        //   animate.beginElement()
        //   console.log('checked', v)
        // } else {

        // }
      }
    }
  }
}) { }

const name = Checkbox.define('s-checkbox')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Checkbox
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
    } & Checkbox
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