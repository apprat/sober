# Tooltip

工具提示，在支持鼠标的设备上通过鼠标悬停触发提示信息，在触屏设备上通过长按触发。

```html preview
<s-tooltip>
  <s-button slot="trigger">Tooltip</s-button>
  提示信息
</s-tooltip>

<s-tooltip>
  <s-button slot="trigger">Image</s-button>
  <img src="/images/qrcode_qq_group.jpg" style="max-width: 128px">
</s-tooltip>
```

工具提示支持自定义布局，例如放置图片，但请注意，无论你放置什么布局，都无法触发任何事件。

> 注意：该组件使用了 fixed 定位，在该组件的祖先元素中，应当避免**同时**出现滚动和[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)。

---

## 原型

```ts
class Tooltip extends HTMLElement {
  show(align?: 'bottom' | 'top'): void //显示提示框
  dismiss(): void //隐藏提示框
} 
```

---

## CSS 变量

| 名称                         | 介绍            |
| ---------------------------- | -------------- |
| --s-color-inverse-surface    | 工具提示背景颜色 |
| --s-color-inverse-on-surface | 工具提示文本颜色 |
| --z-index                    | 弹出层权重     |