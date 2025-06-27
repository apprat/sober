# Sober

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)
![Static Badge](https://img.shields.io/badge/complete%20build-139kb-blue)
![Static Badge](https://img.shields.io/badge/gzip-33kb-wheat)

Sober 是参考 Google M3 Expressive 设计规范的超级轻量级 Web Component UI 组件库。  

Sober 支持所有前端框架，如 Vue、React、Svelte 等，并且专门为 Vue 框架做了适配支持模版和 JSX 的补全以及使用 `v-model` 等语法。

(Sober is an ultra-lightweight Web Component UI library designed with reference to Google's M3 Expressive guidelines.)

(Sober supports all front-end frameworks such as Vue, React, Svelte, and more. It is specifically tailored for the Vue framework, providing support for template and JSX completion, as well as the use of syntax like `v-model`.)

## 安装 (Installation)

如果你使用构建工具，如 view、webpack、rollup 等，强烈建议你使用 npm/pnpm 等包管理器安装。

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
```

```html
<script src="https://unpkg.com/sober/dist/sober.theme.min.js"></script>
```

## 兼容性 (Browser compatibility)

| 浏览器 Browser     | 支持 Support |
| ----------------- | ------------ |
| Chromium (Chrome) | 88+          |
| Gecko (Firefox)   | 78+          |
| Webkit (Safari)   | 14+          |

---

## v2.0-alpha

你现在正在使用 v2.0-alpha 版本，新版本核心有如下变化：

### 支持 HTML 属性和元素属性 onxxx 绑定自定义事件

```html
<!--使用HTML属性绑定事件-->
<s-dialog onshow="console.log('show')"></s-dialog>
<script>
  const dialog = document.querySelector('s-dialog')
  //也可以使用on前缀属性绑定事件
  dialog.onshow = (e) => console.log('show', e)
</script>
```

### 支持属性自动补全

在旧版本中，布尔值你始终需要明确值，例如：

```html
<!--旧版本中，你必须设置值-->
<s-button disabled="true"></s-button>
<!--新版本中，你可以省略值：-->
<s-button disabled></s-button>
```

在组件初始化后，属性会自动补全为 `disabled="true"`。

### 运行时属性值约束

在旧版本中，例如属性值约束为：`filled | outlined | text` ，但该约束仅是 TypeScript 的类型约束，在运行时是无效的（即你可以赋值一个非法的值），在新版本中该约束在运行时也会校验，当值不合法时转为默认值。

```html
<s-button></s-button>
<script>
  const button = document.querySelector('s-button')
  //设置一个非法值
  button.variant = 'abc'
  //此时会被转换为默认值
  console.log(button.type) // filled
</script>
```

### 组件多选支持

大多数组件，如 `picker`、`navigation-bar`、`navigation-rail`、等，现在都支持多选。

### 支持键盘操作

1. 使用 Tab 来切换焦点。
2. 使用 空格/Enter 来触发组件的点击事件。
3. 使用⬆️⬇️⬅️➡️方向键来切换选中或调整值，如导航栏，拖动条，单选按钮等。

### 其他组件功能更新

大多数组件得到更新，例如 `slider` 拖动条已支持范围选择、竖向、反向等。
