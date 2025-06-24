# Dialog

全屏弹出的对话框。

```html preview
<s-dialog>
  <s-button slot="trigger"> 对话框 </s-button>
  <div slot="headline"> Title </div>
  <div slot="text">问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。
    英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
  </div>
  <s-button slot="action" type="text">取消</s-button>
  <s-button slot="action" type="text">确定</s-button>
</s-dialog>
```

---

#### 动态调用

大多数情况下你可能需要更简洁的函数式调用而非使用布局。

```js
import { Dialog } from 'sober'

Dialog.builder({ headline: '标题', text: '对话框内容' })
```

如果你需要渲染自定义对话框布局而非单纯使用文本，可以传递 `view` 属性，它支持你传递一个元素或者传入一个回调函数，回调函数会传入一个 `Dialog` 实例，这样你就可以使用一些前端框架的渲染 API 来渲染自定义内容。

```js
import { Dialog } from 'sober'
import DialogView from './DialogView'

Dialog.builder({ headline: '标题', view: (dialog) => createApp(App).mount(dialog) })
```

`Dialog.builder` 方法会返回 `Dialog` 的实例，你可以使用它来控制对话框的显示和隐藏又或者是监听它的事件。

```js
import { Dialog } from 'sober'

const dialog = Dialog.builder({ headline: '标题', text: '对话框内容' })
//三秒后关闭对话框
setTimeout(() => dialog.showed = false, 3000)
//监听关闭事件
dialog.addEventListener('close', (event) => {})
```

> [!WARNING]
> 注意，每次调用 `Dialog.builder()` 方法时都会创建一个对话框实例，如果你需要缓存页面布局，使用布局的方式可能更加适合。

---

## 属性 Props

| 名称   | 类型            | 默认值   | 同步 | 介绍                      |
| ------ | -------------- | -------- | --- | ------------------------- |
| size   | standard, full | standard | 是  | 对话框尺寸，full 全屏对话框 |
| showed | boolean        | false    | 是  | 显示状态                   |

---

## 事件

| 名称   | 参数                                          | 冒泡 | 可取消 | 介绍                |
| ------ |--------------------------------------------- |------|------ |-------------------- |
| show   | CustomEvent<{ source: 'TRIGGER' }>           | 否   | 是    | `扩展` 显示时触发     |
| showed | Event                                        | 否   | 否    | `扩展` 显示完成后触发 |
| close  | CustomEvent<{ source: 'SCRIM' \| 'ACTION' }> | 否   | 是    | 隐藏时触发           |
| closed | Event                                        | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称     | 介绍     |
| -------- | ------- |
| trigger  | 触发器   |
| custom   | 容器     |
| headline | 标题     |
| text     | 文本     |
| action   | 操作按钮 |

---

## 原型

```ts
interface BuildActions { 
  text: string
  click?: (event: MouseEvent) => unknown 
}

interface Options {
  root?: Element //插入的目标元素，默认为 document.body 下第一个 s-page
  headline?: string //标题
  text?: string //文本
  view?: HTMLElement | ((dialog: Dialog) => void) //自定义视图
  actions?: BuildActions | BuildActions[] //操作按钮
}

class Dialog extends HTMLElement implements Props {
  //动态创建对话框
  static readonly builder(options: string | Options): Dialog
} 
```

---

## 依赖

该组件被导入时会自动导入以下组件：

- [ScrollView](./scroll-view)