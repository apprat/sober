# loading

加载指示器显示短等待时间的进度。

```html preview
<s-loading></s-loading>
```

容器的变体。

```html preview
<s-loading variant="contained"></s-loading>
```

可以调用 `showModal` 静态方法显示一个全屏加载（如果已经存在一个全屏加载，则会关闭原有的）。

```js
import { Loading } from 'sober'

Loading.showModal()
setTimeout(() => Loading.hideModal(), 3000)
```

```html preview
<s-button onclick="customElements.get('s-loading').showModal(); setTimeout(() => customElements.get('s-loading').hideModal(), 3000)"> 显示 3 秒加载 </s-button>
```

---

## 属性

| 名称    | 类型               | 默认值 | 同步 | 说明 |
| ------- | ------------------ | ------ | ---- | ---- |
| variant | default, contained | default | ✔️ | 变体 |

---

## 原型

```ts
class Loading extends HTMLElement {
  //显示加载框
  static showModal(options: {
    root?: Element //插入的目标元素，为空则寻找 document.body 下第一个 <s-page> 元素
  }): void
  //隐藏加载框
  static hideModal(): void
}
```
