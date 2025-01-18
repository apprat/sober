import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-divider'
const props = {
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0 16px;
  gap: 8px;
  font-size: .75rem;
  color: var(--s-color-outline, ${Theme.colorOutline});
 }
:host::before,
:host::after{
  content: '';
  flex-grow: 1;
  border-top: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
:host(:empty){
  gap: 0;
}
`

const template = /*html*/`<slot></slot>`

export class Divider extends useElement({ style, template, props }) { }

Divider.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Divider
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
  export interface GlobalComponents {
    [name]: typeof props
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