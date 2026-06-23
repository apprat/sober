# Overview

**Sober** ([How to pronounce?](/audio/sober.mp3)) is a Web Components UI library built on the [Material 3 Expressive](https://m3.material.io) design system, suitable for websites that need to adapt to three device types: desktop, tablet and mobile.

- **Responsive**: All components automatically adapt to desktops, tablets, mobile devices and more without extra configuration.
- **Framework-Agnostic**: Compatible with all frontend frameworks and server-side rendering solutions.
- **Zero Dependencies**: No third-party libraries required, resulting in a tiny bundle size.
- **Multilingual Ready**: Supports all languages recognized by your browser.
- **TypeScript Support**: Complete type declaration files are provided.
- **Interoperable with Other UI Libraries**: Non-intrusive architecture allows coexistence with any other UI library.
- **Fully Customizable Styling**: Full style customization is available for every component.

## NPM Installation

If you are using build tools such as **Webpack** or **Vite**, we recommend installing the package via **npm** or **pnpm**.

```shell
npm i sober
```

### Full Import

```js
import 'sober'
```

### On-Demand Import Example

```js
import 'sober/button'
import 'sober/checkbox'
```

> For more details about on-demand importing, see the dedicated docs: [On-Demand Imports](/overview/on-demand-import.md).

## Direct Browser Usage

This method imports all bundled and minified components and exposes a global variable `sober` for access.

```html
<script src="https://unpkg.com/sober/dist/sober.min.js"></script>
```

You may also use the **ES Module** format in browsers, which works the same way as **npm** imports:

```html
<script type="module">
  import 'https://unpkg.com/sober/dist/main.js'
</script>
```

<s-button v-on:click="$router.push('/components')">Get Started Now</s-button>

---

### Community

- QQ Group [315014446](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=FnDFafEZBleaRTVni5WW428we-q6P038&authKey=j6gtmWnQqNLd%2FonmfMhRG99Zk9Dy1yfOrYe7Ln7rDLdx5Y0%2FgP5ERhLgSbrxU07I&noverify=0&group_code=315014446)

### Open Source License

**Sober** is distributed under the [MIT license](https://github.com/unreal-space/sober/blob/main/LICENSE)。
