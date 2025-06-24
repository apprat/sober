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

在 Vue 中可以使用 `v-model.lazy` 来绑定。

```html
<template>
  <s-date-picker label="请选择日期" format="yyyy年MM月dd日" v-model.lazy="date"></s-date-picker>
</template>
<script setup>
  import { ref } from 'sober'
  const date = ref('')
</script>
````

---

## 属性 Props

| 名称         | 类型    | 默认值     | 同步 | 介绍                                                                                     |
| ------------ | ------ | ---------- | --- | ---------------------------------------------------------------------------------------- |
| value        | string | 当前日期    | 否  | 日期，一个可以供 new Date() 解析的日期字符串                                                |
| max          | string | 2099-12-31 | 否  | 最大日期，一个可以供 new Date() 解析的日期字符串                                             |
| min          | string | 1900-01-01 | 否  | 最小日期，一个可以供 new Date() 解析的日期字符串                                             |
| locale       | string |            | 否  | 地区语言，为空的情况下为跟随系统，有效的语言代码示例包括“en”、“en-US”、“fr”、“fr-FR”、“es-ES”等 |
| format       | string | yyyy-MM-dd | 否  | 显示日期格式，yyyy-MM-dd                                                                   |
| label        | string |            | 否  | 标签                                                                                      |
| positiveText | string | 确认       | 否  | 确认按钮文本                                                                               |
| negativeText | string | 取消       | 否  | 取消按钮文本                                                                               |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍         |
| ------ |------ |------|------ |------------- |
| change | Event | 否   | 否    | 选中变化后触发 |

---

## 插槽

| 名称     | 介绍  |
| ------- | ----- |
| trigger | 触发器 |

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)
- [Field](./field)
- [Dialog](./dialog)
- [Date](./date)