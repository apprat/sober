import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  currentIndex: 0,
  scrollMode: ['performance', 'standard'],
  orientation: ['horizontal', 'vertical'],
})

const events = {
  change: Event,
  scrollchange: CustomEvent<{ targetIndex: number, positionOffset: number }>,
}

const style = /*css*/`
:host{
  display: block;
  height: 320px;
  overflow: hidden;
  background: rgba(0,0,0,0.05);
  position: relative;
}
.layout{
  display: flex;
  height: 100%;
  position: relative;
  transition-property: none;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
::slotted(*){
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}
`
const template = /*html*/`
<div class="layout" part="layout">
  <slot></slot>
</div>
`

export class PageView extends useElement({
  name: 's-page-view',
  style, props, template, events,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('--s-motion-easing-standard') || scheme.motion.easing.standard
      const duration = computedStyle.getDuration('--s-motion-duration-long4') || scheme.motion.duration.long4
      return { easing, duration }
    }
    let slots: HTMLElement[] = []
    slot.addEventListener('slotchange', () => slots = slot.assignedElements() as HTMLElement[])
    const setOffset = (value: number) => {
      if (this.scrollMode === 'standard') return layout.style.left = `${value}px`
      layout.style.transform = `translateX(${value}px)`
    }
    const removeOffset = () => {
      layout.style.removeProperty('transform')
      layout.style.removeProperty('left')
    }
    this.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || slots.length <= 1) return
      const state = { x: event.pageX, size: this.offsetWidth, position: 0 }
      const move = (event: PointerEvent) => {
        let left = event.pageX - state.x
        if (left > 0 && this.currentIndex === 0) {
          console.log('远比')
          left = left * 0.5
        }
        state.position = Math.max(-state.size, Math.min(state.size, left))
        setOffset(state.position)
        this.dispatchEvent(new CustomEvent('scrollchange', { detail: { targetIndex: this.currentIndex, positionOffset: state.position } }))
      }
      const up = () => {
        console.log('up', state.position)
        removeOffset()
        layout.animate({ transform: [`translateX(${state.position}px)`, 'translateX(0)'] }, getAnimateOptions())
        document.removeEventListener('pointermove', move)
        document.removeEventListener('pointerup', up)
      }
      document.addEventListener('pointermove', move, { passive: false })
      document.addEventListener('pointerup', up)
    })
  }
}) { }

PageView.define()

declare global {
  interface HTMLElementTagNameMap {
    [PageView.tagName]: PageView
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [PageView.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [PageView.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & PageView
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [PageView.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [PageView.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [PageView.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}