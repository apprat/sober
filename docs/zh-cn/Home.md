# 介绍

Sober 是基于 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components) 的 UI 组件库，因此你需要掌握一些 Web Components 的相关知识，以便于更快的上手，如果你对 Web Components 完全不了解，这篇文档会帮你快速入门。

---

# 使用

你可以使用三种方式来创建组件。

1. 使用标签：
```html
<s-buttton> hello </s-buttton>
```
> [!WARNING]
> 注意：你必须始终编写闭合标签，不支持自闭合标签写法，例如：&lt;s-button /&gt;

2. 使用 document.createElement 方法：
```js
const button = document.createElement('s-button') //创建组件
button.textContent = 'hello' //设置文本
document.body.appendChild(button) //插入到页面
```
3. 实例化类：
```js
import { Button } from 'sober'

const button = new Button()
button.textContent = 'hello'
document.body.appendChild(button)
```

---

# 属性

所有组件都继承自 [HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)，因此所有组件都支持大多数 HTML 属性，例如 `id`、`class`、`style`、`title` 等或者监听组件的事件。   

```html preview
<s-button title="button" style="background: #336699; border-radius: 4px" onclick="alert('hello world')"> hello </s-button>
```

> 除了 HTML 属性外，大多数组件还支持一些额外的属性或事件，你可以在每个组件的文档中查看。

#### 同步属性

一些组件的额外属性是同步的，当你使用 JavaScript 修改组件的属性时，组件的 HTML 属性也会立即更新。

```html
<s-button> hello </s-button>
<script>
  const button = document.querySelector('s-button')
  button.type = 'outline'
  //组件的 HTML 属性也会立即更新为：<s-button type="outline"> hello </s-button>
</script>
```

因为这个特性，你可以使用 CSS 选择器来修改组件设置一些属性后的样式。

```css
s-button[type="outline"] {
  color: #ddd;
}
```

---

# 样式

大多数情况下你通过 `style` 属性或者 CSS 选择器来定义样式：

```html
<s-button class="my-button"> hello </s-button>
<style>
  .my-button {
    color: #ddd;
  }
</style>
```

但是有一些例外，比如大多数组件内部都存在 [ShadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot)，下面是一个对话框组件的例子。   
你无法通过 `<s-dialog>` 来修改对话框的内部样式，例如遮罩层(scrim)，因为对话框内部使用了 Shadow DOM。

```html preview
<s-dialog style="background: #ddd">
  <s-button slot="trigger"> 对话框 </s-button>
  <div slot="headline"> dialog </div>
  <div slot="text"> Shadow DOM is a web standard that allows developers to encapsulate the internal structure of a web component, making it hidden from the main document's JavaScript and CSS. This encapsulation ensures that the component's internal implementation is protected from accidental interference by the surrounding page's code. </div>
</s-dialog>
```

这个时候你可以使用 CSS [::part](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part) 选择器来修改组件内部样式：

```css
s-dialog::part(scrim) {
  background: rgba(255, 255, 255, 0.5);
}
```

这样有一个弊端，就是你必须去定义 CSS 样式，并不支持内联的样式，下面有一个折中的方法，你可以通过修改内部使用的 CSS 变量值来达到修改样式的目的，

```html preview
<s-dialog style="--s-color-scrim: rgba(255, 255, 255);">
  <s-button slot="trigger"> 对话框 </s-button>
  <div slot="headline"> dialog </div>
  <div slot="text"> Shadow DOM is a web standard that allows developers to encapsulate the internal structure of a web component, making it hidden from the main document's JavaScript and CSS. This encapsulation ensures that the component's internal implementation is protected from accidental interference by the surrounding page's code. </div>
</s-dialog>
```