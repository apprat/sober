# drawer

抽屉，该组件提供左右抽屉，抽屉的默认模式为 `auto`，它会根据**窗口宽高比例**选择 `overlay` 覆盖模式，或 `sidebar` 侧边栏模式。

```html preview
<s-drawer style="height: 500px">
  <div slot="start"> </div>
  <s-appbar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉</s-tooltip>
    </s-icon-button>
    <span slot="title">Material 3</span>
    <s-icon-button slot="action" onclick="this.closest('s-drawer').toggle('end')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉2</s-tooltip>
    </s-icon-button>
  </s-appbar>
  <div slot="end"> </div>
</s-drawer>
```

## 模式

设置 `mode` 属性，可以设置抽屉固定显示模式。  

```html preview
<s-drawer style="height: 500px" mode="sidebar">
  <div slot="start" style="width: 200px"> </div>
  <s-appbar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉</s-tooltip>
    </s-icon-button>
    <span slot="title">Material 3</span>
  </s-appbar>
</s-drawer>

<s-drawer style="height: 500px" mode="overlay">
  <div slot="start"> </div>
  <s-appbar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉</s-tooltip>
    </s-icon-button>
    <span slot="title">Material 3</span>
  </s-appbar>
  <div slot="end"> </div>
</s-drawer>
```

---

## 属性

| 名称               | 类型                   | 默认值 | 同步 | 说明                                                                                     |
| ------------------ | ---------------------- | ------ | ---- | ---------------------------------------------------------------------------------------- |
| mode               | auto, sidebar, overlay | auto   | √    | 模式，默认为 auto 会根据**窗口宽高比例**选择 `overlay` 覆盖模式，或 `sidebar` 侧边栏模式 |
| sidebarStartOpened | boolean                | true   | √    | 侧栏 start 抽屉展开的                                                                    |
| sidebarEndOpened   | boolean                | true   | √    | 侧栏 end 抽屉展开的                                                                      |
| overlayStartOpened | boolean                | false  | √    | 覆盖 start 抽屉展开的                                                                    |
| overlayEndOpened   | boolean                | false  | √    | 覆盖 end 抽屉展开的                                                                      |

## 插槽

| 名称  | 说明     |
| ----- | -------- |
| 匿名  | 主要视图 |
| start | 左侧抽屉 |
| end   | 右侧抽屉 |

## 方法

`.toggle(slot, mode)` 切换抽屉。

- `slot`：`start | end` 抽屉。
- `mode`：`auto | sidebar | overlay` 可选，模式，默认为 `auto`。
- `return`：`undefined`。

`.getMode()` 获取模式。

- `return`：`sidebar | overlay`。

## HTML 标记属性

| 名称     | 说明           |
| -------- | -------------- |
| overlaid | 覆盖模式时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。
