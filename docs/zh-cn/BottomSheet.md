# Bottom Sheet

底部弹出框。

```html preview
<s-bottom-sheet>
  <s-button slot="trigger"> Bottom Sheet </s-button>
  <div style="padding: 24px">
    问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
  </div>
</s-bottom-sheet>
```

---

## 事件

| 名称      | 参数                                 | 冒泡 | 可取消 | 介绍                |
| --------- |------------------------------------ |------|------ |-------------------- |
| show      | CustomEvent<{ source?: 'TRIGGER' }> | 否   | 是    | `扩展` 显示时触发     |
| showed    | Event                               | 否   | 否    | `扩展` 显示完成后触发 |
| dismiss   | CustomEvent<{ source?: 'SCRIM' }>   | 否   | 是    | `扩展` 隐藏时触发     |
| dismissed | Event                               | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称     | 介绍     |
| -------- | ------- |
| trigger  | 触发器   |

---

## 原型

```ts
type View = HTMLElement | ((bottomSheet: BottomSheet) => void)

class BottomSheet extends HTMLElement {
  //动态创建弹出框
  static readonly builder(options: View | { root?: Element, view: View }): BottomSheet
  //显示弹出框
  readonly show(): void
  //隐藏弹出框
  readonly dismiss(): void
} 
```

---

## CSS 变量

| 名称                                | 介绍           |
| ----------------------------------- | ------------- |
| ---s-color-scrim                    | 遮罩层颜色     |
| --s-color-surface-container-highest | 弹出层背景颜色 |
| --s-color-on-surface-variant        | 指示器颜色     |
| --s-elevation-level1                | 弹出层阴影     |
| --z-index                           | 弹出层权重     |