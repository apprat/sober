# Circular Progress

圆形进度条。

```html preview
<s-circular-progress value="80"></s-circular-progress>
```

设置 `indeterminate` 来启用未知进度。

```html preview
<s-circular-progress indeterminate="true"></s-circular-progress>
```

自定义颜色

```html preview
<s-circular-progress style="color: #009688; --s-color-secondary-container: #b4deda" value="80"></s-circular-progress>
<s-circular-progress style="color: #009688; --s-color-secondary-container: #b4deda" indeterminate="true"></s-circular-progress>
```

---

## 属性

| 名称          | 类型     | 默认值 | 是否同步 | 介绍                  |
| ------------- | ------- | ------ | ------- | -------------------- |
| indeterminate | boolean | false  | 是      | 是否未知              |
| animated      | boolean | false  | 是      | 是否启用变更时过渡动画 |
| max           | number  | 100    | 否      | 最大值                |
| value         | number  | 0      | 否      | 当前值                |

---

## CSS 变量

| 名称                          | 介绍               |
| ----------------------------- | ----------------- |
| --s-color-primary             | 指示器颜色         |
| --s-color-secondary-container | 轨道颜色           |