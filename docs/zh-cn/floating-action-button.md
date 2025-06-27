# floating-action-button

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
