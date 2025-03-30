# Search

小型搜索栏。

```html preview
<s-search placeholder="搜索关键字">
  <s-icon name="search" slot="start"></s-icon>
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-search>
```

使用 `dropdown` 插槽，当搜索框获得焦点时，插槽会显示。

```html preview
<s-search placeholder="搜索关键字">
  <s-icon name="search" slot="start"></s-icon>
  <s-icon name="close" slot="end"></s-icon>
  <div slot="dropdown" style="height: 128px"></div>
</s-search>
```

---

## 属性

| 名称        | 类型     | 默认值 | 同步 | 介绍    |
| ----------- | ------- | ------ | --- | ------- |
| placeholder | boolean | false  | 是  | 占位内容 |
| disabled    | boolean | false  | 是  | 是否禁用 |
| value       | boolean | false  | 是  | 值      |
| maxLength   | boolean | false  | 是  | 最大长度 |
| readOnly    | boolean | false  | 是  | 是否只读 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍            |
| ------ |------ |------|------ |---------------- |
| input  | Event | 否   | 否     | 值变化后触发     |
| change | Event | 否   | 否     | 值变化后完成触发 |
| focus  | Event | 否   | 否     | 获得焦点时触发   |
| blur   | Event | 否   | 否     | 丢失焦点时触发   |

---

## 插槽

| 名称     | 介绍                                          |
| -------- | -------------------------------------------- |
| start    |  开始位置插槽，默认支持 svg、icon, icon button |
| end      |  开始位置插槽，默认支持同 start                |
| dropdown |  下拉框                                      |

---

## 原型

```ts
class Search extends HTMLElement {
  //原生编辑框对象
  readonly native: HTMLInputElement
  //占位文本
  placeholder: string = ''
  //是否禁用
  disabled: boolean = false
  //是否只读
  readOnly: boolean = false
  //最大长度
  maxLength: number = -1
  //值
  value: string = ''
}
```

---

## CSS 变量

| 名称                             | 介绍             |
| -------------------------------- | --------------- |
| --s-color-surface-container-high | 背景颜色         |
| --s-color-on-surface             | 文本颜色         |
| --s-color-primary                | 选中文本背景颜色  |
| --s-color-on-primary             | 选中文本颜色     |
| --s-color-outline                | 占位内容文本颜色 |
| --s-color-outline-variant        | 下拉框边框颜色   |
| --s-color-on-surface-variant     | svg 颜色        |
| --s-elevation-level2             | 下拉框阴影       |