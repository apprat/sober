# Checkbox

复选框允许用户从列表中选择一个或多个项目，或者打开或关闭项目。

```html preview
<s-checkbox>已阅读用户协议</s-checkbox>
<s-checkbox checked></s-checkbox>
<s-checkbox indeterminate></s-checkbox>
<s-checkbox indeterminate checked></s-checkbox>
```

## 禁用

设置 `disabled` 属性来禁用复选框。

```html preview
<s-checkbox disabled></s-checkbox>
<s-checkbox disabled checked></s-checkbox>
<s-checkbox disabled indeterminate></s-checkbox>
<s-checkbox disabled indeterminate checked></s-checkbox>
```

## 只读

设置 `readOnly` 属性来只读复选框。

```html preview
<s-checkbox readOnly></s-checkbox>
<s-checkbox readOnly checked></s-checkbox>
<s-checkbox readOnly indeterminate></s-checkbox>
<s-checkbox readOnly indeterminate checked></s-checkbox>
```

## 自定义样式

自定义图标和样式

```html preview
<s-checkbox>
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-checkbox>

<s-checkbox style="color: #009688" checked></s-checkbox>
<s-checkbox style="color:rgb(212, 162, 35); height: 56px" checked></s-checkbox>
```

如果你需要单独设置选中的颜色，可以使用 CSS 选择器；

```vue preview
<style>
  .checkbox[checked]{
    color: #009688;
  }
</style>
<template>
  <s-checkbox class="checkbox">已阅读用户协议</s-checkbox>
</template>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-checkbox name="tag" value="java"> Java </s-checkbox>
  <s-checkbox name="tag" value="rust"> Rust </s-checkbox>
  <s-checkbox name="tag" value="python" defaultChecked checked> Python </s-checkbox>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

> 请注意，如果在 `Vue` 中使用 `v-model.lazy` 语法糖，必须在模板中显式的设置 `type=checkbox`。

---

## 属性

| 名称           | 类型    | 默认值 | 同步 | 说明                         |
| -------------- | ------- | ------ | ---- | ---------------------------- |
| disabled       | boolean | false  | √    | 禁用的                       |
| readOnly       | boolean | false  | √    | 只读的                       |
| indeterminate  | boolean | false  | √    | 未知的                       |
| checked        | boolean | false  | √    | 选中的                       |
| defaultChecked | boolean | false  | √    | 默认选中，表单重置时的默认值 |
| name           | string  | ''     | √    | 名称，表单提交时的 `key` 值  |
| value          | string  | ''     | ×    | 值，表单提交时有效           |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称 | 说明 |
| ---- | ---- |
| 匿名 | 文本 |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hover   | 鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。
