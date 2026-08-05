# Alert

提示或警告信息面板。

```html preview
<s-alert>
  <svg viewBox="0 -960 960 960" slot="start"><path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path></svg>
  <div slot="title">温馨提示</div>
  当前密码强度过低，建议包含大小写字母、数字与特殊符号，长度不少于8位。
</s-alert>
```

## 变体

设置 `variant` 属性定义不同的变体：`info`、`success`、`warning`、`error`。

```html preview
<s-alert variant="info">
  <svg viewBox="0 0 24 24" slot="start"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
  回乐烽前沙似雪，受降城外月如霜。
  不知何处吹芦管，一夜征人尽望乡。
</s-alert>
<s-alert variant="success"> <!-- [!code highlight] -->
  <svg viewBox="0 0 24 24" slot="start"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path></svg>
  千山鸟飞绝，万径人踪灭。
  孤舟蓑笠翁，独钓寒江雪。
</s-alert>
<s-alert variant="warning"> <!-- [!code highlight] -->
  <svg viewBox="0 0 24 24" slot="start"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
  孤云将野鹤，岂向人间住。
  莫买沃洲山，时人已知处。
</s-alert>
<s-alert variant="error"> <!-- [!code highlight] -->
  <svg viewBox="0 0 24 24" slot="start"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
  折戟沉沙铁未销，自将磨洗认前朝。
  东风不与周郎便，铜雀春深锁二乔。
</s-alert>
```

## 折叠

设置 `collapsed` 属性，并且使用 `title` 插槽 ，可以启用折叠模式，正文默认不可见，点击切换按钮可展开，也可以使用 `open` 默认展开。

```html preview
<s-alert collapsed> <!-- [!code highlight] -->
  <div slot="title"> 遣悲怀三首·其二 </div>
  昔日戏言身后意，今朝都到眼前来。
  衣裳已施行看尽，针线犹存未忍开。
  尚想旧情怜婢仆，也曾因梦送钱财。
  诚知此恨人人有，贫贱夫妻百事哀。
</s-alert>
<s-alert collapsed open> <!-- [!code highlight] -->
  <svg viewBox="0 0 24 24" slot="start"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
  <div slot="title"> 子夜吴歌·冬歌 </div>
  明朝驿使发，一夜絮征袍。<br>
  素手抽针冷，那堪把剪刀。<br>
  裁缝寄远道，几日到临洮。
</s-alert>
```

使用 `toggle-icon` 插槽来自定义折叠按钮图标，或使用 `s-tooltip` 创建折叠按钮提示。

```html preview
<s-alert collapsed>
  <div slot="title"> 遣悲怀三首·其二 </div>
  昔日戏言身后意，今朝都到眼前来。<br>
  衣裳已施行看尽，针线犹存未忍开。<br>
  尚想旧情怜婢仆，也曾因梦送钱财。<br>
  诚知此恨人人有，贫贱夫妻百事哀。
  <s-icon slot="toggle-icon"></s-icon> <!-- [!code highlight] -->
  <s-tooltip slot="toggle-icon" parentDepth="1">切换</s-tooltip> <!-- [!code highlight] -->
</s-alert>
```

## 可关闭

设置 `closable` 属性显示关闭按钮，按钮点击时触发 `close` 事件。

```html preview
<s-alert closable onclose="this.remove()"> <!-- [!code highlight] -->
  数据提交成功，页面即将自动刷新。
</s-alert>
<s-alert collapsed closable onclose="this.remove()">
  <svg viewBox="0 0 24 24" slot="start"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
  <div slot="title">温馨提示</div>
  当前密码强度过低，建议包含大小写字母、数字与特殊符号，长度不少于8位。
</s-alert>
```

---

## 属性

| 名称      | 类型                                             | 默认值    | 同步 | 说明     |
| --------- | ------------------------------------------------ | --------- | ---- | -------- |
| variant   | `surface`, `info`, `success`, `warning`, `error` | `surface` | √    | 变体     |
| collapsed | `boolean`                                        | `false`   | √    | 可折叠的 |
| open      | `boolean`                                        | `false`   | √    | 展开的   |
| closable  | `boolean`                                        | `false`   | √    | 可关闭的 |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| toggle | Event | ×    | ×      | 切换展开时触发     |
| close  | Event | ×    | ×      | 关闭按钮点击时触发 |

---

## 插槽

| 名称        | 说明                                                                         |
| ----------- | ---------------------------------------------------------------------------- |
| 匿名        | 内容                                                                         |
| start       | 开始，默认支持 `.icon`, `svg`, `s-icon`, `s-loading`, `s-spinner`, `ms-icon` |
| title       | 标题文本                                                                     |
| end         | 结束，默认支持同 start                                                       |
| close-icon  | 关闭按钮图标，默认支持同 start                                               |
| toggle-icon | 折叠切换按钮图标，默认支持同 start                                           |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
