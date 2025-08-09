import { useProps, useElement, useThrottle } from '../core/element.js'
import { Select } from '../core/utils/select.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  $value: '',
  multiple: false,
  variant: ['standard', 'segmented'],
  orientation: ['horizontal', 'vertical'],
})
const itemProps = useProps({
  $value: '',
  selected: false,
  disabled: false
})

const style = /*css*/`
:host{
  display: block;
  background: #fff;
  height: 48px;
  font-size: .875rem;
  box-shadow: 0 -1px 0 var(--s-color-surface-variant, ${scheme.color.surfaceVariant}) inset;
  background: var(--s-color-surface-container, ${scheme.color.surfaceContainer});
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
}
.layout{
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
}
:host([orientation=vertical]){
  display: inline-flex;
  height: 300px;
  width: auto;
  min-width: 48px;
  .layout{
    flex-direction: column;
  }
  ::slotted(s-tab-item){
    height: auto;
    width: 100%;
    min-width: 48px;
    padding: 16px 0;
  }
}
`

const itemStyle = /*css*/`
:host{
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
  cursor: pointer;
  padding: 0 16px;
  flex-shrink: 0;
  transition-property: color;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
.layout{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.indicator{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  opacity: 0;
  background: var(--s-color-primary, ${scheme.color.primary});
}
:host([selected=true]){
  color: var(--s-color-primary, ${scheme.color.primary});
  .indicator{
    opacity: 1;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot></slot>
</div>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <slot></slot>
  <div class="indicator"></div>
</div>
<s-ripple attached="true"></s-ripple>
`

const getOrientation = (orientation: typeof props.orientation) => {
  const data = {
    horizontal: { offset: 'offsetWidth', rect: 'left', },
    vertical: { offset: 'offsetHeight', rect: 'top', }
  } as const
  return data[orientation]
}

export class Tab extends useElement({
  name: 's-tab',
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const select = new Select(this, slot, TabItem)
    const center = () => {
      const key = this.orientation === 'horizontal' ? 'scrollWidth' : 'scrollHeight'
      if (layout.scrollWidth === layout.offsetWidth) return
    }
    select.onSlotChange = () => useThrottle(center)
    select.onChange = () => {
      useThrottle(center)
      console.log('change')
    }
    select.onRender = () => {
      // const [item] = select.selectedList
      // if (item && layout.scrollWidth !== layout.offsetWidth) {
      //   const left = (item.offsetLeft - layout.offsetLeft) - (layout.offsetWidth / 2 - item.offsetWidth / 2)
      //   layout.scrollTo({ left, behavior: 'smooth' })
      // }
      // if (!old || !item || !this.isConnected) return
      // const oldRect = old.shadowRoot!.querySelector('.indicator')!.getBoundingClientRect()
      // const indicator = select.select.shadowRoot?.querySelector('.indicator') as HTMLDivElement
      // const rect = indicator.getBoundingClientRect()
      // const offset = oldRect.left - rect.left
      // indicator.style.transform = `translateX(${rect.left > oldRect.left ? offset : Math.abs(offset)}px)`
      // indicator.style.width = `${oldRect.width}px`
      // const animation = indicator.animate([{ transform: `translateX(0)`, width: `${rect.width}px` }], getAnimateOptions())
      // animation.onfinish = animation.oncancel = animation.onremove = () => {
      //   indicator.style.removeProperty('transform')
      //   indicator.style.removeProperty('width')
      // }
    }
    return {
      expose: {
        get options() {
          return select.list
        },
        get selectedIndex() {
          return select.selectedIndex()
        },
        get selectedIndexAll() {
          return select.selectedIndexAll()
        }
      },
      onMounted: () => useThrottle(center),
      getValue: () => select.getValue(),
      setValue: (v) => select.setValue(v),
      setMultiple: () => select.setMultiple(),
    }
  }
}) { }

export class TabItem extends useElement({
  name: 's-tab-item',
  style: itemStyle,
  props: itemProps,
  focused: true,
  template: itemTemplate,
  setup(shadowRoot) {
    this.addEventListener('click', () => {
      this.dispatchEvent(new Event(`${Tab.tagName}:select`, { bubbles: true }))
    })
    return {
      setSelected: () => {
        this.dispatchEvent(new Event(`${Tab.tagName}:render`, { bubbles: true }))
      }
    }
  }
}) { }

Tab.define()
TabItem.define()

declare global {
  interface HTMLElementTagNameMap {
    [Tab.tagName]: Tab
    [TabItem.tagName]: TabItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Tab.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [TabItem.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [Tab.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & Tab
    [TabItem.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps>
    } & TabItem
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [Tab.tagName]: IntrinsicElements['div'] & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: IntrinsicElements['div'] & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Tab.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Tab.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}