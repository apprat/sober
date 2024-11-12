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

使用 `start` 和 `end` 插槽放置其他组件。

```html preview
<s-button>
  <s-circular-progress indeterminate="true" slot="start"></s-circular-progress>
  button
  <s-icon slot="end" type="close"></s-icon>
</s-button>
```

自定义样式

```html preview
<s-button style="background: #009688; color: #fff; border-radius: 4px; padding: 0 16px"> button </s-button>
<s-button style="background: #459958; color: #fff; box-shadow: none"> button </s-button>
```

> 如果你需要高度的自定义按钮样式，使用 [Ripple](/component/ripple) 组件更加方便。

---

## 属性

| 名称     | 类型                                            | 默认值 | 是否同步 | 介绍    |
| -------- | ---------------------------------------------- | ------ | ------- | ------- |
| type     | filled, elevated, filled-tonal, outlined, text | filled | 是      | 样式     |
| disabled | boolean                                        | false  | 是      | 是否禁用 |

---

## 插槽

| 名称   | 介绍                                              |
| ------ | ------------------------------------------------- |
| start  | 开始位置插槽，默认支持 svg、icon、circular-progress |
| end    | 开始位置插槽，默认支持同 start                      |

---

## CSS 变量

| 名称                             | 介绍                                     |
| -------------------------------- | --------------------------------------- |
| --s-color-primary                | filled 背景颜色，elevated/text 前景颜色   |
| --s-color-on-primary             | filled 前景颜色                          |
| --s-color-surface-container-high | elevated 背景颜色                        |
| --s-color-secondary-container    | filled-tonal 背景颜色                    |
| --s-color-on-secondary-container | filled-tonal 前景颜色                    |
| --s-color-outline                | outlined 边框颜色                        |
| --s-color-on-surface             | 禁用背景前景颜色，outlined 禁用边框颜色    |
| --s-elevation-level1             | filled hover/pressed 阴影，elevated 阴影 |
| --s-elevation-level2             | elevated hover/pressed 阴影             |