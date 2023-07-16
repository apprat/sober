import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--s-color-on-surface-variant);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
}
:host([checked=true]){
  color: var(--s-color-primary);
}
.icon{
  width: 24px;
  height: 24px;
  fill: currentColor;
}
`

const name = 's-radio-button'
const props = {
  disabled: false,
  checked: false,
  name: ''
}

/**
 * @event change
 */
const Component = defineComponent({
  name, props,
  setup() {
    const svgData = {
      uncheck: 'M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m0 768c-188.586667 0-341.333333-152.746667-341.333333-341.333333s152.746667-341.333333 341.333333-341.333333 341.333333 152.746667 341.333333 341.333333-152.746667 341.333333-341.333333 341.333333z',
      checked: 'M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m0 768c-188.586667 0-341.333333-152.746667-341.333333-341.333333s152.746667-341.333333 341.333333-341.333333 341.333333 152.746667 341.333333 341.333333-152.746667 341.333333-341.333333 341.333333z m0-554.666666c-117.76 0-213.333333 95.573333-213.333333 213.333333s95.573333 213.333333 213.333333 213.333333 213.333333-95.573333 213.333333-213.333333-95.573333-213.333333-213.333333-213.333333z'
    }
    return {
      created: () => {
        this.host.addEventListener('click', () => {
          this.props.checked = true
          if (this.props.name) {
            document.querySelectorAll<typeof this.host>(`${this.host.tagName}[name='${this.props.name}']`).forEach((item) => {
              if (item === this.host) return
              item.checked = false
            })
          }
          this.host.dispatchEvent(new Event('change'))
        })
      },
      changed: (name) => {
        switch (name) {
          case 'checked':
            this.refs.iconPath.setAttribute('d', this.props.checked ? svgData.checked : svgData.uncheck)
            break
        }
      },
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <div class="hover"></div>
        <svg class="icon" viewBox="0 0 1024 1024">
          <path ref="iconPath" d={svgData.uncheck}></path>
        </svg>
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