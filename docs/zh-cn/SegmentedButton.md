# Segmented Button

用于单选选项切换或分组选项。

```html preview
<s-segmented-button>
  <s-segmented-button-item value="a">
    item1
  </s-segmented-button-item>
  <s-segmented-button-item value="b">
    item2
  </s-segmented-button-item>
  <s-segmented-button-item value="c">
    item3
  </s-segmented-button-item>
  <s-segmented-button-item value="d">
    item4
  </s-segmented-button-item>
</s-segmented-button>
```
 
> 你可以设置 **value** 来默认选中，也可以设置 item 的 **selected** 属性来默认选中。

禁用状态

```html preview
<s-segmented-button>
  <s-segmented-button-item selected="true">
    item1
  </s-segmented-button-item>
  <s-segmented-button-item disabled="true">
    item2
  </s-segmented-button-item>
  <s-segmented-button-item>
    item3
  </s-segmented-button-item>
  <s-segmented-button-item disabled="true">
    item4
  </s-segmented-button-item>
</s-segmented-button>
```

---

## 属性

| 名称  | 类型    | 默认值 | 同步 | 介绍                                |
| ----- | ------ | ------ | --- | ----------------------------------- |
| value | string |        | 否  | 选中的值，需 item 同时设置 value 属性 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class SegmentedButton extends HTMLElement {
  //子项目
  readonly options: SegmentedButtonItem[] = []
  //当前选中下标
  readonly selectedIndex: number = -1
}
```

---

## CSS 变量

| 名称              | 介绍     |
| ----------------- | ------- |
| --s-color-outline | 边框颜色 |

---

# Segmented Button Item

该组件仅作为 Segmented Button 的子组件，不可单独使用。

---

## 子属性

| 名称       | 类型     | 默认值 | 同步 | 介绍          |
| ---------- | ------- | ------ | --- | ------------- |
| selected   | boolean | false  | 是  | 是否选中       |
| disabled   | boolean | false  | 是  | 是否禁用       |
| selectable | boolean | true   | 否  | 是否启用可选中 |
| value      | string  |        | 否  | 值            |

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
| --s-color-on-surface             | 前景色     |
| --s-color-outline                | 边框颜色   |
| --s-color-secondary-container    | 选中背景色 |
| --s-color-on-secondary-container | 选中前景色 |
| --s-color-on-surface             | 禁用前景色 |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)