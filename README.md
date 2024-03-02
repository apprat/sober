# Sober

[![npm version](https://badge.fury.io/js/sober.svg)](https://badge.fury.io/js/sober)
![Static Badge](https://img.shields.io/badge/complete%20build-66kb-blue)
![Static Badge](https://img.shields.io/badge/gzip-22kb-wheat)

Sober 是参考 Google Material You 设计规范的 Web Component UI 组件库。

# 安装
```shell
npm install sober
```

# 使用

```js
import 'sober' //引入所有组件
import 'sober/button' //或只引入单个组件
```

```html
<s-button> hello </s-button>
```

动态创建组件
```js
import Button from 'sober/button'

const button = new Button()
//或者
const button2 = document.createElement('s-button')

button.textContent = 'hello'
button.theme = 'outlined'
document.body.appendChild(button)
```

# 文档

在 [soberjs.com](https://soberjs.com) 上查看 **Sober** 的完整文档。