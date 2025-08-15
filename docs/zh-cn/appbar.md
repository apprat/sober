# appbar

```html preview
<s-appbar>
  <s-icon-button slot="nav">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <span slot="title">Material 3</span>
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
  </s-icon-button>
</s-appbar>
```

使用更多插槽

```html preview
<s-appbar>
  <svg viewBox="0 0 1024 1024" slot="logo">
    <path d="M913.4 757.4c-105-16-113-31.4-113-31.4 21.6-129.8-45.4-294.2-154.8-383.2-145.6-118.4-367-32.4-539.4-212.4-40.2-42-16.8 471 199 665.4 157.8 142 343.6 98.4 394.6 75.2 46.2-21.2 78.6-59.8 78.6-59.8 84.2 26 125.8 24.4 125.8 24.4C933.8 839.2 948.8 762.8 913.4 757.4zM721.2 766.2c-276.4-81.8-484.2-369-484.2-369s182.4 215.4 504 320.4C741.4 733.8 731.8 757 721.2 766.2z"></path>
  </svg>
  <span slot="title">Material 3</span>
  <span slot="subtitle">Google M3 Expressive</span>
</s-appbar>
```

---

## 断点

- 该组件会在**自身宽度**达到 `breakpointCompact` 时，显示为更紧凑的样式，如果你不希望组件自动变更样式，请将 `breakpointCompact` 设置为 `-1`。

- 该组件会在**自身宽度**达到 `breakpointDense` 时，显示为更密集的样式，如果你不希望组件自动变更样式，请将 `breakpointDense` 设置为 `-1`。

---

## 属性

| 名称              | 类型    | 默认值 | 同步 | 说明         |
| ----------------- | ------- | ------ | ---- | ------------ |
| centerTitle       | boolean | false  | ✔️ | 居中标题的   |
| breakpointCompact | number  | 1024   | ✖️ | 断点：紧凑型 |
