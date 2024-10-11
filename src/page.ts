import { useElement, JSXAttributes } from './core/element.js'

export const enum Theme {
  colorScrim = '#000000',
  colorPrimary = '#5256a9',
  colorOnPrimary = '#ffffff',
  colorPrimaryContainer = '#e1e0ff',
  colorOnPrimaryContainer = '#090764',
  colorSecondary = '#5d5d72',
  colorOnSecondary = '#ffffff',
  colorSecondaryContainer = '#e2e0f9',
  colorOnSecondaryContainer = '#191a2c',
  colorTertiary = '#79536a',
  colorOnTertiary = '#ffffff',
  colorTertiaryContainer = '#ffd8ed',
  colorOnTertiaryContainer = '#2e1125',
  colorError = '#ba1a1a',
  colorOnError = '#ffffff',
  colorErrorContainer = '#ffdad6',
  colorOnErrorContainer = '#410002',
  colorBackground = '#fffbff',
  colorOnBackground = '#1c1b1f',
  colorOutline = '#777680',
  colorOutlineVariant = '#c7c5d0',
  colorSurface = '#fffbff',
  colorOnSurface = '#1c1b1f',
  colorSurfaceVariant = '#e4e1ec',
  colorOnSurfaceVariant = '#46464f',
  colorInverseSurface = '#313034',
  colorInverseOnSurface = '#f3eff4',
  colorInversePrimary = '#c0c1ff',
  colorSurfaceContainer = '#f0edf1',
  colorSurfaceContainerHigh = '#eae7ec',
  colorSurfaceContainerHighest = '#e5e1e6',
  colorSurfaceContainerLow = '#f6f2f7',
  colorSurfaceContainerLowest = '#ffffff',

  colorDarkPrimary = '#c0c1ff',
  colorDarkOnPrimary = '#222578',
  colorDarkPrimaryContainer = '#3a3d8f',
  colorDarkOnPrimaryContainer = '#e1e0ff',
  colorDarkSecondary = '#c5c4dd',
  colorDarkOnSecondary = '#2e2f42',
  colorDarkSecondaryContainer = '#454559',
  colorDarkOnSecondaryContainer = '#e2e0f9',
  colorDarkTertiary = '#e8b9d4',
  colorDarkOnTertiary = '#46263b',
  colorDarkTertiaryContainer = '#5f3c52',
  colorDarkOnTertiaryContainer = '#ffd8ed',
  colorDarkError = '#ffb4ab',
  colorDarkOnError = '#690005',
  colorDarkErrorContainer = '#93000a',
  colorDarkOnErrorContainer = '#ffb4ab',
  colorDarkBackground = '#1c1b1f',
  colorDarkOnBackground = '#e5e1e6',
  colorDarkOutline = '#918f9a',
  colorDarkOutlineVariant = '#46464f',
  colorDarkSurface = '#1c1b1f',
  colorDarkOnSurface = '#e5e1e6',
  colorDarkSurfaceVariant = '#46464f',
  colorDarkOnSurfaceVariant = '#c7c5d0',
  colorDarkInverseSurface = '#e5e1e6',
  colorDarkInverseOnSurface = '#313034',
  colorDarkInversePrimary = '#5256a9',
  colorDarkSurfaceContainer = '#201f23',
  colorDarkSurfaceContainerHigh = '#2a292d',
  colorDarkSurfaceContainerHighest = '#353438',
  colorDarkSurfaceContainerLow = '#1c1b1f',
  colorDarkSurfaceContainerLowest = '#0e0e11',

  elevationLevel1 = '0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)',
  elevationLevel2 = '0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)',
  elevationLevel3 = '0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)',
  elevationLevel4 = '0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12)',
  elevationLevel5 = '0 10px 14px -6px rgba(0, 0, 0, .2), 0 22px 35px 3px rgba(0, 0, 0, .14), 0 8px 42px 7px rgba(0, 0, 0, .12)',
}

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

const styleElement = document.createElement('style')
styleElement.textContent = /*css*/`
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}`

export class Page extends useElement({
  style, template, props, syncProps: ['theme'],
  setup() {
    const toggle = (theme: typeof props['theme'], trigger?: HTMLElement) => {
      if (theme === this.theme) return
      //@ts-ignore
      if (!document.startViewTransition) {
        this.theme = theme
        return
      }
      const info = { x: innerWidth / 2, y: 0 }
      if (trigger) {
        const rect = trigger.getBoundingClientRect()
        info.x = rect.x + rect.width / 2
        info.y = rect.y + rect.height / 2
      }
      document.head.appendChild(styleElement)
      //@ts-ignore
      const transition = document.startViewTransition(() => this.theme = theme)
      const radius = Math.hypot(Math.max(info.x, innerWidth - info.x), Math.max(info.y, innerHeight - info.y))
      transition.ready.then(() => document.documentElement.animate(
        { clipPath: [`circle(0px at ${info.x}px ${info.y}px)`, `circle(${radius}px at ${info.x}px ${info.y}px)`] },
        { duration: 400, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' }
      ))
      transition.finished.then(() => document.head.removeChild(styleElement))
    }
    return {
      expose: { toggle }
    }
  }
}) { }

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