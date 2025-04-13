# 日期选择器

该组件依赖 Date 组件实现，如果需要多语言设置，请阅读 [Date](/component/date) 组件的文档。

```html preview
<s-date-picker label="请选择日期"></s-date-picker>
<s-date-picker label="请选择日期" value="2024-11-11"></s-date-picker>
```

使用 `format` 自定义日期格式（该属性仅用于显示日期格式）。

```html preview
<s-date-picker label="请选择日期" format="yyyy年MM月dd日"></s-date-picker>
```


```vue
<template>
  <s-date-picker label="请选择日期" format="yyyy年MM月dd日" v-model.lazy="date"></s-date-picker>
  <p>{{ date }}</p>
</template>
<script setup>
  import { ref } from 'sober'
  
  const date = ref('')
</script>
````