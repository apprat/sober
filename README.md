<p align="center">
  <img src="https://gitee.com/apprat/sober/raw/main/test/images/logo.png" width="96">
</p>
<h1 align="center">Sober</h1>
<p align="center"><b>Sober</b> 是使用 Google <a href="https://m3.material.io">Material You</a> 设计规范的 Web Component UI 库</p>
<p align="center">
<a href=""><img src="https://img.shields.io/badge/npm-3.0-green"></a>
<a href=""><img src="https://img.shields.io/badge/build-passing-blue"></a>
</p>

<p align="center">使用 <a href="https://www.typescriptlang.org">Typescript</a> 开发，在 <a href="https://cn.vuejs.org">Vue</a> <a href="https://angular.io">Angular</a> <a href="https://react.dev">React</a> 中均可获得完全的类型推断</p>
<p align="center">支持浏览器内和 Vite/Webpack 等工具内的单个组件按需引入</p>
<p align="center">轻量级无任何第三方库依赖，引入所有组件在 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/GZip_compression">gzip</a> 压缩下只有<u>16kb</u></p>

<p align="center">
  <img src="https://gitee.com/apprat/sober/raw/main/test/images/preview.png" height="140" />
</p>


# 安装使用
```shell
$ npm install sober
```
引入所有组件
```js
import 'sober'
```

仅引入单个组件
```js
import 'sober/button'
```

动态创建组件
```js
import Button from 'sober/button'

const button = new Button()
button.textContent = 'hello'
button.theme = 'outlined'
document.body.appendChild(button)
```

提示：由于 Sober 使用了 Nodejs 的[自定义导出](https://nodejs.cn/api/packages/exports.html)，在使用 Typescript 引入时会提示找不到类型定义，需要在 [tsconfig.json](https://www.typescriptlang.org/tsconfig) 中设置 [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution) 编译器选项的值为 <b>Bundler</b>

# 主题样式

与其他 UI 库有所不同，Sober 没有也不需要引入额外的 .css 样式文件，取而代之我们希望你使用 **Root** 组件作为页面的根元素，由 **Root** 组件来定义页面的默认颜色字体等。
```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8" />
  <style>
    html, body{
      height: 100%;
    }
  </style>
</head>
<body>
  <s-root id="app">
    hello world
  </s-root>
</body>
</html>
```

如果希望使用不同的主题样式，你可以引入 theme 目录的 css 文件，里面定义了不同的 css 变量值，由此来控制整个页面的样式。当然你也可以自己编写样式来自定义。
```js
import 'sober/theme/dark.css'
```
或者
```css
:root {
  --s-color-primary: #D0BCFF;
}
```

# 模板语法和JSX
我们为 Vue 和 React 做了适配，在入口文件中引入 Sober 后，即可在其他地方获得类型推断。    

<img src="https://gitee.com/apprat/sober/raw/main/test/images/injsx.jpg" width="320">

# 在浏览器中引入

bundle 是压缩过的文件，它打包了所有的组件，因为网络原因我们建议你下载到本地引入。

```html
<script src="https://unpkg.com/sober/dist/bundle.min.js"></script>
```
所有组件都会挂载在全局变量 **sober** 中
```js
const button = new sober.Button()
button.textContent = 'hello'
document.body.appendChild(button)
```

你也可以在浏览器中按需引入，这需要用到 module 方法引入
```html
<s-root>
  <s-button> hello </s-button>
</s-root>

<script type="module">
  import Root from 'https://unpkg.com/sober/dist/root.js'
  import Button from 'https://unpkg.com/sober/dist/button.js'
  console.log(Root, Button)
</script>