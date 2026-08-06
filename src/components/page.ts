import { useElement, useProps } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'

const props = useProps({
  $theme: ['auto', 'light', 'dark'],
  $media: '(prefers-color-scheme: dark)'
})

const style = /*css*/`
:host{
  display: flow-root;
  height: 100%;
  overflow: auto;
  font-weight: 400;
  font-family: "Google Sans Flex", -apple-system, BlinkMacSystemFont, sans-serif;
  color-scheme: light;
  color: var(--s-color-on-background);
  background: var(--s-color-background);
  animation-timing-function: var(--s-motion-easing-standard-accelerate);
  animation-duration: var(--s-motion-duration-long4);
  font-size: calc(var(--s-font-size) * 16px);
  --s-font-size: 1;
  --s-border-min: ${Number(1 / window.devicePixelRatio).toFixed(6)}px;
  --s-color-scrim: var(--s-color-light-scrim);
  --s-color-primary: var(--s-color-light-primary);
  --s-color-on-primary: var(--s-color-light-on-primary);
  --s-color-primary-container: var(--s-color-light-primary-container);
  --s-color-on-primary-container: var(--s-color-light-on-primary-container);
  --s-color-secondary: var(--s-color-light-secondary);
  --s-color-on-secondary: var(--s-color-light-on-secondary);
  --s-color-secondary-container: var(--s-color-light-secondary-container);
  --s-color-on-secondary-container: var(--s-color-light-on-secondary-container);
  --s-color-tertiary: var(--s-color-light-tertiary);
  --s-color-on-tertiary: var(--s-color-light-on-tertiary);
  --s-color-tertiary-container: var(--s-color-light-tertiary-container);
  --s-color-on-tertiary-container: var(--s-color-light-on-tertiary-container);
  --s-color-error: var(--s-color-light-error);
  --s-color-on-error: var(--s-color-light-on-error);
  --s-color-error-container: var(--s-color-light-error-container);
  --s-color-on-error-container: var(--s-color-light-on-error-container);
  --s-color-background: var(--s-color-light-background);
  --s-color-on-background: var(--s-color-light-on-background);
  --s-color-outline: var(--s-color-light-outline);
  --s-color-outline-variant: var(--s-color-light-outline-variant);
  --s-color-surface: var(--s-color-light-surface);
  --s-color-on-surface: var(--s-color-light-on-surface);
  --s-color-surface-variant: var(--s-color-light-surface-variant);
  --s-color-on-surface-variant: var(--s-color-light-on-surface-variant);
  --s-color-inverse-surface: var(--s-color-light-inverse-surface);
  --s-color-inverse-on-surface: var(--s-color-light-inverse-on-surface);
  --s-color-inverse-primary: var(--s-color-light-inverse-primary);
  --s-color-surface-container: var(--s-color-light-surface-container);
  --s-color-surface-container-high: var(--s-color-light-surface-container-high);
  --s-color-surface-container-highest: var(--s-color-light-surface-container-highest);
  --s-color-surface-container-low: var(--s-color-light-surface-container-low);
  --s-color-surface-container-lowest: var(--s-color-light-surface-container-lowest);
  --s-color-success: var(--s-color-light-success);
  --s-color-on-success: var(--s-color-light-on-success);
  --s-color-success-container: var(--s-color-light-success-container);
  --s-color-on-success-container: var(--s-color-light-on-success-container);
  --s-color-warning: var(--s-color-light-warning);
  --s-color-on-warning: var(--s-color-light-on-warning);
  --s-color-warning-container: var(--s-color-light-warning-container);
  --s-color-on-warning-container: var(--s-color-light-on-warning-container);
  --s-color-light-scrim: ${scheme.$color.lightScrim};
  --s-color-light-primary: ${scheme.$color.lightPrimary};
  --s-color-light-on-primary: ${scheme.$color.lightOnPrimary};
  --s-color-light-primary-container: ${scheme.$color.lightPrimaryContainer};
  --s-color-light-on-primary-container: ${scheme.$color.lightOnPrimaryContainer};
  --s-color-light-secondary: ${scheme.$color.lightSecondary};
  --s-color-light-on-secondary: ${scheme.$color.lightOnSecondary};
  --s-color-light-secondary-container: ${scheme.$color.lightSecondaryContainer};
  --s-color-light-on-secondary-container: ${scheme.$color.lightOnSecondaryContainer};
  --s-color-light-tertiary: ${scheme.$color.lightTertiary};
  --s-color-light-on-tertiary: ${scheme.$color.lightOnTertiary};
  --s-color-light-tertiary-container: ${scheme.$color.lightTertiaryContainer};
  --s-color-light-on-tertiary-container: ${scheme.$color.lightOnTertiaryContainer};
  --s-color-light-error: ${scheme.$color.lightError};
  --s-color-light-on-error: ${scheme.$color.lightOnError};
  --s-color-light-error-container: ${scheme.$color.lightErrorContainer};
  --s-color-light-on-error-container: ${scheme.$color.lightOnErrorContainer};
  --s-color-light-background: ${scheme.$color.lightBackground};
  --s-color-light-on-background: ${scheme.$color.lightOnBackground};
  --s-color-light-outline: ${scheme.$color.lightOutline};
  --s-color-light-outline-variant: ${scheme.$color.lightOutlineVariant};
  --s-color-light-surface: ${scheme.$color.lightSurface};
  --s-color-light-on-surface: ${scheme.$color.lightOnSurface};
  --s-color-light-surface-variant: ${scheme.$color.lightSurfaceVariant};
  --s-color-light-on-surface-variant: ${scheme.$color.lightOnSurfaceVariant};
  --s-color-light-inverse-surface: ${scheme.$color.lightInverseSurface};
  --s-color-light-inverse-on-surface: ${scheme.$color.lightInverseOnSurface};
  --s-color-light-inverse-primary: ${scheme.$color.lightInversePrimary};
  --s-color-light-surface-container: ${scheme.$color.lightSurfaceContainer};
  --s-color-light-surface-container-high: ${scheme.$color.lightSurfaceContainerHigh};
  --s-color-light-surface-container-highest: ${scheme.$color.lightSurfaceContainerHighest};
  --s-color-light-surface-container-low: ${scheme.$color.lightSurfaceContainerLow};
  --s-color-light-surface-container-lowest: ${scheme.$color.lightSurfaceContainerLowest};
  --s-color-light-success: ${scheme.$color.lightSuccess};
  --s-color-light-on-success: ${scheme.$color.lightOnSuccess};
  --s-color-light-success-container: ${scheme.$color.lightSuccessContainer};
  --s-color-light-on-success-container: ${scheme.$color.lightOnSuccessContainer};
  --s-color-light-warning: ${scheme.$color.lightWarning};
  --s-color-light-on-warning: ${scheme.$color.lightOnWarning};
  --s-color-light-warning-container: ${scheme.$color.lightWarningContainer};
  --s-color-light-on-warning-container: ${scheme.$color.lightOnWarningContainer};
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
  --s-shape-corner-extra-small: ${scheme.$shape.corner.extraSmall};
  --s-shape-corner-small: ${scheme.$shape.corner.small};
  --s-shape-corner-medium: ${scheme.$shape.corner.medium};
  --s-shape-corner-large: ${scheme.$shape.corner.large};
  --s-shape-corner-large-increased: ${scheme.$shape.corner.largeIncreased};
  --s-shape-corner-extra-large: ${scheme.$shape.corner.extraLarge};
  --s-shape-corner-extra-large-increased: ${scheme.$shape.corner.extraLargeIncreased};
  --s-shape-corner-extra-extra-large: ${scheme.$shape.corner.extraExtraLarge};
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
  color-scheme: dark;
  --s-color-primary: var(--s-color-dark-primary);
  --s-color-on-primary: var(--s-color-dark-on-primary);
  --s-color-primary-container: var(--s-color-dark-primary-container);
  --s-color-on-primary-container: var(--s-color-dark-on-primary-container);
  --s-color-secondary: var(--s-color-dark-secondary);
  --s-color-on-secondary: var(--s-color-dark-on-secondary);
  --s-color-secondary-container: var(--s-color-dark-secondary-container);
  --s-color-on-secondary-container: var(--s-color-dark-on-secondary-container);
  --s-color-tertiary: var(--s-color-dark-tertiary);
  --s-color-on-tertiary: var(--s-color-dark-on-tertiary);
  --s-color-tertiary-container: var(--s-color-dark-tertiary-container);
  --s-color-on-tertiary-container: var(--s-color-dark-on-tertiary-container);
  --s-color-error: var(--s-color-dark-error);
  --s-color-on-error: var(--s-color-dark-on-error);
  --s-color-error-container: var(--s-color-dark-error-container);
  --s-color-on-error-container: var(--s-color-dark-on-error-container);
  --s-color-background: var(--s-color-dark-background);
  --s-color-on-background: var(--s-color-dark-on-background);
  --s-color-outline: var(--s-color-dark-outline);
  --s-color-outline-variant: var(--s-color-dark-outline-variant);
  --s-color-surface: var(--s-color-dark-surface);
  --s-color-on-surface: var(--s-color-dark-on-surface);
  --s-color-surface-variant: var(--s-color-dark-surface-variant);
  --s-color-on-surface-variant: var(--s-color-dark-on-surface-variant);
  --s-color-inverse-surface: var(--s-color-dark-inverse-surface);
  --s-color-inverse-on-surface: var(--s-color-dark-inverse-on-surface);
  --s-color-inverse-primary: var(--s-color-dark-inverse-primary);
  --s-color-surface-container: var(--s-color-dark-surface-container);
  --s-color-surface-container-high: var(--s-color-dark-surface-container-high);
  --s-color-surface-container-highest: var(--s-color-dark-surface-container-highest);
  --s-color-surface-container-low: var(--s-color-dark-surface-container-low);
  --s-color-surface-container-lowest: var(--s-color-dark-surface-container-lowest);
  --s-color-success: var(--s-color-dark-success);
  --s-color-on-success: var(--s-color-dark-on-success);
  --s-color-success-container: var(--s-color-dark-success-container);
  --s-color-on-success-container: var(--s-color-dark-on-success-container);
  --s-color-warning: var(--s-color-dark-warning);
  --s-color-on-warning: var(--s-color-dark-on-warning);
  --s-color-warning-container: var(--s-color-dark-warning-container);
  --s-color-on-warning-container: var(--s-color-dark-on-warning-container);
}
`

const template = /*html*/`<slot></slot>`

const getTransitionStyle = (name: string) => `
::view-transition-old(${name}),
::view-transition-new(${name}){ 
  animation: none;
  mix-blend-mode: nomral;
}
*{
  transition: none !important;
}
`

export class Page extends useElement({
  props, template, style,
  setup() {
    const computedStyle = useComputedStyle(this)
    const mediaQueryer = new MediaQueryer(this.media)
    mediaQueryer.onChange = (v) => this.theme === 'auto' && this.toggleAttribute('dark', v)
    const getTheme = () => this.theme === 'auto' ? (mediaQueryer.matches ? 'dark' : 'light') : this.theme
    const styleNode = document.createElement('style')
    const toggle = async (theme: typeof props.values.theme, anchor?: HTMLElement) => {
      if (this.theme === theme) return
      const old = getTheme()
      const val = theme === 'auto' ? mediaQueryer.matches ? 'dark' : 'light' : theme
      //@ts-ignore
      if (old === val || !document.startViewTransition) {
        this.theme = theme
        return
      }
      const transitionName = `page-${Math.random().toString(36).substring(2, 10)}`
      this.style.setProperty('view-transition-name', transitionName)
      let keyframes: any = { clipPath: [`circle(0px at 50%)`, `circle(${Math.hypot(this.offsetWidth, this.offsetWidth)}px at 50%)`] }
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
      const callback = () => {
        styleNode.textContent = getTransitionStyle(transitionName)
        document.head.appendChild(styleNode)
        this.theme = val
      }
      //@ts-ignore
      const transition = document.startViewTransition(callback)
      await transition.ready
      transition.finished.then(() => {
        styleNode.remove()
        this.style.removeProperty('view-transition-name')
      })
      return document.documentElement.animate(keyframes, {
        easing: computedStyle.getValue('animation-timing-function'),
        duration: computedStyle.getDuration('animation-duration'),
        pseudoElement: `::view-transition-new(${transitionName})`,
        fill: 'forwards'
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