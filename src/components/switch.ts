import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const name = 's-switch'
const props = useProps({
  disabled: false,
  checked: false,
  readOnly: false,
  defualtChecked: false,
  name: '',
  $value: '',
  $requiring: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  width: 52px;
  aspect-ratio: 1.625;
  -webkit-aspect-ratio: 1.625;
  border-radius: 16px;
  position: relative;
  color: ${scheme.color.primary};
  outline-color: ${scheme.color.onSurface};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.track{
  width: 100%;
  height: 100%;
  background: ${scheme.color.surfaceContainerHighest};
  box-shadow: 0 0 0 2px ${scheme.color.outline} inset;
  border-radius: inherit;
}
.handle{
  height: 125%;
  position: absolute;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  transition-property: transform;
  transform: translateX(-10%);
  justify-content: center;
  align-items: center;
  &::before{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transform: scale(.5);
    filter: opacity(.12);
    transition-property: transform, opacity;
    opacity: 0;
    background: ${scheme.color.outline};
  }
  .thumb{
    max-width: 60%;
    min-width: 40%;
    transition-property: min-width, min-height;
    border-radius: inherit;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    position: relative;
    padding: 10%;
    background: ${scheme.color.outline};
    ::slotted(:is(svg, s-icon)){
      color: currentColor;
      fill: currentColor;
      width: 100%;
      height: 100%;
    }
  }
}
.unselected{
  display: flex;
  color: ${scheme.color.surfaceVariant};
}
.selected{
  display: none;
}
:host([checked]){
  outline-color: currentColor;
  .unselected{
    display: none;
  }
  .selected{
    display: flex;
  }
  .track{
    background: currentColor;
    box-shadow: none;
  }
  .handle{
    transform: translateX(40%);
    &::before{
      background: currentColor;
    }
    .thumb{
      min-width: 60%;
      background: ${scheme.color.onPrimary};
    }
  }
}
:host([disabled]){
  pointer-events: none;
  .track{
    box-shadow: 0 0 0 2px color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) inset !important;
    background: none !important;
  }
  .thumb{
    box-shadow: none !important;
    background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
    .unselected{
      color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
    }
  }
  &:host([checked]){
    .track{
      background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
      box-shadow: none !important;
    }
    .thumb{
      background: ${scheme.color.surface} !important;
      .selected{
        color: color-mix(in srgb, currentColor 38%, transparent) !important;
      }
    }
  }
}
:host([readOnly]){
  pointer-events: none;
}
:host(:is([hover], [pressed])){
  .handle::before{
    opacity: 1;
    transform: scale(1);
  }
}
:host([pressed]){
  .handle>.thumb{
    min-width: 70%;
  }
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    .track{
      box-shadow: 0 0 0 2px ${scheme.color.surfaceContainerHighest} inset !important;
    }
    .thumb{
      background: ${scheme.color.outlineVariant} !important;
      .unselected{
        color: ${scheme.color.surfaceContainerHighest} !important;
      }
    }
    &:host([checked]){
      .track{
        background: ${scheme.color.surfaceContainerHighest} !important;
      }
      .thumb{
        .selected{
          color: ${scheme.color.outlineVariant} !important;
        }
      }
    }
  }
}
`

const template = /*html*/`
<div class="track" part="track"></div>
<div class="handle" part="handle">
  <div class="thumb" part="thumb">
    <div class="unselected" part="unselected">
      <slot name="unselected"></slot>
    </div>
    <div class="selected" part="selected">
      <slot name="selected"></slot>
    </div>
  </div>
</div>
`

export class Switch extends useElement({
  style, template, props,
  states: ['focusable', 'pressable', 'hoverable', 'formable'],
  setup(_, info) {
    const updateFrom = () => {
      if (!info.internals.form) return
      let value: string | null = null
      let valueMissing = false
      if (!this.disabled && this.value !== '' && this.name !== '') {
        value = this.checked ? this.value : null
        if (this.requiring !== '') valueMissing = !this.checked
      }
      info.internals.setFormValue(value)
      info.internals.setValidity({ valueMissing }, this.requiring, this)
    }
    this.addEventListener('click', () => {
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      onFormReset: () => this.checked = this.defualtChecked,
      onFormAssociated: updateFrom,
      onAttributeChanged: (name) => ['disabled', 'checked', 'name', 'value', 'requiring'].includes(name) && updateFrom()
    }
  }
}) { }

Switch.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Switch
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
    } & Switch
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