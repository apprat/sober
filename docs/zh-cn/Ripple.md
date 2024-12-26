# Ripple

波纹是一个容器，它本身没有任何样式，波纹的颜色继承文本颜色，并带有一定的不透明度。

```html preview
<s-ripple style="padding: 16px"> click me </s-ripple>
<s-ripple style="padding: 16px; color: #009688"> click me </s-ripple>
```

设置 `attached` 来启用依附模式，它依附在容器中，事件从容器上触发，某些情况下可能有妙用。   

```html preview
<div style="position: relative; padding: 16px">
  container
  <s-ripple attached="true"></s-ripple>
</div>
```

> 由于使用定位确定位置，所以容器的 `position` 必须设置为 `relative`、`absolute`、`sticky`、`fixed` 其中之一。

## 阻止动画

子元素可使用 `event.stopPropagation()` 阻止触发波纹动画（Vue 中可使用 `@pointerdown.stop` 替代）。

```html preview
<s-ripple style="padding: 16px 32px">
  <s-button onpointerdown="event.stopPropagation()">阻止动画</s-button>
</s-ripple>
```

如果从父元素中阻止动画，可以尝试使用 `capture` 捕获，（Vue 中可使用 `@pointerdown.stop.capture` 替代）。

```html
<s-ripple>
  <s-button id="text">阻止动画</s-button>
</s-ripple>
<script>
  document.getElementById('test').addEventListener('pointerdown', (event) => event.stopPropagation(), { capture: true })
</script>
```

在支持鼠标的设备上，组件还会添加一个 `hover` 效果，同理你可以监听 `mouseover` 事件来阻止该行为。

```html
<s-ripple>
  <s-button onmouseover="event.stopPropagation()">阻止动画</s-button>
</s-ripple>
```

---

## 属性

| 名称     | 类型     | 默认值 | 同步 | 介绍             |
| -------- | ------- | ------ | --- | ---------------- |
| centered | boolean | false  | 是  | 波纹是否居中触发   |
| attached | boolean | false  | 是  | 是否设置为依附模式 |

---

## 标记属性

| 名称    | 介绍       |
| ------- | --------- |
| rippled | 波纹触发时 |

---

## CSS 变量

| 名称           | 介绍                 |
| -------------- | ------------------- |
| --ripple-color | `私有` 波纹颜色，同 color   |
