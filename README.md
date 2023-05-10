<h1 align="center">Sober</h1>
<p align="center">Sober is a web component UI library written in Typescript that uses the Google Material You design style and can be used in any front-end framework.</p>
<p align="center">
<a href=""><img src="https://img.shields.io/badge/npm-3.0-green"></a>
<a href=""><img src="https://img.shields.io/badge/build-passing-blue"></a>
</p>

<p align="center">typescript Perfect type completion.</p>
<p align="center">No third-party dependencies/p>
<p align="center">Support for on-demand introduction</p>
<p align="center">Support any framework</p>

<p align="center">
  <img src="https://gitee.com/apprat/sober/raw/main/test/images/preview.png" height = "100" />
</p>


# Installation
```shell
$ npm install sober
```

Use all components
```js
import register from 'sober'

//Use all components
register()
```

Use a single component

```js
import Button from 'sober/dist/button'

Button.register()
//or
const button = new Button.Element()
document.body.appendChild(button)
button.theme = 'outlined'
```

Use Style
```js
import 'sober/theme/auto.css'
```

---

### Use it directly in the browser
```html
<link rel="stylesheet" href="//unpkg.com/sober/theme/auto.css" />
<script src="//unpkg.com/sober/dist/bundle.min.js"></script>
```