import { defineElement, IntrinsicElement, css } from './base/core'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  fill: currentColor;
  box-sizing: border-box;
}
:host([size=small]){
  width: 20px;
  height: 20px
}
:host([size=large]){
  width: 40px;
  height: 40px;
}
`

const name = 's-icon'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large'
}

export default defineElement({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <slot></slot>
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}