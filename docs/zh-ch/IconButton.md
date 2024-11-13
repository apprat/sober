# Icon Button

按钮用来触发一些操作   

```html preview folded=true
<s-icon-button>
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled">
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled-tonal">
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="outlined">
  <s-icon type="add"></s-icon>
</s-icon-button>
```

设置 `disabled` 来禁用按钮

```html preview folded=true
<s-icon-button disabled="true">
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled" disabled="true">
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled-tonal" disabled="true">
  <s-icon type="add"></s-icon>
</s-icon-button>

<s-icon-button type="outlined" disabled="true">
  <s-icon type="add"></s-icon>
</s-icon-button>
```

使用 `badge` 插槽放置徽章

```html preview folded=true
<s-icon-button>
  <s-icon type="add"></s-icon>
  <s-badge slot="badge"></s-badge>
</s-icon-button>

<s-icon-button type="filled">
  <s-icon type="add"></s-icon>
  <s-badge slot="badge">1</s-badge>
</s-icon-button>

<s-icon-button type="filled-tonal">
  <s-icon type="add"></s-icon>
  <s-badge slot="badge">2</s-badge>
</s-icon-button>

<s-icon-button type="outlined">
  <s-icon type="add"></s-icon>
  <s-badge slot="badge">3</s-badge>
</s-icon-button>
```

> 如果你需要高度的自定义按钮样式，使用 [Ripple](/component/ripple) 组件更加方便。

---

## 属性

| 名称     | 类型                                  | 默认值 | 是否同步 | 介绍    |
| -------- | ------------------------------------ | ------ | ------- | ------- |
| type     | text, filled, filled-tonal, outlined | text   | 是      | 样式     |
| disabled | boolean                              | false  | 是      | 是否禁用 |

---

## 插槽

| 名称   | 介绍  |
| ------ | ---- |
| badge  |  徽章 |

---

## CSS 变量

| 名称                             | 介绍                                   |
| -------------------------------- | ------------------------------------- |
| --s-color-on-surface-variant     | text 前景颜色                          |
| --s-color-primary                | filled 背景颜色                        |
| --s-color-on-primary             | filled 前景颜色                        |
| --s-color-secondary-container    | filled-tonal 背景颜色                  |
| --s-color-on-secondary-container | filled-tonal 前景颜色                  |
| --s-color-outline                | outlined 边框颜色                      |
| --s-color-on-surface             | 禁用背景前景颜色，outlined 禁用边框颜色  |