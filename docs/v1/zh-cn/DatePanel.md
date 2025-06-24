# Date Panel

日期选择面板，大多数情况下你可能不需要使用这个组件，因为 [DatePicker](./date-picke) 已经包含了这个组件。   


### 多语言支持

默认情况下，该组件的文本均显示中文，我们提供了两种方式让你支持多语言

1. 使用属性来传递多语言文本。
2. 调用组件的静态方法 `DatePanel.setLang(options)`。

我们更推荐你调用 `setLang()` 方法，该方法会修改所有创建完毕的 `DatePanel` 组件的语言文本，以及尚未创建的组件。

```js
import { DatePanel } from 'sober'

DatePanel.setLang({ 
  year: 'in %Y',
  month: 'in %m',
  day: 'in %d'
})
```