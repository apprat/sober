# Icon

用于显示图标

```html preview
<s-icon type="home"></s-icon>
<s-icon type="add"></s-icon>
<s-icon type="search"></s-icon>
<s-icon type="menu"></s-icon>
<s-icon type="arrow_back"></s-icon>
<s-icon type="arrow_forward"></s-icon>
<s-icon type="arrow_upward"></s-icon>
<s-icon type="arrow_downward"></s-icon>
<s-icon type="arrow_drop_up"></s-icon>
<s-icon type="arrow_drop_down"></s-icon>
<s-icon type="arrow_drop_left"></s-icon>
<s-icon type="arrow_drop_right"></s-icon>
<s-icon type="more_vert"></s-icon>
<s-icon type="more_horiz"></s-icon>
<s-icon type="close"></s-icon>
<s-icon type="done"></s-icon>
<s-icon type="chevron_up"></s-icon>
<s-icon type="chevron_down"></s-icon>
<s-icon type="chevron_left"></s-icon>
<s-icon type="chevron_right"></s-icon>
<s-icon type="light_mode"></s-icon>
<s-icon type="dark_mode"></s-icon>
<s-icon type="star"></s-icon>
<s-icon type="favorite"></s-icon>
```

使用 color 设置颜色

```html preview
<s-icon type="add" style="color: #009688"></s-icon>
```

加载 SVG 路径图标

```html preview
<s-icon src="图标路径.svg"></s-icon>
```

组件自带的图标无法满足所有需求，你可以在内部放置 SVG 图标。

```html preview
<s-icon>
  <svg viewBox="0 -960 960 960">
    <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"></path>
  </svg>
</s-icon>
```

> 大多数组件都支持直接使用 SVG 作为插槽，所以该组件的使用场景主要用于自定义布局时使用。

你也可以在 [图标库](/resource/icon) 中获取 SVG 图标 、或者使用 [阿里巴巴矢量图标库](https://www.iconfont.cn)。

---

## 属性

| 名称   | 类型     | 默认值 | 是否同步 | 介绍        |
| ------ | ------- | ------ | ------- | ----------- |
| type   | string  | none   | 是      | 自带图标名称 |
| src    | string  |        | 否      | 链接 SVG    |

---

## 事件

| 名称  | 参数   | 冒泡 | 可取消 | 介绍             |
| ----- |------ |------|------ |----------------- |
| load  | Event | 否   | 否    | src 加载完成后触发 |
| error | Event | 否   | 否    | src 加载错误后触发 |

---

## CSS 变量

| 名称                         | 介绍              |
| ---------------------------- | ----------------- |
| --s-color-on-surface-variant | 图标颜色，同 color |