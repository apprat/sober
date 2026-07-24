export default /*css*/`
:host{
  --s-ripple-disabled: true;
}
.ripple{
  border-radius: 0;
}
.container.pressed{
  .ripple{
    opacity: 1;
  }
}
`