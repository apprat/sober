import { useElement } from './core/element.js'
import { dateFormat } from './core/utils/dateFormat.js'
import { Theme } from './core/theme.js'
import { Ripple } from './ripple.js'
import { Popup } from './popup.js'
import { ScrollView } from './scroll-view.js'
import { I18n } from './core/i18n.js'

type Locale = {
  display: (date: Date) => string
  displayMonth: (date: Date) => string
  displayWeeks: string[]
}

const i18n = new I18n<Locale>({})
i18n.list = {
  zh: {
    display: (date) => `${date.getMonth() + 1}月${date.getDate()}日 星期${i18n.list.zh.displayWeeks[date.getDay()]}`,
    displayMonth: (date) => `${date.getFullYear()}年`,
    displayWeeks: ['日', '一', '二', '三', '四', '五', '六']
  },
  en: {
    display: (date) => `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}, Jan ${date.getDate()}`,
    displayMonth: (date) => `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()]} ${date.getFullYear()}`,
    displayWeeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  }
}

type Props = {
  value: string
  locale: string
  max: string,
  min: string
}

const name = 's-date'
const props: Props = {
  value: '',
  locale: '',
  max: '2099-12-31',
  min: '1900-01-01',
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  border-radius: 8px;
  font-size: .875rem;
  max-width: 348px;
  overflow: hidden;
  box-sizing: border-box;
  border: solid 1px var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.button,
.icon-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  box-sizing: border-box;
  font-size: .8125rem;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
.icon-button{
  width: 36px;
  border-radius: 50%;
}
.button{
  border-radius: 18px;
  height: 36px;
  padding: 0 16px;
}
svg{
  width: 24px;
  fill: currentColor;
}
.header{
  padding: 24px 24px 16px 24px;
  font-size: 1.125rem;
  border-bottom: solid 1px var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
.container{
  display: flex;
  flex-direction: column;
  position: relative;
}
.action{
  order: -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 0 8px;
}
.action>.year-popop{
  display: flex;
  justify-content: center;
  position: relative;
}
.action>.year-popop>.button{
  padding: 0 12px;
  border-radius: 4px;
}
.action>.year-popop[showed]>.button{
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.action>.year-popop>.button>svg{
  margin-right: -10px;
  padding: 2px;
  box-sizing: border-box;
}
.action>.year-popop>.list{
  counter-reset: year-counter 1899;
  width: 100%;
  height: 280px;
  padding: 2px;
  scrollbar-width: none;
}
.action>.year-popop>.list>.item{
  margin: 2px;
  padding: 0 12px;
  border-radius: 4px;
  counter-increment: year-counter;
}
.action>.year-popop>.list>.item::before{
  content: counter(year-counter);
}
.action>.year-popop>.list>.checked{
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
.action>.toggle{
  display: flex;
}
.weeks{
  display: flex;
  padding: 12px 12px 0 12px;
  font-size: .8125rem;
  color: var(--s-color-outline, ${Theme.colorOutline});
}
.weeks>.item,
.days>.item{
  width: calc(100% / 7);
  display: inline-flex;
  justify-content: center;
  padding: 2px 0;
}
.days{
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
}
.days>.overflow~.item{
  display: none;
}
.days>.item>s-ripple{
  margin: 2px;
}
.days>.checked>s-ripple{
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
`

const templateList = {
  years: [] as string[],
  weeks: [] as string[],
  days: [] as string[],
}

for (let i = 0; i < 200; i++) {
  if (i < 7) templateList.weeks.push(`<div class="item"></div>`)
  if (i < 31) templateList.days.push(`<div class="item"><s-ripple class="icon-button">${i + 1}</s-ripple></div>`)
  templateList.years.push(`<s-ripple class="button item"></s-ripple>`)
}

const template = /*html*/`
<div class="header" part="header">
  <slot name="headline"></slot>
  <span></span>
</div>
<div class="container" part="container">
  <div class="action">
    <s-ripple class="button" slot="trigger">
      <span></span>
      <svg viewBox="0 -960 960 960">
        <path d="M480-360 280-560h400L480-360Z"></path>
      </svg>
    </s-ripple>
    <div class="toggle">
      <s-ripple class="icon-button prev" part="prev-button">
        <svg viewBox="0 -960 960 960">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"></path>
        </svg>
      </s-ripple>
      <s-ripple class="icon-button next" part="next-button">
        <svg viewBox="0 -960 960 960">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"></path>
        </svg>
      </s-ripple>
    </div>
  </div>
  <s-scroll-view class="years">${templateList.years.join('')}</s-scroll-view>
  <div class="weeks">${templateList.weeks.join('')}</div>
  <div class="days">${templateList.days.join('')}</div>
</div>
`

class DateState {
  yearSelect?: HTMLElement
  daySelect?: HTMLElement
  dayOverflow?: HTMLElement
  date: Date
  dateMin: Date
  dateMax: Date
  constructor(date: Date | string, min: string, max: string) {
    this.date = typeof date === 'string' ? new Date(date) : date
    this.dateMin = new Date(min)
    this.dateMax = new Date(max)
  }
}

class DateElement extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const headline = shadowRoot.querySelector<HTMLDivElement>('.header>span')!
    const yearPopop = shadowRoot.querySelector<Popup>('.year-popop')!
    const toggleYearBtn = shadowRoot.querySelector<Ripple>('.year-popop>.button')!
    const prevBtn = shadowRoot.querySelector<Ripple>('.prev')!
    const nextBtn = shadowRoot.querySelector<Ripple>('.next')!
    const years = shadowRoot.querySelector<ScrollView>('.year-popop>.list')!
    const weeks = shadowRoot.querySelector<HTMLDivElement>('.weeks')!
    const days = shadowRoot.querySelector<HTMLDivElement>('.days')!
    const state = new DateState(this.value || new Date(), this.min, this.max)
    const update = () => {
      setText()
      const weekDay = new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay()
      days.children[0].setAttribute('style', `margin-left: calc((100% / 7) * ${weekDay})`)
      const monthDay = new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate()
      state.dayOverflow?.classList.remove('overflow')
      state.dayOverflow = days.children[monthDay - 1] as HTMLElement
      state.dayOverflow.classList.add('overflow')
      state.yearSelect?.classList.remove('checked')
      state.yearSelect = years.children[state.date.getFullYear() - state.dateMin.getFullYear()] as HTMLElement
      state.yearSelect.classList.add('checked')
      state.daySelect?.classList.remove('checked')
      state.daySelect = days.children[state.date.getDate() - 1] as HTMLElement
      state.daySelect.classList.add('checked')
    }
    const setText = () => {
      const displayHeadline = i18n.getItem(this.locale).display
      headline.textContent = displayHeadline(state.date)
      const displayMotnh = i18n.getItem(this.locale).displayMonth
      //toggleYearBtn.children[0].textContent = displayMotnh({ year: state.date.getFullYear(), month: state.date.getMonth() })
    }
    const setWeekText = () => {
      const displayWeeks = i18n.getItem(this.locale).displayWeeks
      weeks.childNodes.forEach((item, index) => item.textContent = displayWeeks[index])
    }
    const setYearCount = () => {
      const count = state.dateMax.getFullYear() - state.dateMin.getFullYear()
      years.innerHTML = ''
      years.style.counterReset = `year-counter ${state.dateMin.getFullYear() - 1}`
      const fragment = document.createDocumentFragment()
      for (let i = 0; i <= count; i++) {
        const ripple = new Ripple()
        ripple.classList.add('button', 'item')
        fragment.appendChild(ripple)
      }
      years.appendChild(fragment)
      update()
    }
    yearPopop.addEventListener('show', () => {
      console.log('打开')
      if (state.yearSelect) {
        years.scrollTo({ top: state.yearSelect.offsetTop - (years.offsetHeight / 2) + (state.yearSelect.offsetHeight / 2) })
      }
    })
    toggleYearBtn.onclick = () => {
      container.classList.toggle('show-year')
      if (state.yearSelect) {
        const top = state.yearSelect.offsetTop - (years.offsetHeight / 2) + (state.yearSelect.offsetHeight / 2)
        years.scrollTo({ top })
      }
    }
    prevBtn.onclick = () => {
      state.date.setMonth(state.date.getMonth() - 1)
      state.date.setDate(1)
      update()
    }
    nextBtn.onclick = () => {
      state.date.setMonth(state.date.getMonth() + 1)
      state.date.setDate(1)
      update()
    }
    years.onclick = (e) => {
      if (!(e.target instanceof Ripple)) return
      const index = Array.prototype.indexOf.call(years.children, e.target.parentElement)
      state.date.setFullYear(state.dateMin.getFullYear() + index)
      update()
    }
    days.onclick = (e) => {
      if (!(e.target instanceof Ripple)) return
      const index = Array.prototype.indexOf.call(days.children, e.target.parentElement) + 1
      state.date.setDate(index)
      update()
    }
    setWeekText()
    update()
    const updateText = () => {
      setText()
      setWeekText()
    }
    return {
      onMounted: () => i18n.updates.set(this, updateText),
      onUnmounted: () => i18n.updates.delete(this),
      min: (value) => {
        const min = new Date(value)
        if (min.getTime() > state.date.getTime()) throw Error('invalid min date')
        state.dateMin = min
        setYearCount()
      },
      max: (value) => {
        const max = new Date(value)
        if (max.getTime() < state.date.getTime()) throw Error('invalid max date')
        state.dateMax = max
        setYearCount()
      },
      value: {
        get: () => dateFormat(state.date),
        set: (value) => {
          const val = new Date(value)
          if (val.getTime() < state.dateMin.getTime() || val.getTime() > state.dateMax.getTime()) throw Error('invalid date')
          state.date = val
          update()
          console.log('设置日期', value)
        }
      },
      locale: updateText,
    }
  }
}) {
  static addLocale(name: string, locale: Locale) {
    i18n.addItem(name, locale)
  }
  static setLocale(name?: string) {
    i18n.setLocale(name)
  }
}

DateElement.define(name)

export { DateElement as Date }

declare global {
  interface HTMLElementTagNameMap {
    [name]: DateElement
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
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props> & Events<true>
    }
  }
}