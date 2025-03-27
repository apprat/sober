import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  placeholder: string
  disabled: boolean
  value: string
  maxLength: number
  readOnly: boolean
}

const name = 's-search'
const props: Props = {
  placeholder: '',
  disabled: false,
  value: '',
  maxLength: -1,
  readOnly: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 220px;
  min-height: 40px;
  border-radius: 20px;
  font-size: .875rem;
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.wrapper{
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: inherit;
  border-radius: inherit;
  overflow: hidden;
  background: inherit;
  outline: solid 1px var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
}
.container{
  display: flex;
  align-items: center;
  min-height: inherit;
  position: relative;
  order: -1;
}
input{
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 0;
  flex-grow: 1;
  background: none;
  outline: none;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
  caret-color: var(--s-color-primary, ${Theme.colorPrimary});
}
input::placeholder{
  color: var(--s-color-outline, ${Theme.colorOutline});
}
input::selection{
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
::slotted([slot=dropdown]){
  position: fixed;
  pointer-events: none;
  top: 100%;
  left: 0;
  height: 0;
  opacity: 0;
  border-top: solid 1px var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
}
:host(:focus-within) ::slotted([slot=dropdown]){
  pointer-events: auto;
  position: relative;
  opacity: 1;
}
::slotted([slot]){
  flex-shrink: 0;
}
::slotted(svg){
  height: 24px;
  width: 24px;
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
::slotted(:is(s-icon[slot=start], svg[slot=start])){
  margin: 0 -8px 0 8px;
}
::slotted(:is(s-icon[slot=end], svg[slot=end])){
  margin: 0 8px 0 -8px;
}
::slotted(s-icon-button[slot=start]){
  margin-right: -16px;
}
::slotted(s-icon-button[slot=end]){
  margin-left: -16px;
}
`

const template = /*html*/`
<div class="wrapper" part="wrapper">
  <slot name="dropdown"></slot>
  <div class="container" part="container">
    <slot name="start"></slot>
    <input type="text">
    <slot name="end"></slot>
  </div>
</div>
`

class Search extends useElement({
  style, template, props, syncProps: ['disabled', 'readOnly'],
  setup(shadowRoot) {
    const input = shadowRoot.querySelector<HTMLInputElement>('input')!
    const dropdown = shadowRoot.querySelector<HTMLSlotElement>('[name=dropdown]')!
    dropdown.onmousedown = (e) => e.preventDefault()
    input.onchange = () => this.dispatchEvent(new Event('change'))
    return {
      expose: {
        get value() {
          return input.value
        },
        get native() {
          return input
        }
      },
      value: (value) => input.value = value,
      placeholder: (placeholder) => input.placeholder = placeholder,
      maxLength: (maxLength) => input.maxLength = maxLength,
      readOnly: (readOnly) => input.readOnly = readOnly
    }
  }
}) { }

Search.define(name)

export { Search }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Search
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