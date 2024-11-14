# Popup

弹出框。

```html preview
<s-popup>
  <s-button slot="trigger"> popup </s-button>
  <div style="min-height: 280px; width: 128px"></div>
</s-popup>
```

大多数情况下，你不需要关心弹出框出现的位置，但你还是可以使用 `align` 属性设置默认位置。

```html preview
<s-popup align="right">
  <s-button slot="trigger"> popup </s-button>
  <div style="min-height: 280px; width: 128px"></div>
</s-popup>
```

用鼠标右键打开弹出框

```html preview
<s-popup id="popup">
  <div style="min-height: 280px; min-width: 128px"></div>
</s-popup>
<div style="height: 280px" oncontextmenu="event.preventDefault(); document.querySelector('#popup').show(event.clientX, event.clientY)"></div>
```

> 注意：该组件使用了 fixed 定位，在该组件的祖先元素中，应当避免**同时**出现滚动和[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)。

---

## 属性

| 名称  | 类型                 | 默认值 | 是否同步 | 介绍 |
| ----- | ------------------- | ------ | ------- | ---- |
| align | center, left, right | center | 是      | 位置 |

---

## 事件

| 名称      | 参数   | 冒泡 | 可取消 | 介绍                |
| --------- |------ |------|------ |-------------------- |
| show      | Event | 否   | 是    | `扩展` 显示时触发     |
| showed    | Event | 否   | 否    | `扩展` 显示完成后触发 |
| dismiss   | Event | 否   | 是    | `扩展` 隐藏时触发     |
| dismissed | Event | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称     | 介绍     |
| -------- | ------- |
| trigger  | 触发器   |

---

## 原型

```ts
class Popup extends HTMLElement {
  //显示弹出框 xOrEl=x坐标或者元素，y=y坐标，origin=展开方向 CSS transform-origin 的参数值
  readonly show(xOrEl?: HTMLElement | number, y?: number, origin?: string): void
  //显示或隐藏弹出框
  readonly toggle(xOrEl?: HTMLElement | number, y?: number, origin?: string): void
  //隐藏弹出框
  readonly dismiss(): void
} 
```

---

## CSS 变量

| 名称                             | 介绍           |
| -------------------------------- | ------------- |
| --s-color-surface-container-high | 弹出框背景颜色 |
| --s-elevation-level2             | 弹出框阴影     |