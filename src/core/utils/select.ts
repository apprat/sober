interface Base extends HTMLElement {
  value: string
  multiple: boolean
}

interface BaseItem extends HTMLElement {
  selected: boolean
  value: string
}

export class Select<Root extends Base, Item extends BaseItem> {
  list: Item[] = []
  selectedList: Item[] = []
  private flag = false
  private value: string[] = []
  constructor(private root: Root, private slot: HTMLSlotElement, private itemClass: { new(): Item }) {
    this.slot.addEventListener('slotchange', () => {
      const elements = slot.assignedElements()
      this.list = []
      elements.forEach((item) => item instanceof itemClass && this.list.push(item))
      this.allSelected()
      this.onSlotChange?.()
      this.onRender?.()
    })
    this.root.addEventListener(`${root.tagName.toLocaleLowerCase()}:render`, (event) => {
      if (this.flag || this.list.length === 0) return
      const target = event.target as Item
      if (this.root.multiple) {
        this.selectedList = []
        this.list.forEach((item) => item.selected && this.selectedList.push(item))
        return this.onRender?.()
      }
      const old = this.selectedList[0]
      this.selectedList = []
      if (target.selected) {
        this.selectedList = [target]
        if (old) {
          this.flag = true
          old.selected = false
          this.flag = false
        }
      }
      this.onRender?.()
    })
    this.root.addEventListener(`${this.root.tagName.toLocaleLowerCase()}:select`, (event) => {
      if (!(event.target instanceof this.itemClass)) return
      let old: Item | undefined
      let item: Item | undefined
      if (this.root.multiple) {
        const val = event.target.selected
        if (!val) item = event.target
        event.target.selected = !val
      } else {
        if (this.selectedList[0] === event.target) return
        old = this.selectedList[0]
        item = event.target
        event.target.selected = true
      }
      this.root.dispatchEvent(new Event('change'))
      this.onChange?.(item, old)
    })
  }
  private allSelected() {
    this.selectedList = []
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
        if (item.selected) this.selectedList = [item]
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
    this.selectedList = []
    this.onRender?.()
    this.root.dispatchEvent(new Event('change'))
  }
  getValue() {
    return this.root.multiple ? this.selectedList.map((item) => item.value).join() : (this.selectedList[0]?.value ?? '')
  }
  setValue(value: string) {
    this.value = value.split(',')
    if (this.list.length === 0) return
    this.allSelected()
    this.onRender?.()
  }
  selectedIndex() {
    return this.root.multiple ? -1 : this.list.indexOf(this.selectedList[0])
  }
  selectedIndexAll() {
    return this.root.multiple ? this.selectedList.map((item) => this.list.indexOf(item)) : []
  }
  declare onRender?: () => void
  declare onChange?: (item?: Item, old?: Item) => void
  declare onSlotChange?: () => void
}