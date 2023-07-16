
export const defaultStyle = /*css*/`
:host{
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
}
`