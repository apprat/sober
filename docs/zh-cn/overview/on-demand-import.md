# 按需引入

随着 **Sober** 的更新，组件库可能会越来越大，如果你对大小非常敏感，我们强烈建议你定义对 **Sober** 的按需引入。

下面是一个例子，新建一个 **sober.js** 文件，编辑以下代码，按你的需要导入组件。

```js
//sober.js
export * from 'sober/button'
export * from 'sober/checkbox'
```

然后在你的入口文件中引入该文件进行注册组件。

```js
//mian.js
import './sober.js'
```

完整的组件列表如下：

```js
export * from 'sober/alert'
export * from 'sober/appbar'
export * from 'sober/avatar'
export * from 'sober/badge'
export * from 'sober/bottom-sheet'
export * from 'sober/button'
export * from 'sober/card'
export * from 'sober/carousel'
export * from 'sober/checkbox'
export * from 'sober/chip'
export * from 'sober/circular-progress'
export * from 'sober/date'
export * from 'sober/date-picker'
export * from 'sober/dialog'
export * from 'sober/divider'
export * from 'sober/drawer'
export * from 'sober/empty'
export * from 'sober/FAB'
export * from 'sober/icon-button'
export * from 'sober/icon'
export * from 'sober/linear-progress'
export * from 'sober/menu'
export * from 'sober/navigation'
export * from 'sober/field'
export * from 'sober/fold'
export * from 'sober/page'
export * from 'sober/pagination'
export * from 'sober/picker'
export * from 'sober/popup'
export * from 'sober/popup-menu'
export * from 'sober/radio-button'
export * from 'sober/rate'
export * from 'sober/ripple'
export * from 'sober/scroll-view'
export * from 'sober/search'
export * from 'sober/segmented-button'
export * from 'sober/skeleton'
export * from 'sober/slider'
export * from 'sober/snackbar'
export * from 'sober/switch'
export * from 'sober/tab'
export * from 'sober/table'
export * from 'sober/text-field'
export * from 'sober/tooltip'
```

---

## 浏览器上按需引入

如果你没有使用构建工具，而是直接在浏览器中引入，按需引入会发起多个请求造成首次加载变慢，这是不被推荐的行为。
如果你对此不敏感，你依旧可以使用下面的方式按需引入每个组件：

```html
<script type="module">
  import 'https://unpkg.com/sober/dist/appbar.js'
</script>
```
