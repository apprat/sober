# Avatar

头像。

```html preview
<s-avatar>US</s-avatar>
<s-avatar src="https://mui.com/static/images/avatar/2.jpg"></s-avatar>
<s-avatar>
  <s-icon name="home"></s-icon>
</s-avatar>
```

使用 `badge` 插槽。

```html preview
<s-avatar>
  US
  <s-badge slot="badge"></s-badge>
</s-avatar>
<s-avatar src="https://mui.com/static/images/avatar/2.jpg">
  <s-badge slot="badge">8</s-badge>
</s-avatar>
<s-avatar>
  <s-icon name="home"></s-icon>
  <s-badge slot="badge">99</s-badge>
</s-avatar>
```