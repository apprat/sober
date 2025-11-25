# 更新日志

## v2.0.0

Sober 2.0.0 正式发布，本次带来了很大功能性更新和增强，请注意，v2 组件不完全兼容 v1 版本，请阅读文档后再考虑升级。  

组件核心更新：

1. 键盘访问支持：支持 `Tab` 向下选中焦点，使用 `shift` + `Tab` 向上切换焦点，使用空格或回车触发点击事件，使用方向键增加/减少值。

2. 动画优化，引入了新的动画过渡曲线，修复第一次组件挂载时动画会执行一遍的问题（现在的动画和过渡动画保持一致，只有在挂载后变更时执行）。

3. Material 3 Expressive 设计支持：添加了新的 M3 组件同时移除了规范废弃的组件。

4. 触屏和鼠标设备兼容性支持：在设备同时支持触屏和鼠标的设备上进行了兼容性的支持（例如插入鼠标的平板电脑），以同时响应触屏和鼠标事件。

5. 属性简写：在 v1 中布尔值属性你必须明确值为 `true` 或 `false`，在新版本中，你可以省略值，布尔值会把除 `false` 之外的任意值都解析为 `true`。

6. 私有 CSS 变量更新：现在可以允许你定义在祖先元素上，同时所有私有 CSS 变量均采用 `--s-组件名称` 作为前缀。

7. 组件增强：大多数组件都获得了不同程度的增强和新的属性支持。

## 组件更新(按字母顺序)

### Alert

- 原属性 `type` 变更为 `variant`，用于设置变体。
- 新增属性 `collapsed`，用于设置是否支持折叠。
- 新增属性 `opened`，用于设置折叠后默认展开。
- 新增插槽 `title`，用于设置标题。

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

### Progress

**LinearProgress** 组件名称更新为 **Progress**。

### Switch

新增拖动手势，现在可以通过按住拖动来切换选中。

- 新增属性 `value` 用于绑定自定义值。

### Page

- 新增 `--s-font-size` CSS 变量，用于定义页面字体大小比例，默认为 `1`。
