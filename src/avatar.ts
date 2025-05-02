import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  src: string
}

const name = 's-avatar'
const props: Props = {
  src: ''
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  position: relative;
  font-size: 1rem;
  font-weight: 600;
  width: 40px;
  border-radius: 50%;
  color: var(--s-color-on-tertiary, ${Theme.colorOnTertiary});
  background: var(--s-color-tertiary, ${Theme.colorTertiary});
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 24px;
}
::slotted([slot=badge]){
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 0 2px var(--s-color-surface, ${Theme.colorSurface});
  color: var(--s-color-on-success, ${Theme.colorOnSuccess});
  background: var(--s-color-success, ${Theme.colorSuccess});
}
img{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
  inset: 0;
}
`
const template = /*html*/`
<slot></slot>
<slot name="badge"></slot>
`

class Avatar extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const img = document.createElement('img')
    return {
      src: (value) => {
        img.src = value
        img.onload = () => {
          this.dispatchEvent(new Event('load'))
          shadowRoot.insertBefore(img, shadowRoot.children[0])
        }
        img.onerror = () => {
          this.dispatchEvent(new ErrorEvent('error'))
          img.isConnected && shadowRoot.removeChild(img)
        }
      }
    }
  }
}) { }

Avatar.define(name)

export { Avatar }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Avatar
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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props>
    } & Avatar
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