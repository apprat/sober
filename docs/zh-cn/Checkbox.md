# Checkbox

```html preview
<s-checkbox>已阅读用户协议</s-checkbox>
<s-checkbox checked="true"></s-checkbox>
<s-checkbox indeterminate="true"></s-checkbox>

<s-checkbox disabled="true"></s-checkbox>
<s-checkbox disabled="true" checked="true"></s-checkbox>
<s-checkbox disabled="true" indeterminate="true"></s-checkbox>
```

在 Vue 中可以使用 `v-model.lazy` 来绑定。

```html
<template>
  <s-checkbox v-model.lazy="checked" type="checkbox"></s-checkbox>
</template>
<script setup>
  import { ref } from 'vue'
  const checked = ref(false)
</script>
```

> [!WARNING]
> 请注意，使用 v-model 时，你必须定义 `type` 属性值为 `checkbox`。


自定义图标和样式

```html preview
<s-checkbox>
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-checkbox>
<s-checkbox style="color: #009688" checked="true"></s-checkbox>
<s-checkbox style="color:rgb(212, 162, 35); height: 56px" checked="true"></s-checkbox>
```

如果你需要设置选中的颜色，可以考虑使用 CSS 选择器，

```css
s-checkbox[checked=true] {
  color: #ff0000;
}
```

---

## 属性

| 名称          | 类型     | 默认值 | 同步 | 介绍    |
| ------------- | ------- | ------ | --- | ------- |
| checked       | boolean | false  | 是  | 是否选中 |
| disabled      | boolean | false  | 是  | 是否禁用 |
| indeterminate | boolean | false  | 是  | 是否未知 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 插槽

| 名称          | 介绍     |
| ------------- | ------- |
| unckecked     | 未选中   |
| checked       | 已选中   |
| indeterminate | 未知状态 |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)