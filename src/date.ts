import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-date'
const props = {
  value: '',
  label: '日期选择',
  weekText: '日,一,二,三,四,五,六'
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  min-width: 320px;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  height: 200px;
  border-radius: 12px;
}
.week{
  display: flex;
  padding: 8px;
}
.week>.item{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
}
`

const template = /*html*/`
<div class="container">
  <div class="label"></div>
  <div class="week"></div>
  <div class="day"></div>
</div>
`

const updateWeek = (week: Element, weekText: string) => {
  const fragment = document.createDocumentFragment()
  weekText.split(',').slice(0, 7).forEach((item) => {
    const div = document.createElement('div')
    div.className = 'item'
    div.innerText = item
    fragment.appendChild(div)
  })
  week.innerHTML = ''
  week.appendChild(fragment)
}

export class Date extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const label = shadowRoot.querySelector('.label')!
    const week = shadowRoot.querySelector('.week')!
    updateWeek(week, this.weekText)
    return {
      props: {
        weekText: () => updateWeek(week, this.weekText)
      }
    }
  }
}) { }

Date.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Date
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}