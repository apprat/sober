# TextField

文本编辑框，推荐使用 label 来替代 placeholder。

```html preview
<s-text-field label="请输入内容"></s-text-field>
<s-text-field label="请输入内容" value="My Name">
  <s-icon slot="start" name="search"></s-icon>
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-text-field>
```

设置样式 `display: grid` 来 和 `width: auto` 占满横向空间。

```html preview
<s-text-field style="display: grid; width: auto" label="请输入名称"></s-text-field>
```

多行文本输入

```html preview
<s-text-field label="请输入名称" multiLine="true" style="min-height: 96px"></s-text-field>
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

| 名称        | 类型                    | 默认值 | 同步 | 介绍                   |
| ----------- | ---------------------- | ------ | --- | ---------------------- |
| label       | string                 |        | 否  | 标签                   |
| placeholder | string                 |        | 否  | 占位内容(不推荐)        |
| disabled    | boolean                | false  | 是  | 是否禁用                |
| type        | text, number, password | text   | 否  | 输入类型(仅单行文本有效) |
| error       | boolean                | false  | 是  | 是否启用错误状态         |
| value       | string                 |        | 否  | 值                     |
| maxLength   | number                 | -1     | 否  | 最大长度                |
| readOnly    | boolean                | false  | 是  | 是否只读                |
| multiLine   | boolean                | false  | 是  | 是否多行文本            |
| countered   | boolean                | false  | 是  | 是否显示字数统计         |

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
| end    | 结束位置插槽，默认支持同 start                |
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
