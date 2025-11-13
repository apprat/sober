import { useProps, useElement, useThrottle } from '../core/element.js'
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
})

const style = /*css*/`
:host{
  display: inline-grid;
  vertical-align: middle;
  height: 36px;
  position: relative;
  grid-template-areas: "a" "a";
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  border-radius: 4px;
  color: var(--s-color-primary, ${scheme.color.primary});
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, ${scheme.color.onSurface}) 38%, transparent) !important;
  .track{
    color: color-mix(in srgb, var(--s-color-on-surface, ${scheme.color.onSurface}) 12%, transparent) !important;
  }
}
:host([reversed]){
  .slider[sliding]+.fill{
    box-shadow: 1px 0 0 inset currentColor;
  }
  .track{
    justify-self: start;
    justify-content: flex-start;
  }
  .fill{
    justify-self: end;
    justify-content: flex-end;
  }
}
:host([readonly]){
  cursor: default;
  .slider{
    pointer-events: none;
  }
}
.slider{
  position: absolute;
  inset: 0;
  height: 100%;
  opacity: 0;
  --base-slider-thumb-size: 0px;
}
.slider[sliding]+.fill{
  box-shadow: -1px 0 0 inset currentColor;
}
.track,
.fill{
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 50%;
  grid-area: a;
}
.fill{
  transition-property: box-shadow;
  transition-duration: inherit;
  transition-timing-function: inherit; 
}
.track{
  justify-self: end;
  justify-content: flex-end;
  color: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
}
svg,
::slotted(*){
  height: 100%;
  width: auto;
  flex-shrink: 0;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  fill: currentColor;
  color: currentColor;
}
`
const template = /*html*/`
<s-base-slider tabindex="-1" class="slider" part="slider" mode="single" slidingMode="all" end="${props.value}" max="${props.max}" min="${props.min}" step="${props.step}"></s-base-slider>
<slot class="fill" name="fill" part="fill">
  <svg viewBox="0 -960 960 960" id="fill">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
  <svg><use xlink:href="#fill"></use></svg>
  <svg><use xlink:href="#fill"></use></svg>
  <svg><use xlink:href="#fill"></use></svg>
  <svg><use xlink:href="#fill"></use></svg>
</slot>
<slot class="track" name="track" part="track">
  <svg viewBox="0 -960 960 960" id="track">
    <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"></path>
  </svg>
  <svg><use xlink:href="#track"></use></svg>
  <svg><use xlink:href="#track"></use></svg>
  <svg><use xlink:href="#track"></use></svg>
  <svg><use xlink:href="#track"></use></svg>
</slot>
`

export class Rating extends useElement({
  pressed: true,
  hovered: true,
  focused: true,
  style, props, template,
  setup(shadowRoot) {
    const baseSlider = shadowRoot.querySelector<BaseSlider>('s-base-slider')!
    const track = shadowRoot.querySelector<HTMLSlotElement>('.track')!
    const fill = shadowRoot.querySelector<HTMLSlotElement>('.fill')!
    const render = () => {
      const v = ((baseSlider.end - this.min) / (this.max - this.min)) * 100
      track.style.width = (100 - v) + '%'
      fill.style.width = v + '%'
    }
    baseSlider.oninput = () => {
      this.dispatchEvent(new Event('input'))
      render()
    }
    baseSlider.onchange = () => this.dispatchEvent(new Event('change'))
    this.addEventListener('keydown', (e) => {
      if (this.readOnly || !baseSlider.keydown(e.key)) return
      e.preventDefault()
    })
    return {
      onAttributeChanged: (name) => ['max', 'min', 'step', 'value'].includes(name) && render(),
      setMax: (v) => baseSlider.max = v,
      setMin: (v) => baseSlider.min = v,
      setStep: (v) => baseSlider.step = v,
      getValue: () => baseSlider.end,
      setValue: (v) => baseSlider.end = v,
      setReversed: (v) => baseSlider.mode = v ? 'single-reversed' : 'single',
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