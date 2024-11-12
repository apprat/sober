# Linear Progress

线性进度条。

```html preview
<s-linear-progress value="50"></s-linear-progress>
```

设置 `indeterminate` 来启用未知进度。

```html preview
<s-linear-progress indeterminate="true"></s-linear-progress>
```

自定义颜色

```html preview
<s-linear-progress style="color: #009688; --s-color-secondary-container: #b4deda" value="50"></s-linear-progress>
<s-linear-progress style="color: #009688; --s-color-secondary-container: #b4deda" indeterminate="true"></s-linear-progress>
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