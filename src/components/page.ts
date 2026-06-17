import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { MediaQueryer } from '../core/utils/mediaQueryer.js'

const props = useProps({
  $theme: ['auto', 'light', 'dark'],
  $media: '(prefers-color-scheme: dark)'
})

const style = /*css*/`
:host{
  display: flow-root;
  height: -moz-available;
  height: -webkit-fill-available;
  overflow: auto;
  font-family: sans-serif, system-ui;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  animation-timing-function: var(--s-motion-easing-standard-accelerate);
  animation-duration: var(--s-motion-duration-long4);
  font-size: calc(var(--s-font-size) * 15px);
  --s-font-size: 1;
  --s-color-scrim: ${scheme.$color.scrim};
  --s-color-primary: ${scheme.$color.primary};
  --s-color-on-primary: ${scheme.$color.onPrimary};
  --s-color-primary-container: ${scheme.$color.primaryContainer};
  --s-color-on-primary-container: ${scheme.$color.onPrimaryContainer};
  --s-color-secondary: ${scheme.$color.secondary};
  --s-color-on-secondary: ${scheme.$color.onSecondary};
  --s-color-secondary-container: ${scheme.$color.secondaryContainer};
  --s-color-on-secondary-container: ${scheme.$color.onSecondaryContainer};
  --s-color-tertiary: ${scheme.$color.tertiary};
  --s-color-on-tertiary: ${scheme.$color.onTertiary};
  --s-color-tertiary-container: ${scheme.$color.tertiaryContainer};
  --s-color-on-tertiary-container: ${scheme.$color.onTertiaryContainer};
  --s-color-error: ${scheme.$color.error};
  --s-color-on-error: ${scheme.$color.onError};
  --s-color-error-container: ${scheme.$color.errorContainer};
  --s-color-on-error-container: ${scheme.$color.onErrorContainer};
  --s-color-background: ${scheme.$color.background};
  --s-color-on-background: ${scheme.$color.onBackground};
  --s-color-outline: ${scheme.$color.outline};
  --s-color-outline-variant: ${scheme.$color.outlineVariant};
  --s-color-surface: ${scheme.$color.surface};
  --s-color-on-surface: ${scheme.$color.onSurface};
  --s-color-surface-variant: ${scheme.$color.surfaceVariant};
  --s-color-on-surface-variant: ${scheme.$color.onSurfaceVariant};
  --s-color-inverse-surface: ${scheme.$color.inverseSurface};
  --s-color-inverse-on-surface: ${scheme.$color.inverseOnSurface};
  --s-color-inverse-primary: ${scheme.$color.inversePrimary};
  --s-color-surface-container: ${scheme.$color.surfaceContainer};
  --s-color-surface-container-high: ${scheme.$color.surfaceContainerHigh};
  --s-color-surface-container-highest: ${scheme.$color.surfaceContainerHighest};
  --s-color-surface-container-low: ${scheme.$color.surfaceContainerLow};
  --s-color-surface-container-lowest: ${scheme.$color.surfaceContainerLowest};
  --s-color-success: ${scheme.$color.success};
  --s-color-on-success: ${scheme.$color.onSuccess};
  --s-color-success-container: ${scheme.$color.successContainer};
  --s-color-on-success-container: ${scheme.$color.onSuccessContainer};
  --s-color-warning: ${scheme.$color.warning};
  --s-color-on-warning: ${scheme.$color.onWarning};
  --s-color-warning-container: ${scheme.$color.warningContainer};
  --s-color-on-warning-container: ${scheme.$color.onWarningContainer};
  --s-color-dark-primary: ${scheme.$color.darkPrimary};
  --s-color-dark-on-primary: ${scheme.$color.darkOnPrimary};
  --s-color-dark-primary-container: ${scheme.$color.darkPrimaryContainer};
  --s-color-dark-on-primary-container: ${scheme.$color.darkOnPrimaryContainer};
  --s-color-dark-secondary: ${scheme.$color.darkSecondary};
  --s-color-dark-on-secondary: ${scheme.$color.darkOnSecondary};
  --s-color-dark-secondary-container: ${scheme.$color.darkSecondaryContainer};
  --s-color-dark-on-secondary-container: ${scheme.$color.darkOnSecondaryContainer};
  --s-color-dark-tertiary: ${scheme.$color.darkTertiary};
  --s-color-dark-on-tertiary: ${scheme.$color.darkOnTertiary};
  --s-color-dark-tertiary-container: ${scheme.$color.darkTertiaryContainer};
  --s-color-dark-on-tertiary-container: ${scheme.$color.darkOnTertiaryContainer};
  --s-color-dark-error: ${scheme.$color.darkError};
  --s-color-dark-on-error: ${scheme.$color.darkOnError};
  --s-color-dark-error-container: ${scheme.$color.darkErrorContainer};
  --s-color-dark-on-error-container: ${scheme.$color.darkOnErrorContainer};
  --s-color-dark-background: ${scheme.$color.darkBackground};
  --s-color-dark-on-background: ${scheme.$color.darkOnBackground};
  --s-color-dark-outline: ${scheme.$color.darkOutline};
  --s-color-dark-outline-variant: ${scheme.$color.darkOutlineVariant};
  --s-color-dark-surface: ${scheme.$color.darkSurface};
  --s-color-dark-on-surface: ${scheme.$color.darkOnSurface};
  --s-color-dark-surface-variant: ${scheme.$color.darkSurfaceVariant};
  --s-color-dark-on-surface-variant: ${scheme.$color.darkOnSurfaceVariant};
  --s-color-dark-inverse-surface: ${scheme.$color.darkInverseSurface};
  --s-color-dark-inverse-on-surface: ${scheme.$color.darkInverseOnSurface};
  --s-color-dark-inverse-primary: ${scheme.$color.darkInversePrimary};
  --s-color-dark-surface-container: ${scheme.$color.darkSurfaceContainer};
  --s-color-dark-surface-container-high: ${scheme.$color.darkSurfaceContainerHigh};
  --s-color-dark-surface-container-highest: ${scheme.$color.darkSurfaceContainerHighest};
  --s-color-dark-surface-container-low: ${scheme.$color.darkSurfaceContainerLow};
  --s-color-dark-surface-container-lowest: ${scheme.$color.darkSurfaceContainerLowest};
  --s-color-dark-success: ${scheme.$color.darkSuccess};
  --s-color-dark-on-success: ${scheme.$color.darkOnSuccess};
  --s-color-dark-success-container: ${scheme.$color.darkSuccessContainer};
  --s-color-dark-on-success-container: ${scheme.$color.darkOnSuccessContainer};
  --s-color-dark-warning: ${scheme.$color.darkWarning};
  --s-color-dark-on-warning: ${scheme.$color.darkOnWarning};
  --s-color-dark-warning-container: ${scheme.$color.darkWarningContainer};
  --s-color-dark-on-warning-container: ${scheme.$color.darkOnWarningContainer};
  --s-elevation-level1: ${scheme.$elevation.level1};
  --s-elevation-level2: ${scheme.$elevation.level2};
  --s-elevation-level3: ${scheme.$elevation.level3};
  --s-elevation-level4: ${scheme.$elevation.level4};
  --s-elevation-level5: ${scheme.$elevation.level5};
  --s-motion-duration-short1: ${scheme.$motion.duration.short1};
  --s-motion-duration-short2: ${scheme.$motion.duration.short2};
  --s-motion-duration-short3: ${scheme.$motion.duration.short3};
  --s-motion-duration-short4: ${scheme.$motion.duration.short4};
  --s-motion-duration-medium1: ${scheme.$motion.duration.medium1};
  --s-motion-duration-medium2: ${scheme.$motion.duration.medium2};
  --s-motion-duration-medium3: ${scheme.$motion.duration.medium3};
  --s-motion-duration-medium4: ${scheme.$motion.duration.medium4};
  --s-motion-duration-long1: ${scheme.$motion.duration.long1};
  --s-motion-duration-long2: ${scheme.$motion.duration.long2};
  --s-motion-duration-long3: ${scheme.$motion.duration.long3};
  --s-motion-duration-long4: ${scheme.$motion.duration.long4};
  --s-motion-duration-extra-long1: ${scheme.$motion.duration.extraLong1};
  --s-motion-duration-extra-long2: ${scheme.$motion.duration.extraLong2};
  --s-motion-duration-extra-long3: ${scheme.$motion.duration.extraLong3};
  --s-motion-duration-extra-long4: ${scheme.$motion.duration.extraLong4};
  --s-motion-easing-emphasized: ${scheme.$motion.easing.emphasized};
  --s-motion-easing-emphasized-decelerate: ${scheme.$motion.easing.emphasizedDecelerate};
  --s-motion-easing-emphasized-accelerate: ${scheme.$motion.easing.emphasizedAccelerate};
  --s-motion-easing-standard: ${scheme.$motion.easing.standard};
  --s-motion-easing-standard-decelerate: ${scheme.$motion.easing.standardDecelerate};
  --s-motion-easing-standard-accelerate: ${scheme.$motion.easing.standardAccelerate};
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

const getTransitionStyle = (name: string) => `
::view-transition-old(${name}),
::view-transition-new(${name}){ 
  animation: none;
  mix-blend-mode: normal;
}`

export class Page extends useElement({
  props, template, style,
  setup() {
    const computedStyle = useComputedStyle(this)
    const mediaQueryer = new MediaQueryer(this.media)
    mediaQueryer.onChange = (v) => this.theme === 'auto' && this.toggleAttribute('dark', v)
    const getTheme = () => this.theme === 'auto' ? (mediaQueryer.matches ? 'dark' : 'light') : this.theme
    const toggle = async (theme: typeof props.values.theme, anchor?: HTMLElement) => {
      if (this.theme === theme) return
      const old = getTheme()
      const val = theme === 'auto' ? mediaQueryer.matches ? 'dark' : 'light' : theme
      if (old === val || !document.startViewTransition) {
        this.theme = theme
        return
      }
      const transitionName = `page-${Math.random().toString(36).substring(2, 10)}`
      this.style.setProperty('view-transition-name', transitionName)
      const keyframes = { clipPath: [`circle(0px at 50%)`, `circle(${Math.hypot(this.offsetWidth, this.offsetWidth)}px at 50%)`] }
      if (this.isConnected && anchor && anchor.isConnected) {
        const rect = this.getBoundingClientRect()
        const anchorRect = anchor.getBoundingClientRect()
        const left = Math.max(Math.min((anchorRect.left - rect.left) + anchorRect.width / 2, rect.width), 0)
        const top = Math.max(Math.min((anchorRect.top - rect.top) + anchorRect.height / 2, rect.height), 0)
        const diameter = Math.hypot(Math.max(rect.width - left, left) * 2, Math.max(rect.height - top, top) * 2)
        const x = left / rect.width * 100
        const y = top / rect.height * 100
        keyframes.clipPath[0] = `circle(0px at ${x}% ${y}%)`
        keyframes.clipPath[1] = `circle(${diameter}px at ${x}% ${y}%)`
      }
      const styleNode = document.createElement('style')
      const transition = document.startViewTransition(() => {
        styleNode.textContent = getTransitionStyle(transitionName)
        document.head.appendChild(styleNode)
        this.theme = val
      })
      await transition.ready
      transition.finished.then(() => {
        styleNode.remove()
        this.style.removeProperty('view-transition-name')
      })
      return document.documentElement.animate(keyframes, {
        easing: computedStyle.getValue('animation-timing-function'),
        duration: computedStyle.getDuration('animation-duration'),
        pseudoElement: `::view-transition-new(${transitionName})`
      })
    }
    return {
      expose: { toggle, getTheme },
      media: (v) => mediaQueryer.replace(v),
      theme: (v) => {
        if (v === 'auto') return mediaQueryer.call()
        this.toggleAttribute('dark', v === 'dark')
      }
    }
  }
}) { }

const name = Page.define('s-page')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Page
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.detailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & typeof Page
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}