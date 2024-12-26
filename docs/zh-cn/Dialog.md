# Dialog

对话框。

```html preview
<s-dialog>
  <s-button slot="trigger"> dialog </s-button>
  <div slot="headline"> Title </div>
  <div slot="text">问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。
    英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
  </div>
  <s-button slot="action" type="text">取消</s-button>
  <s-button slot="action" type="text">确定</s-button>
</s-dialog>
```

全屏对话框

```html preview
<s-dialog size="full">
  <s-button slot="trigger"> dialog </s-button>
  <div slot="headline"> Title </div>
  <div slot="text">问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。
    英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
  </div>
  <s-button slot="action" type="text">取消</s-button>
  <s-button slot="action" type="text">确定</s-button>
</s-dialog>
```

自定义布局。

```html preview
<s-dialog>
  <s-button slot="trigger"> dialog </s-button>
  <div style="padding: 24px">
    自定义布局
  </div>
  <s-button slot="action" type="text">取消</s-button>
</s-dialog>
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

| 名称   | 类型         | 默认值 | 同步 | 介绍      |
| ------ | ----------- | ------ | --- | --------- |
| size   | basic, full | basic  | 是  | 对话框尺寸 |
| showed | boolean     | false  | 是  | 显示状态   |

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
interface Options {
  root?: Element //插入的目标元素，默认为 document.body 下第一个 s-page
  headline?: string //标题
  text?: string //文本
  view?: HTMLElement | ((dialog: Dialog) => void) //自定义视图
  actions?: { text: string, click?: (event: MouseEvent) => unknown }[] //操作按钮
}

class Dialog extends HTMLElement {
  static readonly builder(options: string | Options): Dialog //动态创建对话框
  //对话框尺寸
  size: 'basic' | 'full' = 'basic'
  //显示状态
  showed: boolean = false
} 
```

---

## CSS 变量

| 名称                                | 介绍                |
| ----------------------------------- | ------------------ |
| --s-color-scrim                     | 遮罩层颜色          |
| --s-color-surface-container-highest | 对话框弹出层背景颜色 |
| --s-color-on-surface                | 标题颜色            |
| --s-color-primary                   | 操作按钮文本颜色     |
| --s-elevation-level5                | 对话框弹出层阴影     |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [ScrollView](./scroll-view)