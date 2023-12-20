import { builder, html, ref } from './core/element.js'

const style = /*css*/`
:host{
  display: block;
  height: 100%;
}
.container{
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.start-scrim,
.end-scrim{
  background: var(--s-color-scrim, #000000);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
  transition: filter .2s;
}
.start,
.end{
  height: 100%;
  flex-shrink: 0;
}
.start{
  order: -1;
}
.supporting-text{
  flex-grow: 1;
  min-width: 0;
}
::slotted([slot=start]),
::slotted([slot=end]){
  --width: 280px;
  width: var(--width);
  height: 100%;
  background: var(--s-color-surface-container-low, #f7f2fa);
  transition: margin .2s;
  will-change: margin;
}
::slotted([slot=start]){
  margin-left: calc(var(--width) * -1);
}
::slotted([slot=end]){
  margin-right: calc(var(--width) * -1);
}
@media (min-width: 720px){
  .start-show ::slotted([slot=start]) {
    margin-left: 0px;
  }
  .end-show ::slotted([slot=end]) {
    margin-right: 0px;
  }
}
@media (max-width: 840px){
  .start-scrim,
  .end-scrim{
    display: block;
    pointer-events: none;
    filter: opacity(0);
  }
  .start-show-fixed .start-scrim,
  .end-show-fixed .end-scrim{
    filter: opacity(.62);
    pointer-events: auto;
  }
  ::slotted([slot=start]),
  ::slotted([slot=end]){
    position: absolute;
    top: 0;
    height: 100%;
    transition: box-shadow .2s,margin .2s;
    z-index: 1;
  }
  ::slotted([slot=start]){
    left: 0;
  }
  ::slotted([slot=end]){
    right: 0;
  }
  .start-show-fixed ::slotted([slot=start]) {
    margin-left: 0px;
  }
  .end-show-fixed ::slotted([slot=end]) {
    margin-right: 0px;
  }
  .start-show-fixed ::slotted([slot=start]),
  .end-show-fixed ::slotted([slot=end]){
    box-shadow: var(--s-elevation-level3, 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  }
}
`

type Type = 'start' | 'end' | 'fixed-start' | 'fixed-end'
// const screen = { fixed: false }
// {
//   const mediaQueryList = matchMedia('(max-width: 840px)')
//   screen.fixed = mediaQueryList.matches
//   mediaQueryList.addEventListener('change', ({ matches }) => screen.fixed = matches)
// }

const name = 's-drawer'
const props = {
}

export default class Component extends builder({
  name, props,
  setup() {
    const container = ref()
    const show = (type: Type = 'start') => {
      //container.target.classList.add(`${slot}-${screen.fixed ? 'show-fixed' : 'show'}`)
    }
    const dismiss = (type: Type = 'start') => {
      //container.target.classList.remove(`${slot}-${screen.fixed ? 'show-fixed' : 'show'}`)
    }
    return {
      expose: { show, dismiss },
      render: () => html`
        <style>${style}</style>
        <div class="container start-show end-show" ref="${container}">
          <div class="supporting-text">
            <slot></slot>
          </div>
          <div class="start-scrim" @click="${() => dismiss('start')}"></div>
          <div class="end-scrim" @click="${() => dismiss('end')}"></div>
          <div class="start">
            <slot name="start"></slot>
          </div>
          <div class="end">
            <slot name="end"></slot>
          </div>
        </div>
      `
    }
  }
}) { }

Component.define()

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