# Alert

警告信息面板。

```html preview
<s-alert>登录已失效，请重新登录。</s-alert>
<s-alert type="error">登录已失效，请重新登录。</s-alert>
<s-alert type="success">登录已失效，请重新登录。</s-alert>
<s-alert type="warning">登录已失效，请重新登录。</s-alert>
```

自定义图标和添加操作按钮。

```html preview
<s-alert>
  <s-icon name="star" slot="start"></s-icon>
  登录已失效，请重新登录。
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-alert>
<s-alert type="error">
  <s-icon name="star" slot="start"></s-icon>
  登录已失效，请重新登录。
  <s-button type="text" slot="end">关闭</s-button>
</s-alert>
```

---

## 属性

| 名称 | 类型                           | 默认值 | 同步 | 介绍    |
| ---- | ----------------------------- | ------ | --- | ------- |
| type | info, success, warning, error | info   | 是  | 类型    |
