import { useElement, JSXAttributes } from './core/element.js'

const name = 's-page'
const props = {
  theme: 'light' as 'auto' | 'light' | 'dark'
}

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

  --s-color-primary: #5256a9;
  --s-color-on-primary: #ffffff;
  --s-color-primary-container: #e1e0ff;
  --s-color-on-primary-container: #090764;
  --s-color-secondary: #5d5d72;
  --s-color-on-secondary: #ffffff;
  --s-color-secondary-container: #e2e0f9;
  --s-color-on-secondary-container: #191a2c;
  --s-color-tertiary: #79536a;
  --s-color-on-tertiary: #ffffff;
  --s-color-tertiary-container: #ffd8ed;
  --s-color-on-tertiary-container: #2e1125;
  --s-color-error: #ba1a1a;
  --s-color-on-error: #ffffff;
  --s-color-error-container: #ffdad6;
  --s-color-on-error-container: #410002;
  --s-color-background: #fffbff;
  --s-color-on-background: #1c1b1f;
  --s-color-outline: #777680;
  --s-color-outline-variant: #c7c5d0;
  --s-color-surface: #fffbff;
  --s-color-on-surface:#1c1b1f;
  --s-color-surface-variant: #e4e1ec;
  --s-color-on-surface-variant: #46464f;
  --s-color-inverse-surface: #313034;
  --s-color-inverse-on-surface: #f3eff4;
  --s-color-inverse-primary: #c0c1ff;
  --s-color-surface-container: #f0edf1;
  --s-color-surface-container-high: #eae7ec;
  --s-color-surface-container-highest: #e5e1e6;
  --s-color-surface-container-low: #f6f2f7;
  --s-color-surface-container-lowest: #ffffff;

  --s-color-dark-primary: #c0c1ff;
  --s-color-dark-on-primary: #222578;
  --s-color-dark-primary-container: #3a3d8f;
  --s-color-dark-on-primary-container: #e1e0ff;
  --s-color-dark-secondary: #c5c4dd;
  --s-color-dark-on-secondary: #2e2f42;
  --s-color-dark-secondary-container: #454559;
  --s-color-dark-on-secondary-container: #e2e0f9;
  --s-color-dark-tertiary: #e8b9d4;
  --s-color-dark-on-tertiary: #46263b;
  --s-color-dark-tertiary-container: #5f3c52;
  --s-color-dark-on-tertiary-container: #ffd8ed;
  --s-color-dark-error: #ffb4ab;
  --s-color-dark-on-error: #690005;
  --s-color-dark-error-container: #93000a;
  --s-color-dark-on-error-container: #ffb4ab;
  --s-color-dark-background: #1c1b1f;
  --s-color-dark-on-background: #e5e1e6;
  --s-color-dark-outline: #918f9a;
  --s-color-dark-outline-variant: #46464f;
  --s-color-dark-surface: #1c1b1f;
  --s-color-dark-on-surface:#e5e1e6;
  --s-color-dark-surface-variant: #46464f;
  --s-color-dark-on-surface-variant: #c7c5d0;
  --s-color-dark-inverse-surface: #e5e1e6;
  --s-color-dark-inverse-on-surface: #313034;
  --s-color-dark-inverse-primary: #5256a9;
  --s-color-dark-surface-container: #201f23;
  --s-color-dark-surface-container-high: #2a292d;
  --s-color-dark-surface-container-highest: #353438;
  --s-color-dark-surface-container-low: #1c1b1f;
  --s-color-dark-surface-container-lowest: #0e0e11;

  --s-elevation-level1: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  --s-elevation-level2: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  --s-elevation-level3: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level4: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  --s-elevation-level5: 0 10px 14px -6px rgba(0, 0, 0, .2), 0 22px 35px 3px rgba(0, 0, 0, .14), 0 8px 42px 7px rgba(0, 0, 0, .12);
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

const template = /*html*/`<slot></slot>`

export class Page extends useElement({ style, template, props, syncProps: ['theme'] }) { }

Page.define(name)

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