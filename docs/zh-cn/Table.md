# Table

表格，组件支持滚动，你只需要添加 CSS `overflow` 属性。

```html preview
<s-table style="overflow: auto">
  <s-thead>
    <s-tr>
      <s-th>title1</s-th>
      <s-th>title2</s-th>
      <s-th>title3</s-th>
      <s-th>title4</s-th>
      <s-th>title5</s-th>
    </s-tr>
  </s-thead>
  <s-tbody>
    <s-tr>
      <s-td>item1</s-td>
      <s-td>item2</s-td>
      <s-td>item3</s-td>
      <s-td>item4</s-td>
      <s-td>item5</s-td>
    </s-tr>
    <s-tr>
      <s-td>item1</s-td>
      <s-td>item2</s-td>
      <s-td>item3</s-td>
      <s-td>item4</s-td>
      <s-td>item5</s-td>
    </s-tr>
    <s-tr>
      <s-td>item1</s-td>
      <s-td>item2</s-td>
      <s-td>item3</s-td>
      <s-td>item4</s-td>
      <s-td>item5</s-td>
    </s-tr>
  </s-tbody>
</s-table>
```

---

## CSS 变量

| 名称                                | 介绍           |
| ----------------------------------- | ------------- |
| --s-color-outline-variant           | 边框颜色       |
| --s-color-surface-container-high    | 背景颜色       |
| --s-color-on-surface-varian         | thead 文本颜色 |
| --s-color-on-surface                | tbody 文本颜色 |
| --s-color-surface-container-highest | 偶数行背景颜色 |