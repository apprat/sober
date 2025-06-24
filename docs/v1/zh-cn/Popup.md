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
<s-popup align="center">
  <s-button slot="trigger"> center (默认值) </s-button>
  <div style="min-height: 280px; width: 128px"></div>
</s-popup>

<s-popup align="left">
  <s-button slot="trigger"> left </s-button>
  <div style="min-height: 280px; width: 128px"></div>
</s-popup>

<s-popup align="right">
  <s-button slot="trigger"> right </s-button>
  <div style="min-height: 280px; width: 128px"></div>
</s-popup>
```

用鼠标右键打开弹出框

```html preview
<s-popup id="popup">
  <div style="min-height: 280px; min-width: 128px"></div>
</s-popup>
<div style="height: 280px" oncontextmenu="event.preventDefault(); document.querySelector('#popup').show({ x: event.clientX, y: event.clientY })"></div>
```

---

## 属性 Props

| 名称   | 类型                 | 默认值 | 同步 | 介绍    |
| ------ | ------------------- | ------ | --- | ------- |
| align  | center, left, right | center | 否  | 位置    |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍                |
| ------ |------ |------|------ |-------------------- |
| show   | Event | 否   | 是    | `扩展` 显示时触发     |
| showed | Event | 否   | 否    | `扩展` 显示完成后触发 |
| close  | Event | 否   | 是    | 隐藏时触发           |
| closed | Event | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称     | 介绍     |
| -------- | ------- |
| trigger  | 触发器   |

---

## 原型

```ts
interface Position { 
  x: number //x坐标
  y: number //y坐标
  origin?: string //方向，如：left top
}

class Popup extends HTMLElement implements Props {
  //显示弹出框
  readonly show(option?: HTMLElement | Position): void
  //切换弹出框
  readonly toggle(option?: HTMLElement | Position): void
  //关闭弹出框
  readonly close(): void
} 
```