# Button

按钮，在 UI 中显示大多数操作。

```html preview
<s-button>
  <s-icon name="star" slot="start"></s-icon>
  Button
  <s-icon name="close" slot="end"></s-icon>
</s-button>

<s-button>
  <s-loading slot="start"></s-loading>
  Button
  <s-circular-progress slot="end" indeterminate></s-circular-progress>
</s-button>
```

## 变体

设置 `variant` 来设置不同的变体：`filled`、`elevated`、`tonal`、`outlined`、`text`。

```html preview
<s-button variant="filled">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

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

## 禁用

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

## 复选框

设置 `type` 属性为 `checkbox`，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件。

```html preview
<s-button type="checkbox" checked>
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="tonal">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="text">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

## 尺寸

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

## 预览

```html preview-only
<s-button> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>
<hr>
variant =
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-button').variant=this.textContent" checked>filled</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-button').variant=this.textContent">elevated</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-button').variant=this.textContent">tonal</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-button').variant=this.textContent">outlined</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-button').variant=this.textContent">text</s-radio>
<hr>
size =
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-button').size=this.textContent" checked>small</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-button').size=this.textContent">extra-small</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-button').size=this.textContent">medium</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-button').size=this.textContent">large</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-button').size=this.textContent">extra-large</s-radio>
<hr>
type =
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-button').type=this.textContent" checked>button</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-button').type=this.textContent">checkbox</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-button').type=this.textContent">reset</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-button').type=this.textContent">submit</s-radio>
<hr>
disabled =
<s-checkbox onchange="this.parentElement.querySelector('s-button').disabled=this.checked"></s-checkbox>
```

## 自定义样式

你可以像使用普通元素一样设置样式，或者 class 引用样式等，或者设置为 `display: flex` 占满容器。

```html preview
<s-button style="background-color: #278d1e;"> 
  <s-icon name="done" slot="start"></s-icon>
  full width
  <s-icon name="close" slot="end"></s-icon>
  <s-tooltip>提示</s-tooltip>
</s-button>
```

## 表单支持

该组件可以作为表单元素使用，可以作为复选框、表单重置、提交按钮。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-button name="tag" type="checkbox" value="java"> Java </s-button>
  <s-button name="tag" type="checkbox" value="rust"> Rust </s-button>
  <s-button name="tag" type="checkbox" value="python" checked defualtChecked> Python </s-button>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型                                           | 默认值 | 同步 | 说明                                               |
| -------------- | ---------------------------------------------- | ------ | ---- | -------------------------------------------------- |
| variant        | filled, elevated, tonal, outlined, text        | filled | √    | 变体                                               |
| size           | small, extra-small, medium, large, extra-large | small  | √    | 尺寸                                               |
| type           | button, checkbox, reset, submit                | button | √    | 类型，支持将组件作为复选框，提交按钮，或者重置按钮 |
| disabled       | boolean                                        | false  | √    | 禁用的                                             |
| checked        | boolean                                        | false  | √    | 选中的                                             |
| name           | string                                         |        | ×    | 名称，表单提交时的 `key` 值                        |
| defualtChecked | boolean                                        | false  | ×    | 默认选中，表单重置时的默认值，仅表单重置时生效     |
| value          | string                                         |        | ×    | 值，表单提交时有效                                 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称  | 说明                                                       |
| ----- | ---------------------------------------------------------- |
| 匿名  | 按钮文本                                                   |
| start | 开始，默认支持 svg, s-icon, s-loading, s-circular-progress |
| end   | 结束，默认支持 svg, s-icon, s-loading, s-circular-progress |

## HTML 标记属性

| 名称          | 说明           |
| ------------- | -------------- |
| pressed       | 按下时设置     |
| hovered       | 鼠标移入时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
