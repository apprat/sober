import { Theme } from '../theme.js'

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
  transition-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  transition-duration: var(--s-motion-duration-short4, ${Theme.motionDurationShort4});
}
:host([disabled=true]){
  pointer-events: none !important;
  background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent) !important;
}
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  color: currentColor;
  flex-shrink: 0;
  width: 20px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled=true]){
    background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh}) !important;
    color: var(--s-color-outline, ${Theme.colorOutline}) !important;
    box-shadow: 0 0 0 1px var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) !important;
  }
}
`

export const buttonVariant =/*css*/` 
:host([variant=tonal]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([variant=outlined]){
  box-shadow: inset 0 0 0 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
`