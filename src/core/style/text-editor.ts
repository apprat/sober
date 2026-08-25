import * as scheme from '../scheme.js'

export const textEditorStyle = /*css*/`
:host{
  display: block;
  max-height: none;
  position: relative;
  cursor: text;
  font-size: calc(var(--s-font-size, 1) * 16px);
  color: ${scheme.color.onSurface};
  transition-timing-function: ${scheme.motion.easing.standardDecelerate};
  transition-duration: ${scheme.motion.duration.short4};
}
.icon-button{
  align-items: center;
  justify-content: center;
  width: 40px;
  flex-shrink: 0;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  &[pressed]{
    border-radius: ${scheme.shape.corner.small};
  }
  svg{
    width: 24px;
    height: 24px;
    pointer-events: none;
    fill: ${scheme.color.onSurfaceVariant};
  }
}
.wrapper{
  display: contents;
  min-height: inherit;
  max-height: inherit;
}
.field-set{
  line-height: inherit;
  font-size: inherit;
  min-height: inherit;
  max-height: inherit;
  font-size: inherit;
}
.layout{
  display: flex;
  padding: 0;
  height: 100%;
  max-height: inherit;
  position: relative;
}
.editor{
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border: none;
  color: inherit;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  &:focus-visible{
    outline: none;
  }
}
.start,
.end{
  display: flex;
  align-items: center;
  position: relative;
  .icon-button{
    align-self: flex-end;
    margin: 4px 0;
  }
}
.start{
  margin-right: calc( var(--s_text-field-padding-left, var(--s_text-area-padding-left)) * -1);
}
.end{
  margin-left: calc( var(--s_text-field-padding-right, var(--s_text-area-padding-right)) * -1);
  margin-right: 4px;
}
.helper{
  display: flex;
  align-items: center;
  font-size: calc(var(--s-font-size, 1) * 12px);
  line-height: calc(100% + 8px);
  color: var(--s_text-field-border-color, var(--s_text-area-border-color));
  padding-left: var(--s_text-field-padding-left, var(--s_text-area-padding-left));
  padding-right: var(--s_text-field-padding-right, var(--s_text-area-padding-right));
  .text{
    flex-grow: 1;
  }
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
  width: 24px;
  height: 24px;
  font-size: 24px;
}
::slotted(:is(.icon, svg, s-icon, ms-icon)){
  color: ${scheme.color.onSurfaceVariant};
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=start]){
  margin: 12px;
}
::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=end]){
  margin: 12px 8px;
}
::slotted(s-button){
  padding: 0 8px;
  border-radius: ${scheme.shape.corner.small};
}
::slotted(:is(s-icon-button, s-button)[slot=start]){
  margin: 4px;
}
::slotted(:is(s-icon-button, s-button)[slot=end]){
  margin: 4px 0;
}
:host(:focus-visible){
  outline: none;
}
:host([hover]){
  .field-set::part(focused-line){
    opacity: 1;
  }
}
:host([label]){
  .field-set:not([floating]) .editor::placeholder{
    opacity: 1;
  }
  .editor::placeholder{
    opacity: 0;
  }
}
:host([showClear]) .no-value .clear{
  display: flex;
}
:host([showCount]) .count{
  display: block;
}
:host([readOnly]){
  pointer-events: none;
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  .field-set{
    --s-field-set-border-color: color-mix(in srgb, ${scheme.color.onSurface} 18%, transparent);
  }
  .icon-button{
    opacity: 0.38; 
  }
}
:host([size=small]){
  font-size: calc(var(--s-font-size, 1) * 14px);
  .icon-button{ 
    width: 32px;
    height: 32px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)){
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=start]){
    margin: 10px;
  }
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=end]){
    margin: 10px 6px;
  }
}
:host([size=large]){
  .icon-button{
    margin: 8px 0;
  }
  .helper{
    font-size: calc(var(--s-font-size, 1) * 14px);
  }
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=start]){
    margin: 16px;
  }
  ::slotted(:is(.icon, svg, s-icon, s-loading, s-spinner, ms-icon)[slot=end]){
    margin: 16px 12px 16px 8px;
  }
  ::slotted(:is(s-icon-button, s-button)[slot=start]){
    margin: 8px;
  }
  ::slotted(:is(s-icon-button, s-button)[slot=end]){
    margin: 8px 4px 8px 0;
  }
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    color: ${scheme.color.outline} !important;
    .field-set{
      --s-field-set-border-color: ${scheme.color.outlineVariant};
    }
  }
}
`