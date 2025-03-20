export class I18n<T> {
  locale = navigator.language
  updates = new Map<HTMLElement, Function>()
  constructor(public list: { [key: string]: T }) { }
  getItem(name: string): T {
    name = name || this.locale
    if (name in this.list) return this.list[name]
    const [def] = name.split('-')
    if (def in this.list) return this.list[def]
    return this.list.zh
  }
  addItem(name: string, item: T) {
    if (this.list[name]) throw new Error(`Locale ${name} already exists`)
    this.list[name] = item
  }
  setLocale(name?: string) {
    this.locale = name ?? navigator.language
    this.updates.forEach((item) => item())
  }
}