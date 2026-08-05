# Chip

纸片用于输入信息、进行选择、过滤内容或触发操作。

```html preview
<s-chip>
  <s-loading slot="start"></s-loading>
  Chip
  <s-spinner indeterminate slot="end"></s-spinner>
</s-chip>
```

## 变体

设置 `variant` 来设置不同的变体：`outlined`、`elevated`、`surface`。

```html preview
<s-chip>
  <s-icon slot="start"></s-icon>
  outlined
</s-chip>
<s-chip variant="surface">
  <s-icon slot="start"></s-icon>
  elevated
</s-chip>
<s-chip variant="elevated">
  <s-icon slot="start"></s-icon>
  elevated
</s-chip>
```

## 可交互的

设置 `clickable` 属性为纸片增加交互。

```html preview
<s-chip clickable>
  <s-icon slot="start"></s-icon>
  outlined
</s-chip>
<s-chip variant="surface" clickable>
  <s-icon slot="start"></s-icon>
  surface
</s-chip>
<s-chip variant="elevated" clickable>
  <s-icon slot="start"></s-icon>
  elevated
</s-chip>
```

## 单选和复选框

设置 `type` 属性为 `checkbox` 或 `radio`，纸片会允许选中，你可以同时设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件，可设置 `showCheckmark` 属性来显示复选框或单选框的选中图标。

```html preview
<s-chip type="checkbox" showCheckmark>Java</s-chip>
<s-chip variant="surface" type="checkbox" showCheckmark checked>Kotlin</s-chip>
<s-chip variant="elevated" type="checkbox" showCheckmark>JavaScript</s-chip>
<hr>
<s-chip type="radio" name="lang">Java</s-chip>
<s-chip type="radio" name="lang" variant="surface" checked>Kotlin</s-chip>
<s-chip type="radio" name="lang" variant="elevated">JavaScript</s-chip>
```

## 可关闭的

设置 `closable` 属性会显示关闭按钮，点击删除按钮会触发 `close` 事件。

```html preview
<s-chip closable onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 1
</s-chip>
<s-chip closable variant="surface" onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 2
</s-chip>
<s-chip closable variant="elevated" onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 3
</s-chip>
```

可使用 `close-icon` 插槽自定义关闭按钮图标，或插入 `s-tooltip`。

```html preview
<s-chip closable onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 1
  <s-tooltip slot="close-icon" parentDepth="1">关闭</s-tooltip> 
  <svg viewBox="0 -960 960 960" slot="close-icon"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"></path></svg>
</s-chip>
<s-chip closable variant="surface" onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 2
  <s-tooltip slot="close-icon" parentDepth="1">关闭</s-tooltip> 
  <svg viewBox="0 -960 960 960" slot="close-icon"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"></path></svg>
</s-chip>
<s-chip closable variant="elevated" onclose="this.remove()"> 
  <s-icon slot="start"></s-icon>
  chip 3
  <s-tooltip slot="close-icon" parentDepth="1">关闭</s-tooltip> 
  <svg viewBox="0 -960 960 960" slot="close-icon"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"></path></svg>
</s-chip>
```

## 禁用

设置 `disabled` 属性来禁用纸片。

```html preview
<s-chip disabled> 
  <s-icon slot="start"></s-icon>
  chip 1
</s-chip>
<s-chip disabled variant="surface"> 
  <s-icon slot="start"></s-icon>
  chip 1
</s-chip>
<s-chip disabled variant="elevated"> 
  <s-icon slot="start"></s-icon>
  chip 1
</s-chip>
```

## 使用插槽

```html preview
<s-chip> Actions </s-chip>
<s-chip>
  <svg viewBox="0 -960 960 960" slot="start"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  Andorid
</s-chip>
<s-chip>
  <s-loading slot="start"></s-loading>
  Audio & Video
</s-chip>
<s-chip>
  <s-avatar slot="start">S</s-avatar>
  Business
</s-chip>
<s-chip>
  <s-spinner indeterminate slot="start"></s-spinner>
  Business
  <svg slot="end" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
</s-chip>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-chip name="tag" type="checkbox" value="java"> Java </s-chip>
  <s-chip name="tag" type="checkbox" value="rust"> Rust </s-chip>
  <s-chip name="tag" type="checkbox" value="python" checked defaultChecked> Python </s-chip>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型                             | 默认值     | 同步 | 说明                                           |
| -------------- | -------------------------------- | ---------- | ---- | ---------------------------------------------- |
| variant        | `outlined`,`elevated`, `surface` | `outlined` | √    | 变体                                           |
| type           | `chip`, `checkbox`, `radio`      | `chip`     | √    | 类型，支持将组件作为复选框、单选框             |
| clickable      | `boolean`                        | `false`    | √    | 可交互状态                                     |
| closable       | `boolean`                        | `false`    | √    | 可关闭状态                                     |
| disabled       | `boolean`                        | `false`    | √    | 禁用状态                                       |
| showCheckmark  | `boolean`                        | `false`    | √    | 显示复选框或单选框的选中图标                   |
| checked        | `boolean`                        | `false`    | √    | 选中状态                                       |
| name           | `string`                         | `''`       | √    | 名称，表单提交时的 `key` 值                    |
| defaultChecked | `boolean`                        | `false`    | ×    | 默认选中，表单重置时的默认值，仅表单重置时生效 |
| value          | `string`                         | `''`       | ×    | 值，表单提交时有效                             |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| change | Event | ×    | ×      | 选中变更时触发     |
| close  | Event | ×    | ×      | 删除按钮点击后触发 |

## 插槽

| 名称       | 说明                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| 匿名       | 文本                                                                         |
| start      | 开始，默认支持 `.icon`, `svg`, `s-icon`, `s-loading`, `s-spinner`, `ms-icon` |
| end        | 结束，默认支持同 start                                                       |
| close-icon | 关闭图标，默认支持同 start                                                   |

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
