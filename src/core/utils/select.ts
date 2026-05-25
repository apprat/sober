export interface Base extends HTMLElement {
  value: string
  multiple: boolean
}

export interface BaseItem extends HTMLElement {
  selected: boolean
  value: string
  disabled: boolean
}

export class Select<Root extends Base, Item extends BaseItem> {
  readonly list: Item[] = []
  readonly selectedList: Item[] = []
  private flag = false
  private value: string[] = []
  constructor(private root: Root, private slot: HTMLSlotElement, private itemClass: { new(): Item }) {
    this.slot.addEventListener('slotchange', () => {
      const elements = slot.assignedElements()
      this.list.splice(0, this.list.length)
      elements.forEach((item) => item instanceof itemClass && this.list.push(item))
      this.allSelected()
      this.onSlotChange?.()
      this.onRender?.([])
    })
    this.root.addEventListener(`${root.tagName.toLocaleLowerCase()}:render`, (event) => {
      if (this.flag || this.list.length === 0) return
      const target = event.target as Item
      const old = [...this.selectedList]
      this.selectedList.splice(0, this.selectedList.length)
      if (this.root.multiple) {
        this.list.forEach((value) => {
          if (!value.selected) return
          this.selectedList.push(value)
        })
        return this.onRender?.(old)
      }
      if (target.selected) {
        this.selectedList.push(target)
        if (old[0]) {
          this.flag = true
          old[0].selected = false
          this.flag = false
        }
      }
      this.onRender?.(old)
    })
    this.root.addEventListener(`${this.root.tagName.toLocaleLowerCase()}:select`, (event) => {
      if (!(event.target instanceof this.itemClass)) return
      const old = this.selectedList
      if (this.root.multiple) {
        event.target.selected = !event.target.selected
      } else {
        if (this.selectedList[0] === event.target) return
        event.target.selected = true
      }
      this.root.dispatchEvent(new Event('change'))
      this.onChange?.(old)
    })
  }
  private allSelected() {
    this.selectedList.splice(0, this.selectedList.length)
    this.flag = true
    for (const item of this.list) {
      //not value
      if (this.value.length === 0) {
        if (this.root.multiple) {
          item.selected && this.selectedList.push(item)
          continue
        }
        if (this.selectedList.length > 0) {
          item.selected = false
          continue
        }
        if (item.selected) this.selectedList.push(item)
        continue
      }
      item.selected && (item.selected = false)
      if (item.value === '') continue
      if (this.root.multiple ? this.value.includes(item.value) : item.value === this.value[0]) {
        !item.selected && (item.selected = true)
        this.selectedList.push(item)
      }
    }
    this.flag = false
  }
  setMultiple() {
    if (this.root.multiple) return
    if (this.selectedList.length <= 1) return
    this.flag = true
    this.selectedList.forEach(item => item.selected = false)
    this.flag = false
    const old = [...this.selectedList]
    this.selectedList.splice(0, this.selectedList.length)
    this.onRender?.(old)
    this.root.dispatchEvent(new Event('change'))
  }
  getValue() {
    return this.root.multiple ? this.selectedList.map((item) => item.value).join() : (this.selectedList[0]?.value ?? '')
  }
  setValue(value: string) {
    this.value = value.split(',')
    if (this.list.length === 0) return
    const old = [...this.selectedList]
    this.allSelected()
    this.onRender?.(old)
  }
  selectedIndex() {
    return this.root.multiple ? -1 : this.list.indexOf(this.selectedList[0])
  }
  selectedIndexAll() {
    return this.root.multiple ? this.selectedList.map((item) => this.list.indexOf(item)) : []
  }
  declare onRender?: (olds: Item[]) => void
  declare onChange?: (olds: Item[]) => void
  declare onSlotChange?: () => void
}


