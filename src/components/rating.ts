import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  $value: 5,
  $max: 10,
  $step: 1,
  $min: 0,
  reversed: false,
  $name: '',
  $defualtValue: 0
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  height: 36px;
  position: relative;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  border-radius: 4px;
  color:  ${scheme.color.primary};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  --s_value: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.track,
.fill{
  display: flex;
  position: relative;
  height: 100%;
  flex-shrink: 0;
}
.fill{
  position: relative;
  top: -100%;
  clip-path: polygon(0 0, 0 100%, var(--s_value) 100%, var(--s_value) 0);
}
.track{
  clip-path: polygon(var(--s_value) 0, var(--s_value) 100%, 100% 100%, 100% 0);
  color: ${scheme.color.secondaryContainer};
}
.slider{
  position: absolute;
  inset: 0;
  height: auto;
  color: inherit;
  --base-slider-thumb-size: 0px;
  &::part(track-fill),
  &::part(track-end),
  &::part(thumb-end){
    opacity: 0;
    content-visibility: hidden;
  }
  .indicator{
    position: absolute;
    width: auto;
    border-left: solid 2px currentColor;
    border-radius: 1px;
    height: 100%;
    transform: translateX(-50%);
    left: var(--s_value);
    opacity: 0;
    transition-property: opacity;
  }
  &[end-pressed]{
    .indicator{
      opacity: 1;
    }
  }
}
svg,
::slotted(:is(svg, s-icon)){
  flex-shrink: 0;
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  fill: currentColor;
  color: currentColor;
}
:host(:focus-visible){
  outline: none;
  .indicator{
    opacity: 1;
  }
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  .track{
    color: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
  }
}
:host([reversed]){
  .indicator{
    left: auto;
    right: var(--s_value);
    transform: translateX(50%);
  }
  .track{
    clip-path: polygon(0 0, calc(100% - var(--s_value)) 0, calc(100% - var(--s_value)) 100%, 0 100%);
  }
  .fill{
    clip-path: polygon(calc(100% - var(--s_value)) 0, calc(100% - var(--s_value)) 100%, 100% 100%, 100% 0);
  }
}
:host([readonly]){
  cursor: default;
  pointer-events: none;
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    color: ${scheme.color.outlineVariant} !important;
    .track{
      color: ${scheme.color.surfaceContainerHigh} !important;
    }
  }
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <slot class="track" name="track" part="track">
    <svg viewBox="0 -960 960 960" id="track">
      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"></path>
    </svg>
    <svg><use xlink:href="#track"></use></svg>
    <svg><use xlink:href="#track"></use></svg>
    <svg><use xlink:href="#track"></use></svg>
    <svg><use xlink:href="#track"></use></svg>
  </slot>
  <slot class="fill" name="fill" part="fill">
    <svg viewBox="0 -960 960 960" id="fill">
      <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
    </svg>
    <svg><use xlink:href="#fill"></use></svg>
    <svg><use xlink:href="#fill"></use></svg>
    <svg><use xlink:href="#fill"></use></svg>
    <svg><use xlink:href="#fill"></use></svg>
  </slot>
  <s-base-slider tabindex="-1" class="slider" part="slider" slidingMode="all" end="${props.value}" max="${props.max}" min="${props.min}" step="${props.step}">
    <div class="indicator" part="indicator"></div>
  </s-base-slider>
</div>
`

export class Rating extends useElement({
  pressed: true,
  hovered: true,
  focused: true,
  formAssociated: true,
  style, props, template,
  setup(shadowRoot, info) {
    const baseSlider = shadowRoot.querySelector<BaseSlider>('s-base-slider')!
    const layout = shadowRoot.querySelector<HTMLSlotElement>('.layout')!
    const updateFrom = () => info.internals.setFormValue(this.disabled ? null : String(baseSlider.end))
    const render = () => {
      const v = ((baseSlider.end - this.min) / (this.max - this.min)) * 100
      layout.style.setProperty('--s_value', `${v}%`)
    }
    baseSlider.oninput = () => {
      this.dispatchEvent(new Event('input'))
      render()
      updateFrom()
    }
    baseSlider.onchange = () => this.dispatchEvent(new Event('change'))
    this.addEventListener('keydown', (e) => {
      if (this.readOnly || !baseSlider.keydown(e.key)) return
      e.preventDefault()
    })
    updateFrom()
    return {
      onAttributeChanged: (name) => {
        if (['max', 'min', 'step', 'value'].includes(name)) render()
        if (['disabled', 'value'].includes(name)) updateFrom()
      },
      setMax: (v) => baseSlider.max = v,
      setMin: (v) => baseSlider.min = v,
      setStep: (v) => baseSlider.step = v,
      getValue: () => baseSlider.end,
      setValue: (v) => baseSlider.end = v,
      setReversed: (v) => baseSlider.mode = v ? 'reversed' : 'single',
      onFormReset: () => this.value = this.defualtValue,
    }
  }
}) { }

const name = Rating.define('s-rating')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Rating
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
    } & Rating
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