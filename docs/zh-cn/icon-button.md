# icon-button

基础按钮，你可以设置 `variant` 来设置不同的变体：`filled、tonal、outlined`。

```html preview
<s-icon-button> 
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal"> 
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

---

设置 `disabled` 来禁用按钮。

```html preview
<s-icon-button disabled> 
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button disabled variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button disabled variant="tonal"> 
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button disabled variant="outlined">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

---

设置 `checkable` 属性，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，它的行为类似于 Checkbox，选中切换时触发 `change` 事件。

```html preview
<s-icon-button checkable checked>
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button checkable checked variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button checkable checked variant="tonal">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button checkable checked variant="outlined">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

---

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `width` 来更精确的定义按钮高度） 。

```html preview
<s-icon-button size="extra-small" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button size="small" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button size="medium" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button size="large" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button size="extra-large" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
```
