type Component = {
  setStyle(style?: string): void
} & typeof HTMLElement

const Page = /*css*/`
:host{
  background: #eee;
  --s-flunt-color-primary: #036ac4;
  --s-flunt-color-on-primary: #ffffff;
}
`

const Ripple =/*css*/`
  :host{
    --s-ripple-disabled: true;
  }
`

const Button = /*css*/`
:host{
  height: 32px;
  gap: 4px;
  padding: 0 10px;
  border-radius: 4px;
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
  s-ripple{
    --s-ripple-disabled: true;
  }
}
:host(:not([variant])){
  background: #036ac4;
  color: #fff;
}
:host([pressed]){
  border-radius: 4px;
}
`

const all: { [key: string]: string } = {
  Page, Button, Ripple
}

/**
 * # example
 * ```js
 * import * as sober from 'sober'
 * import { fluent } from 'sober/design/fluent'
 * 
 * fluent(sober)
 * ```
 */
export const fluent = (components: { [key: string]: Component }) => {
  for (const key in components) {
    const component = components[key]
    if (key in all) {
      component?.setStyle(all[key])
    }
  }
}