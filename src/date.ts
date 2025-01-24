import { useElement } from './core/element.js'
import { dateFormat } from './core/utils/dateFormat.js'
import { Theme } from './core/theme.js'

const name = 's-date-panel'
const props = {
  value: dateFormat(new Date()),
  mode: 'date' as 'date' | 'year' | 'month',
  format: '%Y-%m-%d',
  ranged: false,
  max: '',
  min: ''
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 320px;
  height: 360px;
  border-radius: 8px;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
}
`

const days: number[] = []
for (let i = 0; i < 31; i++) days.push(i + 1)

const template = /*html*/`
<div class="container">
  <div class="header"></div>
  <div class="body">
    <div class="days">${days.join('')}</div>
  </div>
</div>
`

const texts = {
  year: 'YYYY年',
  month: 'MM月',
  day: 'DD日',
  weeks: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}
const textMap = new Map<HTMLElement, Function[]>()

class SDate extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const header = shadowRoot.querySelector('.header') as HTMLElement
    const setHeader = () => header.textContent = `2025-${''}`
    const setWeeks = () => { }
    const calls = [setHeader, setWeeks]
    calls.forEach(fn => fn())

    return {
      mounted: () => textMap.set(this, calls),
      unmounted: () => textMap.delete(this)
    }
  }
}) {
  static setLang(options: Partial<typeof texts>) {
    //options.year && (texts.year = options.year)
    //options.month && (texts.month = options.month)
    //options.day && (texts.day = options.day)
    //options.weeks && (texts.weeks = options.weeks)
    //options.months && (texts.months = options.months)
    textMap.forEach((calls) => calls.forEach(fn => fn()))
  }
}

SDate.define(name)

export { SDate as Date }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SDate
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
  export interface GlobalComponents {
    [name]: typeof props
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