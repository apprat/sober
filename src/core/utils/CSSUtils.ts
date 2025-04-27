export const convertCSSDuration = (value: string) => {
  const list = value.trim().match(/^([\d\.]+)(s|ms)$/)
  if (!list) throw new Error()
  const number = Number(list[1])
  if (list[2] === 's') return number * 1000
  return number
}