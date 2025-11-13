# slider

滑块组件，用于选择一个值，范围在 `min` 到 `max` 之间。

```html preview
<s-slider></s-slider>
```

---

设置 `mode` 属性来设置不同滑块，`single` 单滑块（默认值）、`single-reversed` 反向单滑块、`range` 范围。  

```html preview
<s-slider mode="single-reversed" value="30"></s-slider>
<s-slider mode="range"></s-slider>
```

设置 `marked` 属性来显示刻度线。

```html preview
<s-slider marked></s-slider>
```

---

## 属性

| 名称            | 类型                           | 默认值     | 同步 | 说明                                                                                 |
| --------------- | ------------------------------ | ---------- | ---- | ------------------------------------------------------------------------------------ |
| mode            | single, single-reversed, range | single     | ✔️ | 模式，single=单选选择，single-reversed=反向单选择,range=范围选择                     |
| slidingMode     | thumb, all, all-cumulative     | thumb      | ✔️ | 滑动模式，thumb=仅指示器滑动，all=所有滑动，all-cumulative=所有滑动且累计值          |
| variant         | standard, segmented            | standard   | ✔️ | 变体                                                                                 |
| orientation     | horizontal, vertical           | horizontal | ✔️ | 方向                                                                                 |
| clickChanged    | boolean                        | true       | ✔️ | 可单击切换的                                                                         |
| slidingPriority | boolean                        | false      | ✔️ | 滑动优先，启用该属性时会在触屏设备上增强滑动响应的速度，适用于页面上没有滚动条时启用 |
| step            | number                         | 1          | ✖️ | 步进，请确保能被 (max - min) 整除                                                    |
| min             | number                         | 0          | ✖️ | 最小值                                                                               |
| max             | number                         | 100        | ✖️ | 最大值                                                                               |
| start           | number                         | 0          | ✖️ | 开始值                                                                               |
| end             | number                         | 50         | ✖️ | 结束值（当设置为单滑块或反向单滑块模式时，该值用于设置进度）                         |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                        |
| ------ | ----- | ---- | ------ | ------------------------------------------- |
| change | Event | ✖️ | ✖️   | 在设置了 `checkable` 属性后，选中变更时触发 |

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
| ripple-showed | 波纹触发时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [BaseSlider](./base-slider.md)
