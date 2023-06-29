import { defineComponent, IntrinsicElement, css } from './base/core'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: block;
  color: var(--s-color-primary);
  height: 40px;
  cursor: pointer;
  background: rgba(0,0,0,.04);
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
}
.wrapper{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.track{
  width: 100%;
  height: 4px;
  padding: 0 10px;
}
.track>.block{
  height: 100%;
  background: var(--s-color-on-surface-variant);
  border-radius: 2px;
  opacity: .38;
}
.track>.active{
  position: absolute;
  left: 0;
  background: currentColor;
  height: 4px;
  border-radius: 2px;
}
.thumb{
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.thumb>div{
  position: absolute;
  border-radius: 50%;
  background: currentColor;
}
.thumb>.state{
  filter: opacity(.24);
  pointer-events: none;
  transition: filter .2s;
  width: 100%;
  height: 100%;
}
.thumb>.active{
  width: 20px;
  height: 20px;
}
`

const name = 's-slider'
const props = {
  type: 'continuous' as 'continuous' | 'discrete',
  disabled: false,
  labeled: false,
  orientation: 'horizontal' as 'horizontal' | 'vertical',
  max: 1000,
  min: 0,
  step: 100,
  value: 0
}

const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <div class="wrapper" ref="wrapper">
          <div class="track">
            <div class="block"></div>
            <div class="active" ref="track"></div>
          </div>
          <div class="thumb" onMousedown={(e: MouseEvent) => console.log(this)} ref="thumb">
            <div class="state"></div>
            <div class="active"></div>
          </div>
          <div class="label"></div>
        </div>
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