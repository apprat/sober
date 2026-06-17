# split-button

分割按钮，拆分按钮打开一个菜单，为用户提供与操作相关的更多选项。

```html preview
<s-split-button>
  <s-icon name="star" slot="start"></s-icon>
  label
</s-split-button>
```

## 变体

设置 `variant` 来设置不同的变体：`filled`、`elevated`、`tonal`、`outlined`。

```html preview
<s-split-button variant="filled">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="tonal">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>
```

## 禁用

设置 `disabled` 来禁用按钮。

```html preview
<s-split-button disabled> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="tonal"> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>
```

## 使用插槽

使用插槽放置其他组件，`toggle-icon` 插槽的 `svg`、`s-icon` 会在切换时旋转 `-180` 度。

```html preview
<s-split-button>
  <s-icon name="star" slot="start"></s-icon>
  label
  <s-icon name="arrow_downward" slot="toggle-icon"></s-icon>
  <s-tooltip slot="toggle" slotLayer="1">展开</s-tooltip>
  <s-dialog slot="toggle" slotLayer="1" onclose="this.parentNode.checked=false">
    <div slot="title">标题</div>
    <div slot="text">
      问人生、头白京国，算来何事消得。不如罨画清溪上，蓑笠扁舟一只。人不识，且笑煮、鲈鱼趁著莼丝碧。无端酸鼻，向岐路消魂，征轮驿骑，断雁西风急。 英雄辈，事业东西南北。临风因甚泣。酬知有愿频挥手，零雨凄其此日。休太息，须信道、诸公衮衮皆虚掷。年来踪迹。有多少雄心，几翻恶梦，泪点霜华织。
    </div>
    <s-button slot="action" variant="text">取消</s-button>
    <s-button slot="action" variant="text">确定</s-button>
  </s-dialog>
</s-split-button>
```

## 尺寸

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `height` 来更精确的定义按钮高度） 。

```html preview
<s-split-button size="extra-small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="medium"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="extra-large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>
```

---

## 属性

| 名称     | 类型                                           | 默认值 | 同步 | 说明   |
| -------- | ---------------------------------------------- | ------ | ---- | ------ |
| variant  | filled, elevated, tonal, outlined              | filled | √    | 变体   |
| size     | small, extra-small, medium, large, extra-large | small  | √    | 尺寸   |
| disabled | boolean                                        | false  | √    | 禁用的 |
| checked  | boolean                                        | false  | √    | 选中的 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                   |
| ------ | ----- | ---- | ------ | ---------------------- |
| toggle | Event | ×    | ×      | 在点击了切换按钮后触发 |

## 插槽

| 名称      | 说明                                                               |
| --------- | ------------------------------------------------------------------ |
| 匿名      | 按钮文本                                                           |
| start     | 开始，默认支持 svg, s-icon, s-loading, s-circular-progressn        |
| end       | 结束，默认支持 svg, s-icon, s-loading, s-circular-progress         |
| togg-icon | 切换按钮图标，默认支持 svg, s-icon, s-loading, s-circular-progress |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
