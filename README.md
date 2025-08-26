# Sober (Material 3 Expressive)

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)
![Static Badge](https://img.shields.io/badge/complete%20build-139kb-blue)
![Static Badge](https://img.shields.io/badge/gzip-33kb-wheat)

Sober 是参考 Google M3 Expressive 设计规范的超级轻量级 Web Component UI 组件库。  

Sober 支持所有前端框架，如 Vue、React、Svelte 等，并且专门为 Vue 框架做了适配支持模版和 JSX 的补全以及使用 `v-model` 等语法。

(Sober is an ultra-lightweight Web Component UI library designed with reference to Google's M3 Expressive guidelines.)

(Sober supports all front-end frameworks such as Vue, React, Svelte, and more. It is specifically tailored for the Vue framework, providing support for template and JSX completion, as well as the use of syntax like `v-model`.)

## 安装 (Installation)

如果你使用构建工具，如 vite、webpack、rollup 等，强烈建议你使用 npm/pnpm 等包管理器安装。

(If you are using build tools such as Vite, Webpack, Rollup, etc., it is highly recommended to install them using package managers like npm/pnpm.)

```shell
npm install sober
```

如果直接在浏览器浏览器中使用，建议使用 CDN 引入压缩构建版本。

(If using it directly in the browser, it is recommended to load the minified build version via a CDN.)

```html
<script src="https://unpkg.com/sober/dist/sober.min.js"></script>
<script>
  console.log(sober) // {Button, Icon, IconButton, ... }
</script>
```

## 使用 (Usage)

```html
<s-button> Hello Sober </s-button>
```

```jsx
const App = () => {
  return <s-button> Hello Sober </s-button>
}
```

## 文档 (Documentation)

在 [soberjs.com](https://soberjs.com) 上查看 **Sober** 的完整文档。  

(See Sober's full documentation on [soberjs.com](https://soberjs.com))

## 主题生成器 (Theme Generator)

如果你需要主题生成器，请使用以下方式加载，出于体积考虑，该模块没有捆绑到 Sober 中。

(If you need the theme generator, please load it using the following method. Due to size considerations, this module is not bundled with Sober.)

```js
import theme from 'sober/theme'

const page = document.querySelector('s-page')
const scheme = await theme.createScheme('#009688')
scheme.apply(page)
```

```html
<!--使用CDN加载-->
<script src="https://unpkg.com/sober/dist/sober.theme.min.js"></script>
```

## 兼容性 (Browser compatibility)

| 浏览器 Browser     | 支持 Support |
| ----------------- | ------------ |
| Chromium (Chrome) | 88+          |
| Gecko (Firefox)   | 78+          |
| Webkit (Safari)   | 14+          |
