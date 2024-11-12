# Skeleton

骨架屏。

```html preview
<s-skeleton></s-skeleton>
```

题图列表骨架屏。

```html preview
<div style="display: flex; align-items: center">
  <s-skeleton style="width: 72px; height: 72px"></s-skeleton>
  <div style="flex-grow: 1; margin-left: 16px">
    <s-skeleton></s-skeleton>
    <s-skeleton style="margin-top: 8px"></s-skeleton>
    <s-skeleton style="margin-top: 8px; width: 80%"></s-skeleton>
  </div>
</div>
```

> 为了满足不同布局的需求，该组件只提供一个默认样式，你需要自己组合来定制布局。

---

## CSS 变量

| 名称                                | 介绍     |
| ----------------------------------- | ------- |
| --s-color-surface-container-high    | 背景颜色 |
| --s-color-surface-container-highest | 高亮颜色 |