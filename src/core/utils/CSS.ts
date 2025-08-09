const duration = (value: string) => {
  const list = value.trim().match(/^([\d\.]+)(s|ms)$/)
  if (!list) throw new Error()
  const number = Number(list[1])
  if (list[2] === 's') return number * 1000
  return number
}

export const useComputedStyle = (el: HTMLElement) => {
  const declaration = getComputedStyle(el)
  const getValue = (key: string) => declaration.getPropertyValue(key)
  return {
    getValue,
    getDuration(key: string) {
      const val = getValue(key)
      return val === '' ? 0 : duration(val)
    }
  }
}