import { useElement } from './core/element.js'

export const enum Theme {
  colorScrim = '#000000',
  colorPrimary = '#00687b',
  colorOnPrimary = '#ffffff',
  colorPrimaryContainer = '#aeecff',
  colorOnPrimaryContainer = '#001f26',
  colorSecondary = '#4b6269',
  colorOnSecondary = '#ffffff',
  colorSecondaryContainer = '#cee7ef',
  colorOnSecondaryContainer = '#061f25',
  colorTertiary = '#575c7e',
  colorOnTertiary = '#ffffff',
  colorTertiaryContainer = '#dee1ff',
  colorOnTertiaryContainer = '#141937',
  colorError = '#ba1a1a',
  colorOnError = '#ffffff',
  colorErrorContainer = '#ffdad6',
  colorOnErrorContainer = '#410002',
  colorBackground = '#fbfcfe',
  colorOnBackground = '#191c1d',
  colorOutline = '#70797c',
  colorOutlineVariant = '#bfc8cb',
  colorSurface = '#fbfcfe',
  colorOnSurface = '#191c1d',
  colorSurfaceVariant = '#dbe4e7',
  colorOnSurfaceVariant = '#3f484b',
  colorInverseSurface = '#2e3132',
  colorInverseOnSurface = '#eff1f2',
  colorInversePrimary = '#56d6f5',
  colorSurfaceContainer = '#eceeef',
  colorSurfaceContainerLowest = '#e1e3e4',
  colorSurfaceContainerLow = '#e6e8e9',
  colorSurfaceContainerHigh = '#f2f4f5',
  colorSurfaceContainerHighest = '#ffffff',
  colorDarkPrimary = '#56d6f5',
  colorDarkOnPrimary = '#003641',
  colorDarkPrimaryContainer = '#004e5d',
  colorDarkOnPrimaryContainer = '#aeecff',
  colorDarkSecondary = '#b2cbd3',
  colorDarkOnSecondary = '#1d343a',
  colorDarkSecondaryContainer = '#344a51',
  colorDarkOnSecondaryContainer = '#cee7ef',
  colorDarkTertiary = '#bfc4eb',
  colorDarkOnTertiary = '#292e4d',
  colorDarkTertiaryContainer = '#3f4565',
  colorDarkOnTertiaryContainer = '#dee1ff',
  colorDarkError = '#ffb4ab',
  colorDarkOnError = '#690005',
  colorDarkErrorContainer = '#93000a',
  colorDarkOnErrorContainer = '#ffb4ab',
  colorDarkBackground = '#191c1d',
  colorDarkOnBackground = '#e1e3e4',
  colorDarkOutline = '#899295',
  colorDarkOutlineVariant = '#3f484b',
  colorDarkSurface = '#191c1d',
  colorDarkOnSurface = '#e1e3e4',
  colorDarkSurfaceVariant = '#3f484b',
  colorDarkOnSurfaceVariant = '#bfc8cb',
  colorDarkInverseSurface = '#e1e3e4',
  colorDarkInverseOnSurface = '#2e3132',
  colorDarkInversePrimary = '#00687b',
  colorDarkSurfaceContainer = '#1d2021',
  colorDarkSurfaceContainerLowest = '#0b0f10',
  colorDarkSurfaceContainerLow = '#191c1d',
  colorDarkSurfaceContainerHigh = '#272a2c',
  colorDarkSurfaceContainerHighest = '#323536',
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
:host([dark]){
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
}
`

const template = /*html*/`<slot></slot>`

export class Page extends useElement({
  style, template, props,
  setup() {
    const darker = matchMedia('(prefers-color-scheme: dark)')
    const isDark = () => {
      if (this.theme === 'auto') return darker.matches
      if (this.theme === 'dark') return true
      return false
    }
    const toggle = (theme: typeof props['theme'], trigger?: HTMLElement) => {
      return new Promise<Animation | void>((resolve) => {
        if (this.theme === theme) return
        const isDark = darker.matches
        const getTheme = (theme: typeof props['theme']) => theme === 'auto' ? (isDark ? 'dark' : 'light') : theme
        const oldTheme = getTheme(this.theme)
        const newTheme = getTheme(theme)
        if (oldTheme === newTheme || !document.startViewTransition) {
          this.theme = theme
          return resolve()
        }
        const info = { x: innerWidth / 2, y: innerHeight / 2 }
        if (trigger && trigger.isConnected) {
          const rect = trigger.getBoundingClientRect()
          info.x = rect.x + rect.width / 2
          info.y = rect.y + rect.height / 2
        }
        document.styleSheets[0].insertRule(/*css*/`::view-transition-old(root),::view-transition-new(root) { animation: none;mix-blend-mode: normal}`, 0)
        const transition = document.startViewTransition(() => this.theme = theme)
        transition.ready.then(async () => {
          const animation = document.documentElement.animate(
            { clipPath: [`circle(0px at ${info.x}px ${info.y}px)`, `circle(${Math.hypot(Math.max(info.x, innerWidth - info.x), Math.max(info.y, innerHeight - info.y))}px at ${info.x}px ${info.y}px)`] },
            { duration: 600, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' }
          )
          resolve(animation)
          await transition.finished
          document.styleSheets[0].deleteRule(0)
        })
      })
    }
    return {
      expose: {
        toggle,
        get isDark() {
          return isDark()
        },
      },
      props: {
        theme: (value) => {
          if (value === 'light') return this.removeAttribute('dark')
          if (value === 'dark') return this.setAttribute('dark', '')
          const change = () => {
            darker.matches ? this.setAttribute('dark', '') : this.removeAttribute('dark')
            this.dispatchEvent(new Event('change'))
          }
          darker.onchange = change
          change()
        }
      }
    }
  }
}) { }

Page.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Page
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}