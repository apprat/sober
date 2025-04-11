export const dateFormat = (date: Date | string, format = 'yyyy-MM-dd') => {
  if (typeof date === 'string') date = new Date(date)
  const Y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return format.replace('yyyy', Y.toString()).replace('MM', m.toString().padStart(2, '0')).replace('DD', d.toString().padStart(2, '0'))
}