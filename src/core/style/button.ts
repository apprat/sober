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
.text{
  overflow: hidden;
  overflow: clip visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  border-radius: 0;
  line-height: 1;
}
:host([disabled]){
  pointer-events: none;
  background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
  width: 24px;
  height: 24px;
  font-size: 24px;
  flex-shrink: 0;
  color: currentColor;
}
::slotted(s-spinner){
  stroke : currentColor;
  --s-spinner-track-opacity: .18;
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    background: ${scheme.color.surfaceContainerHigh} !important;
    color: ${scheme.color.outline} !important;
    box-shadow: none !important;
  }
}
`