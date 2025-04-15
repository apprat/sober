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

## 属性 Props

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

| 名称     | 介绍                                         |
| -------- | ------------------------------------------- |
| start    |  开始位置插槽，默认支持 svg、icon, icon button |
| end      |  开始位置插槽，默认支持同 start                |
| dropdown |  下拉框                                      |

---

## 原型

```ts
class Search extends HTMLElement implements Props {
  //原生编辑框对象
  readonly native: HTMLInputElement
}
```