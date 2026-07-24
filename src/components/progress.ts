import { useProps, useElement, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { bezier } from '../core/utils/bezier.js'

const props = useProps({
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 4px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  overflow: hidden;
  color: ${scheme.color.primary};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: contents;
  border-radius: inherit;
  border-color: inherit;
  &::before,
  &::after,
  .track,
  .indicator{
    position: absolute;
    border-radius: inherit;
    contain: strict;
    inset: 0;
    will-change: transform;
    background: ${scheme.color.secondaryContainer};
  }
  .indicator{
    background: currentColor;
  }
  .late{
    transform: translateX(-100%);
  }
  .early{
    transform: translateX(calc(var(--s_progress-value) + 4px));
  }
  .between{
    transform: translateX(calc((100% - var(--s_progress-value)) * -1));
  }
  &.min .early{
    transform: translateX(0%);
  }
}
.stop{
  position: absolute;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  height: 100%;
  right: 0;
  border-radius: 50%;
  background: currentColor;
}
:host([indeterminate]){
  .stop{
    display: none;
  }
  .layout{
    &::before,
    &::after,
    .track,
    .indicator{
      content: '';
      transform: none;
      height: 100%;
      contain: strict;
      width: 20px;
      left: 0;
    }
    .late{
      --width: 30%;
    }
    .early{
      --animation-name: indeterminate-early;
    }
    .between{
      --animation-name: indeterminate-between;
    }
  }
}
`

const template = /*html*/`
<div class="layout min" part="layout">
  <div class="indicator late" part="late"></div>
  <div class="track early" part="early"></div>
  <div class="indicator between" part="between"></div>
</div>
<div class="stop" part="stop"></div>
`

export class Progress extends useElement({
  style: [style], props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      layout.classList.toggle('min', this.value === 0)
      layout.style.setProperty('--s_progress-value', `${Math.min(this.value, this.max) / this.max * 100}%`)
    }
    return {
      value: () => useThrottle(rander)
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
    } & Progress
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