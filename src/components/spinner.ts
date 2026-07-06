import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  size: ['medium', 'large'],
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
}
.layout{
  display: block;
  width: 100%;
  height: 100%;
  padding: 4.6%;
  --s_spinner-gap: calc(var(--s_spinner-max) * 0.05);
  &.zero{
    .track{
      stroke-dasharray: var(--s_spinner-max) 0px;
    }
  }
}
.icon{
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  display: block;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
.track,
.indicator{
  stroke: currentColor;
  stroke-width: 10px;
  fill: none;
  stroke-linecap: round;
  shape-rendering: geometricPrecision;
  transform-origin: center;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
.track{
  transform: rotate(252deg);
  stroke-dasharray: var(--s_spinner-max) calc(var(--s_spinner-value) + var(--s_spinner-gap) * 2);
  stroke-dashoffset: var(--s_spinner-max);
  transition-property: stroke-dasharray;
  stroke: ${scheme.color.secondaryContainer};
}
.indicator{
  transform: rotate(270deg);
  stroke-dasharray: var(--s_spinner-max);
  stroke-dashoffset: calc(var(--s_spinner-max) - var(--s_spinner-value));
  transition-property: stroke-dashoffset;
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
  0%, 25%, 50%, 75%, 100%{ stroke-dashoffset: var(--s_spinner-max); }
  12.5%, 37.5%, 37.5%, 62.5%, 87.5%{ stroke-dashoffset: calc(var(--s_spinner-max) / 4); }
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
:host([size=large]){
  width: 44px;
  .layout{
    padding: 7.7%;
    --s_spinner-gap: calc(var(--s_spinner-max) * 0.07);
  }
  .track,
  .indicator{
    stroke-width: calc(8px / (44px / 100px));
  }
  .track{
    transform: rotate(245deg);
  }
}
`

const circumference = Math.PI * 100

const template = /*html*/`
<div class="layout zero" part="layout" style="--s_spinner-value: 0; --s_spinner-max: ${circumference}px">
  <svg viewBox="0 0 100 100" class="icon" part="icon">
    <circle class="track" cx="50" cy="50" r="50" part="track" />
    <circle class="indicator" cx="50" cy="50" r="50" part="indicator" />
  </svg>
</div>
`

export class Spinner extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      layout.classList.toggle('zero', this.value === 0)
      layout.style.setProperty('--s_spinner-value', `${(Math.min(this.value, this.max) / this.max) * circumference}px`)
    }
    return {
      value: rander
    }
  }
}) { }

const name = Spinner.define('s-spinner')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Spinner
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
    } & Spinner
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