# Sober

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)
![Static Badge](https://img.shields.io/badge/complete%20build-87kb-blue)
![Static Badge](https://img.shields.io/badge/gzip-18kb-wheat)

Sober 是参考 Google Material You 设计规范的 Web Component UI 组件库。   

Sober is a Web Component UI component library that references the Google Material You design specification.

# 安装 Installation
```shell
npm install sober
```

# 使用 Usage

```js
import 'sober' //引入所有组件 Load All Components
import 'sober/button' //或只引入单个组件 Loading individual components
```

```html
<s-button> hello </s-button>
```

动态创建组件   

Dynamic creation of components

```js
import { Button } from 'sober'

const button = new Button()
//或者 or
const button2 = document.createElement('s-button')

button.textContent = 'hello'
button.theme = 'outlined'
document.body.appendChild(button)
```

# 文档 Documentation

在 [soberjs.com](https://soberjs.com) 上查看 **Sober** 的完整文档。   

See Sober's full documentation on [soberjs.com](https://soberjs.com)