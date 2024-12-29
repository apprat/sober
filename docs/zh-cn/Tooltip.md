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

---

## 属性

| 名称  | 类型                      | 默认值 | 同步 | 介绍 |
| ----- | ------------------------ | ------ | --- | ---- |
| align | top, bottom, left, right | top    | 否  | 位置 |

---

## 原型

```ts
class Tooltip extends HTMLElement {
  //显示提示框
  readonly show(): void
  //隐藏提示框
  readonly close(): void
  //位置
  align: 'top' | 'bottom' | 'left' | 'right' = 'top'
} 
```

---

## CSS 变量

| 名称                         | 介绍            |
| ---------------------------- | -------------- |
| --s-color-inverse-surface    | 工具提示背景颜色 |
| --s-color-inverse-on-surface | 工具提示文本颜色 |
| --z-index                    | 弹出层权重     |