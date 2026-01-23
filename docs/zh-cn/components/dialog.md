# dialog

对话框。

```html preview
<s-button>
  对话框
  <s-tooltip>显示对话框</s-tooltip>
  <s-dialog>
    <div slot="title">标题</div>
    <div slot="text">
      问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
    </div>
    <s-button slot="action" variant="text">取消</s-button>
    <s-button slot="action" variant="text">确定</s-button>
  </s-dialog>
</s-button>
```

设置 `gravity` 设置位置。

```html preview
<s-button>
  顶部对话框
  <s-dialog gravity="top">
    <div slot="title">标题</div>
    <div slot="text">
      确认操作？
    </div>
    <s-button slot="action" variant="text">取消</s-button>
    <s-button slot="action" variant="text">确定</s-button>
  </s-dialog>
</s-button>
<s-button>
  底部对话框
  <s-dialog gravity="bottom">
    <div slot="title">标题</div>
    <div slot="text">
      确认操作？
    </div>
    <s-button slot="action" variant="text">取消</s-button>
    <s-button slot="action" variant="text">确定</s-button>
  </s-dialog>
</s-button>
```

设置 `size=full-screen` 设置全屏对话框

```html preview
<s-button>
  全屏对话框
  <s-dialog size="full-screen">
    <div slot="title">标题</div>
    <div slot="text">
      问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
    </div>
    <s-button slot="action" variant="text">取消</s-button>
    <s-button slot="action" variant="text">确定</s-button>
  </s-dialog>
</s-button>
```

动态调用对话框

```html preview
<s-button onclick="customElements.get('s-dialog').builder({title: '标题', text: '文本', actions: {text: '取消'}})">动态对话框</s-button>
```

自定义样式

```html preview
<s-button>
  自定义
  <s-dialog style="background: sandybrown; color: snow; width: 260px; border-radius: 4px; padding: 24px; border: solid 2px #9ba01e;">
    问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹有多少雄心，几翻恶梦，泪点霜华织。
  </s-dialog>
</s-button>
```

---

## 动态调用

如果你想通过 `JavaScript` 调用而非使用布局，你可以使用 `Dialog.builder()` 方法来创建一个对话框，他会在创建完毕后插入到页面中，并返回一个 `Dialog` 实例。

```js
import { Dialog } from 'sober'

const dialog = Dialog.builder({
  title: '标题',
  text: '文本'
})
```

---

## 属性

| 名称     | 类型                | 默认值 | 同步 | 说明   |
| -------- | ------------------- | ------ | ---- | ------ |
| disabled | boolean             | false  | ✔️ | 禁用的 |
| opened   | boolean             | false  | ✔️ | 打开的 |
| gravity  | center, top, bottom | center | ✔️ | 位置   |

---

## 事件

| 名称   | 参数                             | 冒泡 | 可取消 | 说明                          |
| ------ | -------------------------------- | ---- | ------ | ----------------------------- |
| open   | Event                            | ✖️ | ✔️   | 打开时触发                    |
| close  | CustomEvent<{ source: 0\|1\|2 }> | ✖️ | ✔️   | 关闭时触发，source=关闭的方式 |
| opened | Event                            | ✖️ | ✖️   | 打开完成时触发                |
| closed | Event                            | ✖️ | ✖️   | 关闭完成时触发                |

---

## 原型

```ts
interface Action { 
  text: string //按钮文本
  click?: (event: MouseEvent) => void //点击事件
}

class Dialog extends HTMLElement {
  static CLOSE_SOURCE_SCRIM = 0  //关闭来源常量：遮罩层。
  static CLOSE_SOURCE_ACTION = 1 //关闭来源常量：操作按钮。
  static CLOSE_SOURCE_KEYBOARD = 2 //关闭来源常量：键盘。
  //生成对话框
  static builder(options: {
    root?: Element //插入的目标元素，为空则寻找 document 下第一个 <s-page> 元素
    title?: string //标题
    text?: string //文本
    view?: HTMLElement | ((dialog: Dialog) => void) //自定义视图
    actions?: Action | Action[] //操作按钮
  }): Dialog
}
```

---

## 插槽

| 名称   | 说明                         |
| ------ | ---------------------------- |
| 匿名   | 任意布局                     |
| title  | 标题                         |
| text   | 文本内容，会自动设置样式间距 |
| action | 操作按钮                     |

---

## HTML 属性

| 名称          | 说明                         |
| ------------- | ---------------------------- |
| dialog-opened | 在打开时设置（在容器上设置） |

---

## 键盘快捷键

使用 `Escape` 关闭对话框。
