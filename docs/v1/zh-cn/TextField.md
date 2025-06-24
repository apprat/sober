# TextField

文本编辑框，推荐使用 label 来替代 placeholder。

```html preview
<s-text-field label="请输入文本"></s-text-field>
<s-text-field label="请输入数字" type="number"></s-text-field>
<s-text-field label="请输入密码" type="password"></s-text-field>
<s-text-field label="请输入多行文本" type="multiLine" style="min-height: 96px"></s-text-field>
```

使用 `start` 和 `end` 插槽来添加图标或者图标按钮。

```html preview
<s-text-field label="请输入内容" value="My Name">
  <s-icon slot="start" name="search"></s-icon>
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-text-field>
```

> [!WARNING]
> 注意，`end` 插槽会覆盖默认图标（如 type=password 的密码显示切换按钮）。


设置样式 `display: grid` 来 和 `width: auto` 占满横向空间。

```html preview
<s-text-field style="display: grid; width: auto" label="请输入名称"></s-text-field>
```

错误状态

```html preview
<s-text-field error="true" label="请输入内容">
  <div slot="text">输入格式错误</div>
</s-text-field>
```

计数器（需要同时设置 `maxLength` 属性）

```html preview
<s-text-field label="请输入内容" maxLength="20" countered="true">
  <div slot="text">支持中英文2-20个字符</div>
</s-text-field>
```

在 Vue 中使用 `v-model` 双向绑定。

```html
<template>
  <s-text-field label="请输入内容" v-model="input"></s-text-field>
</template>
<script setup>
  import { ref } from 'vue'
  const input = ref('')
</script>
```

---

## 属性 Props

| 名称        | 类型                               | 默认值 | 同步 | 介绍                            |
| ----------- | --------------------------------- | ------ | --- | ------------------------------- |
| label       | string                            |        | 否  | 标签                            |
| placeholder | string                            |        | 否  | 占位内容(不推荐)                 |
| disabled    | boolean                           | false  | 是  | 是否禁用                         |
| type        | text, number, password, multiline | text   | 否  | 类型：文本、数字，密码，多行输入框 |
| error       | boolean                           | false  | 是  | 是否启用错误状态                  |
| value       | string                            |        | 否  | 值                              |
| maxLength   | number                            | -1     | 否  | 最大长度                         |
| readOnly    | boolean                           | false  | 是  | 是否只读                         |
| countered   | boolean                           | false  | 是  | 是否显示字数统计                  |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍            |
| ------ |------ |------|------ |---------------- |
| input  | Event | 否   | 否     | 值变化后触发     |
| change | Event | 否   | 否     | 值变化后完成触发 |
| focus  | Event | 否   | 否     | 获得焦点时触发   |
| blur   | Event | 否   | 否     | 丢失焦点时触发   |

---

## 插槽

| 名称   | 介绍                                         |
| ------ | ------------------------------------------- |
| start  | 开始位置插槽，默认支持 svg、icon、icon-button |
| end    | 开始位置插槽，默认支持同 start                |
| text   | 提示文本                                     |

---

## 原型

```ts
class TextField extends HTMLElement implements Props {
  //原生编辑框对象
  readonly native: HTMLInputElement | HTMLTextAreaElement
}
```

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Field](./field)