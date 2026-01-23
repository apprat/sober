import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['default', 'contained']
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  width: 38px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  color: ${scheme.color.primary};
}
:host([variant=contained]){
  width: 48px;
  padding: 5px;
  background: ${scheme.color.secondaryContainer};
}
svg{
  width: 100%;
  height: 100%;
  overflow: visible;
  will-change: contents;
  path{
    fill: currentColor;
  }
}
`

const p = 'M70.116 21.222Q79.49 3.421 89.708 20.801 95 33 106.35 26.91 126.364 17.641 122.888 37.233 120.781 51.453 132.684 52.085 154.172 55.982 140.268 70.202 128.576 80.419 140.373 89.162 153.824 104.333 133.792 107.341 119.772 109.239 123.204 122.237 125.416 142.777 106.034 132.981 93.943 127.373 89.074 140.221 79.472 156.044 69.87 138.868 64.73 127.102 52.841 133.402 33.67 141.829 36.935 122.026 39.674 108.754 27 108 5.335 103.066 20.398 89.057 30.615 79.787 20 71 6.599 57.246 23.769 53.243 40.833 51.769 37.041 37.127 34.723 17.219 54 27 65 34 70.116 21.328'
const p1 = 'M65.229 19.154Q78.521 9.15 93.99 18.377 101.297 23.74 108.526 28.637 117.31 35.322 125.239 40.608 133.556 46.127 140 51 150.113 59.964 147.237 74.5 144.283 82.74 140.475 94.4 136.821 104.505 132.951 117.101 129.789 130.128 124.219 135.178 118.414 140.795 109.351 141.881 96.56 142.022 83.91 141.692 72.016 141.834 61.066 141.975 47.047 142.919 39.684 138.435 31.33 132.205 29.111 123.048 26.279 114.505 24.014 106.717 20.663 97.938 18.538 90.716 15.282 82.975 13.016 74.762 10.695 66.272 14.373 58.144 19.67 49.022 29.159 44.681 40.047 36.957 52.001 28.35 58 24 65.229 19.139'
const p2 = 'M67.395 16.808Q79.88 8.286 93.375 17.458 100.885 23.769 109.595 23.643 127.329 24.653 131.494 41.693 133.009 50.402 139.147 55.686 145.219 59.604 147.366 66.581 150.049 74.23 146.292 82.414 139.819 92.359 142.234 103.227 142.267 118.777 129.622 125.098 119.036 127.727 113.641 138.374 104.876 149.171 89.506 146.186 80.488 141.74 69.691 146.44 56.989 148.98 47.018 139.136 40.829 127.096 29.793 124.025 15.603 116.63 17.851 104.703 19.538 95.434 16.048 86.491 11.514 79.822 12 72 12.847 61.949 20.317 55.681 27.276 51.159 28.052 42.476 32.321 24.07 49.793 23.803 60.15 23.519 67.395 16.81'
const p3 = 'M66 25Q75.483 20.455 87 20 97.454 19.858 105.694 22.963 113.844 26.037 120.233 30.906 126.8 36.158 131.369 43.114 135.966 49.055 139 61 141.071 72.937 138.922 81.358 136.919 91.865 132.054 99.031 126.56 107 121.009 111.838 115.156 118.375 109.068 124.078 103.454 129.718 96.051 133.63 89.423 137.749 79.78 139.391 69.451 140.944 58.854 138.437 49.569 135.866 42.196 130.942 34.284 125.567 29.389 118.075 24.373 111.924 21.866 102.313 19.268 94.46 20 84 20.82 74.19 26.314 63.772 29.866 56.009 38.196 48.726 43.807 42.843 52.018 35.173 55.51 30.932 66 25'
const p4 = 'M66 21Q72.725 12.821 80.056 12.155 88.32 13.221 94.984 21.619 102.582 28.683 115.778 28.683 133.238 27.883 131.506 45.344 131.772 59.073 139.103 66.137 146.223 71.34 148.104 79.207 147.249 88.955 138.869 93.573 130.832 103.34 131.767 116.219 131.247 133.565 111.928 131.591 99.88 131.903 93.024 140.42 87.416 146.652 79.522 147.899 70.485 146.341 63.111 136.681 57.19 130.345 43.688 131.799 26.238 131.176 28.108 112.688 28.939 100.847 20.941 94.407 13.982 88.591 12.008 80.801 11.904 72.491 21.142 65.87 28.606 58.273 28.74 43.078 28.34 26.55 49.266 28.149 59.53 28.149 66 21'
const p5 = 'M60.958 25.294Q71.491 30.592 79.878 30.151 88.96 30.529 95.771 26.177 109.141 21.006 123 29 133.17 35.511 135.375 46.791 137.317 54.884 133.513 64.596 129.062 73.175 129.628 78.274 129.294 88.325 134.553 97.743 137.807 108.099 133.755 118.417 128.009 129.829 117.164 134.037 103.082 139.055 91.266 131.447 80.906 127.886 70.547 130.962 63.182 135.494 53 136 41.572 135.494 35.179 129.586 28.218 125.134 26 117 22.148 108.705 25.953 97.293 31.456 86.853 30.161 76.574 28.138 66.943 25.629 62.33 22.23 51.971 26.271 42.07 29.046 33.998 37.56 28.448 46.831 21.826 60.832 25.294'
const p6 = 'M62.003 35.342Q68.836 30.328 75.423 27.428 81.764 23.643 91.005 21.578 99.804 19.514 107.914 19.907 117.647 21.087 126 26 132.64 29.886 137.26 40.356 141.439 51.317 139.227 62.918 138.243 72.012 133.475 82.925 129.641 91.527 121.137 102.783 115.73 109.763 108.061 116.645 102.36 122.003 94.298 127.214 86.237 132.67 77.438 135.374 67.459 139.552 56 140 44.798 140.142 36 135 28.38 131.196 24.546 123.478 21.449 118.12 20.171 109.714 19.237 102.292 21.695 90.888 23.219 84.203 28 74 31.182 67.539 37.327 59.428 41.407 53.628 48.092 47.041 52.958 41.634 62.102 35.342'

const keyFrames = Array.from({ length: 7 }, () => '0.5 0.2 0 0.8').join(';')
const keyTimes = '0; 0.14; 0.29; 0.43; 0.57; 0.71; 0.86; 1'
const transforms = '0 80 80; 154 80 80; 309 80 80; 463 80 80; 617 80 80; 771 80 80; 926 80 80; 1080 80 80'
const paths = [p, p1, p2, p3, p4, p5, p6, p].join(';')
const dur = '6s'

const template = /*html*/`
<svg viewBox="0 0 160 160">
  <path>
    <animate attributeName="d" dur="${dur}" repeatCount="indefinite" values="${paths}" calcMode="spline" keySplines="${keyFrames}" keyTimes="${keyTimes}" />
    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="${dur}" repeatCount="indefinite" calcMode="spline" keySplines="${keyFrames}" keyTimes="${keyTimes}" values="${transforms}" />
  </path>
</svg>
`

const state = {
  div: document.createElement('div'),
  dialog: document.createElement('dialog'),
  loading: document.createElement('s-loading') as Loading
}
state.div.attachShadow({ mode: 'open' })
const css = /*css*/`
dialog{
  border: none;
  outline: none;
  background: none;
}
dialog::backdrop{
  filter: opacity(.75);
  background: var(--s-color-scrim, ${scheme.color.scrim});
}
`
state.div.shadowRoot!.innerHTML = `<style>${css}</style>`
state.loading.variant = 'contained'
state.dialog.appendChild(state.loading)
state.div.shadowRoot!.appendChild(state.dialog)

type builderOptions = {
  root?: HTMLElement
}

const showModal = (options: builderOptions = {}) => {
  if (state.div.isConnected) hideModal()
  let root: Element = document.body
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  if (options.root) root = options.root
  root.appendChild(state.div)
  state.dialog.showModal()
}

const hideModal = () => {
  if (!state.div.isConnected) return
  state.dialog.close()
  state.div.remove()
}

export class Loading extends useElement({
  props, style, template
}) {
  static showModal = showModal
  static hideModal = hideModal
}

const name = Loading.define('s-loading')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Loading
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & Loading
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}