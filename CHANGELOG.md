# 更新日志

## v2.0.0

Sober 2.0.0 正式发布，本次带来了很大功能性更新，请注意，v2 不兼容 v1 版本，请阅读文档后再考虑升级。  

组件核心更新：

1. 部分组件支持 `Tab` 选中焦点，使用空格或回车触发点击事件。

2. 属性布尔值简写，在旧版本中，布尔值你始终明确值，例如：

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

- 新增属性 `variant`，用于设置变体。
- 新增属性 `breakpointCompact`，用于设置响应式断点。
- 新增属性 `centerTitle`，用于设置居中标题。

### BaseSlider (新增)

新增组件 BaseSlider，用于创建基础滑块，该组件提供了强大的自定义能力，允许你创建复杂的滑块或进度条场景，请查看[详细文档](https://soberjs.com/components/base-slider)以获取更多信息。

### Button

- 原属性 `type` 变更为 `variant`，用于设置变体。
- 新增属性 `size`，用于设置按钮尺寸。
- 新增属性 `checkable`，用于设置按钮是否可切换。
- 新增属性 `checked`，用于设置切换的按钮是否选中。

### Drawer

- 新增属性 `startOpened` ，用于设置 `start` 抽屉是否开启。
- 新增属性 `endOpened` ，用于设置 `end` 抽屉是否开启。
- 新增属性 `startFloatingOpened` ，用于设置浮动 `start` 抽屉是否开启。
- 新增属性 `endFloatingOpened` ，用于设置浮动 `end` 抽屉是否开启。

### Dialog

- 插槽 `trigger`，被移除，现在当它的父元素被点击时，会触发开启。
- 新增属性 `attached` ，用于设置是否启用父元素触发（默认启用）。

### Ripple

该组件不再提供容器效果，现在你必须为它提供一个容器。

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

经过和一些开发者的讨论：提供一个 trigger 插槽或者主动调用 .show() 方法，前者局限性太大；比如你无法嵌套在 Tab 中，而后者则需要 js 驱动，因此我们决定取消这个功能。  
现在，该组件不再提供容器效果，现在你必须为它提供一个容器，当鼠标移入容器时（移动设备上长按），会显示提示。

```html
<button>
  hello world
  <s-tooltip> help text </s-tooltip>
</button>
```
