# Slider

滑块组件支持用户在一组数值区间内完成数值选择，如果你需要高度的自定义样式，建议使用[BaseSlider](./base-slider.md)组件。

```html preview
<s-slider></s-slider>
```

## 模式

设置 `mode` 属性来设置不同滑块；`reversed`：反向滑块，`range`：范围滑块。

```html preview
<s-slider mode="reversed" end="80"></s-slider>
<s-slider mode="range" end="80"></s-slider>
```

## 滑动模式

设置 `slidingMode` 属性为 `all` 点击滑块任意位置都会触发滑动。

```html preview
<s-slider slidingMode="all"></s-slider>
```

设置 `slidingMode` 属性为 `all-cumulative"` 点击滑块任意位置都会触发滑动，并且累计值。

```html preview
<s-slider slidingMode="all-cumulative"></s-slider>
```

## 禁用

设置 `disabled` 禁用滑块。

```html preview
<s-slider disabled></s-slider>
<s-slider disabled mode="range"></s-slider>
```

## 只读的

设置 `readOnly` 属性滑块会变为只读。

```html preview
<s-slider readOnly></s-slider>
<s-slider readOnly mode="range"></s-slider>
```

## 显示值

设置 `showShow` 属性滑块会显示当前值。

```html preview
<s-slider showValue></s-slider>
<s-slider showValue mode="range"></s-slider>
```

监听 `formatvalue` 事件来格式化标签值。

```html preview
<s-slider mode="range" showValue onformatvalue="event.detail.format((v) => `No.${v}`)"></s-slider>
```

## 竖向

设置 `orientation` 属性为 `vertical` 定义垂直滑块，滑块会转为行内块元素（不再占据一行）。

```html preview
<s-slider orientation="vertical" value="30"></s-slider>
<s-slider orientation="vertical" mode="reversed" value="30"></s-slider>
<s-slider orientation="vertical" mode="range"></s-slider>
```

## 间隔

设置 `step` 属性来设置滑块的间隔，或者使用 `stepMarks` 属性来设置间隔值（优先级更高）。

```html preview
<s-slider step="10"></s-slider>
<s-slider stepMarks="50,60,70,80,90" end="50"></s-slider>
```

## 刻度分段

设置 `showDivisions` 显示刻度分段。

```html preview
<s-slider showDivisions showValue step="10"></s-slider>
<s-slider showDivisions showValue step="10" mode="reversed"></s-slider>
<s-slider showDivisions showValue step="10" mode="range"></s-slider>
```

同时设置 `stepMarks` 属性来设置自定义间隔值。

```html preview
<s-slider showDivisions showValue stepMarks="30,40,50,60" mode="range"></s-slider>
```

## 尺寸

设置 `size` 改变滑块尺寸。

```html preview
<s-slider size="extra-small"></s-slider>
<s-slider size="small"></s-slider>
<s-slider size="medium"></s-slider>
<s-slider size="large"></s-slider>
<s-slider size="extra-large"></s-slider>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-slider name="tag" defaultEnd="50" mode="range"></s-slider>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称                | 类型                                                     | 默认值        | 同步 | 说明                                                                                      |
| ------------------- | -------------------------------------------------------- | ------------- | ---- | ----------------------------------------------------------------------------------------- |
| size                | `small`, `extra-small`, `medium`, `large`, `extra-large` | `extra-small` | √    | 尺寸                                                                                      |
| mode                | `single`, `reversed`, `range`                            | `single`      | √    | 模式，single=单选选择，reversed=反向单选择,range=范围选择                                 |
| slidingMode         | `thumb`, `all`, `all-cumulative`                         | `thumb`       | √    | 滑动模式，thumb=仅指示器滑动，all=所有滑动，all-cumulative=所有滑动且累计值               |
| orientation         | `horizontal`, `vertical`                                 | `horizontal`  | √    | 方向                                                                                      |
| disabled            | `boolean`                                                | `false`       | √    | 禁用的                                                                                    |
| readOnly            | `boolean`                                                | `false`       | √    | 只读的                                                                                    |
| touchScrollPriority | `boolean`                                                | `false`       | √    | 触屏滚动优先，启用该属性时会在触屏设备上优先执行滚动                                      |
| showValue           | `boolean`                                                | `false`       | √    | 显示值，启用该属性时，滑块会显示当前值                                                    |
| showDivisions       | `boolean`                                                | `false`       | √    | 显示刻度分段的，启用该属性时滑块会显示刻度分段，可与 `step` 或 `stepMarks` 搭配使用       |
| stepMarks           | `string`                                                 | `''`          | ×    | 步进标记，使用 , 分割，例如：`20,30,50`(不需要提供最大值和最小值)，滑块时只会在标记上切换 |
| step                | `number`                                                 | `1`           | ×    | 步进，请确保能被 (max - min) 整除                                                         |
| min                 | `number`                                                 | `0`           | ×    | 最小值                                                                                    |
| max                 | `number`                                                 | `100`         | ×    | 最大值                                                                                    |
| value               | `number`                                                 | `50`          | ×    | 当前值 （单滑块的值）                                                                     |
| start               | `number`                                                 | `0`           | ×    | 开始值（`mode=range` 范围选择的开始值）                                                   |
| end                 | `number`                                                 | `50`          | ×    | 结束值（`mode=range` 范围选择的结束值）                                                   |
| name                | `string`                                                 | `''`          | √    | 名称，表单提交时的 `key` 值                                                               |
| defaultValue        | `number`                                                 | `50`          | ×    | 默认值，表单重置时的默认值，仅表单重置时生效                                              |
| defaultStart        | `number`                                                 | `0`           | ×    | 默认开始值（仅 `mode=range` 模式生效），表单重置时的默认值，仅表单重置时生效              |
| defaulttEnd         | `number`                                                 | `0`           | ×    | 默认结束值（仅 `mode=range` 模式生效），表单重置时的默认值，仅表单重置时生效              |

## 事件

| 名称        | 参数                                                                                      | 冒泡 | 可取消 | 说明                                                                    |
| ----------- | ----------------------------------------------------------------------------------------- | ---- | ------ | ----------------------------------------------------------------------- |
| input       | Event                                                                                     | ×    | ×      | 值发生改变后触发                                                        |
| change      | Event                                                                                     | ×    | ×      | 值发生改变后，失去焦点时触发                                            |
| formatvalue | CustomEvent<{ format: (fn: (value: number, type?: 'start' \| 'end') => string) => void }> | ×    | ×      | 格式化值时触发，你可以通过调用 `event.detail.format()` 来格式化 `label` |

## CSS 样式变量

| 名称                           | 说明           |
| ------------------------------ | -------------- |
| --s-slider-size                | 滑块尺寸       |
| --s-slider-track-size          | 滑块轨道尺寸   |
| --s_slider-track-border-radius | 滑块轨道圆角   |
| --s-slider-thumb-size          | 滑块指示器尺寸 |

> 注意：CSS 变量参与了尺寸的计算，你应该优先使用 CSS 变量来调整组件样式，如果直接使用 ::part() 选择器去调整尺寸，除非你明确知道你在做什么，否则可能会尺寸计算异常。

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `⬆️⬇️⬅️➡️` 键调整值。
