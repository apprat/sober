# Icon Button

按钮用来触发一些操作   

```html preview
<s-icon-button>
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled">
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled-tonal">
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="outlined">
  <s-icon name="add"></s-icon>
</s-icon-button>
```

设置 `disabled` 来禁用按钮

```html preview
<s-icon-button disabled="true">
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled" disabled="true">
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="filled-tonal" disabled="true">
  <s-icon name="add"></s-icon>
</s-icon-button>

<s-icon-button type="outlined" disabled="true">
  <s-icon name="add"></s-icon>
</s-icon-button>
```

使用 `badge` 插槽放置徽章

```html preview
<s-icon-button>
  <s-icon name="add"></s-icon>
  <s-badge slot="badge"></s-badge>
</s-icon-button>

<s-icon-button type="filled">
  <s-icon name="add"></s-icon>
  <s-badge slot="badge">1</s-badge>
</s-icon-button>

<s-icon-button type="filled-tonal">
  <s-icon name="add"></s-icon>
  <s-badge slot="badge">2</s-badge>
</s-icon-button>

<s-icon-button type="outlined">
  <s-icon name="add"></s-icon>
  <s-badge slot="badge">3</s-badge>
</s-icon-button>
```

> 如果你需要高度的自定义按钮样式，使用 [Ripple](/component/ripple) 组件也许更加方便，因为它没有默认样式。

---

## 属性

| 名称     | 类型                                  | 默认值 | 同步 | 介绍    |
| -------- | ------------------------------------ | ------ | --- | ------- |
| type     | text, filled, filled-tonal, outlined | text   | 是  | 样式     |
| disabled | boolean                              | false  | 是  | 是否禁用 |

---

## 插槽

| 名称   | 介绍  |
| ------ | ---- |
| badge  |  徽章 |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)