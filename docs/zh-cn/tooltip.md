# tooltip

工具提示，在支持鼠标的设备上通过鼠标悬停触发提示信息，在触屏设备上通过长按触发

```html preview
<s-tooltip>
  <s-button slot="trigger">Tooltip</s-button>
  提示信息
</s-tooltip>

<s-tooltip>
  <s-button slot="trigger">Image</s-button>
  <img src="./images/chat.webp" style="max-width: 128px">
</s-tooltip>
```

---

设置 `align` 属性来设置提示信息默认方向

```html preview
<s-tooltip align="top">
  <s-button slot="trigger"> top (default) </s-button>
  提示信息
</s-tooltip>
<s-tooltip align="bottom">
  <s-button slot="trigger"> bottom </s-button>
  提示信息
</s-tooltip>
<s-tooltip align="left">
  <s-button slot="trigger"> left </s-button>
  提示信息
</s-tooltip>
<s-tooltip align="right">
  <s-button slot="trigger"> right </s-button>
  提示信息
</s-tooltip>
```

---

## 属性

| 名称  | 类型                     | 默认值 | 同步 | 介绍     |
| ----- | ------------------------ | ------ | ---- | -------- |
| align | top, bottom, left, right | top    | ✔️   | 默认位置 |
