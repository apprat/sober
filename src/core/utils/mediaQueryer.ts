export class MediaQueryer {
  declare mediaQueryList: MediaQueryList
  private callback?: (v: boolean) => void
  replace(query: string) {
    this.mediaQueryList = matchMedia(query)
    this.mediaQueryList.onchange = () => this.callback?.(this.matches)
    this.call()
  }
  on(callback: (matches: boolean) => void) {
    this.callback = callback
    this.call()
  }
  call() {
    this.matches && this.callback?.(this.matches)
  }
  get matches() {
    return this.mediaQueryList.matches
  }
  constructor(query: string) {
    this.replace(query)
  }
}