import { useProps, useElement, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import './ripple.js'

const props = useProps({
  variant: ['surface', 'info', 'success', 'warning', 'error'],
  collapsed: false,
  open: false,
  closable: false
})

const style = /*css*/`
:host{
  display: flex;
  flex-wrap: wrap;
  padding: 12px 16px;
  min-height: 48px;
  position: relative;
  line-height: calc(100% + 8px);
  font-size: calc(var(--s-font-size, 1) * 14px);
  border-radius: ${scheme.shape.corner.small};
  background: ${scheme.color.surfaceContainerHigh};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
:host(:not([variant])){
  &::after{
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    border: solid var(--s-border-min, 1px) ${scheme.color.surfaceVariant};
  }
}
:host([variant=info]){
  color: ${scheme.color.onSecondaryContainer};
  background: ${scheme.color.secondaryContainer};
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
.btn{
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  &[pressed]{
    border-radius: ${scheme.shape.corner.small};
  }
  svg,
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
    width: 20px;
    font-size: 20px;
  }
  ::slotted(:is(.icon, svg, s-icon, ms-icon)){
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
.layout{
  display: contents;
}
.text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  flex-grow: 1;
  min-width: 0;
  flex-basis: 0;
  user-select: text;
  -webkit-user-select: text;
  .title{
    display: contents;
    min-width: 0;
  }
  .content{
    overflow: hidden;
    contain: layout;
  }
}
.actions{
  display: flex;
  gap: 0;
  height: fit-content;
  margin-top: -4px;
  margin-bottom: -4px;
  position: relative;
  right: -8px;
}
:host([collapsed]){
  .has-title{
    .text{
      display: contents;
    }
    .title{
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
    }
    .content{
      flex-basis: 100%;
      order: 1;
      .content-wrap{
        padding-top: 4px;
      }
    }
    .toggle{
      display: flex;
    }
  }
  &:host(:not([open])) .has-title .content{
    display: none;
  }
  &:host([open]){
    .toggle svg,
    ::slotted(:is(.icon, svg, s-icon, ms-icon)[slot=toggle-icon]){
      transform: rotate(-180deg);
    }
  }
}
:host([closable]){
  .close{
    display: flex;
  }
}
::slotted([slot=title]){
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 16px);
  padding: 12px 0;
  margin: -12px 0;
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
  width: 24px;
  font-size: 24px;
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=start]){
  margin-right: 8px;
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <slot name="start"></slot>
  <div class="text" part="text">
    <div class="title" part="title">
      <slot name="title"></slot>
    </div>
    <div class="content" part="content">
      <div class="content-wrap" part="content-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="actions hide" part="actions">
    <div class="btn toggle hide" part="toggle" tabindex="0" role="button" aria-label="toggle">
      <slot name="toggle-icon">
        <svg viewBox="0 -960 960 960">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
        </svg>
      </slot>
      <s-ripple></s-ripple>
    </div>
    <div class="btn close hide" part="close" tabindex="0" role="button" aria-label="close">
      <slot name="close-icon">
        <svg viewBox="0 -960 960 960">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path>
        </svg>
      </slot>
      <s-ripple></s-ripple>
    </div>
  </div>
  <slot name="end"></slot>
</div>
`

export class Alert extends useElement({
  style, props, template,
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const titleSlot = shadowRoot.querySelector<HTMLSlotElement>('[name=title]')!
    const toggle = shadowRoot.querySelector<HTMLSlotElement>('.toggle')!
    const close = shadowRoot.querySelector<HTMLSlotElement>('.close')!
    const content = shadowRoot.querySelector<HTMLSlotElement>('.content')!
    const computedStyle = useComputedStyle(this)
    toggle.onclick = () => {
      this.open = !this.open
      this.dispatchEvent(new Event('toggle'))
    }
    close.onclick = () => {
      this.dispatchEvent(new Event('close'))
    }
    focusKeydownClick(toggle, close)
    titleSlot.addEventListener('slotchange', () => layout.classList.toggle('has-title', titleSlot.assignedNodes().length > 0))
    return {
      open: async (v) => {
        if (!info.isConnected || !this.collapsed || !layout.classList.contains('has-title')) return
        const [old] = content.getAnimations()
        if (old) return old.reverse()
        content.style.display = 'block'
        const height = content.offsetHeight
        const keyframe = { height: ['0px', `${height}px`] }
        if (!v) keyframe.height.reverse()
        await content.animate(keyframe, { easing: computedStyle.getValue('transition-timing-function'), duration: computedStyle.getDuration('transition-duration') }).finished
        content.style.removeProperty('display')
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
    } & Alert
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