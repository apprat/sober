# icon-button

基础图标按钮。

```html preview
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>
```

---

设置 `variant` 来设置不同的变体：`filled、tonal、outlined`。

```html preview
<s-icon-button variant="filled">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal"> 
  <s-icon name="home"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined">
  <s-icon name="favorite"></s-icon>
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

---

设置 `width` 属性来设置更宽或者更窄的按钮。

```html preview
<s-icon-button variant="filled" width="wide" size="extra-small">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal" size="extra-small"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow" size="extra-small">
  <s-icon name="star"></s-icon>
</s-icon-button><br>

<s-icon-button variant="filled" width="wide" size="small">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal" size="small"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow" size="small">
  <s-icon name="star"></s-icon>
</s-icon-button><br>

<s-icon-button variant="filled" width="wide">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow">
  <s-icon name="star"></s-icon>
</s-icon-button><br>

<s-icon-button variant="filled" width="wide" size="large">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal" size="large"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow" size="large">
  <s-icon name="star"></s-icon>
</s-icon-button><br>

<s-icon-button variant="filled" width="wide" size="extra-large">
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal" size="extra-large"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow" size="extra-large">
  <s-icon name="star"></s-icon>
</s-icon-button>
```

---

使用 `badge` 组件来设置图标按钮的角标。

```html preview
<s-icon-button variant="filled">
  <s-icon name="star"></s-icon>
  <s-badge></s-badge>
</s-icon-button>
<s-icon-button variant="tonal"> 
  <s-icon name="home"></s-icon>
  <s-badge>6</s-badge>
</s-icon-button>
<s-icon-button variant="outlined">
  <s-icon name="favorite"></s-icon>
  <s-badge>99</s-badge>
</s-icon-button>
```

---

## 属性

| 名称      | 类型                                           | 默认值   | 同步 | 说明     |
| --------- | ---------------------------------------------- | -------- | ---- | -------- |
| variant   | standard, filled, tonal, outlined            | standard | ✔️ | 变体     |
| size      | extra-small, small, medium, large, extra-large | medium   | ✔️ | 尺寸     |
| width     | default, narrow, wide                          | default  | ✔️ | 宽度     |
| disabled  | boolean                                        | false    | ✔️ | 禁用的   |
| checkable | boolean                                        | false    | ✔️ | 启用选中 |
| checked   | boolean                                        | false    | ✖️ | 选中的   |
