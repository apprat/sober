import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'
import Dropdown from './dropdown.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  color: var(--s-color-on-surface, #1a1c1e);
}
.dropdown{
  display: block;
}
.container{
  padding: 8px 0;
  max-width: 224px;
  min-height: auto;
  box-sizing: border-box;
}
::slotted(s-menu){
  display: block;
}
::slotted(s-menu[group=start]){
  border-top: solid 1px var(--s-color-outline-variant, #c1c7ce);
  margin-top: 8px;
  padding-top: 8px;
}
::slotted(s-menu[group=end]){
  border-bottom: solid 1px var(--s-color-outline-variant, #c1c7ce);
  margin-bottom: 8px;
  padding-bottom: 8px;
}
`

const name = 's-menu'
const props = {
  group: '' as 'start' | 'end' | ''
}

export default class Component extends builder({
  name, style, props, propSyncs: ['group'],
  setup() {
    let dropdown: Dropdown
    const show = (elemtnt?: HTMLElement) => dropdown.show(elemtnt)
    const dismiss = () => dropdown.dismiss()
    const toggle = (elemtnt?: HTMLElement) => dropdown.toggle(elemtnt)
    this.addEventListener('menu-item:click', (event) => {
      event.stopPropagation()
      dismiss()
    })
    return {
      mounted: () => {
        if (this.parentNode instanceof Component) dropdown.setAttribute('align', 'right')
      },
      expose: { show, dismiss, toggle },
      render: () => html`
        <s-dropdown class="dropdown" ref="${(el: Dropdown) => dropdown = el}">
          <slot slot="trigger" name="trigger" @click.stop="${() => show()}"></slot>
          <div class="container">
            <slot></slot>
          </div>
        </s-dropdown>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}