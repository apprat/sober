export const bezier = (x1: number, y1: number, x2: number, y2: number) => {
  const sample = (t: number, a: number, b: number) => {
    const i = 1 - t
    return 3 * i * i * t * a + 3 * i * t * t * b + t * t * t
  }
  return (x: number) => {
    let l = 0, h = 1, t = 0
    for (let i = 0; i < 14; i++) {
      t = (l + h) / 2
      sample(t, x1, x2) < x ? l = t : h = t
    }
    return sample(t, y1, y2)
  }
}