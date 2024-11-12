# Radio Button

单选按钮需要设置一个唯一的 `name` 作为分组才能执行单选。

```html preview
<s-radio-button name="group">男</s-radio-button>
<s-radio-button name="group">女</s-radio-button>
<s-radio-button name="group">未知</s-radio-button>
```

设置 `disabled` 来禁用单选按钮。

```html preview
<s-radio-button disabled="true"></s-radio-button>
<s-radio-button disabled="true" checked="true"></s-radio-button>
```

自定义颜色


```html preview
<s-radio-button name="group2" style="color: #009688"></s-radio-button>
<s-radio-button name="group2" style="color: #b54e4e" checked="true"></s-radio-button>
```

如果你需要设置选中的颜色，可以考虑使用 CSS 选择器，

```css
s-radio-button[checked=true] {
  color: #ff0000;
}
```

> 如果你使用 Vue 框架的 `v-model.lazy` 语法糖，那么 `name` 并不是必须的。

---

## 属性

| 名称     | 类型     | 默认值 | 是否同步 | 介绍     |
| -------- | ------- | ------ | ------- | ------- |
| name     | string  |        | 是      | 名称     |
| checked  | boolean | false  | 是      | 是否选中 |
| disabled | boolean | false  | 是      | 是否禁用 |

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