# checkbox

复选框。

```html preview
<s-checkbox>已阅读用户协议</s-checkbox>
<s-checkbox checked></s-checkbox>
<s-checkbox indeterminate></s-checkbox>
```

设置 `disabled` 属性来禁用复选框。

```html preview
<s-checkbox disabled></s-checkbox>
<s-checkbox disabled checked></s-checkbox>
<s-checkbox disabled indeterminate></s-checkbox>
```

---

自定义图标和样式

```html preview
<s-checkbox>
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-checkbox>
<s-checkbox style="color: #009688" checked></s-checkbox>
<s-checkbox style="color:rgb(212, 162, 35); height: 56px" checked></s-checkbox>
```

如果你需要单独设置选中的颜色，可以使用 CSS 选择器；

```html preview
<style>
  .checkbox[checked=true]{
    color: #009688;
  }
</style>
<s-checkbox class="checkbox">已阅读用户协议</s-checkbox>
```

---

## 属性

| 名称          | 类型    | 默认值 | 同步 | 说明   |
| ------------- | ------- | ------ | ---- | ------ |
| disabled      | boolean | false  | ✔️ | 禁用的 |
| checked       | boolean | false  | ✔️ | 选中的 |
| indeterminate | boolean | false  | ✔️ | 未知的 |
