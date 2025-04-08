# Radio Button

单选按钮需要设置一个唯一的 `name` 作为分组才能执行单选。

```html preview
<s-radio-button name="group">男</s-radio-button>
<s-radio-button name="group">女</s-radio-button>
<s-radio-button name="group" disabled="true">未知</s-radio-button>
```

在 Vue 中可以使用 `v-model.lazy` 来绑定，这时 `name` 属性可以忽略。

```html
<template>
  <s-radio-button value="a" v-model.lazy="select" type="radio"></s-radio-button>
  <s-radio-button value="b" v-model.lazy="select" type="radio"></s-radio-button>
  <s-radio-button value="c" v-model.lazy="select" type="radio"></s-radio-button>
</template>
<script setup>
import { ref } from 'vue'
const select = ref('b')
</script>
```

自定义样式

```html preview
<s-radio-button name="group2">
  <svg viewBox="0 -960 960 960" slot="unchecked">
    <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"></path>
  </svg>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-radio-button>
<s-radio-button name="group2" style="color: #009688" checked="true"></s-radio-button>
<s-radio-button name="group2" style="color: #009688; height: 56px" checked="true"></s-radio-button>
```

如果你需要设置选中的颜色，可以考虑使用 CSS 选择器，

```css
s-radio-button[checked=true] {
  color: #ff0000;
}
```

---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍     |
| -------- | ------- | ------ | --- | ------- |
| name     | string  |        | 是  | 名称     |
| checked  | boolean | false  | 是  | 是否选中 |
| disabled | boolean | false  | 是  | 是否禁用 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## CSS 变量

| 名称                         | 介绍             |
| ---------------------------- | ---------------- |
| --s-color-on-surface-variant | 图标/文本颜色     |
| --s-color-primary            | 选中图标/文本颜色 |
| --s-color-on-surface         | 禁用前景背景颜色  |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)