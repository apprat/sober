# alert

提示或警告信息面板。

```html preview
<s-alert>
  <div slot="title"> 己酉端午 </div>
  端午突遇风雨天气昏沉阴暗，汨罗江上无人凭吊逝去的屈原。
</s-alert>
```

设置 `variant` 来设置不同的变体：`info、success、warning、error`。

```html preview
<s-alert>
  回乐烽前沙似雪，受降城外月如霜。
  不知何处吹芦管，一夜征人尽望乡。
</s-alert>
<s-alert variant="success">
  千山鸟飞绝，万径人踪灭。
  孤舟蓑笠翁，独钓寒江雪。
</s-alert>
<s-alert variant="warning">
  孤云将野鹤，岂向人间住。
  莫买沃洲山，时人已知处。
</s-alert>
<s-alert variant="error">
  折戟沉沙铁未销，自将磨洗认前朝。
  东风不与周郎便，铜雀春深锁二乔。
</s-alert>
```

你可以使用插槽来放置不同内容。

```html preview
<s-alert>
  <s-icon name="star" slot="icon"></s-icon>
  长簟迎风早，空城澹月华。
  星河秋一雁，砧杵夜千家。
  节候看应晚，心期卧亦赊。
  向来吟秀句，不觉已鸣鸦。
  <s-button slot="action" variant="text" size="extra-small">关闭</s-button>
</s-alert>
<s-alert>
  <span slot="icon"></span>
  一路经行处，莓苔见履痕。
  白云依静渚，春草闭闲门。
  过雨看松色，随山到水源。
  溪花与禅意，相对亦忘言。
  <s-icon-button slot="action" size="extra-small">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-alert>
```

## 折叠

设置 `collapsed` 属性，可以启用折叠模式，这时正文默认不可见，点击切换按钮可展开，也可以使用 `opened` 默认展开。

```html preview
<s-alert collapsed>
  <div slot="title"> 遣悲怀三首·其二 </div>
  昔日戏言身后意，今朝都到眼前来。<br>
  衣裳已施行看尽，针线犹存未忍开。<br>
  尚想旧情怜婢仆，也曾因梦送钱财。<br>
  诚知此恨人人有，贫贱夫妻百事哀。
</s-alert>
<s-alert collapsed opened>
  <div slot="title"> 子夜吴歌·冬歌 </div>
  明朝驿使发，一夜絮征袍。<br>
  素手抽针冷，那堪把剪刀。<br>
  裁缝寄远道，几日到临洮。
</s-alert>
```

可以使用 `toggle-icon` 插槽来自定义折叠按钮图标。

```html preview
<s-alert collapsed>
  <div slot="title"> 遣悲怀三首·其二 </div>
  昔日戏言身后意，今朝都到眼前来。<br>
  衣裳已施行看尽，针线犹存未忍开。<br>
  尚想旧情怜婢仆，也曾因梦送钱财。<br>
  诚知此恨人人有，贫贱夫妻百事哀。
  <s-icon slot="toggle-icon" name="arrow_downward"></s-icon>
  <s-tooltip slot="toggle" slotLayer="0">切换</s-tooltip>
</s-alert>
```

---

## 属性

| 名称      | 类型                          | 默认值 | 同步 | 说明     |
| --------- | ----------------------------- | ------ | ---- | -------- |
| variant   | info, success, warning, error | info   | √    | 变体     |
| collapsed | boolean                       | false  | √    | 可折叠的 |
| opened    | boolean                       | false  | √    | 展开的   |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                        |
| ------ | ----- | ---- | ------ | ------------------------------------------- |
| toggle | Event | ×    | ×      | 在设置了 `collapsed` 属性后，切换展开时触发 |

---

## 插槽

| 名称        | 说明         |
| ----------- | ------------ |
| 匿名        | 内容         |
| icon        | 图标         |
| title       | 标题文本     |
| action      | 操作按钮     |
| toggle      | 折叠按钮     |
| toggle-icon | 折叠按钮图标 |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
