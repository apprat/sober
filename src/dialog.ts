import { builder, html, ref } from './core/element.js'
import './ripple.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  transition: filter .2s;
  filter: opacity(0);
}
.wrapper.show{
  filter: opacity(1);
  pointer-events: auto;
}
.scrim{
  background: var(--s-color-scrim, #000000);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: opacity(.62);
}
.wrapper-container{
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(.9);
  transition: transform .2s;
}
.wrapper.show .wrapper-container{
  transform: scale(1);
}
.container{
  width: 560px;
  min-width: 280px;
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  background: var(--s-color-surface-container-high, #ece6f0);
  position: relative;
  border-radius: 28px;
  box-shadow: var(--s-elevation-level5, 0 8px 10px -6px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.wrapper.show .container{
  pointer-events: auto;
}
:host([size=vertical]) .container{
  height: 100%;
}
:host([size=horizontal]) .container{
  width: 100%;
}
:host([size=large]) .container{
  width: 1080px;
}
:host([size=full]) .container{
  width: 100%;
  height: 100%;
  border-radius: 0;
  max-width: none;
  max-height: none;
}
::slotted([slot=headline]){
  padding: 24px 24px 0 24px;
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--s-color-on-surface, #1d1b20);
  flex-shrink: 0;
}
.supporting-text{
  user-select: text;
  -webkit-user-select: text;
  flex-grow: 1;
  overflow-y: auto;
}
::slotted(p){
  margin: 24px;
  line-height: 1.6;
}
::slotted(s-label){
  padding: 0 16px;
}
.action{
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  flex-shrink: 0;
}
.action>s-ripple{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  border-radius: 20px;
  padding: 0 12px;
  font-weight: 500;
  line-height: 1;
  text-transform: capitalize;
  box-sizing: border-box;
  font-size: .875rem;
  color: var(--s-color-primary,#6750a4);
  margin: 20px 0;
}
.action>s-ripple:empty{
  display: none;
}
@media (pointer: fine){
  .supporting-text::-webkit-scrollbar{
    width: 8px;
    height: 8px;
  }
  .supporting-text::-webkit-scrollbar-track-piece{
    background: var(--s-color-outline-variant,#cac4d0);
  }
  .supporting-text::-webkit-scrollbar-corner{
    background: var(--s-color-outline-variant,#cac4d0);
  }
  .supporting-text::-webkit-scrollbar-thumb{
    background: var(--s-color-outline,#79747e);
  }
}
`

const name = 's-dialog'
const props = {
  size: 'basic' as 'basic' | 'vertical' | 'horizontal' | 'large' | 'full',
  negative: '',
  positive: '',
}

class Component extends builder({
  name, props, propSyncs: ['size'],
  setup() {
    const wrapper = ref()
    const negative = ref()
    const positive = ref()
    const show = () => {
      wrapper.target.classList.add('show')
      this.dispatchEvent(new Event('show'))
    }
    const dismiss = () => {
      wrapper.target.classList.remove('show')
      this.dispatchEvent(new Event('dismiss'))
    }
    const action = (type: string) => {
      const canceled = this.dispatchEvent(new Event(type, { cancelable: true }))
      if (!canceled) return
      dismiss()
    }
    const transitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      const showed = wrapper.target.classList.contains('show')
      this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
    }
    return {
      watches: {
        negative: (value) => negative.target.textContent = value,
        positive: (value) => positive.target.textContent = value
      },
      render: () => html`
        <style>${style}</style>
        <slot name="trigger" @click="${show}"></slot>
        <div class="wrapper" ref="${wrapper}" @transitionend="${transitionEnd}">
        <div class="scrim" @click="${dismiss}"></div>
          <div class="wrapper-container">
            <div class="container" part="container">
              <slot name="headline"></slot>
              <div class="supporting-text">
                <slot></slot>
              </div>
              <div class="action">
                <s-ripple ref="${negative}" @click="${() => action('negative')}"></s-ripple>
                <s-ripple ref="${positive}" @click="${() => action('positive')}"></s-ripple>
              </div>
            </div>
          </div>
        </div>
      `
    }
  }
}) { }

Component.define()

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  dismiss: Event
  dismissed: Event
  positive: Event
  negative: Event
}

interface Component {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

export default Component

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}