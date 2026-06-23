export class ResizeWatcher {
  private firsts: Element[] = []
  private obs: ResizeObserver
  private elements: Element[]
  onChange?: () => void
  constructor(...elements: Element[]) {
    this.elements = elements
    this.obs = new ResizeObserver((entries) => {
      let through = false
      entries.forEach((entry) => {
        if (!this.firsts.includes(entry.target)) return this.firsts.push(entry.target)
        through = true
      })
      if (!through) return
      this.onChange?.()
    })
  }
  stop() {
    this.firsts = []
    this.obs.disconnect()
  }
  run(soon = false) {
    if (soon) this.firsts = this.elements
    this.elements.forEach((item) => this.obs.observe(item))
  }
}