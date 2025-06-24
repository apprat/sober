# button

基础按钮，你可以设置 `variant` 来设置不同的变体：`filled、elevated、tonal、outlined、text`。

```html preview
<s-button>
  <s-icon name="done" slot="start"></s-icon>
  filled
</s-button>
<s-button variant="elevated">
  <s-icon name="done" slot="start"></s-icon>
  elevated
</s-button>
<s-button variant="tonal">
  <s-icon name="done" slot="start"></s-icon>
  tonal
</s-button>
<s-button variant="outlined">
  <s-icon name="done" slot="start"></s-icon>
  outlined
</s-button>
<s-button variant="text">
  <s-icon name="done" slot="start"></s-icon>
  text
</s-button>
```

---

设置 `disabled` 来禁用按钮。

```html preview
<s-button disabled> 
  <s-icon name="done" slot="start"></s-icon>
  filled
</s-button>
<s-button disabled variant="elevated">
  <s-icon name="done" slot="start"></s-icon>
  elevated
</s-button>
<s-button disabled variant="tonal"> 
  <s-icon name="done" slot="start"></s-icon>
  tonal
</s-button>
<s-button disabled variant="outlined">
  <s-icon name="done" slot="start"></s-icon>
  outlined
</s-button>
<s-button disabled variant="text">
  <s-icon name="done" slot="start"></s-icon>
  text
</s-button>
```

---

设置 `checkable` 属性，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，它的行为类似于 Checkbox，选中切换时触发 `change` 事件。

```html preview
<s-button checkable checked> filled </s-button>
<s-button checkable checked variant="elevated"> elevated </s-button>
<s-button checkable checked variant="tonal"> tonal </s-button>
<s-button checkable checked variant="outlined"> outlined </s-button>
```

---

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `height` 来更精确的定义按钮高度） 。

```html preview
<s-button size="extra-small"> button  </s-button>
<s-button size="small"> button </s-button>
<s-button size="medium"> button </s-button>
<s-button size="large"> button </s-button>
<s-button size="extra-large"> button </s-button>
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
