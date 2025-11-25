import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import './ripple.js'

const props = useProps({
  variant: ['info', 'success', 'warning', 'error'],
  collapsed: false,
  opened: false
})

const style = /*css*/`
:host{
  display: flex;
  padding: 12px 16px;
  line-height: 1.5;
  font-weight: 500;
  min-height: 48px;
  border-radius: 4px;
  word-break: break-all;
  transition-property: color, background-color;
  font-size: calc(var(--s-font-size, 1) * 14px);
  color: ${scheme.color.onSecondaryContainer};
  background: ${scheme.color.secondaryContainer};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
:host([variant=success]){
  color: ${scheme.color.onSuccessContainer};
  background: ${scheme.color.successContainer};
}
:host([variant=warning]){
  color: ${scheme.color.onWarningContainer};
  background: ${scheme.color.warningContainer};
}
:host([variant=error]){
  color: ${scheme.color.onErrorContainer};
  background: ${scheme.color.errorContainer};
}
.icon{
  display: none;
  margin-right: 14px;
}
svg{
  width: 24px;
  height: 24px;
  fill: currentColor;
  flex-shrink: 0;
}
:host(:not([variant])) .info,
:host([variant=success]) .success,
:host([variant=warning]) .warning,
:host([variant=error]) .error{
  display: block;
}
.text{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  text-align: left;
  user-select: text;
  -webkit-user-select: text;
  .content{
    display: block;
    overflow: hidden;
  }
}
.toggle{
  display: none;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin: -6px -8px -6px 4px;
  color: ${scheme.color.primary};
  svg{
    transition-property: transform;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
:host([collapsed]){
  &:host(:not([opened])){
    .text>.content{
      display: none;
    }
  }
  &:host([opened]){
    .toggle>svg{
      transform: rotate(-180deg);
    }
    slot[name=toggle]{
      --s-icon-button-transform: rotate(-180deg);
    }
  }
  .toggle{
    display: flex;
  }
}
::slotted(*){
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  color: currentColor;
  width: 24px;
  height: 24px;
}
::slotted(:is(svg, s-icon)[slot=icon]){
  margin-right: 14px;
}
::slotted([slot=title]){
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 15px);
}
::slotted(s-button[slot=action]){
  min-width: 0;
  padding: 0 8px;
  border-radius: 4px;
  margin: -4px -6px -4px 6px;
}
::slotted(s-icon-button:is([slot=action], [slot=toggle])){
  margin: -6px -8px -6px 4px;
  color: ${scheme.color.primary};
}
`
const template = /*html*/`
<slot name="icon">
  <svg viewBox="0 0 24 24" class="icon info">
    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="icon success">
    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="icon warning">
    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="icon error">
    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  </svg>
</slot>
<div class="text" part="text">
  <slot name="title"></slot>
  <slot class="content" part="content"></slot>
</div>
<slot name="toggle">
  <div class="toggle" part="toggle" tabindex="0">
    <svg viewBox="0 -960 960 960">
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
    </svg>
    <s-ripple></s-ripple>
  </div>
</slot>
<slot name="action"></slot>
`

export class Alert extends useElement({
  style, props, template,
  setup(shadowRoot, info) {
    const toggleSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=toggle]')!
    const toggleEl = shadowRoot.querySelector<HTMLSlotElement>('.toggle')!
    const content = shadowRoot.querySelector<HTMLSlotElement>('.content')!
    const computedStyle = useComputedStyle(this)
    toggleSlot.onclick = () => {
      this.opened = !this.opened
      this.dispatchEvent(new Event('toggle'))
    }
    toggleEl.onkeydown = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      toggleSlot.click()
    }
    return {
      setOpened: (v) => {
        if (!info.isConnected || !this.collapsed) return
        const [old] = content.getAnimations()
        content.style.display = 'block'
        if (old) return old.reverse()
        const keyframe = { height: ['0px', `${content.offsetHeight}px`] }
        if (!v) {
          keyframe.height[1] = `${content.offsetHeight}px`
          keyframe.height.reverse()
        }
        content.animate(keyframe, {
          easing: computedStyle.getValue('transition-timing-function'),
          duration: computedStyle.getDuration('transition-duration')
        }).finished.then(() => content.style.removeProperty('display'))
      }
    }
  }
}) { }

const name = Alert.define('s-alert')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Alert
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
    } & Alert
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