import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  user-select: none;
  display: flex;
  height: 64px;
  background: var(--s-color-surface);
  align-items: center;
  color: var(--s-color-on-surface);
  padding: 0 8px;
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
}

export default class Component extends defineElement({
  name, props, propSyncs: ['size'],
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