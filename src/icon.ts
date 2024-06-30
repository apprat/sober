import { useElement, JSXAttributes } from './core/element.js'

const name = 's-icon'
const props = {
  type: 'none' as keyof typeof svgData
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: 24px;
  aspect-ratio: 1;
  color: var(--s-color-on-surface-variant, #46464f);
  fill: currentColor;
  box-sizing: border-box;
}
svg{
  width: 100%;
  height: 100%;
}
::slotted(*){
  width: 100%;
  height: 100%;
}
`
const svgData = {
  none: '',
  home: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
  add: 'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
  search: 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z',
  menu: 'M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z',
  arrow_back: 'm313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z',
  arrow_forward: { name: 'arrow_back', angle: 180 },
  arrow_upward: { name: 'arrow_back', angle: 90 },
  arrow_downward: { name: 'arrow_back', angle: -90 },
  arrow_drop_up: 'm280-400 200-200 200 200H280Z',
  arrow_drop_down: { name: 'arrow_drop_up', angle: 180 },
  arrow_drop_left: { name: 'arrow_drop_up', angle: -90 },
  arrow_drop_right: { name: 'arrow_drop_up', angle: 90 },
  more_vert: 'M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z',
  more_horiz: { name: 'more_vert', angle: 90 },
  close: 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  done: 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z',
  chevron_up: 'M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z',
  chevron_down: { name: 'chevron_up', angle: 180 },
  chevron_left: { name: 'chevron_up', angle: -90 },
  chevron_right: { name: 'chevron_up', angle: 90 },
  light_mode: 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z',
  dark_mode: 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z',
  star: 'm354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z',
  favorite: 'm480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z',
}

const template = /*html*/`
<slot>
  <svg viewBox="0 -960 960 960">
    <path d="${svgData.none}"></path>
  </svg>
</slot>
`


export class Icon extends useElement({
  style, template, props, syncProps: ['type'],
  setup(shadowRoot) {
    const path = shadowRoot.querySelector('path') as SVGPathElement
    return {
      watches: {
        type: (value) => {
          let d = svgData[value]
          if (typeof d === 'object') {
            path.setAttribute('transform', `rotate(${d.angle} 480 -480)`)
            d = svgData[d.name] as string
          } else {
            path.removeAttribute('transform')
          }
          path.setAttribute('d', d)
        }
      }
    }
  }
}) { }

Icon.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Icon
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}