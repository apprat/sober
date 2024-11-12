# Picker

用于单选数据，它是原生 `<select>` 的替代。

```html preview
<s-picker label="地区">
  <s-picker-item value="gui yang">贵阳</s-picker-item>
  <s-picker-item value="bei jing">北京</s-picker-item>
  <s-picker-item value="shang hai">上海</s-picker-item>
  <s-picker-item value="shen zhen">深圳</s-picker-item>
  <s-picker-item value="cheng du">成都</s-picker-item>
  <s-picker-item value="wu han">武汉</s-picker-item>
  <s-picker-item value="nan chang">南昌</s-picker-item>
  <s-picker-item value="hang zhou">杭州</s-picker-item>
</s-picker>
```

> 你可以设置 **value** 来默认选中，也可以设置 item 的 **selected** 属性来默认选中。


自定义触发按钮，你需要自己处理选中显示。

```html preview
<s-picker onchange="this.firstElementChild.textContent = this.options[this.selectedIndex].textContent">
  <s-button slot="trigger">地区</s-button>
  <s-picker-item>贵阳</s-picker-item>
  <s-picker-item>北京</s-picker-item>
  <s-picker-item>上海</s-picker-item>
  <s-picker-item>深圳</s-picker-item>
  <s-picker-item>成都</s-picker-item>
  <s-picker-item>武汉</s-picker-item>
  <s-picker-item>南昌</s-picker-item>
  <s-picker-item>杭州</s-picker-item>
</s-picker>
```

---

## 属性

| 名称     | 类型     | 默认值 | 是否同步 | 介绍                               |
| -------- | ------- | ------ | ------- | ---------------------------------- |
| label    | string  |        | 否      | 标签文本                            |
| value    | string  |        | 否      | 选中的值，需 item 同时设置 value 属性 |
| disabled | boolean | false  | 否      | 是否禁用                            |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 插槽

| 名称    | 介绍   |
| ------- | ----- |
| trigger | 触发器 |

---

## 原型

```ts
class Picker extends HTMLElement {
  //子项目
  readonly options: PickerButtonItem[] = []
  //当前选中下标 
  readonly selectedIndex: number = -1
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

| 名称                         | 介绍            |
| ---------------------------- | -------------- |
| --picker-border-radius       | `私有` 边框圆角 |
| --picker-border-color        | `私有` 边框颜色 |
| --picker-border-width        | `私有` 边框宽度 |
| --picker-padding             | `私有` 内边距   |
| --picker-height              | `私有` 高度     |
| --s-color-on-surface-variant | 图标颜色        |

---

# Picker Item

该组件仅作为 Picker 的子组件，不可单独使用。

---

## 子属性

| 名称     | 类型     | 默认值 | 是否同步 | 介绍     |
| -------- | ------- | ------ | ------- | ------- |
| selected | boolean | false  | 是      | 是否选中 |
| value    | string  |        | 否      | 值      |

---

## 子插槽

| 名称   | 介绍                             |
| ------ | ------------------------------- |
| start  |  开始位置插槽，默认支持 svg、icon |
| end    |  开始位置插槽，默认支持同 start   |

---

## 子 CSS 变量

| 名称                             | 介绍       |
| -------------------------------- | --------- |
| --s-color-secondary-container    | 选中背景色 |
| --s-color-on-secondary-container | 选中前景色 |
| --s-color-on-surface-variant     | svg 颜色   |