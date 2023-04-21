## Matter
With a build tool like vite webpack, you can import directly

```js
import register from 'matter'

//Use all components
register()
```

Use a single component

```js
import Button from 'matter/dist/button'

Button.register()
```

Skip using directly created elements
```js
import Button from 'matter/dist/button'

const button = new Button.Element()
document.body.appendChild(button)
```

Use Style
```js
import 'matter/theme/auto.css'
```

---

## Use it directly in the browser
```html
<link rel="stylesheet" href="//unpkg.com/matter/theme/auto.css" />
<script src="//unpkg.com/matter/dist/bundle.min.js"></script>
```