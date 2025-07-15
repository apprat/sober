import { useProps, useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'

const props = useProps({
  variant: ['filled', 'elevated', 'tonal', 'outlined'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large'],
})
const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  gap: 2px;
}
::slotted(:not([slot])){
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
::slotted([slot=action]){
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
::slotted(s-icon-button[slot=end][checkable=true][pressed]),
::slotted(s-icon-button[slot=end][checkable=true][checked=true]){
  --transform: rotate(-180deg);
  border-radius: 50%;
}
::slotted(:is(s-button, s-icon-button)){
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
`

const template = /*html*/`
<slot></slot>
<slot name="action"></slot>
`

export class SplitButton extends useElement({
  name: 's-split-button',
  props, template, style,
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [SplitButton.tagName]: SplitButton
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [SplitButton.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [SplitButton.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & SplitButton
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [SplitButton.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [SplitButton.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [SplitButton.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}