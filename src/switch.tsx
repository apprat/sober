import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  align-items: center;
  cursor: pointer;
  position: relative;
  color: var(--s-color-on-surface-variant,#49454E);
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.4) !important;
}
:host([checked=true]){
  color: var(--s-color-primary,#6750A4);
}
:host([checked=true]) .track{
  background: var(--s-color-primary,#6750A4);
  -webkit-box-shadow:none;
  box-shadow: none;
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary,#FFFFFF);
  transform: scale(1.5) translateX(16px);
}
:host([checked=true]) .icon{
  filter: opacity(1);
}
.track{
  display: flex;
  align-items: center;
  width: 52px;
  height: 32px;
  border-radius: 20px;
  --background: var(--s-color-surface-variant,#E7E0EC);
  -webkit-box-shadow: 0 0 0 2px inset var(--s-color-outline,#79747E);
  box-shadow: 0 0 0 2px inset var(--s-color-outline,#79747E);
  position: relative;
}
.thumb{
  background: var(--s-color-outline,#79747E);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  transform: scale(1) translateX(8px);
  transition: transform .2s;
  transform-origin: left;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon{
  width: 12px;
  height: 12px;
  fill: var(--s-color-primary,#6750A4);
  filter: opacity(0);
  transition: filter .2s;
}
.pointer-wrapper{
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  top: auto !important;
  transition: transform .2s;
  transform: translateX(-4px);
}
:host([checked=true]) .pointer-wrapper{
  transform: translateX(16px);
}
`

const name = 's-switch'
const props = {
  disabled: false,
  checked: false
}

/**
 * @event change
 */
const Component = defineComponent({
  name, props,
  setup() {
    this.host.addEventListener('click', () => {
      this.props.checked = !this.props.checked
      this.host.dispatchEvent(new Event('change'))
    })
    return {
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <div class="track">
          <div class="thumb">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M375.466667 678.4l-149.333334-149.333333c-8.533333-8.533333-17.066667-12.8-29.866666-12.8-12.8 0-21.333333 4.266667-29.866667 12.8-17.066667 17.066667-17.066667 42.666667 0 59.733333L345.6 768c17.066667 17.066667 42.666667 17.066667 59.733333 0L857.6 315.733333c17.066667-17.066667 17.066667-42.666667 0-59.733333-8.533333-8.533333-17.066667-12.8-29.866667-12.8s-21.333333 4.266667-29.866666 12.8l-422.4 422.4z">
              </path>
            </svg>
          </div>
        </div>
        <Pointer.Fragment centered={true} />
      </>
    }
  }
})

export default Component

type Component = InstanceType<typeof Component>

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
  interface Document {
    createElement(tagName: typeof name, options?: ElementCreationOptions): Component
    getElementsByTagName(qualifiedName: typeof name): HTMLCollectionOf<Component>
  }
}