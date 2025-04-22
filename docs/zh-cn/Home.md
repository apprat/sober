# 介绍

Sober 是基于 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components) 的 UI 组件库，因此它有一些限制，例如元素名称必须使用 `-` 连接符，且不支持自闭合标签写法。
```html
<s-button> 按钮 </s-button> <!--正确写法-->
<s-button /> <!--错误写法-->
```

除此之外你还可以动态创建组件，例如：

```js
const button = document.createElement('s-button')
document.body.appendChild(button)
```

自定义组件样式是非常简单的，你可以使用 CSS 选择器，或是内联样式：

```css
s-button {
  backgrouund: #009688;
  color: #fff;
}
```

一些组件在内部创建了 DOM 元素，要为这些元素设置样式，你可以使用 CSS [::part()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part) 选择器：

```css
s-dialog::part(container) {
  color: #fff;
}
```

---

# 属性

大多数组件都拥有一些额外属性，属性支持三种基本类型：`string`、`number`、`boolean`，你可以通过 HTML 来设置属性，也可以使用 JavaScript 来设置（注意如果属性类型不匹配组件会尝试转换其类型）。

```html
<s-button type="outline"> 按钮 </s-button>
<script>
  const button = document.querySelector('s-button')
  button.type = 'text'
</script>
```

在文档中，某些组件被标注为 `同步`，表示该属性被赋值时在 DOM 节点上同步更新，因此你可以使用属性选择器来选中：

```css
s-button[type=text] {
  color: #009688;
}
```

> [!WARNING]
> 属性名称是区分大小写的，但是 HTML 并不区分大小写。

---

# 原型

所有组件均继承于 `HTMLElement` ，因此组件支持 `HTMLElement` 的所有属性和事件，例如 `id` 属性和 `click`、`mousedown` 等事件。

```js
const button = document.createElement('s-button') // HTMLElement
button.id = 'btn'
button.addEventListener('click',() => console.log('click'))
```

---

# 标注

某些组件的事件会标注为 `扩展` ，表示该事件为自定义事件，该事件无法通过 onEventName 的方式绑定，必须通过 `addEventListener` 来绑定。

```html
<!--错误，该事件无法通过 HTML 属性绑定-->
<s-dialog onshow="func()"></s-dialog>
```

某些 CSS 变量被标记为 `私有`，表示该 CSS 变量仅支持在组件对象上绑定，无法通过祖先元素继承。

```html
<!--错误：私有变量必须设置在指定元素上-->
<div style="--picker-padding: 20px">
  <s-picker></s-picker>
</div>
<!--正确写法-->
<div>
  <s-picker style="--picker-padding: 20px"></s-picker>
</div>
```