import { useProps, useElement, focusKeydownClick, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  orientation: ['auto', 'horizontal', 'vertical'],
  $name: '',
  $value: '',
  $defualtValue: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 36px;
  padding: 24px;
  position: relative;
  border-radius: 12px;
  transition-property: none;
  background: ${scheme.color.surfaceContainerHigh};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.flex-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.layout{
  display: contents;
  &.show-minute .time-selector>.minute,
  &:not(.show-minute) .time-selector>.hour{
    background: ${scheme.color.primaryContainer};
    color: ${scheme.color.onPrimaryContainer};
  }
  &:not(.show-pm) .period-selector>.am,
  &.show-pm .period-selector>.pm{
    background: ${scheme.color.tertiaryContainer};
    color: ${scheme.color.onTertiaryContainer};
  }
  &.show-minute{
    .clock-dial .icon-btn{
      counter-increment: clock 5;
      &:last-child::after{
        content: '0';
      }
    }
  }
}
.headline{
  gap: 16px;
  flex-direction: column;
  flex-grow: 1;
  .time-selector{
    gap: 9px;
    height: 80px;
    width: 100%;
    .text{
      height: 100%;
      width: 96px;
      max-width: 100%;
      font-weight: 400;
      flex-grow: 1;
      cursor: pointer;
      position: relative;
      border-radius: 8px;
      font-size: calc(var(--s-font-size, 1) * 57px);
      transition-property: background-color, color;
      background: ${scheme.color.surfaceContainerHighest};
      color: ${scheme.color.onSurface};
      &:focus-visible{
        outline-offset: 2px;
        outline: solid 3px currentColor;
      }
    }
    .separator{
      flex-shrink: 0;
      flex-direction: column;
      gap: 16px;
      &::before,
      &::after{
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
      }
    }
  }
  .period-selector{
    width: 100%;
    height: 38px;
    flex-shrink: 0;
    hr{
      margin: 0;
      height: 100%;
      border: none;
      border-width: 1px;
      border-color: ${scheme.color.outline};
      border-left-style: solid;
    }
    .text{
      position: relative;
      flex-grow: 1;
      width: 100%;
      height: 100%;
      font-weight: 500;
      cursor: pointer;
      transition-property: background-color, color;
      font-size: calc(var(--s-font-size, 1) * 16px);
      color: ${scheme.color.onSurfaceVariant};
      border-color: ${scheme.color.outline};
      &:focus-visible{
        outline-offset: 2px;
        outline: solid 3px currentColor;
      }
      &::before{
        content: '';
        position: absolute;
        inset: 0;
        border-color: inherit;
        border-width: 1px;
        border-style: solid;
        border-radius: inherit;
      }
      &.am{
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        &::before{
          border-right-style: none;
        }
      }
      &.pm{
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        &::before{ 
          border-left-style: none;
        }
      }
    }
  }
}
.clock-dial{
  width: 256px;
  max-width: 100%;
  flex-grow: 2;
  border-radius: 50%;
  position: relative;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border: solid 3px transparent;
  cursor: all-scroll;
  flex-shrink: 0;
  counter-reset: clock 0;
  background: ${scheme.color.surfaceContainerHighest};
  .icon-btn{
    position: absolute;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    counter-increment: clock;
    transform: rotate(calc(var(--s_rotate) * 1deg));
    &::after,
    &::before{
      height: 48px;
      width: 48px;
    }
    &::after{
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      content: counter(clock);
      transform: rotate(calc(360deg - (var(--s_rotate) * 1deg)));
    }
    &::before{
      content: '';
      border-radius: 50%;
    }
    &.checked{
      &::before{
        background: ${scheme.color.primary};
      }
      &::after{
        color: ${scheme.color.onPrimary};
      }
    }
  }
  .track{
    position: absolute;
    pointer-events: none;
    height: calc(50% - 24px);
    width: 2px;
    background: currentColor;
    transform: rotate(var(--s_rotate)) translateY(-50%);
    flex-direction: column;
    justify-content: space-between;
    color: ${scheme.color.primary};
    &::before,
    &::after{
      display: block;
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
      transform: translateY(-50%);
    }
    &::after{
      transform: translateY(50%);
    }
  }
}
:host([orientation=vertical]){
  flex-direction: column;
  .headline{
    flex-direction: row;
    width: 100%;
    .period-selector{
      flex-direction: column;
      width: 52px;
      height: 80px;
      hr{
        border-left-style: none;
        border-top-style: solid;
        width: 100%;
        height: auto;
      }
      .am{
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;
        &::before{
          border-style: solid;
          border-bottom-style: none;
        }
      }
      .pm{
        border-bottom-left-radius: 8px;
        border-top-right-radius: 0;
        &::before{
          border-style: solid;
          border-top-style: none;
        }
      }
    }
  }
  .clock-dial{
    width: calc(100% - 28px);
  }
}
@media (orientation: portrait) {
  :host(:not([orientation])){
    flex-direction: column;
    .headline{
      flex-direction: row;
      width: 100%;
      .period-selector{
        flex-direction: column;
        width: 52px;
        height: 80px;
        hr{
          border-left-style: none;
          border-top-style: solid;
          width: 100%;
          height: auto;
        }
        .am{
          border-top-right-radius: 8px;
          border-bottom-left-radius: 0;
          &::before{
            border-style: solid;
            border-bottom-style: none;
          }
        }
        .pm{
          border-bottom-left-radius: 8px;
          border-top-right-radius: 0;
          &::before{
            border-style: solid;
            border-top-style: none;
          }
        }
      }
    }
    .clock-dial{
      width: calc(100% - 28px);
    }
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <div class="headline flex-center" part="headline">
    <div class="time-selector flex-center">
      <div class="text hour flex-center" aria-label="toggle hour selector" part="time-selector-hour" tabindex="0">12 <s-ripple></s-ripple></div>
      <div class="separator flex-center" part="time-selector-separator"></div>
      <div class="text minute flex-center" aria-label="toggle minute selector" part="time-selector-minute" tabindex="0">00 <s-ripple></s-ripple></div>
    </div>
    <div class="period-selector flex-center" part="period-selector">
      <div class="text am flex-center" aria-label="toggle AM" tabindex="0">AM <s-ripple></s-ripple></div><hr>
      <div class="text pm flex-center" aria-label="toggle PM" tabindex="0">PM <s-ripple></s-ripple></div>
    </div>
  </div>
  <div class="clock-dial flex-center" part="clock-dial">
    <div class="track flex-center" part="clock-dial-track"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 30"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 60"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 90"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 120"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 150"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 180"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 210"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 240"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 270"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 300"></div>
    <div class="icon-btn" part="clock-dial-text" style="--s_rotate: 330"></div>
    <div class="icon-btn checked" part="clock-dial-text"></div>
  </div>
</div>
`

const getEventNames = (type: string) => {
  const mouse = { move: 'pointermove', up: 'pointerup' } as const
  const touch = { move: 'touchmove', up: 'touchend' } as const
  return type === 'mouse' ? mouse : touch
}

export class DockedTimePicker extends useElement({
  props, style, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const hour = shadowRoot.querySelector<HTMLDivElement>('.hour')!
    const minute = shadowRoot.querySelector<HTMLDivElement>('.minute')!
    const am = shadowRoot.querySelector<HTMLDivElement>('.am')!
    const pm = shadowRoot.querySelector<HTMLDivElement>('.pm')!
    const clockDial = shadowRoot.querySelector<HTMLDivElement>('.clock-dial')!
    const track = shadowRoot.querySelector<HTMLDivElement>('.track')!
    const date = new Date()
    const getHoursText = (h: number, is12 = false) => String(is12 ? h % 12 || 12 : h).padStart(2, '0')
    const getMinutesText = (m: number) => String(m).padStart(2, '0')
    const isHourClock = () => !layout.classList.contains('show-minute')
    const renders = {
      hours: () => (hour.firstChild as Text).textContent = getHoursText(date.getHours(), true),
      minutes: () => (minute.firstChild as Text).textContent = getMinutesText(date.getMinutes()),
      period: () => layout.classList.toggle('show-pm', date.getHours() >= 12),
      hoursClock: () => {
        const index = (date.getHours() % 12 || 12)
        track.style.setProperty('--s_rotate', `${index * 30}deg`)
        clockDial.querySelector<HTMLDivElement>('.icon-btn.checked')?.classList.remove('checked')
        clockDial.children[index].classList.add('checked')
      },
      minutesClock: () => {
        const index = date.getMinutes()
        track.style.setProperty('--s_rotate', `${index * 6}deg`)
        clockDial.querySelector<HTMLDivElement>('.icon-btn.checked')?.classList.remove('checked')
        clockDial.children[index === 0 ? clockDial.children.length - 1 : index / 5]?.classList.add('checked')
      }
    }
    const rander = () => {
      renders.hours()
      renders.minutes()
      renders.period()
      isHourClock() ? renders.hoursClock() : renders.minutesClock()
    }
    hour.onclick = hour.onfocus = () => {
      if (!layout.classList.contains('show-minute')) return
      layout.classList.remove('show-minute')
      renders.hoursClock()
    }
    minute.onclick = minute.onfocus = () => {
      if (layout.classList.contains('show-minute')) return
      layout.classList.add('show-minute')
      renders.minutesClock()
    }
    const change = () => {
      updateFrom()
      this.dispatchEvent(new Event('change'))
    }
    const changeHourMinute = (e: KeyboardEvent, hours = true) => {
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return
      const cum = e.key === 'ArrowUp' ? 1 : -1
      if (!hours) {
        const oldM = date.getMinutes()
        const val = oldM + cum
        date.setMinutes(val >= 60 ? 0 : (val < 0 ? 59 : val))
        renders.minutes()
        renders.minutesClock()
      } else {
        const oldH = date.getHours()
        const val = oldH + cum
        const max = layout.classList.contains('show-pm') ? 24 : 12
        date.setHours(val >= max ? max - 12 : (val < max - 12 ? max - 1 : val))
        renders.hours()
        renders.hoursClock()
      }
      change()
      e.preventDefault()
    }
    hour.onkeydown = (e) => changeHourMinute(e)
    minute.onkeydown = (e) => changeHourMinute(e, false)
    const changePeriod = (isAM = true) => {
      const contains = layout.classList.contains('show-pm')
      if (contains !== isAM) return
      layout.classList.toggle('show-pm', !contains)
      date.setHours(date.getHours() + (isAM ? -12 : 12))
      change()
    }
    am.onclick = () => changePeriod()
    pm.onclick = () => changePeriod(false)
    focusKeydownClick(hour, minute, am, pm)
    clockDial.onpointerdown = (e) => {
      if (e.button !== 0) return
      const hourClock = isHourClock()
      const rect = clockDial.getBoundingClientRect()
      const move = (event: MouseEvent | TouchEvent) => {
        event.preventDefault()
        const ev = event instanceof MouseEvent ? event : event.touches[0]
        const x = (ev.clientX - rect.left) - rect.width / 2
        const y = (ev.clientY - rect.top) - rect.height / 2
        const radians = Math.atan2(y, x)
        let degrees = ((radians * (180 / Math.PI)) + 90) % 360
        if (degrees < 0) degrees += 360
        const step = hourClock ? 30 : 6
        const val = (Math.round(degrees / step) * step) || 360
        const value = val / step
        const oldHour = date.getHours()
        const oldMinute = date.getMinutes()
        if (oldHour !== value || oldMinute !== value) {
          if (hourClock) {
            date.setHours(value)
            renders.hours()
            renders.hoursClock()
          } else {
            date.setMinutes(value)
            renders.minutes()
            renders.minutesClock()
          }
          change()
        }
      }
      move(e)
      const up = () => {
        document.removeEventListener(eventNames.move, move)
        document.removeEventListener(eventNames.up, up)
      }
      const eventNames = getEventNames(e.pointerType)
      document.addEventListener(eventNames.move, move, { passive: false })
      document.addEventListener(eventNames.up, up)
    }
    const updateFrom = () => info.internals.setFormValue(`${getHoursText(date.getHours())}:${getMinutesText(date.getMinutes())}`)
    useThrottle(rander)
    updateFrom()
    return {
      expose: {
        get value() {
          return `${getHoursText(date.getHours())}:${getMinutesText(date.getMinutes())}`
        }
      },
      onFormReset: () => this.value = this.defualtValue,
      value: (v) => {
        const [h, m] = v.split(':')
        date.setHours(Number(h), Number(m))
        useThrottle(rander)
        updateFrom()
      }
    }
  }
}) { }

const name = DockedTimePicker.define('s-docked-time-picker')

declare global {
  interface HTMLElementTagNameMap {
    [name]: DockedTimePicker
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & DockedTimePicker
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}