import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { device } from '../core/device.js'

const name = 's-switch'
const props = useProps({
  disabled: false,
  checked: false,
  $value: ''
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
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.track{
  width: 100%;
  height: 100%;
  background: ${scheme.color.surfaceContainerHighest};
  box-shadow: 0 0 0 2px ${scheme.color.outline} inset;
  border-radius: inherit;
  transition-property: background;
}
.handle{
  height: 125%;
  position: absolute;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  transform: translateX(-10%);
  justify-content: center;
  align-items: center;
  transition-property: transform;
  &::before{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transform: scale(.5);
    transition-property: background, transform;
    transition-timing-function: inherit;
    transition-duration: inherit;
    filter: opacity(.12);
    opacity: 0;
    background: ${scheme.color.outline};
  }
  .thumb{
    max-width: 60%;
    min-width: 40%;
    border-radius: inherit;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    position: relative;
    transition-property: min-width, background;
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
:host(:is([hovered], [pressed])){
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
    <slot name="unselected" class="unselected" part="unselected"></slot>
    <slot name="selected" class="selected" part="selected"></slot>
  </div>
</div>
`

export class Switch extends useElement({
  style, template, props,
  focused: true,
  pressed: true,
  hovered: true,
  setup() {
    this.addEventListener('click', () => {
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
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
    } & Switch
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

function interpolateColor(startHex: string, endHex: string, progress: number) {
  const start = parseInt(startHex.substring(1), 16);
  const end = parseInt(endHex.substring(1), 16);
  const r = Math.round((end >> 16 & 0xFF) * progress / 100 + (start >> 16 & 0xFF) * (1 - progress / 100))
  const g = Math.round((end >> 8 & 0xFF) * progress / 100 + (start >> 8 & 0xFF) * (1 - progress / 100))
  const b = Math.round((end & 0xFF) * progress / 100 + (start & 0xFF) * (1 - progress / 100))
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`
}