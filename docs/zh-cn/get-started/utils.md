# Utils

在 Sober 的核心里，内置了一些工具函数，你可以主动 `import` 来使用它们。

## scrollElenet 滚动元素

将目标元素滚动到指定位置（附带动画）

```ts
import { scrollElement } from 'sober/core/utils/scrollElement.js'
```

```ts
type Options = {
  element: HTMLElement //目标元素
  left?: number // scrollLeft 为空则不滚动
  top?: number //scrollTop 为空则不滚动
  duration: number //动画时长，单位毫秒，如 400
  easing?: string //动画曲线，支持linear、ease、ease-in、ease-out、ease-in-out、或自定义曲线 cubic-bezier(0.2, 0, 0, 1)，默认值 ease
}

export const scrollElement = (options: Options) => void
```

## getStackingContext 获取目标元素层叠上下文

该函数用于检测目标的层叠上下文位置以及宽高，在 fixed 定位时有用。

```ts
import { getStackingContext } from 'sober/core/utils/getStackingContext.js'
```

```ts
export declare const getStackingContext: (el: Node) => {
  left: number
  top: number
  width: number
  height: number
}
```
