# Ripple

波纹是一个容器，它本身没有任何样式，波纹的颜色继承文本颜色，并带有一定的不透明度。

```html preview
<s-ripple style="padding: 16px"> Ripple </s-ripple>
<s-ripple style="padding: 16px; color: #009688"> Ripple </s-ripple>
```

设置 `attached` 来启用依附模式，它依附在容器中，事件从容器上触发，某些情况下可能有妙用。   

```html preview
<div style="position: relative; padding: 16px; width: 200px; cursor: pointer;">
  Ripple
  <s-ripple attached="true"></s-ripple>
</div>
```

> [!WARNING]
> 由于使用定位确定位置，所以容器的 CSS 属性 `position` 必须设置为 `relative`、`absolute`、`sticky`、`fixed` 其中之一。

---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍             |
| -------- | ------- | ------ | --- | ---------------- |
| centered | boolean | false  | 是  | 波纹是否居中触发   |
| attached | boolean | false  | 是  | 是否设置为依附模式 |

---

## 标记属性

| 名称    | 介绍       |
| ------- | --------- |
| rippled | 波纹触发时 |