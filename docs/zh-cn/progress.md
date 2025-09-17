# progress

进度条。

```html preview
<s-progress value="80"></s-progress>
<br>
<s-progress size="large" value="80"></s-progress>
<br>
<s-button onclick="this.parentNode.querySelectorAll('s-progress').forEach(el=>el.value=Math.random()*100)"> change </s-button>
```

设置 `variant` 属性改变进度条变体。

```html preview
<s-progress variant="circular" value="70"></s-progress>
<s-progress variant="circular" size="large" value="70"></s-progress>
<s-button onclick="this.parentNode.querySelectorAll('s-progress').forEach(el=>el.value=Math.random()*100)"> change </s-button>
```

设置 `indeterminate` 属性定义不确定的进度条。

```html preview
<s-progress indeterminate></s-progress>
<br>
<s-progress size="large" indeterminate></s-progress>
<br>
<s-progress variant="circular" indeterminate></s-progress>
<s-progress variant="circular" size="large" indeterminate></s-progress>
```

进度条会有 `200ms` 的过渡动画，如果你希望实时的变更进度，可以考虑使用 `transition: none;` 禁用过渡。

```html preview
<s-progress variant="circular" value="80" style="transition: none"></s-progress>
<input type="range" min="0" max="100" value="80" oninput="this.previousElementSibling.value=this.value" />
```

---

## 属性

| 名称          | 类型             | 默认值 | 同步 | 说明   |
| ------------- | ---------------- | ------ | ---- | ------ |
| variant       | linear, circular | linear | ✔️ | 变体   |
| size          | medium, large    | medium | ✔️ | 尺寸   |
| indeterminate | boolean          | 未知的 | ✔️ | 禁用的 |
| max           | number           | 100    | ✖️ | 最大值 |
| value         | number           | 0      | ✔️ | 当前值 |
