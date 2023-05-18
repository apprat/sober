import { Component, define, Ref } from './base/core'
import Ripple from './ripple'

Ripple.register()

export interface Property {
  disabled: boolean
  checked: boolean
  name: string
}

class RadioButton extends Component<Property> {
  property: Property = {
    disabled: false,
    checked: false,
    name: ''
  }
  refs = {
    iconPath: new Ref()
  }
  state = {
    svgData: {
      uncheck: 'M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m0 768c-188.586667 0-341.333333-152.746667-341.333333-341.333333s152.746667-341.333333 341.333333-341.333333 341.333333 152.746667 341.333333 341.333333-152.746667 341.333333-341.333333 341.333333z',
      checked: 'M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m0 768c-188.586667 0-341.333333-152.746667-341.333333-341.333333s152.746667-341.333333 341.333333-341.333333 341.333333 152.746667 341.333333 341.333333-152.746667 341.333333-341.333333 341.333333z m0-554.666666c-117.76 0-213.333333 95.573333-213.333333 213.333333s95.573333 213.333333 213.333333 213.333333 213.333333-95.573333 213.333333-213.333333-95.573333-213.333333-213.333333-213.333333z'
    }
  }
  onCreated() {
    this.element.addEventListener('click', () => {
      this.element.checked = true
      if (this.property.name) {
        document.querySelectorAll<typeof this.element>(`${this.element.tagName}[name='${this.property.name}']`).forEach((item) => {
          if (item === this.element) return
          item.checked = false
        })
      }
      this.element.dispatchEvent(new Event('change'))
    })
  }
  onPropertyChanged(name: keyof Property) {
    switch (name) {
      case 'checked':
        this.refs.iconPath.value?.setAttribute('d', this.property.checked ? this.state.svgData.checked : this.state.svgData.uncheck)
        break
    }
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          line-height: 1;
          font-size: .875rem;
          font-weight: 400;
          cursor: pointer;
          color: var(--s-color-on-surface-variant);
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.6) !important;
        }
        :host([checked=true]){
          color: var(--s-color-primary);
        }
        .wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          color: inherit;
          overflow: hidden;
          border-radius: 50%;
        }
        .icon{
          width: 24px;
          height: 24px;
          fill: currentColor;
        }
      `}</style>
      <s-ripple class="wrapper" x={0} y={0}>
        <svg class="icon" viewBox="0 0 1024 1024">
          <path ref={this.refs.iconPath} d={this.state.svgData.uncheck}></path>
        </svg>
      </s-ripple>
      <slot></slot>
    </>
  }
}

export default define('radio-button', RadioButton)