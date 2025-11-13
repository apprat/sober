# button

按钮，在 UI 中显示大多数操作。

```html preview
<s-button>
  <s-icon name="star" slot="start"></s-icon>
  Button
  <s-icon name="close" slot="end"></s-icon>
</s-button>
```

设置 `variant` 来设置不同的变体：`elevated、tonal、outlined、text`。

```html preview
<s-button variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="tonal">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="text">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

---

设置 `disabled` 来禁用按钮。

```html preview
<s-button disabled> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="tonal"> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="text">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

---

设置 `checkable` 属性，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，它的行为类似于 Checkbox，选中切换时触发 `change` 事件。

```html preview
<s-button checkable checked>
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button checkable checked variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button checkable checked variant="tonal">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button checkable checked variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button checkable checked variant="text">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

如果在 **Vue** 框架中使用 `v-model.lazy` 语法，你需要同时设置 `type=checkbox` 告诉 **Vue** 编译器该组件是一个复选框。

```vue
<template>
  <s-button checkable value="male" v-model.lazy="sex" type="checkbox"> 男 </s-button>
  <s-button checkable value="female" v-model.lazy="sex" type="checkbox"> 女 </s-button>
  当前选中：{{ sex }}
</template>
<script setup>
  const sex = ref(['male'])
</script>
```

---

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `height` 来更精确的定义按钮高度） 。

```html preview
<s-button size="extra-small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="medium"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="extra-large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>
```

---

自定义样式

```html preview
<s-button style="display: flex; background-color: #278d1e;"> 
  <s-icon name="done" slot="start"></s-icon>
  full width
  <s-icon name="close" slot="end"></s-icon>
</s-button>
```

> 如果你需要高度的自定义按钮样式，使用 Ripple 组件也许更加方便，因为它没有默认样式。

---

## 属性

| 名称      | 类型                                           | 默认值 | 同步 | 说明     |
| --------- | ---------------------------------------------- | ------ | ---- | -------- |
| variant   | filled, elevated, tonal, outlined, text        | filled | ✔️ | 变体     |
| size      | extra-small, small, medium, large, extra-large | medium | ✔️ | 尺寸     |
| disabled  | boolean                                        | false  | ✔️ | 禁用的   |
| checkable | boolean                                        | false  | ✔️ | 启用选中 |
| checked   | boolean                                        | false  | ✔️ | 选中的   |
| value     | string                                         |        | ✖️ | 值       |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                        |
| ------ | ----- | ---- | ------ | ------------------------------------------- |
| change | Event | ✖️ | ✖️   | 在设置了 `checkable` 属性后，选中变更时触发 |

---

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| 匿名  | 按钮文本                 |
| start | 开始，默认支持 svg, icon |
| end   | 结束，默认支持 svg, icon |

---

## HTML 标记属性

| 名称          | 说明           |
| ------------- | -------------- |
| pressed       | 按下时设置     |
| hovered       | 鼠标移入时设置 |
| ripple-showed | 波纹触发时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
