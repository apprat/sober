import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: flex;
  height: 64px;
  background: var(--s-color-surface-container,#eff1f3);
  color: var(--s-color-on-surface,#191c1e);
  align-items: center;
  padding: 0 8px;
  transition: box-shadow .2,background .2s;
}
:host([elevated=true]){
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
.container{
  display: contents;
}
slot[name=navigation]{
  order: 0;
  display: block;
  flex-shrink: 0;
}
::slotted([slot=navigation]){
  margin: 0 4px;
}
slot[name=action]{
  order: 2;
  display: block;
  flex-shrink: 0;
}
::slotted([slot=action]){
  margin: 0 4px;
}
.headline{
  order: 1;
  flex-grow: 1;
  overflow: hidden;
}
::slotted([slot=headline]){
  font-size: 1.375rem;
  font-weight: 400;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin: 0 8px;
}
:host([size=small]){
  height: 56px;
  padding: 0 4px;
}
:host([size=small]) ::slotted([slot=headline]){
  text-align: left;
}
:host([size=medium]),
:host([size=large]){
  height: 112px;
  display: flex;
  flex-direction: column;
}
:host([size=medium]) .container,
:host([size=large]) .container{
  display: flex;
  padding: 12px 0;
  width: 100%;
}
:host([size=medium]) .grow,
:host([size=large]) .grow{
  flex-grow: 1;
}
:host([size=medium]) .headline,
:host([size=large]) .headline{
  width: 100%;
  display: flex;
  align-items: end;
  padding-bottom: 24px;
}
:host([size=medium]) ::slotted([slot=headline]),
:host([size=large]) ::slotted([slot=headline]){
  text-align: left;
}
:host([size=large]){
  height: 152px;
}
`

const name = 's-top-app-bar'
const props = {
  size: 'center-aligned' as 'center-aligned' | 'small' | 'medium' | 'large',
  elevated: false
}

export default class Component extends builder({
  name, props, propSyncs: ['size', 'elevated'],
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <div class="container">
          <slot name="navigation"></slot>
          <div class="grow"></div>
          <slot name="action"></slot>
        </div>
        <div class="headline">
          <slot name="headline"></slot>
        </div>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}