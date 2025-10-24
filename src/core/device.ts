const pointer = matchMedia('(any-pointer: coarse)')
const pointer2 = matchMedia('(any-pointer: fine)')

export const device = {
  get touchEnabled() {
    return pointer.matches
  },
  get mouseEnabled() {
    return pointer2.matches
  }
}