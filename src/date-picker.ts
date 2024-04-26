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
  padding: 18px 18px 4px 18px;
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
  padding: 0 2px 0 8px;
  border-radius: 8px;
  white-space: nowrap;
}
.text-button>svg{
  flex-shrink: 0;
}
.main{
  width: 368px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid{
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
}
.grid>.item{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
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
  margin: 4px;
  flex-shrink: 0;
}
.days{
  counter-reset: day;
}
.days s-ripple::after{
  content: counter(day);
  counter-increment: day;
}
`

const name = 's-date-picker'
const props = {
  value: '',
  scoped: false,
  weeks: '日,一,二,三,四,五,六'
}

export default class DatePicker extends builder({
  name, style, props,
  setup() {
    let week: HTMLDivElement
    let body: HTMLDivElement
    const now = new Date()
    return {
      created: () => {
        const fragmentWeeks = document.createDocumentFragment()
        for (const name of this.weeks.split(',')) {
          const item = document.createElement('div')
          item.className = 'item'
          const ripple = new Ripple()
          item.appendChild(ripple)
          item.textContent = name
          fragmentWeeks.appendChild(item)
        }
        const date = new Date(now.getFullYear(), now.getMonth(), 0)
        const fragmentDays = document.createDocumentFragment()
        for (let i = 1; i <= 31; i++) {
          const item = document.createElement('div')
          item.className = 'item'
          const ripple = new Ripple()
          item.appendChild(ripple)
          fragmentDays.appendChild(item)
        }
        body.appendChild(fragmentWeeks)
        body.appendChild(fragmentDays)
      },
      render: () => html`
        <s-dialog>
          <slot name="trigger" slot="trigger"></slot>
          <div class="container">
            <div class="header">
              <div class="picker">
                <s-ripple class="text-button">
                  2024年
                  <svg viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
                </s-ripple>
              </div>
              <div class="picker">
                <s-ripple class="icon-button">
                  <svg viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                </s-ripple>
                <s-ripple class="icon-button">
                  <svg viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                </s-ripple>
              </div>
            </div>
            <div class="main">
              <div class="grid" ref="${(el: HTMLDivElement) => week = el}"></div>
              <div class="grid days" ref="${(el: HTMLDivElement) => body = el}"></div>
            </div>
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