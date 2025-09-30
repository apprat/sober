# radio

单选按钮允许用户从一组选项中选择一个选项。需要设置一个唯一的 `name` 作为分组才能执行单选。

```html preview
<s-radio name="group">男</s-radio>
<s-radio name="group">女</s-radio>
<s-radio name="group">未知</s-radio>
```

设置 `disabled` 属性来禁用单选框。

```html preview
<s-radio disabled></s-radio>
<s-radio disabled checked="true"></s-radio>
```

---

在 **Vue** 框架中使用 `v-model` 语法时，可以省略 `name` 属性。

```vue
<template>
  <s-radio value="male" v-model.lazy="group" type="radio">男</s-radio>
  <s-radio value="female" v-model.lazy="group" type="radio">女</s-radio>
  <s-radio value="unknown" v-model.lazy="group" type="radio">未知</s-radio>
  当前选中：{{ group }}
</template>
<script setup>
  const group = ref('male')
</script>
```

---

自定义图标和样式

```html preview
<s-radio name="group2">
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-radio>
<s-radio name="group2" style="color: #009688" checked="true"></s-radio>
<s-radio name="group2" style="color:rgb(212, 162, 35); height: 56px" checked="true"></s-radio>
```

如果你需要单独设置选中前后的颜色，可以使用 CSS 选择器；

```html preview
<style>
  .radio{
    color: #336699;
  }
  .radio[checked]{
    color: #009688;
  }
</style>
<s-radio class="radio" name="other">其他 A</s-radio>
<s-radio class="radio" name="other">其他 B</s-radio>
```

---

## 属性

| 名称          | 类型    | 默认值 | 同步 | 说明   |
| ------------- | ------- | ------ | ---- | ------ |
| disabled      | boolean | false  | ✔️ | 禁用的 |
| checked       | boolean | false  | ✔️ | 选中的 |
| indeterminate | boolean | false  | ✔️ | 未知的 |
| value         | string  |        | ✖️ | 值     |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ✖️ | ✖️   | 选中变更时触发 |

---

## 插槽

| 名称 | 说明 |
| ---- | ---- |
| 匿名 | 文本 |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
