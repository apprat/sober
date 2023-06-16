import { defineElement, IntrinsicElement, css } from './base/core'
import { Fragment } from './pointer'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  color: var(--s-color-on-surface-variant);
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.4) !important;
}
:host([checked=true]){
  color: var(--s-color-primary);
}
:host([checked=true]) .track{
  background: var(--s-color-primary);
  -webkit-box-shadow:none;
  box-shadow: none;
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary);
  transform: scale(1.5) translateX(16px);
}
.track{
  display: flex;
  align-items: center;
  width: 52px;
  height: 32px;
  border-radius: 20px;
  --background: var(--s-color-surface-variant);
  -webkit-box-shadow: 0 0 0 2px inset var(--s-color-outline);
  box-shadow: 0 0 0 2px inset var(--s-color-outline);
  position: relative;
}
.thumb{
  background: var(--s-color-outline);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  transform: scale(1) translateX(8px);
  transition: transform .2s;
  transform-origin: left;
  position: relative;
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

export default defineElement({
  name, props,
  setup() {
    this.host.addEventListener('click', () => {
      this.props.checked = !this.props.checked
      this.host.dispatchEvent(new Event('change'))
    })
    return {
      render: () => <>
        <style>{style}</style>
        <div class="track">
          <div class="thumb"></div>
        </div>
        <Fragment centered={true} />
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}