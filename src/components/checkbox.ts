import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  disabled: false,
  checked: false,
  readOnly: false,
  indeterminate: false,
  defualtChecked: false,
  name: '',
  $value: '',
})

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  height: 40px;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  outline-color: currentColor;
  color: ${scheme.color.onSurfaceVariant};
  transition-timing-function: ${scheme.motion.easing.emphasized};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  outline-offset: inherit;
  outline-color: inherit;
  .ripple{
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    height: 100%;
    width: auto;
    border-radius: 50%;
    background: currentColor;
    opacity: 0;
    transform: scale(.5);
    transition-property: opacity, transform;
  }
}
.unchecked,
.checked,
.indeterminate{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.checked,
.indeterminate{
  position: absolute;
  transform: scale(.5);
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(.5, .5, .5, 2);
}
:host([indeterminate]) .unchecked{
  opacity: 0;
}
:host([checked]:not([indeterminate])) .checked,
:host([indeterminate]) .indeterminate{
  opacity: 1;
  transform: scale(1);
}
.text{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
svg,
::slotted(:is([slot=checked], [slot=unchecked], [slot=indeterminate])){
  color: currentColor;
  fill: currentColor;
  width: 60%;
  height: 60%;
}
:host([checked]){
  color: ${scheme.color.primary};
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
:host(:is([pressed], [hover])){
  .layout>.ripple{
    opacity: .12;
    transform: scale(1);
  }
}
:host(:focus-visible){
  outline-style: none;
  .layout{
    outline-style: solid;
    outline-width: 3px;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot class="unchecked" name="unchecked">
    <svg viewBox="0 -960 960 960">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"></path>
    </svg>
  </slot>
  <slot class="checked" name="checked">
    <svg viewBox="0 -960 960 960">
      <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
    </svg>
  </slot>
  <slot class="indeterminate" name="indeterminate">
    <svg viewBox="0 -960 960 960">
      <path d="M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
    </svg>
  </slot>
  <div class="ripple" part="ripple"></div>
</div>
<slot class="text" part="text"></slot>
`

export class Checkbox extends useElement({
  states: ['focusable', 'formable', 'hoverable', 'pressable'],
  style, template, props,
  setup(_, info) {
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      if (this.indeterminate) this.indeterminate = false
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      onFormReset: () => this.checked = this.defualtChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom()
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