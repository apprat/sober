# Button

按钮用来触发一些操作

```html preview
<s-button> button </s-button>
<s-button type="elevated"> button </s-button>
<s-button type="filled-tonal"> button </s-button>
<s-button type="outlined"> button </s-button>
<s-button type="text"> button </s-button>
```

设置 `disabled` 来禁用按钮

```html preview
<s-button disabled="true"> button </s-button>
<s-button type="elevated" disabled="true"> button </s-button>
<s-button type="filled-tonal" disabled="true"> button </s-button>
<s-button type="outlined" disabled="true"> button </s-button>
<s-button type="text" disabled="true"> button </s-button>
```

设置样式 `display: flex` 来占满横向空间。

```html preview
<s-button style="display: flex"> button </s-button>
```

使用插槽放置其他组件。

```html preview
<s-button>
  <s-circular-progress indeterminate="true" slot="start"></s-circular-progress>
  button
  <s-icon slot="end" name="close"></s-icon>
</s-button>
```

自定义样式

```html preview
<s-button style="background: #009688; color: #fff; border-radius: 4px; padding: 0 16px"> button </s-button>
<s-button style="background: #459958; color: #fff; box-shadow: none"> button </s-button>
```

> 如果你需要高度的自定义按钮样式，使用 [Ripple](/component/ripple) 组件也许更加方便，因为它没有默认样式。

---

## 属性

| 名称     | 类型                                            | 默认值 | 同步 | 介绍    |
| -------- | ---------------------------------------------- | ------ | --- | ------- |
| type     | filled, elevated, filled-tonal, outlined, text | filled | 是  | 样式     |
| disabled | boolean                                        | false  | 是  | 是否禁用 |

---

## 插槽

| 名称   | 介绍                                              |
| ------ | ------------------------------------------------- |
| start  | 开始位置插槽，默认支持 svg、icon、circular-progress |
| end    | 开始位置插槽，默认支持同 start                      |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)