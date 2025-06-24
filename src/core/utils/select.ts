interface Base extends HTMLElement {
  value: string
}

interface BaseItem extends HTMLElement {
  selected: boolean
  value: string
}

export class Select<Root extends Base, Item extends BaseItem> {
  items: Item[] = []
  selectedItem?: Item
  private flag = false
  private value = ''
  constructor(public root: Root, public slot: HTMLSlotElement, itemClass: { new(): Item }) {
    //slot change
    slot.addEventListener('slotchange', () => {
      const oldSelectedItem = this.selectedItem
      this.flagCallback(() => {
        delete this.selectedItem
        this.items = slot.assignedElements().filter((item) => {
          if (!(item instanceof itemClass)) return
          if (this.value === '') {
            if (item.selected) {
              if (this.selectedItem) this.selectedItem.selected = false
              this.selectedItem = item
            }
            return true
          }
          if (item.value !== this.value && item.selected) item.selected = false
          item.selected = true
          this.selectedItem = item
          return true
        }) as Item[]
      })
      this.onSlotChange?.()
      this.onRender?.(oldSelectedItem)
    })
    //item change
    root.addEventListener(`${root.tagName.toLocaleLowerCase()}:change`, (event) => {
      event.stopPropagation()
      if (this.flag) return
      console.log('change')
    })
  }
  flagCallback(fn: Function) {
    this.flag == true
    fn()
    this.flag = false
  }
  getValue() {
    return this.selectedItem?.value ?? ''
  }
  setValue(value: string) {
    const oldSelectedItem = this.selectedItem
    delete this.selectedItem
    this.flagCallback(() => {
      if (value === '') return this.items.forEach((item) => item.selected = false)
      this.items.forEach((item) => {
        if (item.value === value) {
          item.selected = true
          this.selectedItem = item
          return
        }
        item.selected = false
      })
    })
    if (oldSelectedItem) this.onChange?.(oldSelectedItem)
    this.onRender?.(oldSelectedItem)
  }
  declare onRender?: (old?: Item) => void
  declare onChange?: (old?: Item) => void
  declare onSlotChange?: () => void
}