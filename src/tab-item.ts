import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  text-transform: capitalize;
  padding: 0 16px;
}
:host([checked=true]){
  color: var(--s-color-primary, #006495);
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  min-height: inherit;
}
.indicator{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--s-color-primary, #006495);
  border-radius: var(--s-shape-corner-full, 7680px) var(--s-shape-corner-full, 7680px) 0 0;
  transition: filter .2s,transform .2s,width .2s;
  filter: opacity(0);
}
:host([checked=true]) .indicator{
  filter: opacity(1);
}
.text{
  display: flex;
  align-items: center;
}
.icon .badge{
  position: absolute;
  top: 8px;
  left: 50%;
}
::slotted([slot=icon]){
  height: 42px;
}
::slotted([slot=text]){
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
}
.icon ::slotted([slot=text]){
  height: 26px;
  margin-top: -4px;
}
::slotted([slot=badge]){
  margin-left: 4px;
}
`

const name = 's-tab-item'
const props = {
  checked: false
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let icon: HTMLSlotElement
    let container: HTMLDivElement
    let indicator: HTMLDivElement
    const iconSlotChange = () => {
      const length = icon.assignedElements().length
      container.classList[length > 0 ? 'add' : 'remove']('icon')
    }
    this.addEventListener('click', () => this.checked = true)
    return {
      expose: {
        get indicator() {
          return indicator
        }
      },
      watches: {
        checked: () => {
          if (!this.parentNode) return
          this.dispatchEvent(new Event('tab-item:change', { bubbles: true }))
        },
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <slot name="icon" ref="${(el: HTMLSlotElement) => icon = el}" @slotchange="${iconSlotChange}"></slot>
          <div class="text">
            <slot name="text"></slot>
            <div class="badge">
              <slot name="badge"></slot>
            </div>
          </div>
          <div class="indicator" ref="${(el: HTMLDivElement) => indicator = el}"></div>
        </div>
        <s-ripple attached="true"></s-ripple>
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