# Snackbar

提示框。

```html preview
<s-snackbar>
  <s-button slot="trigger"> 提示 </s-button>
  Message
  <s-button slot="action" type="text"> 关闭 </s-button>
</s-snackbar>
```

---

#### 动态调用

大多数情况下你可能需要更简洁的函数式调用而非使用布局。

```ts
import { Snackbar } from 'sober'

Snackbar.builder('hello world')
```

使用 `type` 设置提示框类型。

```html preview
<s-snackbar type="info"> 
  <s-button slot="trigger"> info </s-button>
  Message 
</s-snackbar>
<s-snackbar type="success"> 
  <s-button slot="trigger"> success </s-button>
  Message 
</s-snackbar>
<s-snackbar type="warning"> 
  <s-button slot="trigger"> warning </s-button>
  Message 
</s-snackbar>
<s-snackbar type="error"> 
  <s-button slot="trigger"> error </s-button>
  Message 
</s-snackbar>
```


---

## 属性 Props

| 名称     | 类型                                 | 默认值 | 同步 | 介绍    |
| -------- | ----------------------------------- | ------ | --- | ------- |
| type     | none, info, success, warning, error | none   | 是  | 样式    |
| duration | number                              | 4000   | 否  | 持续时间 |
| align    | auto, top, bottom                   | auto   | 是  | 位置     |

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

| 名称    | 介绍     |
| ------- | ------- |
| trigger | 触发器   |
| icon    | 图标     |
| action  | 操作按钮 |

---

## 原型

```ts
interface Options {
  root?: Element //插入的目标元素，默认为 document.body 下第一个 s-page
  icon?: string | Element //图标，支持元素和 HTML 字符串
  text?: string //文本
  type?: 'none' | 'info' | 'success' | 'warning' | 'error' //提示框类型
  duration?: number //持续时间
  //操作按钮
  action?: string | {
    text: string
    click: (event: MouseEvent) => unknown
  }
}

class Snackbar extends HTMLElement implements Props {
  //动态创建提示框
  static readonly builder(options: string | Options): Dialog
  //显示提示框
  readonly show(): void
  //隐藏提示框
  readonly close(): void
} 
```