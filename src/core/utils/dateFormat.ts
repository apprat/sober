export const dateFormat = (date: Date | string, format = '%Y-%m-%d') => {
  if (typeof date === 'string') date = new Date(date)
  const Y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return format.replace(/%Y/g, Y.toString()).replace(/%m/g, m.toString().padStart(2, '0')).replace(/%d/g, d.toString().padStart(2, '0'))
}