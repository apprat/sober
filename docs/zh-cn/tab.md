# tab

选项卡。

```html preview
<s-tab>
  <s-tab-item selected>Tab 1</s-tab-item>
  <s-tab-item>Tab 3</s-tab-item>
  <s-tab-item>Tab 3</s-tab-item>
</s-tab>
```

除了通过 `selected` 属性设置默认选中项外，你还可以通过 Tab 的 `value` 属性设置默认选中项。

```html preview
<s-tab value="tab6">
  <s-tab-item value="tab1">Tab 1</s-tab-item>
  <s-tab-item value="tab2">Tab 3</s-tab-item>
  <s-tab-item value="tab3">Tab 3</s-tab-item>
  <s-tab-item value="tab4">Tab 4</s-tab-item>
  <s-tab-item value="tab5">Tab 5</s-tab-item>
  <s-tab-item value="tab6">Tab 6</s-tab-item>
</s-tab>
```

设置 `multiple` 属性设置允许多选，设置该属性后，`value` 设置值时需要使用 `,` 分割多个值。

```html preview
<s-tab value="tab2,tab3" multiple>
  <s-tab-item value="tab1">Tab 1</s-tab-item>
  <s-tab-item value="tab2">Tab 2</s-tab-item>
  <s-tab-item value="tab3">Tab 2</s-tab-item>
</s-tab>
```

设置 `orientation` 属性设置选项卡的显示方向，可选值有 `horizontal` 和 `vertical`。

```html preview
<s-tab orientation="vertical">
  <s-tab-item>Tab 1</s-tab-item>
  <s-tab-item>Tab 1</s-tab-item>
  <s-tab-item>Tab 1</s-tab-item>
</s-tab>
```
