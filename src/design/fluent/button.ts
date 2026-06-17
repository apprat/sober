export const Button = /*css*/`
:host{
  height: 32px;
  gap: 4px;
  padding: 0 10px;
  border-radius: 4px;
  ::slotted(:is(svg, s-icon)){
    width: 18px;
  }
  s-ripple{
    --s-ripple-disabled: true;
  }
}
:host(:not([variant])){
  background: #036ac4;
  color: #fff;
}
:host([pressed]){
  border-radius: 4px;
}
`