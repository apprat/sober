import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const dark = `
  --s-color-primary: var(--s-color-dark-primary) !important;
  --s-color-on-primary: var(--s-color-dark-on-primary) !important;
  --s-color-primary-container: var(--s-color-dark-primary-container) !important;
  --s-color-on-primary-container: var(--s-color-dark-on-primary-container) !important;
  --s-color-secondary: var(--s-color-dark-secondary) !important;
  --s-color-on-secondary: var(--s-color-dark-on-secondary) !important;
  --s-color-secondary-container: var(--s-color-dark-secondary-container) !important;
  --s-color-on-secondary-container: var(--s-color-dark-on-secondary-container) !important;
  --s-color-tertiary: var(--s-color-dark-tertiary) !important;
  --s-color-on-tertiary: var(--s-color-dark-on-tertiary) !important;
  --s-color-tertiary-container: var(--s-color-dark-tertiary-container) !important;
  --s-color-on-tertiary-container: var(--s-color-dark-on-tertiary-container) !important;
  --s-color-error: var(--s-color-dark-error) !important;
  --s-color-on-error: var(--s-color-dark-on-error) !important;
  --s-color-error-container: var(--s-color-dark-error-container) !important;
  --s-color-on-error-container: var(--s-color-dark-on-error-container) !important;
  --s-color-background: var(--s-color-dark-background) !important;
  --s-color-on-background: var(--s-color-dark-on-background) !important;
  --s-color-outline: var(--s-color-dark-outline) !important;
  --s-color-outline-variant: var(--s-color-dark-outline-variant) !important;
  --s-color-surface: var(--s-color-dark-surface) !important;
  --s-color-on-surface: var(--s-color-dark-on-surface) !important;
  --s-color-surface-variant: var(--s-color-dark-surface-variant) !important;
  --s-color-on-surface-variant: var(--s-color-dark-on-surface-variant) !important;
  --s-color-inverse-surface: var(--s-color-dark-inverse-surface) !important;
  --s-color-inverse-on-surface: var(--s-color-dark-inverse-on-surface) !important;
  --s-color-inverse-primary: var(--s-color-dark-inverse-primary) !important;
  --s-color-surface-container: var(--s-color-dark-surface-container) !important;
  --s-color-surface-container-high: var(--s-color-dark-surface-container-high) !important;
  --s-color-surface-container-highest: var(--s-color-dark-surface-container-highest) !important;
  --s-color-surface-container-low: var(--s-color-dark-surface-container-low) !important;
  --s-color-surface-container-lowest: var(--s-color-dark-surface-container-lowest) !important;
`

const style = /*css*/`
:host{
  display: flow-root;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  font-family: Roboto, system-ui;
  height: 100%;
  --s-color-scrim: #000000;
  --s-color-primary: #006495;
  --s-color-on-primary: #ffffff;
  --s-color-primary-container: #cbe6ff;
  --s-color-on-primary-container: #001e30;
  --s-color-secondary: #50606f;
  --s-color-on-secondary: #ffffff;
  --s-color-secondary-container: #d4e4f6;
  --s-color-on-secondary-container: #0d1d29;
  --s-color-tertiary: #66587b;
  --s-color-on-tertiary: #ffffff;
  --s-color-tertiary-container: #ecdcff;
  --s-color-on-tertiary-container: #211634;
  --s-color-error: #ba1a1a;
  --s-color-on-error: #ffffff;
  --s-color-error-container: #ffdad6;
  --s-color-on-error-container: #410002;
  --s-color-background: #fcfcff;
  --s-color-on-background: #1a1c1e;
  --s-color-outline: #72787e;
  --s-color-outline-variant: #c1c7ce;
  --s-color-surface: #fcfcff;
  --s-color-on-surface: #1a1c1e;
  --s-color-surface-variant: #dee3ea;
  --s-color-on-surface-variant: #41474d;
  --s-color-inverse-surface: #2f3133;
  --s-color-inverse-on-surface: #f0f0f3;
  --s-color-inverse-primary: #8fcdff;
  --s-color-surface-container: #edeef1;
  --s-color-surface-container-high: #e8e8eb;
  --s-color-surface-container-highest: #e2e2e5;
  --s-color-surface-container-low: #f3f3f6;
  --s-color-surface-container-lowest: #ffffff;

  --s-elevation-level1: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  --s-elevation-level2: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  --s-elevation-level3: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level4: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level5: 0 8px 10px -6px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  
  --s-color-dark-primary: #8fcdff;
  --s-color-dark-on-primary: #003450;
  --s-color-dark-primary-container: #004b71;
  --s-color-dark-on-primary-container: #cbe6ff;
  --s-color-dark-secondary: #b8c8d9;
  --s-color-dark-on-secondary: #22323f;
  --s-color-dark-secondary-container: #394856;
  --s-color-dark-on-secondary-container: #d4e4f6;
  --s-color-dark-tertiary: #d0bfe7;
  --s-color-dark-on-tertiary: #362b4a;
  --s-color-dark-tertiary-container: #4d4162;
  --s-color-dark-on-tertiary-container: #ecdcff;
  --s-color-dark-error: #ffb4ab;
  --s-color-dark-on-error: #690005;
  --s-color-dark-error-container: #93000a;
  --s-color-dark-on-error-container: #ffb4ab;
  --s-color-dark-background: #1a1c1e;
  --s-color-dark-on-background: #e2e2e5;
  --s-color-dark-outline: #8b9198;
  --s-color-dark-outline-variant: #41474d;
  --s-color-dark-surface: #1a1c1e;
  --s-color-dark-on-surface: #e2e2e5;
  --s-color-dark-surface-variant: #41474d;
  --s-color-dark-on-surface-variant: #c1c7ce;
  --s-color-dark-inverse-surface: #e2e2e5;
  --s-color-dark-inverse-on-surface: #2f3133;
  --s-color-dark-inverse-primary: #006495;
  --s-color-dark-surface-container: #1e2022;
  --s-color-dark-surface-container-high: #282a2d;
  --s-color-dark-surface-container-highest: #333537;
  --s-color-dark-surface-container-low: #1a1c1e;
  --s-color-dark-surface-container-lowest: #0c0e11;
}
:host([theme=dark]){
  ${dark}
}
@media (prefers-color-scheme: dark){
  :host([theme=auto]){
    ${dark}
  }
}
`

const name = 's-page'
const props = {
  theme: 'light' as 'auto' | 'light' | 'dark'
}

export class Page extends builder({
  name, style, props, propSyncs: ['theme'],
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

Page.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Page
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}