# table

表格并非一个组件，它是一个样式文件，通过引入样式的方式来使用

```js
//使用构建工具（推荐）
import 'sober/styles/table.css'
```

直接在浏览器中引入。

```html
<!-- 直接在浏览器中引入-->
<link rel="stylesheet" href="https://unpkg.com/sober/styles/table.css">
```

它会为所有 `<table>` 元素添加样式和允许滚动。

```html preview
<table>
  <thead>
    <tr>
      <th>title1</th>
      <th>title2</th>
      <th>title3</th>
      <th>title4</th>
      <th>title5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>item1</td>
      <td>item2</td>
      <td>item3</td>
      <td>item4</td>
      <td>item5</td>
    </tr>
    <tr>
      <td>item1</td>
      <td>item2</td>
      <td>item3</td>
      <td>item4</td>
      <td>item5</td>
    </tr>
    <tr>
      <td>item1</td>
      <td>item2</td>
      <td>item3</td>
      <td>item4</td>
      <td>item5</td>
    </tr>
  </tbody>
</table>
```
