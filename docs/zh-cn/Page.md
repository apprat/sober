# Page

建议作为页面根容器的组件，它拥有全局的 CSS 变量，用于控制所有后代组件的样式。

```html
<s-page></s-page>
```
设置 `theme` 来使用其他主题，支持三种主题：light=亮色主题(默认)、dark=暗色主题，auto=跟随系统。

```html
<s-page theme="dark"></s-page>
```

---

## 属性

| 名称  | 类型               | 默认值 | 是否同步 | 介绍 |
| ----- | ----------------- | ------ | ------- | ---- |
| theme | light, dark, auto | light  | 否      | 主题 |

---

## 原型

```ts
class Page extends HTMLElement {
  //切换主题(带动画过渡) trigger=触发中心元素
  readonly toggle(theme: 'light'|'dark'|'auto', trigger?: HTMLElement): void
}
```

## 标记属性

| 名称 | 介绍            |
| ---- | -------------- |
| dark | 暗色模式时被设置 |

---

# CSS 变量

你可以在[CSS 变量](/style/css-var)中查阅样式值。