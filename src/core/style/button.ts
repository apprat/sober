import * as scheme from '../scheme.js'

export const buttonStyle = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: calc(var(--s-font-size, 1) * 14px);
  font-weight: 500;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
:host([disabled]){
  pointer-events: none;
  background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
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
  :host([disabled]){
    background: ${scheme.color.surfaceContainerHigh} !important;
    color: ${scheme.color.outline} !important;
    box-shadow: 0 0 0 1px ${scheme.color.surfaceContainerHighest} !important;
  }
}
`

export const buttonVariant =/*css*/` 
:host([variant=tonal]){
  background: ${scheme.color.secondaryContainer};
  color: ${scheme.color.onSecondaryContainer};
}
:host([variant=outlined]){
  box-shadow: inset 0 0 0 1px ${scheme.color.outlineVariant};
  color: ${scheme.color.onSurfaceVariant};
}
`