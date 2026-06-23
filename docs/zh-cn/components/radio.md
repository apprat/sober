# radio

单选按钮允许用户从一组选项中选择一个选项。（需要设置一个唯一的 `name` 作为分组才能执行单选）。

```html preview
<s-radio name="group">男</s-radio>
<s-radio name="group">女</s-radio>
<s-radio name="group">未知</s-radio>
```

## 禁用

设置 `disabled` 属性来禁用单选框。

```html preview
<s-radio disabled></s-radio>
<s-radio disabled checked></s-radio>
```

## 只读

设置 `readOnly` 属性来只读复选框。

```html preview
<s-radio readOnly></s-radio>
<s-radio readOnly checked></s-radio>
```

在 **Vue** 框架中使用 `v-model` 语法时，可以省略 `name` 属性。

```vue preview
<template>
  <s-radio value="male" v-model.lazy="group" type="radio">男</s-radio>
  <s-radio value="female" v-model.lazy="group" type="radio">女</s-radio>
  <s-radio value="unknown" v-model.lazy="group" type="radio">未知</s-radio>
  当前选中：{{ group }}
</template>
<script setup>
  import { ref } from 'vue'
  const group = ref('male')
</script>
```

## 自定义样式

自定义图标和样式

```html preview
<s-radio name="group2">
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-radio>
<s-radio name="group2" style="color: #009688" checked></s-radio>
<s-radio name="group2" style="color:rgb(212, 162, 35); height: 56px"></s-radio>
```

如果你需要单独设置选中前后的颜色，可以使用 CSS 选择器；

```html
<style>
  .radio{
    color: #336699;
  }
  .radio[checked]{
    color: #009688;
  }
</style>
<template>
  <s-radio class="radio" name="other">其他 A</s-radio>
  <s-radio class="radio" name="other">其他 B</s-radio>
</template>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-radio name="tag" value="java"> Java </s-radio>
  <s-radio name="tag" value="rust"> Rust </s-radio>
  <s-radio name="tag" value="python" defualtChecked checked> Python </s-radio>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

> 请注意，如果在 `Vue` 中使用 `v-model.lazy` 语法糖，必须在模板中显式的设置 `type=radio`。

---

## 属性

| 名称           | 类型    | 默认值 | 同步 | 说明                         |
| -------------- | ------- | ------ | ---- | ---------------------------- |
| disabled       | boolean | false  | √    | 禁用的                       |
| checked        | boolean | false  | √    | 选中的                       |
| defualtChecked | boolean | false  | √    | 默认选中，表单重置时的默认值 |
| value          | string  |        | ×    | 值，表单提交时有效           |
| name           | string  |        | √    | 名称，表单提交时的 `key` 值  |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称 | 说明 |
| ---- | ---- |
| 匿名 | 文本 |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hover   | 鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。
