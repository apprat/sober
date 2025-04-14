# Switch

开关是 Checkbox 的替代。

```html preview
<s-switch></s-switch>
<s-switch checked="true"></s-switch>
```

设置 `disabled` 来禁用开关。

```html preview
<s-switch disabled="true"></s-switch>
<s-switch disabled="true" checked="true"></s-switch>
```

自定义颜色

```html preview
<s-switch style="color: #009688"></s-switch>
<s-switch style="color: #b54e4e" checked="true"></s-switch>
```

在 Vue 中使用 `v-model.lazy` 双向绑定。

```html
<template>
  <s-switch v-model.lazy="checked" type="checkbox"></s-switch>
</template>
<script setup>
  import { ref } from 'vue'
  const checked = ref(false)
</script>
```

> [!WARNING]
> 请注意，使用 v-model 时，你必须定义 `type` 属性值为 `checkbox`。

使用插槽添加图标

```html preview
<s-switch checked="true">
  <s-icon slot="icon" name="star"></s-icon>
</s-switch>
```

---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍     |
| -------- | ------- | ------ | ---- | ------- |
| checked  | boolean | false  | 是   | 是否选中 | 
| disabled | boolean | false  | 是   | 是否禁用 |

---

## 事件


| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 插槽

| 名称 | 介绍  |
| ---- | ---- |
| icon | 图标 |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)