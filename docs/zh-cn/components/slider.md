# slider

滑块组件，用于选择一个值，范围在 `min` 到 `max` 之间。

```html preview
<s-slider step="10"></s-slider>
```

## 禁用

设置 `disabled` 属性来禁用滑块。

```html preview
<s-slider disabled></s-slider>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-slider name="tag"></s-slider>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型                       | 默认值     | 同步 | 说明                                                                                     |
| -------------- | -------------------------- | ---------- | ---- | ---------------------------------------------------------------------------------------- |
| mode           | single, reversed, range    | single     | √    | 模式，single=单选选择，reversed=反向单选择,range=范围选择                                |
| slidingMode    | thumb, all, all-cumulative | thumb      | √    | 滑动模式，thumb=仅指示器滑动，all=所有滑动，all-cumulative=所有滑动且累计值              |
| variant        | standard, segmented        | standard   | √    | 变体                                                                                     |
| orientation    | horizontal, vertical       | horizontal | √    | 方向                                                                                     |
| clickChanged   | boolean                    | true       | √    | 可单击切换的                                                                             |
| scrollPriority | boolean                    | false      | √    | 滚动优先，启用该属性时会在触屏设备上优先执行滚动                                         |
| steps          | string                     |            | ×    | 步进值，使用 `,` 分割，例如：`0,40,80,100`，如果提供了该值，操作滑块时只会在步进值上切换 |
| step           | number                     | 1          | ×    | 步进，请确保能被 (max - min) 整除                                                        |
| min            | number                     | 0          | ×    | 最小值                                                                                   |
| max            | number                     | 100        | ×    | 最大值                                                                                   |
| start          | number                     | 0          | ×    | 开始值（仅mode=range模式生效）                                                           |
| end            | number                     | 50         | ×    | 结束值（单滑块或反向单滑块模式下，该值用于设置进度）                                     |
| name           | string                     |            | ×    | 名称，表单提交时的 `key` 值                                                              |
| defualtStart   | number                     | 0          | ×    | 默认开始值，表单重置时的默认值，仅表单重置时生效                                         |
| defualtEnd     | number                     | 0          | ×    | 默认结束值，表单重置时的默认值，仅表单重置时生效                                         |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                           |
| ------ | ----- | ---- | ------ | ---------------------------------------------- |
| input  | Event | ×    | ×      | 值发生改变后触发                               |
| change | Event | ×    | ×      | 值发生改变后，失去焦点时触发                   |
| label  | Event | ×    | ×      | 显示标签时触发，（显示标签后滑块更新也会触发） |

---

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| 匿名  | 按钮文本                 |
| start | 开始，默认支持 svg, icon |
| end   | 结束，默认支持 svg, icon |

---

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hovered | 鼠标移入时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [BaseSlider](./base-slider.md)
