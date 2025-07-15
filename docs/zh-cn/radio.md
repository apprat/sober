# radio

单选按钮需要设置一个唯一的 `name` 作为分组才能执行单选，在 `Vue` 中使用 `v-model` 语法糖时 `name` 属性可以省略。

```html preview
<s-radio name="group">男</s-radio>
<s-radio name="group">女</s-radio>
<s-radio name="group">未知</s-radio>
```

设置 `disabled` 属性来禁用单选框。

```html preview
<s-radio disabled></s-radio>
<s-radio disabled checked="true"></s-radio>
```

---

自定义图标和样式

```html preview
<s-radio name="group2">
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-radio>
<s-radio name="group2" style="color: #009688" checked="true"></s-radio>
<s-radio name="group2" style="color:rgb(212, 162, 35); height: 56px" checked="true"></s-radio>
```

如果你需要单独设置选中的颜色，可以使用 CSS 选择器；

```html preview
<style>
  .radio[checked=true]{
    color: #009688;
  }
</style>
<s-radio class="radio">其他</s-radio>
```

---

## 属性

| 名称          | 类型    | 默认值 | 同步 | 说明   |
| ------------- | ------- | ------ | ---- | ------ |
| disabled      | boolean | false  | ✔️ | 禁用的 |
| checked       | boolean | false  | ✔️ | 选中的 |
| indeterminate | boolean | false  | ✔️ | 未知的 |
