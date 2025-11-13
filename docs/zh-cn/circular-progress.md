# circular progress

进度条。

```html preview
<s-circular-progress value="60"></s-circular-progress>
```

设置 `size="large"` 定义较大的进度条。

```html preview
<s-circular-progress size="large" value="60"></s-circular-progress>
```

设置 `indeterminate` 属性定义不确定的进度条。

```html preview
<s-circular-progress indeterminate></s-circular-progress>
<s-circular-progress size="large" indeterminate></s-circular-progress>
```

进度条会有过渡动画，如果你希望实时的变更进度，可以考虑使用CSS `transition: none` 来禁用过渡。

```html preview
<s-circular-progress value="80" style="transition: none"></s-circular-progress>
<input type="range" min="0" max="100" value="80" oninput="this.previousElementSibling.value=this.value" />
```

---

## 属性

| 名称          | 类型             | 默认值 | 同步 | 说明   |
| ------------- | ---------------- | ------ | ---- | ------ |
| size          | medium, large    | medium | ✔️ | 尺寸   |
| indeterminate | boolean          | 未知的 | ✔️ | 禁用的 |
| max           | number           | 100    | ✖️ | 最大值 |
| value         | number           | 0      | ✖️ | 当前值 |
