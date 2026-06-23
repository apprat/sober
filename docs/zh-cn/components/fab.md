# FloatingActionButton

浮动操作按钮（FAB）帮助用户采取主要操作。

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="secondary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tertiary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-primary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-secondary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-tertiary">
  <s-icon name="add"></s-icon>
</s-fab>
```

使用其他组件作为插槽。

```html preview
<s-fab>
  <s-loading></s-loading> <!-- [!code highlight] -->
</s-fab>
<s-fab>
  <s-spinner indeterminate></s-spinner> <!-- [!code highlight] -->
</s-fab>
```

## 禁用

设置 `disbled` 属性禁用按钮

```html preview
<s-fab disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="secondary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tertiary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-primary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-secondary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-tertiary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>
```

## 隐藏的

设置 `hidden` 属性隐藏

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>
<s-button onclick="this.previousElementSibling.hidden=!this.previousElementSibling.hidden">切换</s-button>
```

## 尺寸

设置 `size` 属性改变按钮大小。

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="medium"> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="large"> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>
```

## 扩展

可以使用文本和 `start`、`end` 插槽添加其他内容。

```html preview
<s-fab>
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
  提交信息
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>

<s-fab size="medium" variant="secondary">
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
  提交信息
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>

<s-fab size="large" variant="tertiary">
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
  提交信息
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>
```

---

## 属性

| 名称     | 类型                                                                         | 默认值  | 同步 | 说明   |
| -------- | ---------------------------------------------------------------------------- | ------- | ---- | ------ |
| variant  | primary, secondary, tertiary, tonal-primary, tonal-secondary, tonal-tertiary | primary | √    | 变体   |
| size     | small, medium, large                                                         | small   | √    | 尺寸   |
| disabled | boolean                                                                      | false   | √    | 禁用的 |
| hidden   | boolean                                                                      | false   | √    | 隐藏的 |

## 插槽

| 名称  | 说明                                                       |
| ----- | ---------------------------------------------------------- |
| 匿名  | 按钮文本                                                   |
| start | 开始，默认支持 svg, s-icon, s-loading, s-circular-progress |
| end   | 结束，默认支持 svg, s-icon, s-loading, s-circular-progress |

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
