import { useProps, useElement, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  size: ['medium', 'large'],
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  gap: 4px;
  height: 4px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  color: var(--s-color-primary, ${scheme.color.primary});
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
.layout{
  display: contents;
  border-radius: inherit;
}
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
  width: var(--s_value, 0);
}
:host(:not([indeterminate])){
  .zero>.indicator{
    display: none;
  }
}
span{
  position: absolute;
  width: 4px;
  height: 4px;
  right: 0;
  border-radius: 50%;
  background: currentColor;
}
:host([size=large]){
  height: 8px;
  border-radius: 4px;
  span{
    right: 2px;
  }
}
@keyframes linear{
  0%{ 
    transform: translateX(0);
  }
  100%{ 
    transform: translateX(250%);
  }
}
:host([indeterminate]){
  .layout{
    display: flex;
    height: 100%;
    gap: inherit;
    flex-grow: 1;
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
      position: static;
    }
    &::before,
    &::after{
      content: '';
      background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
    }
    .indicator{
      width: 30%;
    }
    .track,
    span{
      width: 60%;
    }
  }
}
`

const template = /*html*/`
<div class="layout zero" part="layout">
  <div class="indicator" part="indicator"></div>
  <div class="track" part="track"></div>
  <span class="dot" part="dot"></span>
</div>
`

export class Progress extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      layout.classList.toggle('zero', this.value === 0)
      layout.style.setProperty('--s_value', `${Math.min(this.value, this.max) / this.max * 100}%`)
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