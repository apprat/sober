# 更新日志

## v2.0.0

Sober 2.0.0 正式发布，本次带来了很大功能性更新和增强，请注意，v2 组件不完全兼容 v1 版本，请阅读文档后再考虑升级。  

组件核心更新：

1. 组件支持 `Tab` 向下选中焦点，使用 `shift` + `Tab` 向上切换焦点，使用空格或回车触发点击事件。

2. 属性布尔值简写，在 v1 中布尔值属性你必须明确值为 `true` 或 `false`，在新版本中，你可以省略值，布尔值会把除 `false` 之外的任意值都解析为 `true`。

```html
<!--v1中，你必须设置值-->
<s-button disabled="true"></s-button>
<!--v2中，你可以省略值-->
<s-button disabled></s-button>
```

## 组件更新(按字母顺序)

### Alert

- 原属性 `type` 变更为 `variant`，用于设置变体。
- 新增属性 `collapsed`，用于设置是否支持折叠。
- 新增属性 `opened`，用于设置折叠后默认展开。

### Appbar

- 新增属性 `variant`，用于设置变体，提供了亮色和暗色两种变体。
- 新增属性 `breakpointCompact`，用于定义响应式断点，当组件宽度小于等于该值时，组件会使用紧凑型样式。
- 新增属性 `centerTitle`，用于设置居中标题。

### Badge

- 无更新。

### Avatar

- 无更新。

### BaseColor (新增)

基础颜色选择组件，请查看[详细文档](https://soberjs.com/components/base-color.md)以获取更多信息。

### BaseDate (新增)

基础日期选择组件，请查看[详细文档](https://soberjs.com/components/base-date.md)以获取更多信息。

### BaseSlider (新增)

基础滑块组件，请查看[详细文档](https://soberjs.com/components/base-slider.md)以获取更多信息。

### BaseTime (新增)

基础时间选择面板，请查看[详细文档](https://soberjs.com/components/base-time.md)以获取更多信息。

### ButtonGroup (新增)

按钮组，该组件提供一个容器容纳 Button、IconButton 组件。

### Button

- 原属性 `type` 变更为 `variant`，用于设置变体。
- 新增属性 `size`，用于设置按钮尺寸。
- 新增属性 `checkable`，用于设置按钮是否可切换。
- 新增属性 `checked`，用于设置切换的按钮是否选中。

### Card

- 无更新。

### Drawer

- 新增属性 `startOpened` ，用于设置 `start` 抽屉是否开启。
- 新增属性 `endOpened` ，用于设置 `end` 抽屉是否开启。
- 新增属性 `startFloatingOpened` ，用于设置浮动 `start` 抽屉是否开启。
- 新增属性 `endFloatingOpened` ，用于设置浮动 `end` 抽屉是否开启。

### Dialog

- 插槽 `trigger`，被移除，现在当它的父元素被点击时，会触发开启。
- 新增属性 `disabled` ，用于设置是否禁用开启。

### Ripple

该组件不再提供容器效果，现在你必须为它提供一个容器。

- 新增属性 `disabled` ，用于设置是否触发波纹。
- 移除属性 `attached` 。

```html
<button>
  hello world
  <s-ripple></s-ripple>
</button>
```

- 属性 `attached` 移除，它现在默认效果等同于原来 `attached` 为 `true`。
- 标记属性 `rippled` 变更为 `ripple-pressed`。
- 新增标记属性 `ripple-hovered`。

### Tab

- 新增属性 `multiple` 用于设置多选。
- 新增属性 `variant` 用于变体。
- 新增属性 `orientation` 用于设置方向。

### Tooltip

该组件不再提供容器效果，现在你必须为它提供一个容器，当鼠标移入容器时（移动设备上长按），会显示提示。

```html
<button>
  hello world
  <s-tooltip> help text </s-tooltip>
</button>
```

### Progress (新增)

该组件提供了两种变体，`linear` 和 `circular`，同时旧的组件 **CircularProgress** 组件和 **LinearProgress** 组件被弃用，请查看[详细文档](https://soberjs.com/components/progress.md)以获取更多信息。
