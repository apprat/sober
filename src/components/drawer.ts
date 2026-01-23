import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  $mode: ['auto', 'sidebar', 'overlay'],
  modeBreakpoint: 1024,
  sidebarStartOpened: true,
  sidebarEndOpened: true,
  overlayStartOpened: false,
  overlayEndOpened: false,
})

const style = /*css*/`
:host{
  display: flex;
  overflow: hidden;
}
slot{
  display: block;
  flex-shrink: 0;
}
.view{
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
}
.start{
  order: -1;
}
::slotted([slot=start]),
::slotted([slot=end]){
  width: 280px;
  height: 100%;
  background: ${scheme.color.surfaceContainerLow};
}
`
const template = /*html*/`
<slot class="view" part="view"></slot>
<slot class="start" part="start" name="start"></slot>
<slot class="end" part="end" name="end"></slot>
`

export class Drawer extends useElement({
  style, template, props,
  setup(shadowRoot, info) {
    const start = shadowRoot.querySelector<HTMLSlotElement>('.start')!
    const end = shadowRoot.querySelector<HTMLSlotElement>('.end')!
    const obs = new ResizeObserver(() => {
      this.toggleAttribute('overlaid', this.offsetWidth <= this.modeBreakpoint)
    })
    obs.observe(this)
    return {
      setMode: (v) => {
        if (v === 'auto') return obs.observe(this)
        obs.unobserve(this)
        this.toggleAttribute('overlaid', v === 'overlay')
      }
    }
  }
}) { }

const name = Drawer.define('s-drawer')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Drawer
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
    } & Drawer
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