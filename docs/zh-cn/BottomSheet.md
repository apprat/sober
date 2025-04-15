# Bottom Sheet

底部弹出框。

```html preview
<s-bottom-sheet>
  <s-button slot="trigger"> Bottom Sheet </s-button>
  <div slot="text">
    问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
  </div>
</s-bottom-sheet>
```

---

#### 动态调用

大多数情况下你可能需要更简洁的函数式调用而非使用布局。

```js
import { BottomSheet } from 'sober'

BottomSheet.builder({ text: '弹出框内容' })
```

如果你需要渲染自定义底部弹出框布局而非单纯使用文本，可以传递 `view` 属性，它支持你传递一个元素或者传入一个回调函数，回调函数会传入一个 `BottomSheet` 实例，这样你就可以使用一些前端框架的渲染 API 来渲染自定义内容。

```js
import { BottomSheet } from 'sober'
import BottomSheetView from './DialogView'

BottomSheet.builder({ view: (bottomSheet) => createApp(App).mount(BottomSheetView) })
```

`BottomSheet.builder` 方法会返回 `BottomSheet` 的实例，你可以使用它来控制底部弹出框的显示和隐藏又或者是监听它的事件。

```js
import { BottomSheet } from 'sober'

const bottomSheet = BottomSheet.builder({ headline: '标题', text: '对话框内容' })
//三秒后关闭底部弹出框
setTimeout(() => bottomSheet.showed = false, 3000)
//监听关闭事件
bottomSheet.addEventListener('close', (event) => {})
```

> [!WARNING]
> 注意，每次调用 `BottomSheet.builder()` 方法时都会创建一个底部弹出框实例，如果你需要缓存页面布局，使用布局的方式可能更加适合。


---

## 属性 Props

| 名称                   | 类型     | 默认值 | 同步 | 介绍    |
| ---------------------- | ------- | ------ | --- | ------- |
| showed                 | boolean | false  | 是  | 显示状态 |
| disabledGesture `v1.1` | boolean | true   | 否  | 禁用手势 |

---

## 事件

| 名称   | 参数                                | 冒泡 | 可取消 | 介绍                |
| ------ |----------------------------------- |------|------ |-------------------- |
| show   | CustomEvent<{ source: 'TRIGGER' }> | 否   | 是    | `扩展` 显示时触发     |
| showed | Event                              | 否   | 否    | `扩展` 显示完成后触发 |
| close  | CustomEvent<{ source: 'SCRIM' }>   | 否   | 是    | 隐藏时触发           |
| closed | Event                              | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称    | 介绍     |
| ------- | ------- |
| trigger | 触发器   |
| text    | 文本     |

---

## 原型

```ts
type View = HTMLElement | ((bottomSheet: BottomSheet) => void)

class BottomSheet extends HTMLElement implements Props {
  //动态创建弹出框
  static readonly builder(options: string | View | { root?: Element, view: View }): BottomSheet
} 
```