# TextField

文本编辑框，推荐使用 label 来替代 placeholder。

```html preview
<s-text-field label="请输入内容"></s-text-field>
<s-text-field label="请输入内容" value="My Name">
  <s-icon slot="start" type="search"></s-icon>
  <s-icon-button slot="end">
    <s-icon type="close"></s-icon>
  </s-icon-button>
</s-text-field>
```

设置样式占满一行

```html preview
<s-text-field style="display: grid; width: auto" label="请输入名称"></s-text-field>
```

多行文本输入

```html preview
<s-text-field label="请输入名称" multiLine="true"></s-text-field>
```

错误状态

```html preview
<s-text-field error="true" label="请输入内容"></s-text-field>
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

## 属性

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
| end    | 开始位置插槽，默认支持同 start                |
| text   | 提示文本                                     |

---

## 原型

```ts
class TextField extends HTMLElement {
  //原生编辑框对象
  readonly native: HTMLInputElement | HTMLTextAreaElement
  //标签
  label: string = ''
  //占位文本
  placeholder: string = ''
  //是否禁用
  disabled: boolean = false
  //是否只读
  readOnly: boolean = false
  //是否多行文本
  multiLine: boolean = false
  //是否启用字数统计
  countered: boolean = false
  //是否启用错误状态
  error: boolean = false
  //输入类型
  type: 'text' | 'number' | 'password' = 'text'
  //最大长度
  maxLength: number = -1
  //值
  value: string = ''
}
```

---

## CSS 变量

| 名称                         | 介绍                          |
| ---------------------------- | ---------------------------- |
| --text-field-border-radius   | `私有` 边框圆角大小            |
| --text-field-border-color    | `私有` 边框/label文本颜色      |
| --text-field-padding         | `私有` 内边距                 |
| --s-color-on-surface         | 文本颜色                      |
| --s-color-primary            | 获得焦点时的边框/label文本颜色 |
| --s-color-on-primary         | 选择文本颜色背景颜色           |
| --s-color-error              | 错误颜色                      |
| --s-color-on-surface-variant | 插槽SVG 颜色                  |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Field](./field)