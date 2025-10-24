# ripple

你可以将该组件添加到任意元素内来添加波纹效果，但请注意，你必须为父元素或祖先元素设置 CSS `position` 不为 `static`，因为它依赖 `position` 进行定位。

```html preview
<button style="position: relative; padding: 8px 16px; border-radius: 8px">
  Ripple Button
  <s-ripple></s-ripple>
</button>
```

你可以通过停止 `pointerdown` 事件冒泡来禁用波纹效果。

```html preview
<button style="position: relative; padding: 8px 16px;  border-radius: 8px">
  ripple
  <span style="background: red" onpointerdown="event.stopPropagation()">点我</span>
  <s-ripple></s-ripple>
</button>
```

---

## 属性

| 名称     | 类型    | 默认值 | 同步 | 说明       |
| -------- | ------- | ------ | ---- | ---------- |
| centered | boolean | false  | ✔️ | 波纹居中的 |

---

## HTML 属性

| 名称    | 说明                     |
| ------- | ------------------------ |
| pressed | 在按下时设置（容器）     |
| hovered | 在鼠标移入时设置（容器） |
