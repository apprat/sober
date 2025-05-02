# Sober

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)
![Static Badge](https://img.shields.io/badge/complete%20build-139kb-blue)
![Static Badge](https://img.shields.io/badge/gzip-33kb-wheat)

Sober 是参考 Google Material You 设计规范的超级轻量级 Web Component UI 组件库。   

Sober is an ultra-lightweight Web Component UI library designed with reference to Google's Material You guidelines.

Sober 支持所有前端框架，如 Vue、React、Svelte 等，并且专门为 Vue 框架做了适配支持模版和 JSX 的补全以及使用 `v-model` 等语法。   

Sober supports all front-end frameworks such as Vue, React, Svelte, and more. It is specifically tailored for the Vue framework, providing support for template and JSX completion, as well as the use of syntax like `v-model`.

# NPM Installation
```shell
npm install sober
```

```js
import * as sober from 'sober'
```

# CDN

```html
<script src="https://unpkg.com/sober/dist/sober.min.js"></script>
<script>
  console.log(sober)
</script>
```

# Usage

```html
<s-button> Hello Sober </s-button>
```

动态创建组件   

Dynamic creation of components

```js
const button = document.createElement('s-button')

button.textContent = 'hello'
button.type = 'outlined'
document.body.appendChild(button)
```

# 文档 Documentation

在 [soberjs.com](https://soberjs.com) 上查看 **Sober** 的完整文档。   

See Sober's full documentation on [soberjs.com](https://soberjs.com)

# 兼容性 Browser compatibility

| 浏览器 Browser     | 支持 Support |
| ----------------- | ------------ |
| Chromium (Chrome) | 88+          |
| Gecko (Firefox)   | 78+          |
| Webkit (Safari)   | 14+          |