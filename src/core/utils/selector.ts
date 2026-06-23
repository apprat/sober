type Component = {
  value: string
  multiple: boolean
  selectable: boolean
  name: string
} & HTMLElement

type ComponentItem = {
  selected: boolean
  disabled?: boolean
  selectable: boolean
  value: string
} & HTMLElement

export class Selector<C extends Component, CI extends ComponentItem> {
  items: CI[] = []
  selectedItems: CI[] = []
  selectedIndexes: number[] = []

  private _values = new Set<string>()
  private flagged = false
  declare onRender?: (olds: CI[], initial?: true) => void
  declare onChange?: (olds: CI[]) => void
  declare onValueChange?: () => void
  declare onSlotChange?: (olds: CI[]) => void
  declare onFocus?: (item: CI) => void
  constructor(private component: C, slot: HTMLSlotElement, itemClass: { new(): CI }) {
    slot.addEventListener('slotchange', () => {
      const olds = [...this.items]
      const elements = slot.assignedElements()
      this.items.splice(0, this.items.length)
      this.selectedItems.splice(0, this.selectedItems.length)
      this.flagged = false
      const size = this._values.size
      for (const item of elements) {
        if (!(item instanceof itemClass)) continue
        this.items.push(item)
        if (!this.component.multiple && this.selectedItems.length > 1) {
          if (item.selected) item.selected = false
          continue
        }
        if (size > 0) item.selected = this._values.has(item.value)
        if (item.selected) {
          if (item.value !== '') this._values.add(item.value)
          this.selectedItems.push(item)
          this.selectedIndexes.push(this.items.indexOf(item))
        }
      }
      this.flagged = true
      this.onSlotChange?.(olds)
      this.onValueChange?.()
      this.onRender?.([], true)
    })
    const name = component.tagName.toLocaleLowerCase()
    component.addEventListener(`${name}:change`, (event) => {
      event.stopPropagation()
      const target = event.target as CI
      if (!target.disabled && target.selectable && this.component.selectable) {
        const selected = target.selected
        const old = [...this.selectedItems]
        target.selected = component.multiple ? !selected : true
        if (selected !== target.selected) {
          this.onChange?.(old)
          component.dispatchEvent(new Event('change'))
        }
      }
      target.dispatchEvent(new Event('input'))
    })
    component.addEventListener(`${name}:selected`, (event) => {
      event.stopPropagation()
      if (!this.flagged) return
      const target = event.target as CI
      const old = [...this.selectedItems]
      this.flagged = false
      if (!this.component.multiple) {
        for (const item of this.selectedItems) {
          item.selected = false
          this._values.has(item.value) && this._values.delete(item.value)
        }
        this.selectedItems.splice(0, this.selectedItems.length)
        this.selectedIndexes.splice(0, this.selectedIndexes.length)
      }
      if (target.selected) {
        target.value !== '' && this._values.add(target.value)
        this.selectedItems.push(target)
        this.selectedItems.sort((a, b) => this.items.indexOf(a) - this.items.indexOf(b))
        this.selectedIndexes.push(this.items.indexOf(target))
        this.selectedIndexes.sort((a, b) => a - b)
      } else if (this.component.multiple) {
        this.selectedItems.splice(this.selectedItems.indexOf(target), 1)
        this.selectedIndexes.splice(this.selectedIndexes.indexOf(this.items.indexOf(target)), 1)
        this._values.has(target.value) && this._values.delete(target.value)
      }
      this.flagged = true
      this.onValueChange?.()
      this.onRender?.(old)
    })
    component.addEventListener(`${name}:valued`, (event) => {
      event.stopPropagation()
      if (!this.flagged) return
      const e = event as CustomEvent<{ old: string }>
      const old = e.detail.old
      const target = e.target as CI
      if (!target.selected) return
      this._values.delete(old)
      if (target.value !== '') this._values.add(target.value)
      this.onValueChange?.()
    })
    component.addEventListener(`${name}:disabled`, (event) => {
      event.stopPropagation()
      if (!this.flagged) return
      this.onValueChange?.()
    })
    component.addEventListener(`${name}:focus`, (event) => {
      event.stopPropagation()
      this.onFocus?.(event.target as CI)
    })
  }
  get value() {
    return Array.from(this._values).join()
  }
  set value(v) {
    this._values = new Set(v.split(',').filter((item) => item !== ''))
    if (this.items.length === 0) return
    const old = [...this.selectedItems]
    this.flagged = false
    this.selectedItems.splice(0, this.selectedItems.length)
    this.selectedIndexes.splice(0, this.selectedIndexes.length)
    this.items.forEach((item) => {
      item.selected = this._values.has(item.value)
      if (item.selected) {
        this.selectedItems.push(item)
        this.selectedIndexes.push(this.items.indexOf(item))
      }
    })
    this.flagged = true
    this.onValueChange?.()
    this.onRender?.(old)
  }
  get selectedIndex() {
    return this.items.indexOf(this.selectedItems[0])
  }
  getFormData() {
    const formData = new FormData()
    for (const item of this.selectedItems) {
      if (item.disabled || item.value === '') continue
      formData.append(this.component.name, item.value)
    }
    return formData
  }
}