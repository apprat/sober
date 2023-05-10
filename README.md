## Sober
Sober is a web component UI library written in Typescript, it uses Google Material You design style and can be used in any front-end framework or directly in the browser, plus it supports on-demand introduction and does not have any third-party dependencies

>layout  
> ![img](//unpkg.com/sober/test/images/layout.png)

>instantiation  
> ![img](//unpkg.com/sober/test/images/structure.png)

```js
import register from 'sober'

//Use all components
register()
```

Use a single component

```js
import Button from 'sober/dist/button'

Button.register()
```

Skip using directly created elements
```js
import Button from 'sober/dist/button'

const button = new Button.Element()
document.body.appendChild(button)
```

Use Style
```js
import 'sober/theme/auto.css'
```

---

## Use it directly in the browser
```html
<link rel="stylesheet" href="//unpkg.com/sober/theme/auto.css" />
<script src="//unpkg.com/sober/dist/bundle.min.js"></script>
```