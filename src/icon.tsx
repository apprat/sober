import { defineComponent } from './core/runtime'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  fill: currentColor;
  box-sizing: border-box;
}
svg{
  width: initial;
  height: initial;
}
`
const svgData = {
  add: 'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
  search: 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z',
  menu: 'M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z',
  arrow_back: 'm313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z',
  more_vert: 'M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z',
  more_horiz: 'M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z',
  close: 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  chevron_right: 'M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z',
  done: 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z',
  expand_more: 'M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z',
  arrow_drop_down: 'M480-360 280-560h400L480-360Z'
}

const name = 's-icon'
const props = {
  type: 'add' as keyof typeof svgData,
  d: ''
}

const Component = defineComponent({
  name, props,
  setup() {
    return {
      watches: {
        type: () => this.refs.path.setAttribute('d', svgData[this.props.type]),
        d: () => this.refs.path.setAttribute('d', this.props.d)
      },
      render: () => <>
        <style>{style}</style>
        <slot>
          <svg viewBox="0 -960 960 960">
            <path ref="path" d={svgData.add}></path>
          </svg>
        </slot>
      </>
    }
  }
})

export default class extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}