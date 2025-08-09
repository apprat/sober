# alert

提示或警告信息面板。

```html preview
<s-alert>
  <div slot="title"> Title </div>
  This is a content.
</s-alert>
```

你可以使用插槽来放置不同内容。

```html preview
<s-alert>
  <s-icon name="star" slot="icon"></s-icon>
  This is a content.
  <s-button slot="action">关闭</s-button>
</s-alert>
<s-alert>
  <s-icon name="favorite" slot="icon"></s-icon>
  This is a content.
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-alert>
```

设置 `variant` 来设置不同的变体：`success、warning、error`。

```html preview
<s-alert variant="success">
  This is a content.
</s-alert>
<s-alert variant="warning">
  This is a content.
</s-alert>
<s-alert variant="error">
  This is a content.
</s-alert>
```

设置 `collapsed` 属性，可以启用折叠模式（启用后你可以使用 `toggle` 插槽来自定义折叠按钮），这时正文默认不可见，点击切换按钮可展开。

```html preview
<s-alert collapsed ontoggle="console.log(this.opened)">
  <div slot="title"> Title </div>
  This is a content.
</s-alert>
<s-alert collapsed opened ontoggle="console.log(this.opened)">
  <div slot="title"> Title </div>
  This is a content.
  <s-icon-button slot="toggle">
    <s-icon name="arrow_drop_down"></s-icon>
  </s-icon-button>
</s-alert>
```

---

## 属性

| 名称      | 类型                          | 默认值 | 同步 | 说明   |
| --------- | ----------------------------- | ------ | ---- | ------ |
| variant   | info, success, warning, error | info   | ✔️ | 变体   |
| collapsed | boolean                       | false  | ✔️ | 折叠的 |
| opened    | boolean                       | false  | ✔️ | 展开的 |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                        |
| ------ | ----- | ---- | ------ | ------------------------------------------- |
| toggle | Event | ✖️ | ✖️   | 在设置了 `collapsed` 属性后，切换展开时触发 |

---

## 插槽

| 名称   | 说明     |
| ------ | -------- |
|        | 内容文本 |
| title  | 标题文本 |
| icon   | 图标     |
| action | 操作按钮 |
| toggle | 折叠按钮 |
