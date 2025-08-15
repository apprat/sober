import { useProps, useElement } from '../core/element.js'
import { buttonStyle } from '../core/style/button.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  align: ['right bottom', 'right top', 'left bottom', 'left top']
})
const itemProps = useProps({
  disabled: false
})
const events = {
  show: Event,
  change: Event
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.container{
  display: flex;
  gap: 6px;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  align-items: flex-end;
  opacity: 0;
  background: rgba(0, 0, 0, 0.05);
  transform: scale(.5);
  transform-origin: center bottom;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
  transition-property: transform, opacity;
}
:host([open]) .container{
  opacity: 1;
  transform: scale(1);
}
::slotted(s-fab[slot=trigger]){
  --fab-icon-transition: transform var(--s-motion-duration-short4, ${scheme.motion.duration.short4}) var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
}
:host([opened]) ::slotted(s-fab[slot=trigger]){
  border-radius: 50%;
  --fab-icon-transform: rotate(45deg);
}
`

const itemStyle = /*css*/`
:host{
  height: 40px;
  gap: 6px;
  padding: 0 20px;
  border-radius: 20px;
  min-width: 72px;
  background: var(--s-color-primary-container, ${scheme.color.primaryContainer});
  color: var(--s-color-on-primary-container, ${scheme.color.onPrimaryContainer});
  box-shadow: var(--s-elevation-level2, ${scheme.elevation.level2});
}
.text{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
::slotted(:is(svg, s-icon)){
  width: 20px;
}
::slotted(:is(svg, s-icon)[slot=start]){
  margin-left: -8px;
}
::slotted(:is(svg, s-icon)[slot=end]){
  margin-right: -8px;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="container opened">
  <slot></slot>
</div>
`

const itemTemplate = /*html*/`
<slot name="start"></slot>
<slot class="text" part="text"></slot>
<slot name="end"></slot>
<s-ripple attached="true" part="ripple"></s-ripple>
`

export class FloatingActionButtonMenu extends useElement({
  props, template, events, style,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const trigger = shadowRoot.querySelector<HTMLSlotElement>('slot[name=trigger]')!
    const toggle = (force?: boolean) => this.toggleAttribute('open', force ?? !this.hasAttribute('open'))
    const open = () => { }
    const close = () => { }
    trigger.onclick = () => toggle()
    return {
      expose: { open, close, toggle }
    }
  }
}) { }

export class FloatingActionButtonMenuItem extends useElement({
  props: itemProps,
  template: itemTemplate,
  style: [buttonStyle, itemStyle]
}) { }

export { FloatingActionButtonMenu as FABMenu, FloatingActionButtonMenuItem as FABMenuItem }

const name = FloatingActionButtonMenu.define('s-fab-menu')
const itemName = FloatingActionButtonMenuItem.define('s-fab-menu-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: FloatingActionButtonMenu
    [itemName]: FloatingActionButtonMenuItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [FloatingActionButtonMenu.name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
    } & FloatingActionButtonMenu
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