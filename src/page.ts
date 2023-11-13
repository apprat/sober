import { defineElement, html } from './core/element'

const style = /*css*/`
:host{
  display: block;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  font-family: Roboto, system-ui;
  height: 100%;
  --s-color-scrim: #000000;

  --s-color-primary: #6750A4;
  --s-color-on-primary: #FFFFFF;
  --s-color-primary-container: #EADDFF;
  --s-color-on-primary-container: #21005D;
  --s-color-inverse-primary: #D0BCFF;
  --s-color-primary-fixed: #EADDFF;
  --s-color-on-primary-fixed: #21005D;
  --s-color-primary-fixed-dim: #D0BCFF;
  --s-color-on-primary-fixed-variant: #4F378B;

  --s-color-secondary: #625B71;
  --s-color-on-secondary: #FFFFFF;
  --s-color-secondary-container: #E8DEF8;
  --s-color-on-secondary-container: #1D192B;
  --s-color-secondary-fixed: #E8DEF8;
  --s-color-on-secondary-fixed: #1D192B;
  --s-color-secondary-fixed-dim: #CCC2DC;
  --s-color-on-secondary-fixed-variant: #4A4458;

  --s-color-tertiary: #7D5260;
  --s-color-on-tertiary: #FFFFFF;
  --s-color-tertiary-container: #FFD8E4;
  --s-color-on-tertiary-container: #31111D;
  --s-color-tertiary-fixed: #FFD8E4;
  --s-color-on-tertiary-fixed: #31111D;
  --s-color-tertiary-fixed-dim: #EFB8C8;
  --s-color-on-tertiary-fixed-variant: #633B48;

  --s-color-surface: #FEF7FF;
  --s-color-on-surface: #1D1B20;
  --s-color-surface-variant: #E7E0EC;
  --s-color-on-surface-variant: #49454F;
  --s-color-inverse-surface: #322F35;
  --s-color-inverse-on-surface: #F5EFF7;
  --s-color-surface-tint: #6750A4;
  --s-color-surface-dim: #DED8E1;
  --s-color-surface-bright: #FEF7FF;
  --s-color-surface-container-lowest: #FFFFFF;
  --s-color-surface-container-low: #F7F2FA;
  --s-color-surface-container: #F3EDF7;
  --s-color-surface-container-high: #ECE6F0;
  --s-color-surface-container-highest: #E6E0E9;

  --s-color-background: #FEF7FF;
  --s-color-on-background: #1D1B20;

  --s-color-outline: #79747E;
  --s-color-outline-variant: #CAC4D0;

  --s-color-error: #B3261E;
  --s-color-on-error: #FFFFFF;
  --s-color-error-container: #F9DEDC;
  --s-color-on-error-container: #410E0B;

  --s-elevation-level1: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  --s-elevation-level2: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  --s-elevation-level3: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level4: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  --s-elevation-level5: 0 8px 10px -6px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
}
:host([theme=dark]){
  --s-color-primary: #D0BCFF;
  --s-color-on-primary: #381E72;
  --s-color-primary-container: #4F378B;
  --s-color-on-primary-container: #EADDFF;
  --s-color-inverse-primary: #6750A4;
  --s-color-primary-fixed: #EADDFF;
  --s-color-on-primary-fixed: #21005D;
  --s-color-primary-fixed-dim: #D0BCFF;
  --s-color-on-primary-fixed-variant: #4F378B;

  --s-color-secondary: #CCC2DC;
  --s-color-on-secondary: #332D41;
  --s-color-secondary-container: #4A4458;
  --s-color-on-secondary-container: #E8DEF8;
  --s-color-secondary-fixed: #E8DEF8;
  --s-color-on-secondary-fixed: #1D192B;
  --s-color-secondary-fixed-dim: #CCC2DC;
  --s-color-on-secondary-fixed-variant: #4A4458;

  --s-color-tertiary: #EFB8C8;
  --s-color-on-tertiary: #492532;
  --s-color-tertiary-container: #633B48;
  --s-color-on-tertiary-container: #FFD8E4;
  --s-color-tertiary-fixed: #FFD8E4;
  --s-color-on-tertiary-fixed: #31111D;
  --s-color-tertiary-fixed-dim: #EFB8C8;
  --s-color-on-tertiary-fixed-variant: #633B48;

  --s-color-surface: #141218;
  --s-color-on-surface: #E6E0E9;
  --s-color-surface-variant: #49454F;
  --s-color-on-surface-variant: #CAC4D0;
  --s-color-inverse-surface: #E6E0E9;
  --s-color-inverse-on-surface: #322F35;
  --s-color-surface-tint: #D0BCFF;
  --s-color-surface-dim: #141218;
  --s-color-surface-bright: #3B383E;
  --s-color-surface-container-lowest: #0F0D13;
  --s-color-surface-container-low: #1D1B20;
  --s-color-surface-container: #211F26;
  --s-color-surface-container-high: #2B2930;
  --s-color-surface-container-highest: #36343B;

  --s-color-background: #141218;
  --s-color-on-background: #E6E0E9;

  --s-color-outline: #938F99;
  --s-color-outline-variant: #49454F;

  --s-color-error: #F2B8B5;
  --s-color-on-error: #601410;
  --s-color-error-container: #8C1D18;
  --s-color-on-error-container: #F9DEDC;
}
`

const name = 's-page'
const props = {
  theme: 'light' as 'light' | 'dark'
}

export default class Component extends defineElement({
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