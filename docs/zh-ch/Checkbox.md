# Checkbox

```html preview
<s-checkbox>已阅读用户协议</s-checkbox>
<s-checkbox checked="true"></s-checkbox>
<s-checkbox indeterminate="true"></s-checkbox>
```

设置 `disabled` 来禁用复选框。

```html preview
<s-checkbox disabled="true"></s-checkbox>
<s-checkbox disabled="true" checked="true"></s-checkbox>
<s-checkbox disabled="true" indeterminate="true"></s-checkbox>
```

自定义颜色

```html preview
<s-checkbox style="color: #009688"></s-checkbox>
<s-checkbox style="color: #b54e4e" checked="true"></s-checkbox>
```

如果你需要设置选中的颜色，可以考虑使用 CSS 选择器，

```css
s-checkbox[checked=true] {
  color: #ff0000;
}
```

---

## 属性

| 名称          | 类型     | 默认值 | 是否同步 | 介绍    |
| ------------- | ------- | ------ | ------- | ------- |
| checked       | boolean | false  | 是      | 是否选中 |
| disabled      | boolean | false  | 是      | 是否禁用 |
| indeterminate | boolean | false  | 是      | 是否未知 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## CSS 变量

| 名称                         | 介绍             |
| ---------------------------- | ---------------- |
| --s-color-on-surface-variant | 图标/文本颜色     |
| --s-color-primary            | 选中图标/文本颜色 |
| --s-color-on-surface         | 禁用前景背景颜色  |