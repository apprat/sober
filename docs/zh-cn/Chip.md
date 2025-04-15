# Chip

纸片，它可以作为 [Chekbox](/component/checkbox) 的替代选择，它们拥有相似的行为。

```html preview
<s-chip> Chip1 </s-chip>
<s-chip>
  <s-icon slot="start" name="home"></s-icon>
  Chip2
</s-chip>
<s-chip>
  <s-icon slot="start" name="home"></s-icon>
  Chip3
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-chip>
```

设置 `clickable` 属性允许点击选中，你可以同时使用 `checked` 属性来设置选中状态。

```html preview
<s-chip clickable="true"> Chip1 </s-chip>
<s-chip clickable="true" checked="true">
  <s-icon slot="start" name="home"></s-icon>
  Chip2
</s-chip>
<s-chip clickable="true">
  <s-icon slot="start" name="home"></s-icon>
  Chip3
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-chip>
```

使用 `outlined` 样式

```html preview
<s-chip clickable="true" type="outlined"> Chip1 </s-chip>
<s-chip clickable="true" checked="true" type="outlined">
  <s-icon slot="start" name="home"></s-icon>
  Chip2
</s-chip>
<s-chip clickable="true" type="outlined">
  <s-icon slot="start" name="home"></s-icon>
  Chip3
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-chip>
```

在 Vue 中可以使用 `v-model.lazy` 来绑定。

```html
<template>
  <s-chip v-model.lazy="checked" clickable="true" type="checkbox"></s-chip>
</template>
<script setup>
  import { ref } from 'vue'
  const checked = ref(false)
</script>
```

> [!WARNING]
> 请注意，使用 v-model 时，你必须定义 `type` 属性值为 `checkbox`。


---

## 属性

| 名称      | 类型              | 默认值   | 同步 | 介绍           |
| --------- | ---------------- | -------- | --- | -------------- |
| value     | string           |          | 是  | 值             |
| type      | filled, outlined | filled   | 是  | 样式            |
| clickable | boolean          | false    | 是  | 是否启用点击选中 |
| checked   | boolean          | false    | 是  | 是否选中        |
| disabled  | boolean          | false    | 是  | 是否禁用        |

---

## 插槽

| 名称   | 介绍                                       |
| ------ | ------------------------------------------ |
| start  | 开始位置插槽，默认支持 svg、icon             |
| end    | 开始位置插槽，默认支持同 start               |
| action | 操作插槽，默认支持 icon、icon-button、button |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)