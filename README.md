<p align="center">
  <img src="https://gitee.com/apprat/sober/raw/main/test/images/logo.png" width="96">
</p>
<h1 align="center">Sober</h1>
<p align="center"><b>Sober</b> is a web component UI library written in Typescript that uses the Google <b>Material You</b> design style</p>
<p align="center">
<a href=""><img src="https://img.shields.io/badge/npm-3.0-green"></a>
<a href=""><img src="https://img.shields.io/badge/build-passing-blue"></a>
</p>

<p align="center"><u>typescript Perfect type completion.</u></p>
<p align="center"><u>No third-party dependencies</u></p>
<p align="center"><u>Support for on-demand introduction</u></p>
<p align="center"><u>Support any framework</u></p>

<p align="center">
  <img src="https://gitee.com/apprat/sober/raw/main/test/images/preview.png" height="140" />
</p>


# Installation
```shell
$ npm install sober
```
```js
import { registerAll } from 'sober'
import 'sober/themes/light.css'

registerAll()
```

on-demand introduction

```js
import Button from 'sober/dist/button'

Button.register()
//use
const button = new Button.Element()
document.body.appendChild(button)
button.theme = 'outlined'
```
---

### Use it directly in the browser
```html
<link rel="stylesheet" href="//unpkg.com/sober/themes/auto.css" />
<script src="//unpkg.com/sober/dist/bundle.min.js"></script>
```