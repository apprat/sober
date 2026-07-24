# SplitButton

分割按钮，拆分按钮打开一个菜单，为用户提供与操作相关的更多选项。

```html preview
<s-split-button>
  <s-icon slot="start"></s-icon>
  label
</s-split-button>
```

## 变体

设置 `variant` 来设置不同的变体：`filled`、`elevated`、`tonal`、`outlined`。

```html preview
<s-split-button variant="filled">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="elevated">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="tonal">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="outlined">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>
```

## 禁用

设置 `disabled` 来禁用按钮。

```html preview
<s-split-button disabled> 
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="elevated">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="tonal"> 
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="outlined">
  <s-icon slot="start"></s-icon>
  Button
</s-split-button>
```

## 使用插槽

使用插槽放置其他组件，`toggle-icon` 插槽的 `svg`、`s-icon` 会在切换时旋转 `-180` 度。

```html preview
<s-split-button>
  <s-icon slot="start"></s-icon>
  label
  <svg slot="toggle-icon" viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"></path></svg>
  <s-tooltip slot="toggle" parentDepth="1">展开</s-tooltip>
</s-split-button>
```

## 尺寸

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `height` 来更精确的定义按钮高度） 。

```html preview
<s-split-button size="extra-small"> 
  <s-icon slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="small"> 
  <s-icon slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="medium"> 
  <s-icon slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="large"> 
  <s-icon slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="extra-large"> 
  <s-icon slot="start"></s-icon>
  button
</s-split-button>
```

---

## 属性

| 名称     | 类型                                                     | 默认值   | 同步 | 说明   |
| -------- | -------------------------------------------------------- | -------- | ---- | ------ |
| variant  | `filled`, `elevated`, `tonal`, `outlined`                | `filled` | √    | 变体   |
| size     | `small`, `extra-small`, `medium`, `large`, `extra-large` | `small`  | √    | 尺寸   |
| disabled | `boolean`                                                | `false`  | √    | 禁用的 |
| checked  | `boolean`                                                | `false`  | √    | 选中的 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                   |
| ------ | ----- | ---- | ------ | ---------------------- |
| toggle | Event | ×    | ×      | 在点击了切换按钮后触发 |

## 插槽

| 名称        | 说明                                                     |
| ----------- | -------------------------------------------------------- |
| 匿名        | 按钮文本                                                 |
| start       | 开始，默认支持 svg, s-icon, s-loading, s-spinner         |
| end         | 结束，默认支持 svg, s-icon, s-loading, s-spinner         |
| toggle      | 切换按钮内容                                             |
| toggle-icon | 切换按钮图标，默认支持 svg, s-icon, s-loading, s-spinner |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
