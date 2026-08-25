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

## 自定义尺寸

你可以通过 `strokeWidth` 和 `strokeGap` 来设置进度条的宽度和间距。

```html preview
<s-spinner strokeWidth="6" strokeGap="4" style="width: 80px" value="80">80%</s-spinner>
<s-spinner indeterminate strokeWidth="2" style="width: 80px"></s-spinner>
```

> 注意：该组件会始终保持缩放比例，所以 `strokeWidth` 和 `strokeGap` 的尺寸设置始终相对于原始尺寸(`40px`)。  
> 例如：组件的宽高设置为 `80px`，那么 `strokeWidth=4`，实际上渲染为 `8px`。  
> 你总是可以使用 `值 * 40 / 宽度` 计算公式来定义绝对值。

进度条会有过渡动画，如果你希望实时的变更进度，可以使用CSS `transition: none` 来禁用过渡。

```html preview
<s-spinner value="84" style="transition: none; width: 60px"></s-spinner><hr>

<s-base-slider end="84" oninput="this.previousElementSibling.previousElementSibling.value=this.end"></s-base-slider>
```

---

## 属性

| 名称          | 类型      | 默认值  | 同步 | 说明     |
| ------------- | --------- | ------- | ---- | -------- |
| indeterminate | `boolean` | `false` | √    | 未知的   |
| max           | `number`  | `100`   | ×    | 最大值   |
| value         | `number`  | `0`     | ×    | 当前值   |
| strokeWidth   | `number`  | `4`     | ×    | 线条宽度 |
| strokeGap     | `number`  | `4`     | ×    | 线条间距 |

## 样式变量

| 名称                          | 说明                            |
| ----------------------------- | ------------------------------- |
| --s-spinner-track-color       | 轨道颜色，默认使用 stroke 的值  |
| --s-spinner-indicator-color   | 指示器颜色，默认使用 color 的值 |
| --s-spinner-track-opacity     | 轨道不透明的                    |
| --s-spinner-indicator-opacity | 指示器不透明的                  |
