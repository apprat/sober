import Dialog, { EventCode } from '../dialog'

export class Builder {
  #dialog: Dialog
  #title: HTMLDivElement
  #message: HTMLDivElement
  #onPositive?: () => void | false | Promise<void> | Promise<false>
  #onNegative?: () => void | false | Promise<void> | Promise<false>
  #view: Node
  #items?: NodeList
  constructor(view?: Node) {
    this.#view = view ?? document.body
    this.#dialog = document.createElement('s-dialog')
    this.#title = document.createElement('div')
    this.#message = document.createElement('div')
    this.#title.slot = 'title'
    this.#message.slot = 'message'
    this.#dialog.appendChild(this.#title)
    this.#dialog.appendChild(this.#message)
    this.#dialog.addEventListener('blur', () => this.#view.removeChild(this.#dialog))
    this.#dialog.addEventListener('dimiss', async (event) => {
      switch (event.code) {
        case EventCode.positiveButton:
          if (await this.#onPositive?.apply(this) === false) return
          break
        case EventCode.negativeButton:
          if (await this.#onNegative?.apply(this) === false) return
          break
      }
    })
  }
  setTitle(value: string) {
    this.#title.textContent = value
    return this
  }
  setMessage(value: string | Node) {
    this.#message.innerHTML = ''
    this.#message.append(value)
    return this
  }
  setItems<T extends { title: string, subtitle?: string, disabled?: boolean }>(
    options: {
      data: T[]
      onItem?: (value: T) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const fragment = document.createDocumentFragment()
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const title = document.createElement('div')
      title.slot = 'title'
      title.textContent = item.title
      label.appendChild(title)
      if (item.disabled !== undefined) label.disabled = item.disabled
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      label.addEventListener('click', () => {
        const out = options.onItem?.(item)
        if (out === false) return
        this.#dialog.dimiss()
      })
      fragment.appendChild(label)
    }
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setMultiChoiceItems<T extends { title: string, subtitle?: string, defaultChecked?: boolean, disabled?: boolean }>(
    options: {
      data: T[],
      onPositive?: (value: T[]) => void | false
      onNegative?: (value: T[]) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const selects: T[] = []
    const fragment = document.createDocumentFragment()
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const checkbox = document.createElement('s-checkbox')
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          !selects.includes(item) && selects.push(item)
          return
        }
        const index = selects.indexOf(item)
        index !== -1 && selects.splice(index, 1)
      })
      if (item.defaultChecked) {
        checkbox.checked = item.defaultChecked
        selects.push(item)
      }
      checkbox.slot = 'start'
      const title = document.createElement('div')
      title.slot = 'title'
      title.textContent = item.title
      label.appendChild(checkbox)
      label.appendChild(title)
      if (item.disabled !== undefined) label.disabled = item.disabled
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      fragment.appendChild(label)
    }
    this.#onPositive = () => options.onPositive?.(selects)
    this.#onNegative = () => options.onNegative?.(selects)
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setSingleChoiceItems<T extends { title: string, subtitle?: string, disabled?: boolean }>(
    options: {
      data: T[],
      select?: number
      name?: string
      onItem?: (value: T) => void | false
      onPositive?: (value: T) => void | false
      onNegative?: (value: T) => void | false
    }) {
    this.#items?.forEach((value) => this.#dialog.removeChild(value))
    const fragment = document.createDocumentFragment()
    let select = options.data[options.select ?? 0]
    for (const item of options.data) {
      const label = document.createElement('s-label')
      const radioButton = document.createElement('s-radio-button')
      radioButton.addEventListener('change', () => select = item)
      const title = document.createElement('div')
      title.slot = 'title'
      radioButton.slot = 'start'
      radioButton.name = options.name ?? 'dialog-radio-button'
      if (select === item) radioButton.checked = true
      title.textContent = item.title
      label.appendChild(radioButton)
      label.appendChild(title)
      if (item.subtitle) {
        const subtitle = document.createElement('div')
        subtitle.slot = 'subtitle'
        title.textContent = item.subtitle
        label.appendChild(subtitle)
      }
      fragment.appendChild(label)
    }
    this.#onPositive = () => options.onPositive?.(select)
    this.#onNegative = () => options.onNegative?.(select)
    this.#items = fragment.childNodes
    this.#dialog.appendChild(fragment)
    return this
  }
  setPositiveButton(text: string, listener?: () => void | false) {
    this.#dialog.positiveButton = text
    if (listener) this.#onPositive = listener
    return this
  }
  setNegativeButton(text: string, listener?: () => void | false) {
    this.#dialog.negativeButton = text
    if (listener) this.#onNegative = listener
    return this
  }
  show() {
    this.#view.appendChild(this.#dialog)
    window.getComputedStyle(this.#dialog).top
    this.#dialog.show()
    return this
  }
  dimiss() {
    this.#dialog.dimiss()
    return this
  }
}