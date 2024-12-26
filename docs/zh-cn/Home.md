# 原型

**Sober** 的组件均继承于 `HTMLElement` ，因此组件支持 `HTMLElement` 的所有属性和事件，例如 `id` 属性和 `click`、`mousedown` 等事件。

```js
class Component extends HTMLElement {}
```

你可以单独给组件设置样式来定义它们的颜色和尺寸。

```html preview folded=true
<s-button style="background: #009688"> button </s-button>
<s-checkbox checked="true" style="height: 56px"></s-checkbox>
<s-switch checked="true" style="color: #9fa42a"></s-switch>
<s-switch checked="true" style="color: #8b54ba; width: 32px"></s-switch>
```

---

# 属性

大多数组件都拥有一些额外属性，这些属性可以通过 HTML 属性设置，也可以通过组件 Element 对象进行设置或者获取

```html
<s-button type="outlined"> button </s-button>
```

```javascript
const button = document.querySelector('s-button')
consoe.log(button.type) //filled
button.type = 'outlined'
```

在你通过 `JavaScript` 设置属性时，组件会转换为该属性的原始类型。

```html
<s-button> button </s-button>
<script>
  const button = document.querySelector('s-button')
  button.disabled = 'true' //设置 string
  console.log(button.disabled, typeof button.disabled)  //输出 true boolean
</script>
```

某些属性是同步的，该属性被设置时，HTML 属性也会同步更新

```html
<s-button> button </s-button>
<script>
  document.querySelector('s-button').type = 'outlined'
</script>
```

这时 `s-button` 会同步设置为 

```html
<s-button type="outlined"> button </s-button>
```

这使得你可以做一些样式定义，如

```css
s-button[type=outlined]{
  color: #009688;
}
```

属性是区别大小写的，但是在 HTML 属性中，属性名是不区分大小写的，所以下列两种写法是等价的。

```html
<s-rate readonly="true"></s-rate>
<s-rate readOnly="true"></s-rate>
```

而在 JavaScript 中访问时，你必须使用使用大小写匹配的属性名。

```js
rate.readOnly = true
```

---

# 标注

某些组件的事件会标注为 `扩展` ，表示该事件为自定义事件，该事件无法通过 onEventName 的方式绑定，你必须通过 `addEventListener` 的方式绑定。

```html
<!--错误，该事件无法通过 HTML 属性绑定-->
<s-dialog onshow="func()"></s-dialog>
```

某些 CSS 变量被标记为 `私有`，表示该 CSS 变量仅支持在组件对象上绑定，无法通过祖先元素继承。

```html
<!--错误，私有变量必须设置在指定元素上-->
<div style="--picker-padding: 20px">
  <s-picker></s-picker>
</div>
```