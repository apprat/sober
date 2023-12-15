import { builder, html } from './core/element.js'

const style = /*css*/`
:host{
  display: flow-root;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  font-family: Roboto, system-ui;
  height: 100%;
  --s-color-scrim: #000000;
  --s-color-primary: #006783;
  --s-color-on-primary: #ffffff;
  --s-color-primary-container: #bce9ff;
  --s-color-on-primary-container: #001f29;
  --s-color-inverse-primary: #61d4ff;

  --s-color-secondary: #4c616b
  --s-color-on-secondary: #ffffff;
  --s-color-secondary-container: #cfe6f2;
  --s-color-on-secondary-container: #081e27;

  --s-color-tertiary: #5c5b7d;
  --s-color-on-tertiary: #ffffff;
  --s-color-tertiary-container: #e2dfff;
  --s-color-on-tertiary-container: #191836;

  --s-color-error: #ba1a1a;
  --s-color-on-error: #ffffff;
  --s-color-error-container: #ffdad6;
  --s-color-on-error-container: #410002;

  --s-color-background: #f8f9fb;
  --s-color-on-background: #191c1e;

  --s-color-outline: #70787d;
  --s-color-outline-variant: #c0c8cc;

  --s-color-surface: #fbfcfe;
  --s-color-on-surface: #191c1e;
  --s-color-surface-variant: #dce4e9;
  --s-color-on-surface-variant: #40484c;
  --s-color-inverse-surface: #2e3132;
  --s-color-inverse-on-surface: #eff1f3;

  --s-color-surface-container: #eff1f3;
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
  --s-color-scrim: #000000;
  --s-color-primary: #61d4ff;
  --s-color-on-primary: #003545;
  --s-color-primary-container: #004d63;
  --s-color-on-primary-container: #bce9ff;
  --s-color-inverse-primary: #006783;

  --s-color-secondary: #b4cad5;
  --s-color-on-secondary: #1e333c;
  --s-color-secondary-container: #354a53;
  --s-color-on-secondary-container: #cfe6f2;

  --s-color-tertiary: #c5c3ea;
  --s-color-on-tertiary: #2e2d4d;
  --s-color-tertiary-container: #444364;
  --s-color-on-tertiary-container: #e2dfff;

  --s-color-error: #ffb4ab;
  --s-color-on-error: #690005;
  --s-color-error-container: #93000a;
  --s-color-on-error-container: #ffdad6;
  
  --s-color-background: #191c1e;
  --s-color-on-background: #e1e2e4;

  --s-color-outline: #8a9296;
  --s-color-outline-variant: #40484c;

  --s-color-surface: #191c1e;
  --s-color-on-surface: #e1e2e4;
  --s-color-surface-variant: #40484c;
  --s-color-on-surface-variant: #c0c8cc;
  --s-color-inverse-surface: #e1e2e4;
  --s-color-inverse-on-surface: #191c1e;

  --s-color-surface-container: #191c1e;
  --s-color-surface-container-high: #2b2930;
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