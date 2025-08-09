# icon-button

基础图标按钮。

```html preview
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button>
  <svg viewBox="0 -960 960 960">
    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path>
  </svg>
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

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `width`、`height` 来更精确的定义按钮尺寸） 。

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

设置 `width` 属性来设置更宽或者更窄的按钮，适用于一些较宽或较窄的图标。

```html preview
<s-icon-button variant="filled" width="wide">
  <s-icon name="more_horiz"></s-icon>
</s-icon-button>
<s-icon-button variant="tonal"> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="outlined" width="narrow">
  <s-icon name="more_vert"></s-icon>
</s-icon-button><br>
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
| variant   | standard, filled, tonal, outlined              | standard | ✔️ | 变体     |
| size      | extra-small, small, medium, large, extra-large | medium   | ✔️ | 尺寸     |
| width     | default, narrow, wide                          | default  | ✔️ | 宽度     |
| disabled  | boolean                                        | false    | ✔️ | 禁用的   |
| checkable | boolean                                        | false    | ✔️ | 启用选中 |
| checked   | boolean                                        | false    | ✔️ | 选中的   |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                        |
| ------ | ----- | ---- | ------ | ------------------------------------------- |
| change | Event | ✖️ | ✖️   | 在设置了 `checkable` 属性后，选中变更时触发 |

---

## 插槽

| 名称 | 说明 |
| ---- | ---- |
|      | 图标 |
