# 设计

默认情况下，**Sober** 采用 Google Material Design 设计风格，但这并不是绝对的。

我们允许你重新为组件重新定义样式，你可以调用组件类的静态方法 `.setStyle()` 添加样式。

```js
import { Button } from 'sober'

Button.setStyle(`:host{color: red;}`)
```
