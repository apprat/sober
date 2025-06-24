# Navigation

用于在屏幕底部显示或左侧显示的导航栏。

```html preview
<s-navigation>
  <s-navigation-item selected="true">
    <s-icon name="add" slot="icon"></s-icon>
    <div slot="text">Item 1</div>
    <s-badge slot="badge"></s-badge>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon name="search" slot="icon"></s-icon>
    <div slot="text">Item 2</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon name="dark_mode" slot="icon"></s-icon>
    <div slot="text">Item 3</div>
    <s-badge slot="badge">99</s-badge>
  </s-navigation-item>
</s-navigation>
```

> 在子项目上设置了 `value` 属性后，你可以在组件上设置 `value` 属性来选中某项，也可以通过子项目的 `selected` 属性来选中某项。

设置 `mode` 为导轨模式.

```html preview
<s-navigation mode="rail">
  <s-navigation-item selected="true">
    <s-icon name="add" slot="icon"></s-icon>
    <div slot="text">Item 1</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon name="search" slot="icon"></s-icon>
    <div slot="text">Item 2</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon name="dark_mode" slot="icon"></s-icon>
    <div slot="text">Item 3</div>
  </s-navigation-item>
</s-navigation>
```

在 Vue 中使用 `v-model.lazy` 双向绑定。

```html
<template>
  <s-navigation v-model.lazy="select">
    <s-navigation-item value="a"></s-navigation-item>
    <s-navigation-item value="b"></s-navigation-item>
    <s-navigation-item value="c"></s-navigation-item>
  </s-navigation>
</template>

<script setup>
import { ref } from 'vue'
const select = ref('b')
</script>
```

---

## 属性 Props

| 名称  | 类型          | 默认值 | 同步 | 介绍                                |
| ----- | ------------ | ------ | --- | ----------------------------------- |
| value | string       |        | 否  | 选中的值，需 item 同时设置 value 属性 |
| mode  | bottom, rail | bottom | 是  | 模式                                |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class Navigation extends HTMLElement implements Props {
  //子项目
  readonly options: NavigationItem[] = []
  //当前选中下标
  readonly selectedIndex: number = -1
}
```

---

# Navigation Item

该组件仅作为 Navigation 的子组件，单独使用时没有效果。

---

## 子属性

| 名称     | 类型     | 默认值 | 同步 | 介绍          |
| -------- | ------- | ------ | --- | ------------- |
| selected | boolean | false  | 是  | 是否选中       |
| value    | string  |        | 否  | 值            |

---

## 子插槽

| 名称  | 介绍                      |
| ----- | ------------------------ |
| text  | 文本                     |
| icon  | 图标，默认支持 svg、icon  |
| badge | 徽章                     |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)