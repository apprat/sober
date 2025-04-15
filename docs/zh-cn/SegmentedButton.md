# Segmented Button

用于单选选项切换或分组选项。

```html preview
<s-segmented-button value="b">
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

填充容器，子项目会均分宽度，通常适用于较少项单选。

```html preview
<s-segmented-button value="b" mode="fixed">
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
 
> 在子项目上设置了 `value` 属性后，你可以在组件上设置 `value` 属性来选中某项，也可以通过子项目的 `selected` 属性来选中某项。

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
  <s-segmented-button-item>
    item4
  </s-segmented-button-item>
</s-segmented-button>
```

在 Vue 中使用 `v-model.lazy` 双向绑定。

```html
<template>
  <s-segmented-button v-model.lazy="select">
    <s-segmented-button-item value="a">A</s-segmented-button-item>
    <s-segmented-button-item value="b">B</s-segmented-button-item>
    <s-segmented-button-item value="c">C</s-segmented-button-item>
  </s-segmented-button>
</template>
<script setup>
  import { ref } from 'vue'
  const select = ref('b')
</script>
```

---

## 属性 Props

| 名称  | 类型         | 默认值 | 同步 | 介绍                                |
| ----- | ----------- | ------ | --- | ----------------------------------- |
| value | string      |        | 否  | 选中的值，需 item 同时设置 value 属性 |
| mode  | auto, fiexd | auto   | 否  | 模式                                |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class SegmentedButton extends HTMLElement implements Props {
  //子项目
  readonly options: SegmentedButtonItem[] = []
  //当前选中下标
  readonly selectedIndex: number = -1
}
```

---

# Segmented Button Item

该组件仅作为 Segmented Button 的子组件，单独使用时没有效果。

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

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)