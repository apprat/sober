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

> [!WARNING]
> 工具提示支持自定义布局，例如放置图片，但请注意，内部布局无法触发鼠标事件。

---

## 属性 Props

| 名称     | 类型                      | 默认值 | 同步 | 介绍    |
| -------- | ------------------------ | ------ | --- | ------- |
| align    | top, bottom, left, right | top    | 否  | 位置     |
| disabled | boolean                  | false  | 是  | 是否禁用 |

---

## 插槽

| 名称    | 介绍   |
| ------- | ----- |
| trigger | 触发器 |

## 原型

```ts
class Tooltip extends HTMLElement implements Props {
  //显示提示框
  readonly show(): void
  //隐藏提示框
  readonly close(): void
} 
```