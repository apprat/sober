import * as scheme from '../scheme.js'

export const buttonStyle = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  vertical-align: middle;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
:host([disabled]){
  pointer-events: none;
  background: color-mix(in srgb, var(--s-color-on-surface, ${scheme.color.onSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${scheme.color.onSurface}) 38%, transparent) !important;
}
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  color: currentColor;
  flex-shrink: 0;
  width: 24px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled=true]){
    background: var(--s-color-surface-container-high, ${scheme.color.surfaceContainerHigh}) !important;
    color: var(--s-color-outline, ${scheme.color.outline}) !important;
    box-shadow: 0 0 0 1px var(--s-color-surface-container-highest, ${scheme.color.surfaceContainerHighest}) !important;
  }
}
`

export const buttonVariant =/*css*/` 
:host([variant=tonal]){
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
  color: var(--s-color-on-secondary-container, ${scheme.color.onSecondaryContainer});
}
:host([variant=outlined]){
  box-shadow: inset 0 0 0 1px var(--s-color-outline-variant, ${scheme.color.outlineVariant});
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
}
`