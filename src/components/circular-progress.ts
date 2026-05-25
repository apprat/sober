import { useProps, useElement, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  size: ['medium', 'large'],
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const config = {
  dasharray: Math.PI * 100
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
}
.layout{
  display: block;
  width: 100%;
  height: 100%;
  padding: 2px;
}
.layout.zero{
  .track{
    --s_track-offset: 0px !important;
  }
}
.icon{
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  display: block;
}
.track,
.indicator{
  stroke: currentColor;
  stroke-width: 10px;
  fill: none;
  stroke-linecap: round;
  shape-rendering: geometricPrecision;
  transform-origin: center;
  transform: rotate(-90deg);
  stroke-dasharray: var(--s_max);
}
.track{
  --s_track-offset: 35px;
  transform: rotate(250deg);
  stroke: ${scheme.color.secondaryContainer};
  stroke-dashoffset: calc(min(var(--s_max), var(--s_max) / 100 * var(--s_value) + var(--s_track-offset)) * -1);
}
.indicator{
  stroke-dashoffset: calc(var(--s_max) - var(--s_max) / 100 * var(--s_value));
}
:host([size=large]){
  width: 44px;
  .layout{
    padding: 4px;
    .track,
    .indicator{
      stroke-width: 20px;
    }
    .track{
      --s_track-offset: 52px;
      transform: rotate(240deg);
    }
  }
}
@keyframes circular{
  0%{ transform: rotate(0deg); }
  100%{ transform: rotate(360deg); }
}
@keyframes circular2{
  0%, 12.5%{transform: rotate(-90deg);}
  25%, 37.5%{ transform: rotate(180deg); }
  50%, 62.5%{ transform: rotate(450deg); }
  75%, 87.5%{ transform: rotate(720deg); }
  100%{ transform: rotate(990deg); }
  0%, 25%, 50%, 75%, 100%{ stroke-dashoffset: var(--s_max); }
  12.5%, 37.5%, 37.5%, 62.5%, 87.5%{ stroke-dashoffset: calc(var(--s_max) / 4); }
}
:host([indeterminate]){
  .layout{
    animation: circular 2s infinite linear;
  }
  .track{
    display: none;
  }
  .indicator{
    animation: circular2 6s infinite cubic-bezier(0.4, 0, 0.2, 1), steps(4), linear;
  }
}
`

const template = /*html*/`
<div class="layout zero" part="layout" style="--s_value: 0;--s_max: ${config.dasharray}px">
  <svg viewBox="0 0 100 100" class="icon" part="icon">
    <circle class="track" cx="50" cy="50" r="50" part="track" />
    <circle class="indicator" cx="50" cy="50" r="50" part="indicator" />
  </svg>
</div>
`

export class CircularProgress extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      layout.classList.toggle('zero', this.value === 0)
      layout.style.setProperty('--s_value', `${Math.min(this.value, this.max) / this.max * 100}`)
    }
    return {
      value: () => useThrottle(rander)
    }
  }
}) { }

const name = CircularProgress.define('s-circular-progress')

declare global {
  interface HTMLElementTagNameMap {
    [name]: CircularProgress
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Alert.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
    } & CircularProgress
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