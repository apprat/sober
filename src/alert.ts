import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  type: 'info' | 'success' | 'warning' | 'error'
}

const name = 's-alert'
const props: Props = {
  type: 'info'
}

const style = /*css*/`
:host{
  display: inline-flex;
  padding: 8px 16px;
  align-items: center;
  line-height: 1.6;
  font-size: .875rem;
  font-weight: 500;
  min-height: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
}
:host([type=success]){
  color: var(--s-color-on-success-container, ${Theme.colorOnSuccessContainer});
  background: var(--s-color-success-container, ${Theme.colorSuccessContainer});
}
:host([type=warning]){
  color: var(--s-color-on-warning-container, ${Theme.colorOnWarningContainer});
  background: var(--s-color-warning-container, ${Theme.colorWarningContainer});
}
:host([type=error]){
  color: var(--s-color-on-error-container, ${Theme.colorOnErrorContainer});
  background: var(--s-color-error-container, ${Theme.colorErrorContainer});
}
svg{
  width: 24px;
  height: 24px;
  fill: currentColor;
  margin-right: 8px;
  margin-left: -2px;
  box-sizing: border-box;
  flex-shrink: 0;
  display: none;
}
.text{
  flex-grow: 1;
  min-width: 0;
}
:host(:not([type])) .info,
:host([type=success]) .success,
:host([type=warning]) .warning,
:host([type=error]) .error{
  display: block;
}
::slotted(*){
  flex-shrink: 0;
}
::slotted(:is(svg[slot=start], s-icon[slot=start])){
  margin-right: 8px;
  margin-left: -2px;
}
::slotted(:is(svg[slot=end], s-icon[slot=end])){
  margin-right: -2px;
  margin-left: 8px;
}
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  color: currentColor;
  width: 24px;
  height: 24px;
}
::slotted(:is(s-button[slot=end], s-icon-button[slot=end])){
  margin-left: 8px;
  margin-right: -8px;
  color: currentColor;
}
::slotted(s-button[slot=end]){
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: .8125rem;
}
::slotted(s-icon-button[slot=end]){
  width: 32px;
  padding: 5px;
}
`
const template = /*html*/`
<slot name="start">
  <svg viewBox="0 0 24 24" class="info">
    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="success">
    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="warning">
    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
  </svg>
  <svg viewBox="0 0 24 24" class="error">
    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  </svg>
</slot>
<div class="text" part="text"><slot></slot></div>
<slot name="end"></slot>
`

class Alert extends useElement({ style, template, props, syncProps: true }) { }

Alert.define(name)

export { Alert }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Alert
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
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
      $props: HTMLAttributes & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}