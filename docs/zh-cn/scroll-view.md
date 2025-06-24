# scroll-view

滚动为容器提供了滚动条样式，出于触屏设备优化，滚动条样式仅在支持鼠标的设备上有效。

```html preview
<s-scroll-view style="height: 320px"> 
  <div style="height: 1080px; width: 3200px"></div>
</s-scroll-view>
```

某些时候，可能你更希望给某些元素直接设置滚动而不是使用容器包裹，针对这种情况你可以考虑引入 Sober 的 CSS。

```js
//使用 npm
import 'sober/style/scroll-view.css'
```

```html
<!--使用CDN-->
<link rel="stylesheet" type="text/css" href="https://unpkg.com/sober/style/scroll-view.css">
```

该样式会为所有元素都设置滚动条样式，你只需要在目标元素上定义 `overflow` 即可，尽管该方式破坏了 Sober 主张的非侵入性，但某些时候是可以接受的。
