import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { buttonStyle } from '../core/style/button.js'
import './ripple.js'

const props = useProps({
  variant: ['assist', 'filter', 'input'],
  type: ['chip', 'checkbox'],
  disabled: false,
  checked: false,
  $name: '',
  $defualtChecked: false,
  $value: '',
})

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  height: 56px;
  width: 280px;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  border-radius: 28px;
  font-size: calc(var(--s-font-size, 1) * 16px);
  background: ${scheme.color.surfaceContainerHigh};
  color: ${scheme.color.onSurfaceVariant};
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  color: inherit;
  font-size: inherit;
}
input,
.placeholder{
  font-size: inherit;
  padding: 0 28px;
  height: 100%;
  width: 100%;
  line-height: 1;
  font-family: inherit;
}
input{
  outline: none;
  border: none;
  color: inherit;
  background: transparent;
}
.placeholder{
  display: flex;
  align-items: center;
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: ${scheme.color.outline};
}
`

const template = /*html*/`
<div class="container" part="container">
  <input type="text" inputmode="search" part="input" />
  <div class="placeholder" part="placeholder">请输入搜索关键字</div>
</div>
`

export class Search extends useElement({
  style: [buttonStyle, style],
  states: ['keydown-focused', 'formAssociated'],
  template, props,
  setup(shadowRoot, info) {
    const placeholder = shadowRoot.querySelector<HTMLDivElement>('.placeholder')!
    const input = shadowRoot.querySelector('input')!
    input.oninput = () => {
      placeholder.style.opacity = input.value === '' ? '1' : '0'
    }
    return {
    }
  }
}) { }

const name = Search.define('s-search')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Search
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
    } & Search
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