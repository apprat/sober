import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-skeleton'
const props = {
}

const style = /*css*/`
:host{
  display: block;
  height: 16px;
  animation: skeleton 1.4s ease infinite;
  background: linear-gradient(90deg, var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) 25%, var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) 37%, var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) 63%);
  background-size: 400% 100%;
  border-radius: 8px;
}
@keyframes skeleton{
  0%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0 50%;
  }
}
`

const template = /*html*/`
`

export class Skeleton extends useElement({ style, template, props }) { }

Skeleton.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Skeleton
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}