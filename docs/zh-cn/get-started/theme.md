# 主题

**Sober** 均使用 CSS 变量来实现主题，所有的 CSS 变量均挂载在 [s-page](../components/page.md) 组件上。

通过修改 [`<s-page>`](../components/page.md) 组件的 CSS 变量，即可实现主题的切换，我们推荐你使用以下方式来实现主题的切换。

---

## 主题生成器

你可以使用[主题生成器](https://soberjs.com/theme-generator)来生成主题，保存你的 `.css` 主题文件后，引入该样式文件即可。

```js
import './my-theme.css'
```

如果没有使用构建工具，请使用 `<link>` 标签引入样式文件。

```html
<link rel="stylesheet" href="./my-theme.css">
```

## 动态主题

如果你希望在运行时动态生成主题，可以引入 `sober/theme` 来创建。

```js
import { createScheme } from 'sober/theme'

const page = document.querySelector('s-page')

//1.提供一个目标颜色来生成配色
createScheme('#009688').apply(page)

//2.使用 File 从图形文件来生成配色。
const input = document.querySelector('input[type="file"]')
input.onchange = () => createScheme(input.files[0]).apply(page)

//3.提供一个 <img> 元素来生成配色（请确保图形已加载成功）。
const img = document.querySelector('img')
createScheme(img).apply(page)
```

如果没有使用构建工具，请使用 `<script>` 标签引入主题生成器。

```html
<script src="https://unpkg.com/sober/dist/theme.min.js"></script>
<script>
  const { createScheme } = sober.theme
</script>
```

`createScheme(source, customColors)` 生成配色方案。

- `source`：`string | number | File | HTMLImageElement` 资源，可以是十六进制颜色值字符串(`#000000`)、颜色值、文件、图片元素。
- `customColors`：`CustomColor[]` 可选，自定义的扩展颜色。
- `return`：`Promise<Scheme>` 返回 Scheme 类的示例。

了解更多请查看类型定义或查看 [github](https://github.com/soberjs/sober/blob/main/src/theme.ts) 源代码。
