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
export * from 'sober/app-bar'
export * from 'sober/avatar'
export * from 'sober/badge'
export * from 'sober/base-slider'
export * from 'sober/button'
export * from 'sober/button-group'
export * from 'sober/card'
export * from 'sober/checkbox'
export * from 'sober/chip'
export * from 'sober/spinner'
export * from 'sober/dialog'
export * from 'sober/divider'
export * from 'sober/docked-date-picker'
export * from 'sober/docked-time-picker'
export * from 'sober/drawer'
export * from 'sober/empty'
export * from 'sober/field-set'
export * from 'sober/fab'
export * from 'sober/icon'
export * from 'sober/icon-button'
export * from 'sober/loading'
export * from 'sober/nav-bar'
export * from 'sober/nav-rail'
export * from 'sober/nav-adaptive'
export * from 'sober/page'
export * from 'sober/page-view'
export * from 'sober/picker'
export * from 'sober/progress'
export * from 'sober/radio'
export * from 'sober/rating'
export * from 'sober/ripple'
export * from 'sober/search'
export * from 'sober/skeleton'
export * from 'sober/slider'
export * from 'sober/split-button'
export * from 'sober/switch'
export * from 'sober/tab'
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
