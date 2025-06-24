# Slider

滑块。

```html preview
<s-slider></s-slider>
```

设置 `labeled` 开启文本标签。

```html preview
<s-slider labeled="true"></s-slider>
```

设置 `disabled` 来禁用滑块。

```html preview
<s-slider disabled="true"></s-slider>
```

自定义颜色

```html preview
<s-slider style="color: #009688; --s-color-secondary-container: #b4deda"></s-slider>
```

在 Vue 中使用 `v-model` 绑定。

```html
<template>
  <s-slider v-model="slider"></s-slider>
</template>
<script setup>
  import { ref } from 'vue'
  const slider = ref(2.5)
</script>
```


---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍           |
| -------- | ------- | ------ | --- | -------------- |
| labeled  | boolean | false  | 是  | 是否启用文本标签 |
| disabled | boolean | false  | 是  | 是否禁用        |
| max      | number  | 100    | 否  | 最大值          |
| min      | number  | 0      | 否  | 最小值          |
| step     | number  | 1      | 否  | 步进值          |
| value    | number  | 50     | 否  | 当前值          |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍            |
| ------ |------ |------|------ |---------------- |
| input  | Event | 否   | 否     | 值变化后触发     |
| change | Event | 否   | 否     | 值变化完毕后触发 |