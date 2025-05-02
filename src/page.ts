import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'

type Props = {
  theme: 'auto' | 'light' | 'dark'
}

const name = 's-page'
const props: Props = {
  theme: 'light'
}

const style = /*css*/`
:host{
  display: flow-root;
  height: 100%;
  font-family: Roboto, system-ui;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
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
  --s-color-success: ${Theme.colorSuccess};
  --s-color-on-success: ${Theme.colorOnSuccess};
  --s-color-success-container: ${Theme.colorSuccessContainer};
  --s-color-on-success-container: ${Theme.colorOnSuccessContainer};
  --s-color-warning: ${Theme.colorWarning};
  --s-color-on-warning: ${Theme.colorOnWarning};
  --s-color-warning-container: ${Theme.colorWarningContainer};
  --s-color-on-warning-container: ${Theme.colorOnWarningContainer};
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
  --s-color-dark-success: ${Theme.colorDarkSuccess};
  --s-color-dark-on-success: ${Theme.colorDarkOnSuccess};
  --s-color-dark-success-container: ${Theme.colorDarkSuccessContainer};
  --s-color-dark-on-success-container: ${Theme.colorDarkOnSuccessContainer};
  --s-color-dark-warning: ${Theme.colorDarkWarning};
  --s-color-dark-on-warning: ${Theme.colorDarkOnWarning};
  --s-color-dark-warning-container: ${Theme.colorDarkWarningContainer};
  --s-color-dark-on-warning-container: ${Theme.colorDarkOnWarningContainer};
  --s-elevation-level1: ${Theme.elevationLevel1};
  --s-elevation-level2: ${Theme.elevationLevel2};
  --s-elevation-level3: ${Theme.elevationLevel3};
  --s-elevation-level4: ${Theme.elevationLevel4};
  --s-elevation-level5: ${Theme.elevationLevel5};
  --s-motion-duration-Short1: ${Theme.motionDurationShort1};
  --s-motion-duration-short2: ${Theme.motionDurationShort2};
  --s-motion-duration-short3: ${Theme.motionDurationShort3};
  --s-motion-duration-short4: ${Theme.motionDurationShort4};
  --s-motion-duration-medium1: ${Theme.motionDurationMedium1};
  --s-motion-duration-medium2: ${Theme.motionDurationMedium2};
  --s-motion-duration-medium3: ${Theme.motionDurationMedium3};
  --s-motion-duration-medium4: ${Theme.motionDurationMedium4};
  --s-motion-duration-long1: ${Theme.motionDurationLong1};
  --s-motion-duration-long2: ${Theme.motionDurationLong2};
  --s-motion-duration-long3: ${Theme.motionDurationLong3};
  --s-motion-duration-long4: ${Theme.motionDurationLong4};
  --s-motion-duration-extra-long1: ${Theme.motionDurationExtraLong1};
  --s-motion-duration-extra-long2: ${Theme.motionDurationExtraLong2};
  --s-motion-duration-extra-long3: ${Theme.motionDurationExtraLong3};
  --s-motion-duration-extra-long4: ${Theme.motionDurationExtraLong4};
  --s-motion-easing-emphasized: ${Theme.motionEasingEmphasized};
  --s-motion-easing-emphasized-decelerate: ${Theme.motionEasingEmphasizedDecelerate};
  --s-motion-easing-emphasized-accelerate: ${Theme.motionEasingEmphasizedAccelerate};
  --s-motion-easing-standard: ${Theme.motionEasingStandard};
  --s-motion-easing-standard-decelerate: ${Theme.motionEasingStandardDecelerate};
  --s-motion-easing-standard-accelerate: ${Theme.motionEasingStandardAccelerate};
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
  --s-color-success: var(--s-color-dark-success) !important;
  --s-color-on-success: var(--s-color-dark-on-success) !important;
  --s-color-success-container: var(--s-color-dark-success-container) !important;
  --s-color-on-success-container: var(--s-color-dark-on-success-container) !important;
  --s-color-warning: var(--s-color-dark-warning) !important;
  --s-color-on-warning: var(--s-color-dark-on-warning) !important;
  --s-color-warning-container: var(--s-color-dark-warning-container) !important;
  --s-color-on-warning-container: var(--s-color-dark-on-warning-container) !important;
}
`

const template = /*html*/`<slot></slot>`

const viewTransitionStyle = document.createElement('style')
viewTransitionStyle.textContent = `::view-transition-old(root),::view-transition-new(root) { animation: none; mix-blend-mode: normal}`

class Page extends useElement({
  style, template, props,
  setup() {
    const computedStyle = getComputedStyle(this)
    const darker = matchMedia('(prefers-color-scheme: dark)')
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard-accelerate') || Theme.motionEasingStandardAccelerate
      const duration = computedStyle.getPropertyValue('--s-motion-duration-long4') || Theme.motionDurationLong4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
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
        const width = innerWidth
        const height = innerHeight
        const keyframes = { clipPath: [`circle(0px at 50% ${height / 2}px)`, `circle(${Math.sqrt(width ** 2 + height ** 2) / 2}px at 50% ${height / 2}px)`] }
        if (trigger && trigger.isConnected) {
          const { left, top } = trigger.getBoundingClientRect()
          const x = left + trigger.offsetWidth / 2
          const y = top + trigger.offsetHeight / 2
          const twoW = Math.max(width - x, x)
          const twoH = Math.max(height - y, y)
          const size = Math.sqrt(twoW ** 2 + twoH ** 2)
          keyframes.clipPath[0] = `circle(0px at ${x}px ${y}px)`
          keyframes.clipPath[1] = `circle(${size}px at ${x}px ${y}px)`
        }
        const transition = document.startViewTransition(() => {
          this.theme = theme
          document.head.appendChild(viewTransitionStyle)
        })
        transition.ready.then(async () => {
          const animation = document.documentElement.animate(keyframes, { ...getAnimateOptions(), pseudoElement: '::view-transition-new(root)' })
          resolve(animation)
          await transition.finished
          viewTransitionStyle.remove()
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
}) { }

Page.define(name)

export { Page }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Page
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props>
    } & Page
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}