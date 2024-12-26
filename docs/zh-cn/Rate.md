# Rate

评分组件。

```html preview
<s-rate></s-rate>
```

设置 `readonly` 启用只读模式。

```html preview
<s-rate readOnly="true"></s-rate>
```

使用 `track` 和 `indicator` 插槽来自定义图标，你可以使用 svg 或者 icon 组件。

```html preview
<s-rate>
  <s-icon slot="track" type="favorite"></s-icon>
  <s-icon slot="indicator" type="favorite"></s-icon>
</s-rate>
```

在 Vue 中使用 `v-model` 绑定。

```html
<template>
  <s-rate v-model="rate"></s-rate>
</template>
<script setup>
import { ref } from 'vue'
const rate = ref(2.5)
</script>
```

---

## 属性

| 名称      | 类型    | 默认值 | 同步 | 介绍           |
| -------- | ------- | ------ | --- | -------------- |
| readOnly | boolean | false  | 是  | 是否启用只读模式 |
| max      | number  | 10     | 否  | 最大值          |
| min      | number  | 0      | 否  | 最小值          |
| step     | number  | 1      | 否  | 步进值          |
| value    | number  | 5      | 否  | 当前值          |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍            |
| ------ |------ |------|------ |---------------- |
| input  | Event | 否   | 否     | 值变化后触发     |
| change | Event | 否   | 否     | 值变化后完成触发 |

---

## 插槽

| 名称      | 介绍   |
| --------- | ------ |
| track     | 轨道   |
| indicator | 指示器 |

---

## CSS 变量

| 名称                          | 介绍      |
| ----------------------------- | --------- |
| --s-color-secondary-container | 轨道颜色   |
| --s-color-primary             | 指示器颜色 |