# drawer

抽屉，该组件提供左右抽屉，并提供响应式的抽屉宽度，在较小的宽度下，抽屉会切换为浮动模式。

```html preview
<s-drawer style="height: 500px">
  <div slot="start"> start </div>
  hello world
  <div slot="end"> end </div>
</s-drawer>
```

设置默认展开，你可以控制两种状态下的默认展开或关闭。

```html preview
<s-drawer style="height: 500px" start-open="true">
  <div slot="start"> start </div>
  hello world
  <div slot="end"> end </div>
</s-drawer>
```

该组件是响应式的，组件自身宽带小于或等于 `breakpointFloating` 时，左右抽屉将浮动在组件之上，如果你希望组件始终保持固定，请将 `breakpointFloating` 设置为 `-1`，或者将 `breakpointFloating` 设置为 `Infinity` 则组件将始终浮动左右抽屉。

---

## 属性

| 名称                | 类型    | 默认值 | 同步 | 说明               |
| ------------------- | ------- | ------ | ---- | ------------------ |
| startOpened         | boolean | true   | ✔️ | 开始抽屉展开的     |
| endOpened           | boolean | true   | ✔️ | 结束抽屉展开的     |
| startFloatingOpened | boolean | false  | ✔️ | 浮动开始抽屉展开的 |
| endFloatingOpened   | boolean | false  | ✔️ | 浮动结束抽屉展开的 |
| breakpointFloating  | number  | 1024   | ✖️ | 断点：浮动型       |
