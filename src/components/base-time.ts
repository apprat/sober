import { useProps, useElement, setKeydownClick, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  orientation: ['vertical', 'horizontal'],
  $name: '',
  $value: '',
  $defualtValue: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
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
  gap: 12px;
  height: 80px;
  width: 100%;
  .time-selector{
    gap: 9px;
    height: 100%;
    flex-grow: 1;
    .text{
      height: 100%;
      min-width: 95px;
      font-weight: 400;
      flex-grow: 1;
      cursor: pointer;
      position: relative;
      border-radius: 8px;
      font-size: calc(var(--s-font-size) * 57px);
      transition-property: background-color, color;
      background: ${scheme.color.surfaceContainerHighest};
      color: ${scheme.color.onSurface};
      &:focus-visible{
        outline-offset: 2px;
        outline: solid 3px currentColor;
      }
    }
    .separator{
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
    flex-direction: column;
    width: 52px;
    height: 100%;
    flex-shrink: 0;
    hr{
      margin: 0;
      width: 100%;
      border: none;
      border-width: 1px;
      border-color: ${scheme.color.outline};
      border-top-style: solid;
    }
    .text{
      position: relative;
      flex-grow: 1;
      width: 100%;
      height: 100%;
      font-weight: 500;
      cursor: pointer;
      transition-property: background-color, color;
      font-size: calc(var(--s-font-size) * 16px);
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
        border-top-right-radius: 8px;
        &::before{
          border-bottom-style: none;
        }
      }
      &.pm{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        &::before{ 
          border-top-style: none;
        }
      }
    }
  }
}
.clock-dial{
  width: 256px;
  margin: 0 12px;
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
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
    transform: translate(-50%, -50%);
    counter-increment: clock;
    &::after{
      content: counter(clock);
    }
    &.checked{
      color: ${scheme.color.onPrimary};
      background: ${scheme.color.primary};
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
:host([orientation=horizontal]){
  flex-direction: row;
  align-items: center;
  .headline{
    flex-direction: column;
    .period-selector{
      flex-direction: row;
      width: 100%;
      height: 38px;
      hr{
        border-top-style: none;
        border-left-style: solid;
        width: auto;
        height: 100%;
      }
      .am{
        border-bottom-left-radius: 8px;
        border-top-right-radius: 0;
        &::before{
          border-style: solid;
          border-right-style: none;
        }
      }
      .pm{
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;
        &::before{
          border-style: solid;
          border-left-style: none;
        }
      }
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
    <div class="icon-btn" part="clock-dial-text" style="left: 70%; top: 15%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 85%; top: 30%" ></div>
    <div class="icon-btn" part="clock-dial-text" style="transform: translate(-100%, -50%); left: 100%; top: 50%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 85%; top: 70%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 70%; top: 85%"></div>
    <div class="icon-btn" part="clock-dial-text" style="transform: translate(0, -100%); top: 100%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 30%; top: 85%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 15%; top: 70%"></div>
    <div class="icon-btn" part="clock-dial-text" style="transform: translate(0, -50%); left: 0; top: 50%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 15%; top: 30%"></div>
    <div class="icon-btn" part="clock-dial-text" style="left: 30%; top: 15%"></div>
    <div class="icon-btn checked" part="clock-dial-text" style="transform: none; top: 0"></div>
  </div>
</div>
`

const getEventNames = (type: string) => {
  const mouse = { move: 'pointermove', up: 'pointerup' } as const
  const touch = { move: 'touchmove', up: 'touchend' } as const
  return type === 'mouse' ? mouse : touch
}

export class BaseTime extends useElement({
  props, style, template,
  formAssociated: true,
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
    setKeydownClick([hour, minute, am, pm])
    clockDial.onpointerdown = (e) => {
      if (e.button !== 0) return
      const hourClock = isHourClock()
      const rect = clockDial.getBoundingClientRect()
      const move = (event: MouseEvent | TouchEvent) => {
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
      onFormReset: () => this.value = this.defualtValue,
      getValue: () => `${getHoursText(date.getHours())}:${getMinutesText(date.getMinutes())}`,
      setValue: (v) => {
        const [h, m] = v.split(':')
        date.setHours(Number(h), Number(m))
        useThrottle(rander)
        updateFrom()
      }
    }
  }
}) { }

const name = BaseTime.define('s-base-time')

declare global {
  interface HTMLElementTagNameMap {
    [name]: BaseTime
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
    } & BaseTime
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