# Switch

开关用于打开或关闭项目的选择。

```html preview
<s-switch></s-switch>
<s-switch checked></s-switch>
```

自定义图标

```html preview
<s-switch>
  <svg viewBox="0 -960 960 960" slot="inactive-icon"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
  <svg viewBox="0 -960 960 960" slot="active-icon"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
</s-switch>
<s-switch checked>
  <svg viewBox="0 -960 960 960" slot="inactive-icon"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
  <svg viewBox="0 -960 960 960" slot="active-icon"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
</s-switch>
```

## 禁用

```html preview
<s-switch disabled>
  <svg viewBox="0 -960 960 960" slot="inactive-icon"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
  <svg viewBox="0 -960 960 960" slot="active-icon"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
</s-switch>
<s-switch checked disabled>
  <svg viewBox="0 -960 960 960" slot="inactive-icon"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
  <svg viewBox="0 -960 960 960" slot="active-icon"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
</s-switch>
```

## 只读

设置 `readOnly` 属性来只读。

```html preview
<s-switch readOnly></s-switch>
<s-switch checked readOnly></s-switch>
```

## 自定义样式

自定义大小

```html preview
<s-switch style="width: 42px"></s-switch>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
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

| 名称           | 类型      | 默认值  | 同步 | 说明                         |
| -------------- | --------- | ------- | ---- | ---------------------------- |
| disabled       | `boolean` | `false` | √    | 禁用的                       |
| readOnly       | `boolean` | `false` | √    | 只读的                       |
| checked        | `boolean` | `false` | √    | 选中的                       |
| defualtChecked | `boolean` | `false` | √    | 默认选中，表单重置时的默认值 |
| name           | `string`  | `''`    | √    | 名称，表单提交时的 `key` 值  |
| value          | `string`  | `''`    | ×    | 值，表单提交时有效           |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称          | 说明                                                        |
| ------------- | ----------------------------------------------------------- |
| inactive-icon | 未选中时的图标，默认支持`.icon`, `svg`, `s-icon`, `ms-icon` |
| active-icon   | 选中时的图标，默认支持同 inactive-icon                      |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。
