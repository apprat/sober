# switch

开关用于打开或关闭项目的选择。

```html preview
<s-switch></s-switch>
<s-switch checked></s-switch>
```

自定义图标

```html preview
<s-switch>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

## 禁用

```html preview
<s-switch disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

## 自定义样式

自定义大小

```html preview
<s-switch style="width: 42px"></s-switch>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  选择标签：
  <label> Java <s-switch name="tag" value="java"></s-switch> </label>
  <label> Rust <s-switch name="tag" value="rust"></s-switch> </label>
  <label> Python <s-switch name="tag" value="python" checked defualtChecked></s-switch> </label>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

> 请注意，如果在 `Vue` 中使用 `v-model.lazy` 语法糖，必须在模板中显式的设置 `type="checkbox"`。

---

## 属性

| 名称           | 类型    | 默认值 | 同步 | 说明                         |
| -------------- | ------- | ------ | ---- | ---------------------------- |
| disabled       | boolean | false  | √    | 禁用的                       |
| checked        | boolean | false  | √    | 选中的                       |
| defualtChecked | boolean | false  | √    | 默认选中，表单重置时的默认值 |
| value          | string  |        | ×    | 值，表单提交时有效           |
| name           | string  |        | √    | 名称，表单提交时的 `key` 值  |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。
