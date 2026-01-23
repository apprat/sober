# fieldset

字段组，该组件可作为容器或者表单容器使用。

```html preview
<s-fieldset>
  <div slot="title"> 浣溪沙·谁念西风独自凉时只道是寻常时只道是寻常</div>
  <div>
    谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。<br>
    被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常
  </div>
</s-fieldset>
```

使用插槽。

```html preview
<s-fieldset>
  <s-icon slot="start" name="star" style="margin-left: 8px"></s-icon>
  <div slot="title">浣溪沙·谁念西风独自凉</div>
  <div>
    谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。<br>
    被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常
  </div>
  <s-icon slot="end" name="star" style="margin-right: 8px"></s-icon>
</s-fieldset>
```

不定义标题是个普通容器。

```html preview
<s-fieldset>
  <div>
    谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。<br>
    被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常
  </div>
</s-fieldset>
```

## 聚焦

设置 `focused` 属性聚焦。

```html preview
<s-fieldset focused>
  <div slot="title">浣溪沙·谁念西风独自凉</div>
  <div>
    浣溪沙·谁念西风独自凉<br>
    谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。<br>
    被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常
  </div>
</s-fieldset>
```

## 浮动

设置 `floated` 切换为浮动。

```html preview
<s-fieldset floated>
  <div slot="title">浣溪沙·谁念西风独自凉</div>
</s-fieldset>
<s-button onclick="this.previousElementSibling.floated=!this.previousElementSibling.floated"> 切换 </s-button>
```

## 自定义样式

通过 CSS 变量自定义边框圆角。

```html preview
<style>
 .fieldset{
    --s-fieldset-border-top-left-radius: 12px;
    --s-fieldset-border-top-right-radius: 0px;
    --s-fieldset-border-bottom-right-radius: 12px;
    --s-fieldset-border-bottom-left-radius: 0px;
  }
</style>
<s-fieldset class="fieldset">
  <div slot="title">浣溪沙·谁念西风独自凉</div>
  <div>
    谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。<br>
    被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常
  </div>
</s-fieldset>
```

---

## 属性

| 名称    | 类型    | 默认值 | 同步 | 说明   |
| ------- | ------- | ------ | ---- | ------ |
| focused | boolean | false  | √    | 聚焦的 |
| floated | boolean | false  | √    | 浮动的 |

## 插槽

| 名称  | 说明       |
| ----- | ---------- |
| 匿名  | 自定义内容 |
| title | 标题       |
| start | 开始       |
| end   | 结尾       |

## CSS 样式变量

| 名称                                    | 说明                         |
| --------------------------------------- | ---------------------------- |
| --s-fieldset-title-gap                  | 标题的间距                   |
| --s-fieldset-padding                    | 内间距，控制上下左右四个方向 |
| --s-fieldset-padding-top                | 顶部内间距                   |
| --s-fieldset-padding-right              | 右侧内间距                   |
| --s-fieldset-padding-bottom             | 底部内间距                   |
| --s-fieldset-padding-left               | 左侧内间距                   |
| --s-fieldset-border-width               | 边框宽度                     |
| --s-fieldset-border-focused-width       | 聚焦的边框宽度               |
| --s-fieldset-border-radius              | 圆角，控制四个方向           |
| --s-fieldset-border-top-left-radius     | 左上角圆角                   |
| --s-fieldset-border-top-right-radius    | 右上角圆角                   |
| --s-fieldset-border-bottom-left-radius  | 左下角圆角                   |
| --s-fieldset-border-bottom-right-radius | 右下角圆角                   |

> 注意：CSS 变量参与了尺寸的计算，你应该优先使用 CSS 变量来调整组件样式，如果直接使用 ::part() 选择器去调整尺寸，除非你明确知道你在做什么，否则可能会尺寸计算异常。
