# drawer

抽屉，该组件提供左右抽屉。

```html preview
<s-drawer style="height: 500px">
  <div slot="start"> start </div>
  <s-appbar>
    <s-icon-button slot="nav">
      <s-icon name="menu"></s-icon>
    </s-icon-button>
    <span slot="title">Material 3</span>
    <s-icon-button slot="action">
      <s-icon name="search"></s-icon>
      <s-tooltip>搜索</s-tooltip>
    </s-icon-button>
  </s-appbar>
  <div slot="end"> end </div>
</s-drawer>
```

## 模式

设置 `mode` 属性，可以设置抽屉的显示模式，可选值有 `auto`（自动）、`sidebar`（侧栏）、`overlay`（覆盖），默认为 `auto`。

```html preview
<s-drawer style="height: 500px" startOpened="false">
  <div slot="start"> start </div>
  hello world
  <div slot="end"> end </div>
</s-drawer>
```

该组件是响应式的，组件自身宽带小于或等于 `breakpointFloating` 时，左右抽屉将浮动在组件之上，如果你希望组件始终保持固定，请将 `breakpointFloating` 设置为 `-1`，或者将 `breakpointFloating` 设置为 `Infinity` 则组件将始终浮动左右抽屉。

---

## 属性

| 名称               | 类型                   | 默认值 | 同步 | 说明                                                                                       |
| ------------------ | ---------------------- | ------ | ---- | ------------------------------------------------------------------------------------------ |
| mode               | auto, sidebar, overlay | auto   | ×    | 模式                                                                                       |
| sidebarStartOpened | boolean                | true   | √    | 侧栏 start 抽屉展开的                                                                      |
| sidebarEndOpened   | boolean                | true   | √    | 侧栏 end 抽屉展开的                                                                        |
| overlayStartOpened | boolean                | false  | √    | 浮动结束抽屉展开的                                                                         |
| overlayEndOpened   | boolean                | false  | √    | 浮动结束抽屉展开的                                                                         |
| modeBreakpoint     | number                 | 1024   | √    | 模式断点，当 `auto` 模式下，组件自身宽度大于该值时切换为 `fixed` 模式，反之 `overlay` 模式 |
