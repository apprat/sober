export const defaultStyle = /*css*/`
.wrapper{
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.wrapper.show{
  pointer-events: auto;
}
.mask{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, .6);
  cursor: pointer;
  filter: opacity(0);
  transition: filter .2s;
}
.wrapper.show .mask{
  filter: opacity(1);
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  filter: opacity(0);
  transform: scale(.8);
  transition: filter .2s,transform .2s;
  pointer-events: none;
}
.wrapper.show .container{
  filter: opacity(1);
  transform: scale(1);
}
.body{
  background: var(--s-color-surface-container-high,#ECE6F0);
  width: calc(100% - 48px);
  max-width: 560px;
  min-width: 280px;
  max-height: calc(100% - 48px);
  border-radius: 28px;
  position: relative;
  box-shadow: 0 5px 5px -3px rgb(0, 0, 0, .2), 0 8px 10px 1px rgb(0, 0, 0, .14), 0 3px 14px 2px rgb(0, 0, 0, .12);
  display: flex;
  flex-direction: column;
}
.wrapper.show .body{
  pointer-events: auto;
}
`