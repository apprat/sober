# Button

按钮，在 UI 中显示大多数操作。

```html preview
<s-button>
  <s-loading slot="start"></s-loading>
  Button
  <s-spinner slot="end" indeterminate></s-spinner>
</s-button>
```

## 变体

设置 `variant` 来设置不同的变体：`filled`、`elevated`、`tonal`、`outlined`、`text`。

```html preview
<s-button> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button variant="elevated"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button variant="tonal"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button variant="outlined"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button variant="text"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>
```

## 禁用

设置 `disabled` 来禁用按钮。

```html preview
<s-button disabled> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="elevated"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="tonal"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="outlined"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="text"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  Button
</s-button>
```

## 单选和复选框

设置 `type` 属性为 `checkbox` 或 `radio`，按钮会允许选中，你可以同时设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件。

```html preview
<s-button type="checkbox">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="checkbox" variant="elevated">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="checkbox" variant="tonal">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="checkbox" variant="outlined">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="checkbox" variant="text"> 
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<hr>
<s-button type="radio" name="select">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="radio" name="select" variant="elevated">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="radio" name="select" variant="tonal">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="radio" name="select" variant="outlined">
  <s-icon slot="start"></s-icon>
  Button
</s-button>
<s-button type="radio" name="select" variant="text"> 
  <s-icon slot="start"></s-icon>
  Button
</s-button>
```

## 尺寸

设置 `size` 属性来设置按钮尺寸。

```html preview
<s-button size="extra-small"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  button
</s-button>

<s-button size="small"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  button
</s-button>

<s-button size="medium"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  button
</s-button>

<s-button size="large"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  button
</s-button>

<s-button size="extra-large"> <!-- [!code highlight] -->
  <s-icon slot="start"></s-icon>
  button
</s-button>
```

## 自定义样式

你可以像使用普通元素一样设置样式，或者 class 引用样式等，或者设置为 `display: flex` 占满容器。

```html preview
<s-button style="background-color: #278d1e; display: flex;"> 
  <s-icon name="done" slot="start"></s-icon>
  full width
  <s-icon name="close" slot="end"></s-icon>
  <s-tooltip>提示</s-tooltip>
</s-button>
```

## 表单支持

该组件可以作为表单元素使用，可以作为复选框(`type=checkbox`)、表单重置按钮(`type=reset`)、提交按钮(`type=submit`)。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-button name="tag" type="checkbox" value="java"> Java </s-button>
  <s-button name="tag" type="checkbox" value="rust"> Rust </s-button>
  <s-button name="tag" type="checkbox" value="python" checked defaultChecked> Python </s-button>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型                                                     | 默认值   | 同步 | 说明                                                       |
| -------------- | -------------------------------------------------------- | -------- | ---- | ---------------------------------------------------------- |
| variant        | `filled`, `elevated`, `tonal`, `outlined`, `text`        | `filled` | √    | 变体                                                       |
| size           | `small`, `extra-small`, `medium`, `large`, `extra-large` | `small`  | √    | 尺寸                                                       |
| type           | `button`, `checkbox`, `radio`, `reset`, `submit`         | `button` | √    | 类型，支持将组件作为复选框，单选框，提交按钮，或者重置按钮 |
| disabled       | `boolean`                                                | `false`  | √    | 禁用的                                                     |
| checked        | `boolean`                                                | `false`  | √    | 选中的                                                     |
| defaultChecked | `boolean`                                                | `false`  | ×    | 默认选中，表单重置时的默认值，仅表单重置时生效             |
| name           | `string`                                                 | `''`     | √    | 名称，表单提交时的 `key` 值                                |
| value          | `string`                                                 | `''`     | ×    | 值，表单提交时有效                                         |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称  | 说明                                                                                  |
| ----- | ------------------------------------------------------------------------------------- |
| 匿名  | 按钮文本，默认支持文本, `.icon`, `svg`, `s-icon`, `s-loading`, `s-spinner`, `ms-icon` |
| start | 开始，默认支持同匿名                                                                  |
| end   | 结束，默认支持同匿名                                                                  |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hover   | 鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
