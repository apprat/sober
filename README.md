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
Register all components
```js
import { registerAll } from 'sober'
import 'sober/theme/light.css'

registerAll()
```
> registerAll is the recommended way to introduce it, it will register all components
---

Load individual components as needed
```js
//mian.js
import Button from 'sober/button'

Button.register()
```
```js
//other.js
import Button from 'sober/button'

const button = new Button()
button.textContent = 'hello'
button.theme = 'outlined'
document.body.appendChild(button)
```
> Sober uses the exports declaration in package.json, you must enable the "moduleResolution": "Bundler" option in tsconfig.json, otherwise the declaration file cannot be found  

Use different themes
```js
import { registerAll } from 'sober'
import 'sober/theme/dark.css'

registerAll()
```
> Importable auto.css light.css drak.css three themes, you can customize the theme.   

Using the JSX in
```jsx
//mian.js
import Button from 'sober/button'

Button.register()
```
```jsx
//other.js
function App() {
  return <div>
    <s-button theme="text"> 
      Button 
    </s-button>
  </div>
}
```

---

### Use it directly in the browser
```html
<link rel="stylesheet" href="https://unpkg.com/sober/theme/light.css" />
<script src="https://unpkg.com/sober/dist/bundle.min.js"></script>
```
Introduced directly using the browser, all components are registered and the global variable is **Sober**
```js
const button = new Sober.Button()
button.textContent = 'hello'
document.body.appendChild(button)
```