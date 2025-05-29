import { useElement, useProps } from './core/element.js'
import { Theme } from './core/theme.js'
import { Ripple } from './ripple.js'

const name = 's-pagination'
const props = useProps({
  $value: 1,
  $total: 20,
  $count: 20,
  type: ['standard', 'outlined']
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  border-radius: 18px;
  gap: 4px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
:host([type=outlined]) :is(.icon-button, .button){
  border-width: 1px;
  border-color: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  border-style: solid;
}
.container{
  display: flex;
  flex-wrap: wrap;
  gap: inherit;
  height: 100%;
  border-radius: inherit;
  justify-content: space-evenly;
}
.icon-button,
.button{
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 36px;
}
.icon-button{
  border-radius: inherit;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
}
.button{
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  padding: 0 8px;
  border-radius: inherit;
  box-sizing: border-box;
}
.checked{
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
  border-color: var(--s-color-secondary, ${Theme.colorSecondary}) !important;
}
.disabled{
  pointer-events: none;
  opacity: .38;
}
.text{
  pointer-events: none;
  border: none !important;
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
<div class="container">
  <s-ripple class="button checked">1</s-ripple>
</div>
<s-ripple class="next icon-button disabled" part="next">
  <svg viewBox="0 -960 960 960">
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"></path>
  </svg>
</s-ripple>
`

export class Pagination extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const prev = shadowRoot.querySelector<Ripple>('.prev')!
    const next = shadowRoot.querySelector<Ripple>('.next')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const change = () => this.dispatchEvent(new Event('change'))
    const updateChecked = () => {
      const page = Math.ceil(this.total / this.count)
      let index = Math.max(Math.min(page - 7, Math.max(0, this.value - 4)), 0)
      container.childNodes.forEach((v) => {
        index++
        const item = v as Ripple
        item.textContent = index.toString()
        item.classList.toggle('checked', this.value === index)
        item.classList.remove('text')
      })
      prev.classList.toggle('disabled', this.value === 1)
      next.classList.toggle('disabled', this.value === page)
      if (page > 7) {
        if (this.value >= 5) {
          container.childNodes.item(0).textContent = '1'
          const text = container.childNodes.item(1) as Ripple
          text.textContent = '...'
          text.classList.add('text')
        }
        if (this.value <= page - 4) {
          container.childNodes.item(container.childNodes.length - 1).textContent = page.toString()
          const text = container.childNodes.item(container.childNodes.length - 2) as Ripple
          text.textContent = '...'
          text.classList.add('text')
        }
      }
    }
    const update = () => {
      const page = Math.ceil(this.total / this.count)
      const min = Math.min(page, 7)
      const fragment = document.createDocumentFragment()
      for (let i = 1; i <= min; i++) {
        const ripple = new Ripple()
        ripple.classList.add('button')
        fragment.appendChild(ripple)
      }
      container.innerHTML = ''
      container.appendChild(fragment)
      updateChecked()
    }
    container.onclick = (event) => {
      if (!(event.target instanceof Ripple)) return
      const index = Number(event.target.textContent)
      if (index === this.value) return
      this.value = index
      change()
    }
    prev.onclick = () => {
      const value = Math.max(this.value - 1, 1)
      if (value === this.value) return
      this.value = value
      change()
    }
    next.onclick = () => {
      const value = Math.min(this.value + 1, Math.ceil(this.total / this.count))
      if (value === this.value) return
      this.value = value
      change()
    }
    return {
      total: update,
      value: updateChecked
    }
  }
}) { }

Pagination.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Pagination
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
    } & Pagination
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