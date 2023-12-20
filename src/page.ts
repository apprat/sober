import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: flow-root;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  font-family: Roboto, system-ui;
  height: 100%;
  --s-color-scrim: #000000;
  --s-color-primary: #6750a4;
  --s-color-on-primary: #ffffff;
  --s-color-primary-container: #eaddff;
  --s-color-on-primary-container: #21005d;

  --s-color-secondary: #625b71;
  --s-color-on-secondary: #ffffff;
  --s-color-secondary-container: #e8def8;
  --s-color-on-secondary-container: #1d192b;

  --s-color-tertiary: #7d5260;
  --s-color-on-tertiary: #ffffff;
  --s-color-tertiary-container: #ffd8e4;
  --s-color-on-tertiary-container: #31111d;

  --s-color-error: #b3261e;
  --s-color-on-error: #ffffff;
  --s-color-error-container: #f9dedc;
  --s-color-on-error-container: #410e0b;

  --s-color-background: #fffbfe;
  --s-color-on-background: #1c1b1f;

  --s-color-outline: #79747e;
  --s-color-outline-variant: #cac4d0;

  --s-color-surface: #fef7ff;
  --s-color-on-surface: #1d1b20;
  --s-color-surface-variant: #e7e0ec;
  --s-color-on-surface-variant: #49454f;

  --s-color-inverse-surface: #322f35;
  --s-color-inverse-on-surface: #f5eff7;
  --s-color-inverse-primary: #d0bcff;

  --s-color-surface-container: #f3edf7;
  --s-color-surface-container-high: #ece6f0;
  --s-color-surface-container-highest: #e6e0e9;
  --s-color-surface-container-low: #f7f2fa;

  --s-elevation-level1: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  --s-elevation-level2: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  --s-elevation-level3: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level4: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level5: 0 8px 10px -6px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
}
:host([theme=dark]){
  --s-color-primary: #d0bcff;
  --s-color-on-primary: #381e72;
  --s-color-primary-container: #eaddff;
  --s-color-on-primary-container: #21005d;

  --s-color-secondary: #ccc2dc;
  --s-color-on-secondary: #332d41;
  --s-color-secondary-container: #4a4458;
  --s-color-on-secondary-container: #e8def8;

  --s-color-tertiary: #efb8c8;
  --s-color-on-tertiary: #492532;
  --s-color-tertiary-container: #633b48;
  --s-color-on-tertiary-container: #ffd8e4;

  --s-color-error: #f2b8b5;
  --s-color-on-error: #601410;
  --s-color-error-container: #8c1d18;
  --s-color-on-error-container: #f9dedc;

  --s-color-background: #1c1b1f;
  --s-color-on-background: #e6e1e5;

  --s-color-outline: #938f99;
  --s-color-outline-variant: ;

  --s-color-surface: #1c1b1f;
  --s-color-on-surface: #e6e1e5;
  --s-color-surface-variant: #49454f;
  --s-color-on-surface-variant: #cac4d0;

  --s-color-inverse-surface: #e6e0e9;
  --s-color-inverse-on-surface: #322f35;
  --s-color-inverse-primary: #6750a4;

  --s-color-surface-container: #211f26;
  --s-color-surface-container-high: #36343b;
  --s-color-surface-container-highest: #36343b;
  --s-color-surface-container-low: #1d1b20;
}
`

const name = 's-page'
const props = {
  theme: 'auto' as 'auto' | 'light' | 'dark'
}

export default class Component extends builder({
  name, props, propSyncs: ['theme'],
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot></slot>
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