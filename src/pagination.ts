import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Ripple } from './ripple.js'

type Props = {
  value: number
  total: number
  count: number
}

const name = 's-pagination'
const props: Props = {
  value: 1,
  total: 20,
  count: 20
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  border-radius: 18px;
  gap: 2px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.container{
  display: flex;
  gap: inherit;
}
.icon-button,
.button{
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-button{
  border-radius: 50%;
  height: 32px;
  width: 32px;
}
.button{
  height: 32px;
  padding: 0 8px;
  min-width: 32px;
  border-radius: 16px;
  box-sizing: border-box;
}
.checked{
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
.disabled{
  pointer-events: none;
  opacity: .38;
}
svg{
  width: 24px;
  height: 24px;
  padding: 1px;
  box-sizing: border-box;
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
`
const template = /*html*/`
<s-ripple class="prev icon-button disabled" part="prev">
  <svg viewBox="0 -960 960 960">
    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"></path>
  </svg>
</s-ripple>
<div class="container"></div>
<s-ripple class="next icon-button disabled" part="next">
  <svg viewBox="0 -960 960 960">
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"></path>
  </svg>
</s-ripple>
`

class Pagination extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const prev = shadowRoot.querySelector<Ripple>('.prev')!
    const next = shadowRoot.querySelector<Ripple>('.next')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const update = () => {
      const page = Math.ceil(this.total / this.count)
      const min = Math.min(page, 7)
      console.log(this.total, this.count)
      const fragment = document.createDocumentFragment()
      for (let i = 1; i <= min; i++) {
        const ripple = new Ripple()
        ripple.classList.add('button')
        ripple.textContent = `${String(i)}`
        fragment.appendChild(ripple)
      }
      container.innerHTML = ''
      container.appendChild(fragment)
      //first.classList.toggle('disabled', this.value === 0)
      //last.classList.toggle('disabled', this.value === page)
      //last.textContent = page.toString()
    }
    update()
    prev.onclick = () => this.value = Math.max(this.value - 1, 0)
    next.onclick = () => this.value = Math.min(this.value + 1, Math.ceil(this.total / this.count))
    return {
      total: update,
      value: update
    }
  }
}) { }

Pagination.define(name)

export { Pagination }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Pagination
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