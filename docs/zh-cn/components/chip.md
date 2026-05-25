# chip

纸片用于输入信息、进行选择、过滤内容或触发操作。

```html preview
<s-chip>
  <s-icon name="home" slot="start"></s-icon>
  chip 1
</s-chip>

<s-chip>
  <s-circular-progress indeterminate slot="start"></s-circular-progress>
  chip 2
</s-chip>

<s-chip>
  <s-loading indeterminate slot="start"></s-loading>
  chip 3
</s-chip>

<s-chip>
  <s-avatar slot="start">U</s-avatar>
  chip 3
  <s-icon name="done" slot="end"></s-icon>
</s-chip>
```

使用 `action` 插槽放置操作按钮

```html preview

<s-chip>
  chip 1
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-chip>
```

## 禁用

设置 `disabled` 属性来禁用纸片。

```html preview
<s-chip disabled> 
  <s-icon name="home" slot="start"></s-icon>
  chip 1
</s-chip>
```

## 复选框

设置 `type` 属性为 `checkbox`，纸片会允许选中，同时你可以设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件。

```html preview
<s-chip type="checkbox">
  <s-icon name="star" slot="start"></s-icon>
  chckbox 1
</s-chip>

<s-chip type="checkbox" checked>
  <s-icon name="star" slot="start"></s-icon>
  chckbox 2
</s-chip>
```

## 表单支持

该组件可以作为表单元素使用，可以作为复选框、表单重置、提交按钮。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-chip name="tag" type="checkbox" value="java"> Java </s-chip>
  <s-chip name="tag" type="checkbox" value="rust"> Rust </s-chip>
  <s-chip name="tag" type="checkbox" value="python" checked defualtChecked> Python </s-chip>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型           | 默认值 | 同步 | 说明                                           |
| -------------- | -------------- | ------ | ---- | ---------------------------------------------- |
| type           | chip, checkbox | button | √    | 类型，支持将组件作为复选框                     |
| disabled       | boolean        | false  | √    | 禁用的                                         |
| checked        | boolean        | false  | √    | 选中的                                         |
| name           | string         |        | ×    | 名称，表单提交时的 `key` 值                    |
| defualtChecked | boolean        | false  | ×    | 默认选中，表单重置时的默认值，仅表单重置时生效 |
| value          | string         |        | ×    | 值，表单提交时有效                             |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称   | 说明                                                                 |
| ------ | -------------------------------------------------------------------- |
| 匿名   | 文本                                                                 |
| start  | 开始，默认支持 svg, s-icon, s-loading, s-circular-progress, s-avatar |
| end    | 结束，默认支持 svg, s-icon, s-loading, s-circular-progress, s-avatar |
| action | 操作按钮，默认支持 s-icon-button                                     |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hovered | 鼠标移入时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
