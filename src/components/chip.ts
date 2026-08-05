import { useElement, useProps, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['outlined', 'elevated', 'surface'],
  type: ['chip', 'checkbox', 'radio'],
  disabled: false,
  checked: false,
  closable: false,
  clickable: false,
  showCheckmark: false,
  name: '',
  $defaultChecked: false,
  $value: '',
})

const style = /*css*/`
:host{
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  cursor: auto;
  color: ${scheme.color.onSurface};
  border-radius: ${scheme.shape.corner.small};
  .ripple{
    display: none;
  }
}
:host(:not([variant])){
  &::after{
    content: '';
    position: absolute;
    border-radius: inherit;
    inset: 0;
    pointer-events: none;
    border: solid var(--s-border-min, 1px) ${scheme.color.outlineVariant};
  }
}
:host([variant=elevated]){
  background: ${scheme.color.surfaceContainerLow};
  box-shadow: ${scheme.elevation.level1};
}
:host([variant=surface]){
  background: ${scheme.color.surfaceContainerHigh};
}
:host(:is([clickable], [type])){
  cursor: pointer;
  .ripple{
    display: block;
  }
}
:host(:is([type=checkbox], [type=radio])){
  &:host([checked]){
    background: ${scheme.color.secondaryContainer};
    color: ${scheme.color.onSecondaryContainer};
    outline-color: ${scheme.color.primary};
    &::after{
      content: none;
    }
  }
  &:host([showCheckmark]){
    &:host([checked]) .icon-checked{
      width: 18px;
      margin-left: -8px;
      margin-right: 0px;
    }
    .icon-checked{
      display: block;
      width: 0px;
      margin-right: -8px;
      contain: layout style;
    }
  }
}
:host([closable]){
  .close{
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    margin-right: -11px;
    margin-left: -3px;
    outline-offset: 0;
    svg{
      width: 18px;
    }
  }
}
:host([disabled]){
  svg,
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
    color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  }
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
  width: 18px;
  font-size: 18px;
  color: ${scheme.color.primary};
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=close-icon]){
  color: currentColor;
}
::slotted([slot=start]){
  margin-left: -4px;
}
::slotted([slot=end]){
  margin-right: -4px;
}
::slotted(s-avatar){
  width: 24px;
  font-size: calc(var(--s-font-size, 1) * 12px);
}
::slotted(s-avatar[slot=start]){
  margin-left: -10px;
}
::slotted(s-avatar[slot=end]){
  margin-right: -10px;
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    svg,
    ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
      color: inherit !important;
    }
  }
}
`

const template = /*html*/`
<svg viewBox="0 -960 960 960" class="icon-checked hide" part="icon-checked">
  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path>
</svg>
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<div class="close hide" part="close" tabindex="0">
  <slot name="close-icon">
    <svg viewBox="0 -960 960 960">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path>
    </svg>
  </slot>
  <s-ripple></s-ripple>
</div>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

export class Chip extends useElement({
  style: [buttonStyle, style],
  states: ['focusable', 'formable'],
  template, props,
  setup(shadowRoot, info) {
    const close = shadowRoot.querySelector<HTMLSlotElement>('.close')!
    const updateFrom = () => info.internals.setFormValue(this.disabled || !this.checked ? null : this.value)
    this.addEventListener('click', () => {
      if (!['checkbox', 'radio'].includes(this.type)) return
      if (this.type === 'checkbox') {
        this.checked = !this.checked
        this.dispatchEvent(new Event('change'))
        return
      }
      this.checked = true
      this.dispatchEvent(new Event('change'))
      this.name && (this.getRootNode() as HTMLElement).querySelectorAll<typeof this>(`${this.tagName}[name='${this.name}']`).forEach((item) => {
        if (item === this || !item.checked) return
        item.checked = false
      })
    })
    close.onpointerdown = (e) => e.stopPropagation()
    close.onclick = () => this.dispatchEvent(new CustomEvent('close'))
    focusKeydownClick(close)
    return {
      onFormReset: () => this.checked = this.defaultChecked,
      onAttributeChanged: (name) => ['disabled', 'checked', 'value'].includes(name) && updateFrom(),
    }
  }
}) { }

const name = Chip.define('s-chip')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Chip
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
    } & Chip
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