type Value<T extends keyof HTMLElementEventMap> = {
  element: HTMLElement | Document | Window,
  events: T[]
}

export const oneEvent = <T extends keyof HTMLElementEventMap>(value: Value<T>[], callback: (event: HTMLElementEventMap[T]) => void) => {
  const calls: {
    element: HTMLElement | Document | Window,
    events: { [key: string]: Function }
  }[] = []
  const remove = () => {
    for (const { element, events } of calls) {
      for (const key in events) {
        element.removeEventListener(key, events[key] as never)
      }
    }
  }
  for (const { element, events } of value) {
    const v: typeof calls[number] = { element, events: {} }
    for (const event of events) {
      const call = (e: HTMLElementEventMap[T]) => {
        callback(e)
        remove()
      }
      element.addEventListener(event, v.events[event] = call as never)
    }
    calls.push(v)
  }
}