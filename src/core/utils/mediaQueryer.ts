export class MediaQueryer {
  declare mediaQueryList: MediaQueryList
  declare _callback: (v: boolean) => void
  replace(query: string) {
    this.mediaQueryList = matchMedia(query)
    this.mediaQueryList.onchange = () => this.call()
    this.call()
  }
  call() {
    this.matches && this._callback?.(this.matches)
  }
  get matches() {
    return this.mediaQueryList.matches
  }
  get onChange() {
    return this._callback
  }
  set onChange(v: (v: boolean) => void) {
    this._callback = v
    Promise.resolve().then(() => this.call())
  }
  constructor(query: string) {
    this.replace(query)
  }
}