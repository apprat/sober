# 介绍

在开始上手前，请确保你已经安装且引入了 **Sober**，如果还没有，请阅读[安装](Install.md)。  

现在在你的布局根元素中添加一个 `<s-page>` 组件，该步骤不是必须的，但是使用 `<s-page>` 组件，你将会获得：**亮色**或**暗色**主题切换，以及自定义的主题颜色，还有自**文本大小**缩放比例。

```html
<body>
  <s-page>
    <s-button> Hello World! </s-button>
  </s-page>
</body>
```

Sober 的设计理念是希望网页也能获得原生般体验，所以我们建议你禁止 `<html>` 和 `<body>` 元素的默认滚动和内外边距，该步骤同样不是必须的。

```html
<style>
  html,
  body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
```

现在你可以愉快的使用 **Sober** 了。

## 主题切换

在 `<s-page>` 组件中添加 `theme` 属性，该属性接受 `light`、`dark`、`auto` 三个值，默认为 `light`，和值的命名一样，当你设置为 `auto` 的时候，**Sober** 会根据系统的主题来自动切换。

```html
<s-page theme="dark">
  <s-button> Hello World! </s-button>
</s-page>
```

如果你希望在运行时切换主题，你可以使用 `JavaScript` 获取 `<s-page>` 组件实例，并设置 `theme` 属性值。

```js
const page = document.querySelector('s-page')
page.theme = 'dark'
```

## 设计风格切换

默认情况下，**Sober** 使用 `Google Material 3 Expressive` 的设计，但同时我们支持微软的 `Fluent Design` 的设计，你可以按以下方式修改设计风格。

```js
import * as sober from 'sober'
import { material } from 'sober/design/material'
import { fluent } from 'sober/design/fluent'

//设置为 Fluent
fluent(sober)
//设置为默认的 Material
//material(sober)
```

未来更多设计风格陆续添加中...  

如果你希望自定义设计风格，可以按以下方式实现。

```js
import * as sober from 'sober'

//自定义按钮样式
const Button = /*css*/ `
:host{
  background: red;
  height: 32px;
}
`
//自定义复选框样式
const checkbox = /*css*/ `
:host{
  height: 32px;
}
`
sober.Button.setStyle(button)
sober.Checkbox.setStyle(checkbox)
```

## 预设样式

### 滚动条

建议你引入 **Sober** 的 `scroll-view.css`，该文件会为所有元素设置滚动条样式。

```js
import 'sober/style/scroll-view.css'
```

### 表格

建议你引入 **Sober** 的 `table.css`，该文件会为所有 `<table>` 元素设置预设样式以及允许滚动。

```js
import 'sober/style/table.css'
```

## 报告问题

如果您发现问题，请提交一个 [Github](https://github.com/apprat/sober/issues) 报告，你的问题是我们改进 **Sober** 的动力。
