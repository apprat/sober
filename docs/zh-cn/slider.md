# slider

滑块组件，用于选择一个值，范围在 `min` 到 `max` 之间。

```html preview
<s-slider step="10"></s-slider>
```

设置 `disabled` 属性来禁用滑块。

```html preview
<s-slider disabled></s-slider>
```

---

设置 `mode` 属性来设置不同滑块，`single` 单滑块（默认值）、`reversed` 反向单滑块、`range` 范围。  

```html preview
<s-slider mode="reversed" value="30"></s-slider>
<s-slider mode="range"></s-slider>
```

设置 `orientation` 属性来设置滑块方向，`horizontal` 水平（默认值）、`vertical` 垂直。

```html preview
<s-slider orientation="vertical"></s-slider>
<s-slider orientation="vertical" mode="reversed"></s-slider>
<s-slider orientation="vertical" mode="range"></s-slider>
```

## 标签

设置 `labeled` 启用标签，标签内容可以通过监听 `label` 事件来格式化。

```html preview
<s-slider labeled></s-slider>
```

监听 `label` 事件，从 `event.detail.format` 传递格式化函数，返回格式化后的标签内容。

```html preview
<s-slider labeled onlabel="event.detail.format((v)=>`第${v}名`)"></s-slider>
```

## 标记

设置 `marks` 属性来设置标记，提供一组数据，以 `,` 分割，如：`10,20,30,40,50`，同时滑块只会在标记上切换。

```html preview
<s-slider marks="0,10,20,30,40,50" value="30"></s-slider>
<s-slider marks="0,10,20,30,40,50,100" mode="reversed" value="30"></s-slider>
<s-slider marks="0,40,60,100" mode="range" start="40" end="60"></s-slider>
```

设置 `marks` 值为 `all`，会为每个步进设置标记。

```html preview
<s-slider marks="all" step="10"></s-slider>
<s-slider mode="range" marks="all" step="20" max="200" min="20" start="40" end="60"></s-slider>
<s-slider marks="all" step="10" orientation="vertical"></s-slider>
<s-slider mode="reversed" marks="all" step="10" orientation="vertical"></s-slider>
<s-slider mode="range" step="10" marks="all" orientation="vertical"></s-slider>
```

---

## 属性

| 名称            | 类型                       | 默认值     | 同步 | 说明                                                                                 |
| --------------- | -------------------------- | ---------- | ---- | ------------------------------------------------------------------------------------ |
| mode            | single, reversed, range    | single     | ✔️ | 模式，single=单选选择，reversed=反向单选择,range=范围选择                            |
| slidingMode     | thumb, all, all-cumulative | thumb      | ✔️ | 滑动模式，thumb=仅指示器滑动，all=所有滑动，all-cumulative=所有滑动且累计值          |
| variant         | standard, segmented        | standard   | ✔️ | 变体                                                                                 |
| orientation     | horizontal, vertical       | horizontal | ✔️ | 方向                                                                                 |
| clickChanged    | boolean                    | true       | ✔️ | 可单击切换的                                                                         |
| slidingPriority | boolean                    | false      | ✔️ | 滑动优先，启用该属性时会在触屏设备上增强滑动响应的速度，适用于页面上没有滚动条时启用 |
| labeled         | boolean                    | false      | ✔️ | 显示标签的，如果你希望格式化标签内容，请监听 `label` 事件                            |
| marks           | string                     |            | ✔️ | 标记，可以是以逗号分隔的数值列表，或者是 'all' 表示每个步进都有标记                  |
| step            | number                     | 1          | ✖️ | 步进，请确保能被 (max - min) 整除                                                    |
| min             | number                     | 0          | ✖️ | 最小值                                                                               |
| max             | number                     | 100        | ✖️ | 最大值                                                                               |
| value           | number                     | 50         | ✖️ | 当前值(它是end属性的别名)                                                            |
| start           | number                     | 0          | ✖️ | 开始值                                                                               |
| end             | number                     | 50         | ✖️ | 结束值                                                                               |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                           |
| ------ | ----- | ---- | ------ | ---------------------------------------------- |
| input  | Event | ✖️ | ✖️   | 值发生改变后触发                               |
| change | Event | ✖️ | ✖️   | 值发生改变后，失去焦点时触发                   |
| label  | Event | ✖️ | ✖️   | 显示标签时触发，（显示标签后滑块更新也会触发） |

---

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| 匿名  | 按钮文本                 |
| start | 开始，默认支持 svg, icon |
| end   | 结束，默认支持 svg, icon |

---

## HTML 标记属性

| 名称          | 说明           |
| ------------- | -------------- |
| pressed       | 按下时设置     |
| hovered       | 鼠标移入时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [BaseSlider](./base-slider.md)
