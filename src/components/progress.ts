import { useProps, useElement, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['linear', 'circular'],
  size: ['medium', 'large'],
  indeterminate: false,
  $max: 100,
  value: 0,
})

const config = {
  dasharray: Math.PI * 100
}

const style = /*css*/`
:host{
  display: block;
  height: 4px;
  overflow: hidden;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
  border-radius: 2px;
  color: var(--s-color-primary, ${scheme.color.primary});
  --pregress-gap: 4px;
  .linear{
    height: 100%;
    display: flex;
    gap: var(--pregress-gap);
    border-radius: inherit;
    position: relative;
    align-items: center;
    .track,
    .indicator{
      height: 100%;
      flex-shrink: 0;
      border-radius: inherit;
      position: relative;
      display: flex;
      align-items: center;
      will-change: width;
      transition-property: width, flex-grow;
    }
    .track{
      flex-grow: 1;
      background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
    }
    .indicator{
      background: currentColor;
      width: var(--s-private-value, 0);
    }
    span{
      position: absolute;
      width: 4px;
      height: 4px;
      right: 0;
      flex-shrink: 0;
      border-radius: 50%;
      background: currentColor;
    }
  }
  .circular{
    width: 100%;
    height: 100%;
    display: none;
    padding: 2px;
    .layout{
      width: 100%;
      height: 100%;
      overflow: visible;
      .track,
      .indicator{
        stroke: currentColor;
        stroke-width: 10px;
        fill: none;
        stroke-linecap: round;
        shape-rendering: geometricPrecision;
        transform-origin: center;
        transform: rotate(-90deg);
        stroke-dasharray: var(--s-private-max);
        transition-property: stroke-dashoffset;
      }
      .track{
        --s-private-track-offset: 35px;
        transform: rotate(250deg);
        stroke: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
        stroke-dashoffset: calc(min(var(--s-private-max), var(--s-private-max) / 100 * var(--s-private-value) + var(--s-private-track-offset)) * -1);
      }
      .indicator{
        stroke-dashoffset: calc(var(--s-private-max) - var(--s-private-max) / 100 * var(--s-private-value));
      }
    }
  }
}
:host(:not(:is([value], [indeterminate]))){
  .linear{
    .indicator{
      display: none;
    }
  }
}
:host(:not([value])){
  .circular{
    .layout{
      .track{
        --s-private-track-offset: 0px;
      }
    }
  }
}
:host([size=large]){
  height: 8px;
  border-radius: 4px;
}
:host([size=large]:not([indeterminate])){
  .linear{
    span{
      right: 2px;
    }
  }
}
:host([size=large][variant=circular]){
  width: 44px;
  .circular{
    padding: 4px;
    .layout{
      .track,
      .indicator{
        stroke-width: 20px;
      }
      .track{
        --s-private-track-offset: 52px;
        transform: rotate(240deg);
      }
    }
  }
}
:host([variant=circular]){
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: auto;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  .linear{ 
    display: none;
  }
  .circular{
    display: flex;
  }
}
@keyframes linear{
  0%{ transform: translateX(0); }
  100%{ transform: translateX(calc(250% + var(--pregress-gap) * 4)); }
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
  0%, 25%, 50%, 75%, 100%{ stroke-dashoffset: var(--s-private-max); }
  12.5%, 37.5%, 37.5%, 62.5%, 87.5%{ stroke-dashoffset: calc(var(--s-private-max) / 4); }
}
:host([indeterminate]){
  .linear{
    justify-content: flex-end;
    animation: cubic-bezier(0.4, 0, 1, 1) 2s infinite linear;
    .track,
    .indicator,
    &::before,
    &::after,
    span{
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      will-change: width;
      border-radius: inherit;
    }
    &::before,
    &::after{
      content: '';
      background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
    }
    .indicator{
      width: 30%;
    }
    .track{
      width: 60%;
    }
    span{
      position: static;
      width: 60%;
    }
  }
  .circular{
    .layout{
      animation: circular 2s infinite linear;
      .track{
        display: none;
      }
      .indicator{
        animation: circular2 6s infinite cubic-bezier(0.4, 0, 0.2, 1), steps(4), linear;
      }
    }
  }
}
`

const template = /*html*/`
<div class="linear" part="linear">
  <div class="indicator" part="indicator"></div>
  <div class="track" part="track"></div>
  <span></span>
</div>
<div class="circular" part="circular" style="--s-private-value: 0;--s-private-max: ${config.dasharray}px;">
  <svg viewBox="0 0 100 100" class="layout" part="layout">
    <circle class="track" cx="50" cy="50" r="50" part="track" />
    <circle class="indicator" cx="50" cy="50" r="50" part="indicator" />
  </svg>
</div>
`

export class Progress extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const linear = shadowRoot.querySelector<HTMLDivElement>('.linear')!
    const circular = shadowRoot.querySelector<HTMLDivElement>('.circular')!
    const rander = () => {
      const percentage = Math.min(this.value, this.max) / this.max * 100
      linear.style.setProperty('--s-private-value', `${percentage}%`)
      circular.style.setProperty('--s-private-value', `${percentage}`)
    }
    return {
      setValue: () => useThrottle(rander)
    }
  }
}) { }

const name = Progress.define('s-progress')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Progress
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Alert.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
    } & Progress
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