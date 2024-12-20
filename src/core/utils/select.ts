type Parent = {
  value: string
} & HTMLElement

type Item = {
  selected: boolean
  value: string
} & HTMLElement

export class Select<P extends Parent, I extends Item> {
  list: I[] = []
  select?: I
  selectValue?: string
  flag = false
  constructor(options: { context: P, class: { new(): I }, slot: HTMLSlotElement }) {
    const { context } = options
    context.addEventListener(`${context.tagName.toLocaleLowerCase()}:select`, (event) => {
      event.stopPropagation()
      if (!(event.target instanceof options.class)) return
      this.flag = true
      event.target.selected = true
      this.list.forEach((item) => item !== event.target && (item.selected = false))
      this.select = event.target
      this.flag = false
      context.dispatchEvent(new Event('change'))
      this.onUpdate?.()
      this.onSelect?.()
    })
    context.addEventListener(`${context.tagName.toLocaleLowerCase()}:update`, (event) => {
      event.stopPropagation()
      if (this.flag || this.list.length === 0 || !(event.target instanceof options.class)) return
      this.flag = true
      if (!event.target.selected) {
        delete this.select
      } else {
        this.select = event.target
        this.list.forEach((item) => item !== event.target && (item.selected = false))
      }
      this.flag = false
      this.onUpdate?.()
    })
    options.slot.addEventListener('slotchange', () => {
      this.flag = true
      delete this.select
      this.list = options.slot.assignedElements().filter((item) => {
        if (!(item instanceof options.class)) return
        if (this.selectValue !== undefined) {
          if (item.value === this.selectValue) {
            this.select = item
            item.selected = true
          } else {
            item.selected = false
          }
        } else {
          if (!this.select && item.selected) {
            this.select = item
            return true
          }
          if (this.select) item.selected = false
        }
        return true
      }) as never[]
      this.flag = false
      this.onSlotChange?.()
      this.onUpdate?.()
    })
  }
  get value() {
    return this.list[this.list.indexOf(this.select!)]?.value ?? ''
  }
  set value(value: string) {
    this.selectValue = value
    if (this.list.length === 0) return
    this.flag = true
    this.list.forEach((item) => {
      if (item.value === value) {
        item.selected = true
        this.select = item
        return
      }
      item.selected = false
    })
    this.onUpdate?.()
    this.flag = false
  }
  get selectedIndex() {
    return this.list.indexOf(this.select!)
  }
  declare onUpdate?: () => void
  declare onSelect?: () => void
  declare onSlotChange?: () => void
}