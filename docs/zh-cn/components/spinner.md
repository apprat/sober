# Spinner

环形进度条。

```html preview
<s-spinner value="60"></s-spinner>
```

## 未知的

设置 `indeterminate` 属性定义未知的进度条。

```html preview
<s-spinner indeterminate></s-spinner>
```

进度条会有过渡动画，如果你希望实时的变更进度，可以使用CSS `transition: none` 来禁用过渡。

```html preview
<s-spinner value="84" style="transition: none"></s-spinner>
<input type="range" min="0" max="100" value="84" oninput="this.previousElementSibling.value=this.value" />
```

---

## 属性

| 名称          | 类型    | 默认值 | 同步 | 说明   |
| ------------- | ------- | ------ | ---- | ------ |
| indeterminate | boolean | 未知的 | √    | 禁用的 |
| max           | number  | 100    | ×    | 最大值 |
| value         | number  | 0      | ×    | 当前值 |

## 样式变量

| 名称                          | 说明                            |
| ----------------------------- | ------------------------------- |
| --s-spinner-track-color       | 轨道颜色，默认使用 stroke 的值  |
| --s-spinner-indicator-color   | 指示器颜色，默认使用 color 的值 |
| --s-spinner-track-opacity     | 轨道不透明的                    |
| --s-spinner-indicator-opacity | 指示器不透明的                  |
