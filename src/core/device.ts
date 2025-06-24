const pointer = matchMedia('(pointer: coarse)')

export const device = {
  get touchEnabled() {
    return pointer.matches
  }
}