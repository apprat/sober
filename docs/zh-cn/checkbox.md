# checkbox

复选框允许用户从列表中选择一个或多个项目，或者打开或关闭项目。

```html preview
<s-checkbox>已阅读用户协议</s-checkbox>
<s-checkbox checked></s-checkbox>
<s-checkbox indeterminate></s-checkbox>
```

设置 `disabled` 属性来禁用复选框。

```html preview
<s-checkbox disabled></s-checkbox>
<s-checkbox disabled checked></s-checkbox>
<s-checkbox disabled indeterminate></s-checkbox>
```

---

在 **Vue** 框架中使用 `v-model.lazy` 语法时，可以省略 `name` 属性，同时你需要设置属性 `type=checkbox` 告诉 **Vue** 编译器该组件是一个复选框。

```vue
<template>
  <s-checkbox value="male" v-model.lazy="sex" type="checkbox">男</s-checkbox>
  <s-checkbox value="female" v-model.lazy="sex" type="checkbox">女</s-checkbox>
  <s-checkbox value="unknown" v-model.lazy="sex" type="checkbox">未知</s-checkbox>
  当前选中：{{ sex }}
</template>
<script setup>
  const sex = ref(['male'])
</script>
```

---

自定义图标和样式

```html preview
<s-checkbox>
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-checkbox>

<s-checkbox style="color: #009688" checked></s-checkbox>
<s-checkbox style="color:rgb(212, 162, 35); height: 56px" checked></s-checkbox>
```

如果你需要单独设置选中的颜色，可以使用 CSS 选择器；

```html preview
<style>
  .checkbox[checked]{
    color: #009688;
  }
</style>
<s-checkbox class="checkbox">已阅读用户协议</s-checkbox>
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

## HTML 标记属性

| 名称          | 说明                       |
| ------------- | -------------------------- |
| pressed       | 按下时设置                 |
| hovered       | 鼠标移入时设置             |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
