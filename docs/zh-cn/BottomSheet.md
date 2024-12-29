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

在 Vue 中绑定状态。

```html
<template>
  <s-dialog :showed="showed" @close="showed=false"> Test </s-dialog>
</template>
<script setup>
import { ref } from 'vue'
const showed = ref(false)
</script>
```

---

## 属性

| 名称   | 类型     | 默认值 | 同步 | 介绍    |
| ------ | ------- | ------ | --- | ------- |
| showed | boolean | false  | 是  | 显示状态 |

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

class BottomSheet extends HTMLElement {
  //动态创建弹出框
  static readonly builder(options: string | View | { root?: Element, view: View }): BottomSheet
  //显示状态
  showed: boolean = false
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