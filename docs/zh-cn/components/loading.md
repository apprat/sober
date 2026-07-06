# Loading

加载指示器显示短等待时间的进度。

```html preview
<s-loading></s-loading>
<s-loading variant="contained"></s-loading>
```

## 全屏加载

可以调用 `showModal` 静态方法显示一个全屏加载。

```vue preview
<script setup>
  import { Loading } from 'sober'

  const showLoading = () => {
    const hideModal = Loading.showModal()
    setTimeout(hideModal, 3000)
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
