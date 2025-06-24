import { Theme } from '../theme.js'

export const scrollbarStyle =/*css*/`
:host{
  overflow: auto;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    background: transparent;
    width: 6px;
    height: 6px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
    border-radius: 3px;
  }
  @supports not selector(::-webkit-scrollbar){
    :host{
      scrollbar-color: var(--s-color-outline-variant, ${Theme.colorOutlineVariant}) transparent;
    }
  }
}
`