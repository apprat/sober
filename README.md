## Sober
With a build tool like vite webpack, you can import directly

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

# fork

Typescript 5.0> and rollup need to be installed after fork