# Spinner

环形进度条。

```html preview
<s-spinner value="60"></s-spinner>
```

## 尺寸

设置 `size="large"` 定义较大的进度条。

```html preview
<s-spinner size="large" value="60"></s-spinner>
```

## 未知的

设置 `indeterminate` 属性定义未知的进度条。

```html preview
<s-spinner indeterminate></s-spinner>
<s-spinner size="large" indeterminate></s-spinner>
```

进度条会有过渡动画，如果你希望实时的变更进度，可以使用CSS `transition: none` 来禁用过渡。

```html preview
<s-spinner value="84" style="transition: none"></s-spinner>
<input type="range" min="0" max="100" value="84" oninput="this.previousElementSibling.value=this.value" />
```

---

## 属性

| 名称          | 类型          | 默认值 | 同步 | 说明   |
| ------------- | ------------- | ------ | ---- | ------ |
| size          | medium, large | medium | √    | 尺寸   |
| indeterminate | boolean       | 未知的 | √    | 禁用的 |
| max           | number        | 100    | ×    | 最大值 |
| value         | number        | 0      | ×    | 当前值 |
