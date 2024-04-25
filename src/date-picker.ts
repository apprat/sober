import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'
import './dialog.js'
import Ripple from './ripple.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
}
.picker{
  display: flex;
  align-items: center;
}
.icon-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
svg{
  color: red;
  width: 24px;
  height: 24px;
  fill: var(--s-color-on-surface-variant);
}
.text-button{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 8px 0 12px;
  border-radius: 8px;
  white-space: nowrap;
}
.text-button>svg{
  flex-shrink: 0;
  margin-left: 4px;
}
.main{
  margin: 0 12px;
}
.grid{
  max-width: 280px;
  display: flex;
  flex-wrap: wrap;
}
.grid>.item{
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 7);
}
.grid s-ripple,
.grid span{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: 500;
}
`

const name = 's-date-picker'
const props = {
  value: '',
  scoped: false
}

export default class DatePicker extends builder({
  name, style, props,
  setup() {
    let body: HTMLDivElement
    const now = new Date()
    return {
      created: () => {
        const date = new Date(now.getFullYear(), now.getMonth(), 0)
        const fragment = document.createDocumentFragment()
        for (let i = 1; i <= date.getDate(); i++) {
          console.log(i)
          const item = document.createElement('div')
          item.className = 'item'
          const ripple = new Ripple()
          ripple.textContent = `${i}`
          item.appendChild(ripple)
          fragment.appendChild(item)
        }
        body.appendChild(fragment)
      },
      render: () => html`
        <s-dialog>
          <slot name="trigger" slot="trigger"></slot>
          <div class="header">
            <div class="picker">
              <s-ripple class="icon-button">
                <svg viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
              </s-ripple>
              <s-ripple class="text-button">
                4月
                <svg viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
              </s-ripple>
              <s-ripple class="icon-button">
                <svg viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
              </s-ripple>
            </div>
            <div class="picker">
              <s-ripple class="icon-button">
                <svg viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
              </s-ripple>
              <s-ripple class="text-button">
                2024
                <svg viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
              </s-ripple>
              <s-ripple class="icon-button">
                <svg viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
              </s-ripple>
            </div>
          </div>
          <div class="main">
            <div class="grid">
              <div class="item">
                <span>日</span>
              </div>
              <div class="item">
                <span>一</span>
              </div>
              <div class="item">
                <span>二</span>
              </div>
              <div class="item">
                <span>三</span>
              </div>
              <div class="item">
                <span>四</span>
              </div>
              <div class="item">
                <span>五</span>
              </div>
              <div class="item">
                <span>六</span>
              </div>
            </div>
            <div class="grid" ref="${(el: HTMLDivElement) => body = el}"></div>
          </div>
          <s-button type="text" slot="action">取消</s-button>
          <s-button type="text" slot="action">确定</s-button>
        </s-dialog>
      `
    }
  }
}) { }

DatePicker.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: DatePicker
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}