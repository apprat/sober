import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './core/enum.js'

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
  --s-color-scrim: ${Theme.colorScrim};

  --s-color-primary: ${Theme.colorPrimary};
  --s-color-on-primary: ${Theme.colorOnPrimary};
  --s-color-primary-container: ${Theme.colorPrimaryContainer};
  --s-color-on-primary-container: ${Theme.colorOnPrimaryContainer};
  --s-color-secondary: ${Theme.colorSecondary};
  --s-color-on-secondary: ${Theme.colorOnSecondary};
  --s-color-secondary-container: ${Theme.colorSecondaryContainer};
  --s-color-on-secondary-container: ${Theme.colorOnSecondaryContainer};
  --s-color-tertiary: ${Theme.colorTertiary};
  --s-color-on-tertiary: ${Theme.colorOnTertiary};
  --s-color-tertiary-container: ${Theme.colorTertiaryContainer};
  --s-color-on-tertiary-container: ${Theme.colorOnTertiaryContainer};
  --s-color-error: ${Theme.colorError};
  --s-color-on-error: ${Theme.colorOnError};
  --s-color-error-container: ${Theme.colorErrorContainer};
  --s-color-on-error-container: ${Theme.colorOnErrorContainer};
  --s-color-background: ${Theme.colorBackground};
  --s-color-on-background: ${Theme.colorOnBackground};
  --s-color-outline: ${Theme.colorOutline};
  --s-color-outline-variant: ${Theme.colorOutlineVariant};
  --s-color-surface: ${Theme.colorSurface};
  --s-color-on-surface: ${Theme.colorOnSurface};
  --s-color-surface-variant: ${Theme.colorSurfaceVariant};
  --s-color-on-surface-variant: ${Theme.colorOnSurfaceVariant};
  --s-color-inverse-surface: ${Theme.colorInverseSurface};
  --s-color-inverse-on-surface: ${Theme.colorInverseOnSurface};
  --s-color-inverse-primary: ${Theme.colorInversePrimary};
  --s-color-surface-container: ${Theme.colorSurfaceContainer};
  --s-color-surface-container-high: ${Theme.colorSurfaceContainerHigh};
  --s-color-surface-container-highest: ${Theme.colorSurfaceContainerHighest};
  --s-color-surface-container-low: ${Theme.colorSurfaceContainerLow};
  --s-color-surface-container-lowest: ${Theme.colorSurfaceContainerLowest};

  --s-color-dark-primary: ${Theme.colorDarkPrimary};
  --s-color-dark-on-primary: ${Theme.colorDarkOnPrimary};
  --s-color-dark-primary-container: ${Theme.colorDarkPrimaryContainer};
  --s-color-dark-on-primary-container: ${Theme.colorDarkOnPrimaryContainer};
  --s-color-dark-secondary: ${Theme.colorDarkSecondary};
  --s-color-dark-on-secondary: ${Theme.colorDarkOnSecondary};
  --s-color-dark-secondary-container: ${Theme.colorDarkSecondaryContainer};
  --s-color-dark-on-secondary-container: ${Theme.colorDarkOnSecondaryContainer};
  --s-color-dark-tertiary: ${Theme.colorDarkTertiary};
  --s-color-dark-on-tertiary: ${Theme.colorDarkOnTertiary};
  --s-color-dark-tertiary-container: ${Theme.colorDarkTertiaryContainer};
  --s-color-dark-on-tertiary-container: ${Theme.colorDarkOnTertiaryContainer};
  --s-color-dark-error: ${Theme.colorDarkError};
  --s-color-dark-on-error: ${Theme.colorDarkOnError};
  --s-color-dark-error-container: ${Theme.colorDarkErrorContainer};
  --s-color-dark-on-error-container: ${Theme.colorDarkOnErrorContainer};
  --s-color-dark-background: ${Theme.colorDarkBackground};
  --s-color-dark-on-background: ${Theme.colorDarkOnBackground};
  --s-color-dark-outline: ${Theme.colorDarkOutline};
  --s-color-dark-outline-variant: ${Theme.colorDarkOutlineVariant};
  --s-color-dark-surface: ${Theme.colorDarkSurface};
  --s-color-dark-on-surface: ${Theme.colorDarkOnSurface};
  --s-color-dark-surface-variant: ${Theme.colorDarkSurfaceVariant};
  --s-color-dark-on-surface-variant: ${Theme.colorDarkOnSurfaceVariant};
  --s-color-dark-inverse-surface: ${Theme.colorDarkInverseSurface};
  --s-color-dark-inverse-on-surface: ${Theme.colorDarkInverseOnSurface};
  --s-color-dark-inverse-primary: ${Theme.colorDarkInversePrimary};
  --s-color-dark-surface-container: ${Theme.colorDarkSurfaceContainer};
  --s-color-dark-surface-container-high: ${Theme.colorDarkSurfaceContainerHigh};
  --s-color-dark-surface-container-highest: ${Theme.colorDarkSurfaceContainerHighest};
  --s-color-dark-surface-container-low: ${Theme.colorDarkSurfaceContainerLow};
  --s-color-dark-surface-container-lowest: ${Theme.colorDarkSurfaceContainerLowest};

  --s-elevation-level1: ${Theme.elevationLevel1};
  --s-elevation-level2: ${Theme.elevationLevel2};
  --s-elevation-level3: ${Theme.elevationLevel3};
  --s-elevation-level4: ${Theme.elevationLevel4};
  --s-elevation-level5: ${Theme.elevationLevel5};
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