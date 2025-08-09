import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  variant: ['info', 'success', 'warning', 'error'],
  collapsed: false,
  opened: false
})

const style = /*css*/`
:host{
  display: flex;
  padding: 12px 16px;
  align-items: center;
  line-height: 24px;
  font-size: .875rem;
  font-weight: 500;
  min-height: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  word-break: break-all;
  color: var(--s-color-on-secondary-container, ${scheme.color.onSecondaryContainer});
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
  transition-property: color, background-color;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
:host([variant=success]){
  color: var(--s-color-on-success-container, ${scheme.color.onSuccessContainer});
  background: var(--s-color-success-container, ${scheme.color.successContainer});
}
:host([variant=warning]){
  color: var(--s-color-on-warning-container, ${scheme.color.onWarningContainer});
  background: var(--s-color-warning-container, ${scheme.color.warningContainer});
}
:host([variant=error]){
  color: var(--s-color-on-error-container, ${scheme.color.onErrorContainer});
  background: var(--s-color-error-container, ${scheme.color.errorContainer});
}
svg{
  width: 24px;
  height: 24px;
  fill: currentColor;
  box-sizing: border-box;
  flex-shrink: 0;
}
.icon,
.toggle{
  display: none;
}
.icon,
::slotted([slot=icon]){
  margin-right: 14px;
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
}
.actions{
  display: flex;
  align-items: center;
  margin-right: -8px;
  min-width: 8px;
  margin-top: -8px;
  margin-bottom: -8px;
  flex-shrink: 0;
}
.toggle{
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-shrink: 0;
}
:host([collapsed=true]) .toggle{
  display: flex;
}
.toggle>svg{
  transition-property: transform;
}
:host([collapsed=true][opened=true]) .toggle>svg{
  transform: rotate(-180deg);
}
.content{
  display: block;
  overflow: hidden;
  animation-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  animation-duration: var(--s-motion-duration-medium4, ${scheme.motion.duration.medium4});
}
:host([collapsed=true]:not([opened=true])) .content{
  display: none;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted([slot=title]){
  font-weight: 600;
  font-size: 1rem;
}
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  color: currentColor;
  width: 24px;
  height: 24px;
}
.toggle,
::slotted(:is([slot=toggle], [slot=action])){
  color: var(--s-color-primary, ${scheme.color.primary});
}
::slotted(s-button[slot=action]){
  height: 32px;
  min-width: 0;
  padding: 0 8px;
  border-radius: 4px;
  font-size: .8125rem;
  background: none;
}
::slotted(s-icon-button[slot=action]){
  width: 36px;
  height: 36px;
  padding: 8px;
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
<div class="actions" part="actions">
  <slot name="toggle">
    <s-ripple class="toggle" part="toggle" tabindex="0">
      <svg viewBox="0 -960 960 960">
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
      </svg>
    </s-ripple>
  </slot>
  <slot name="action"></slot>
</div>
`

export class Alert extends useElement({
  name: 's-alert',
  style, props, template,
  setup(shadowRoot) {
    const toggleSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=toggle]')!
    const toggleEl = shadowRoot.querySelector<HTMLSlotElement>('.toggle')!
    const content = shadowRoot.querySelector<HTMLSlotElement>('.content')!
    const computedStyle = useComputedStyle(content)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const open = () => {
      if (!this.isConnected || this.opened) return
      this.opened = true
      const animation = content.animate({ height: ['0', `${content.offsetHeight}px`] }, getAnimateOptions())
      animation.finished.then(() => content.style.removeProperty('display'))
    }
    const close = () => {
      if (!this.isConnected || !this.opened) return
      content.animate({ height: [`${content.offsetHeight}px`, '0'], display: ['block', 'block'] }, getAnimateOptions())
      this.opened = false
    }
    const toggle = (force?: boolean) => (force ?? !this.opened) ? open() : close()
    toggleSlot.onclick = () => {
      toggle()
      this.dispatchEvent(new Event('toggle'))
    }
    toggleEl.onkeydown = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      toggleSlot.click()
    }
    return {
      expose: { open, close, toggle }
    }
  }
}) { }

Alert.define()

declare global {
  interface HTMLElementTagNameMap {
    [Alert.tagName]: Alert
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
    [Alert.tagName]: new () => {
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
      [Alert.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Alert.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Alert.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}