import { useElement, JSXAttributes } from './core/element.js'

const name = 's-bottom-sheet'
const props = {
}

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
  z-index: 2;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.show.wrapper{
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
  transition: filter .24s;
  filter: opacity(0);
}
.show.wrapper .scrim{
  filter: opacity(.8);
}
.container{
  position: relative;
  border-radius: 24px 24px 0 0;
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  max-width: 520px;
  width: 100%;
  max-height: calc(100% - 56px);
  background: var(--s-color-surface-container-highest, #e5e1e6);
  display: flex;
  flex-direction: column;
  visibility: hidden;
}
.show.wrapper .container{
  transform: translateY(0%);
  visibility: visible;
}
.drag{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
}
.drag::before{
  content: '';
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--s-color-on-surface-variant, #46464f);
  opacity: .4;
}
::slotted(s-scroll-view){
  flex-grow: 1;
  min-height: 280px;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="wrapper" part="wrapper">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <div class="drag" part="drag"></div>
    <slot></slot>
</div>
</div>
`

export class BottomSheet extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement

    const show = () => {
      wrapper.classList.add('show')
      container.animate([
        { transform: 'translateY(100%)', visibility: 'visible' },
        { transform: 'translateY(0%)', visibility: 'visible' }
      ], { duration: 240 })
    }
    const dismiss = () => {
      wrapper.classList.remove('show')
      container.animate([
        { transform: 'translateY(0%)', visibility: 'visible' },
        { transform: 'translateY(100%)', visibility: 'visible' }
      ], { duration: 240 })
    }
    trigger.addEventListener('click', show)
    scrim.addEventListener('click', dismiss)
    return {
      expose: {}
    }
  }
}) { }

BottomSheet.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: BottomSheet
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}