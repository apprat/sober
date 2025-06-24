# Floating Action Button

浮动操作按钮，通常用于浮动菜单，或者作为提交按钮。

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>
<s-fab>
  <s-icon name="add" slot="start"></s-icon>
  Button
  <s-icon name="close" slot="end"></s-icon>
</s-fab>
```

自定义样式

```html preview
<s-fab style="background: #009688; color: #fff; border-radius: 50%;">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab style="background: #2d8d1d; color: #fff; border-radius: 50%; width: 48px; height: 48px">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab style="background: #945ab3; color: #fff; border-radius: 8px;">
  <s-icon name="add"></s-icon>
</s-fab>
```

---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍    |
| -------- | ------- | ------ | --- | ------- |
| hidden   | boolean | false  | 是  | 是否隐藏 |
| disabled | boolean | false  | 是  | 是否禁用 |

---

## 插槽

| 名称   | 介绍                             |
| ------ | ------------------------------- |
| start  | 开始位置插槽，默认支持 svg、icon  |
| end    | 开始位置插槽，默认支持同 start    |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)