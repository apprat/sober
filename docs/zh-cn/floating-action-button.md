# floating-action-button

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

---

设置 `disbled` 属性禁用按钮

```html preview
<s-fab disabled>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="secondary" disabled>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tertiary" disabled>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-primary" disabled>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-secondary" disabled>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-tertiary" disabled>
  <s-icon name="add"></s-icon>
</s-fab>
```

---

设置 `hidden` 属性隐藏

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>
<s-button onclick="this.previousElementSibling.hidden=!this.previousElementSibling.hidden">切换</s-button>
```

---

设置 `size` 属性改变按钮大小。

```html preview
<s-fab size="small">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="medium">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="large">
  <s-icon name="add"></s-icon>
</s-fab>
```

---

附带文本的按钮

```html preview
<s-fab size="small">
  <s-icon name="add" slot="start"></s-icon>
  提交信息
</s-fab>

<s-fab variant="secondary">
  <s-icon name="add" slot="start"></s-icon>
  提交信息
</s-fab>

<s-fab size="large" variant="tertiary">
  <s-icon name="add" slot="start"></s-icon>
  提交信息
</s-fab>
```

---

## 属性

| 名称     | 类型                                                                         | 默认值  | 同步 | 说明   |
| -------- | ---------------------------------------------------------------------------- | ------- | ---- | ------ |
| variant  | primary, secondary, tertiary, tonal-primary, tonal-secondary, tonal-tertiary | primary | ✔️ | 变体   |
| size     | small, medium, large                                                         | medium  | ✔️ | 尺寸   |
| disabled | boolean                                                                      | false   | ✔️ | 禁用的 |
| hidden   | boolean                                                                      | false   | ✔️ | 隐藏的 |

---

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| 匿名  | 按钮文本                 |
| start | 开始，默认支持 svg, icon |
| end   | 结束，默认支持 svg, icon |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
