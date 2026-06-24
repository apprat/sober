# loading

加载指示器显示短等待时间的进度。

```html preview
<s-loading></s-loading>
<s-loading variant="contained"></s-loading>
```

## 全屏加载

可以调用 `showModal` 静态方法显示一个全屏加载（如果已经存在一个全屏加载，则会关闭原有的）。

```vue preview
<script setup>
  import { Loading } from 'sober'

  const showLoading = () => {
    Loading.showModal()
    setTimeout(() => Loading.hideModal(), 3000)
  }
</script>
<template>
  <s-button @click="showLoading"> 显示 3 秒加载 </s-button>
</template>
```

---

## 属性

| 名称    | 类型               | 默认值  | 同步 | 说明 |
| ------- | ------------------ | ------- | ---- | ---- |
| variant | default, contained | default | √    | 变体 |

---

## 原型

```ts
class Loading extends HTMLElement implements Props {
  //显示一个加载框
  static showModal(options: {
    root?: Element //插入的目标元素，为空则寻找 document.body 下第一个 <s-page> 元素
  }): void
  //隐藏加载框
  static hideModal(): void
}
```
