# 给 Vue 开发者的 Sober 指南

这篇文档旨在帮助 Vue 开发者利用既有的 Vue 知识来使用 Sober 开发应用。
如果你了解 Vue 基本知识，你就可以使用这篇文档作为 Sober 开发的快速入门。

## 组件

### 如何使用组件？

```html
<template>
  <s-button ref="button"> Button </s-button>
</template>
<script setup>
  import 'sober/button'
</script>
```

> 每次都导入对应的组件是非常繁琐的，因此建议你在入口文件中导入所有组件，即可在所以地方使用 Sober 组件。

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'sober' //导入所有组件
const app = createApp(App)
```

```html
<!--App.vue-->
<template>
  <s-button> Button </s-button>
</template>
```

不要害怕导入所有组件会丢失 Sober 组件的语法提示和补全，我们为 Sober 创建了每个组件的 `.d.ts` 文件，因此你的 IDE 只要支持 `TypeScript` 就会自动给你提供 Sober 组件的语法提示和补全。

### Vue 警告

### 如何引用组件？

你可以通过 `ref` 或 `useTemplateRef` (v3.5) 来引用组件实例；

```html
<template>
  <s-button ref="button"> Button </s-button>
</template>
<script setup>
  import { useTemplateRef } from 'vue'
  const button = useTemplateRef('button')
</script>
```

Sober 的组件实例和 `document.querySelector('body')` 返回值一样，都是 `HTMLElement` 的实例。
