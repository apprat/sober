# Icon

该组件内置了一些图标，使用 name 属性设置图标名称。

```html preview
<s-icon name="home"></s-icon>
<s-icon name="add"></s-icon>
<s-icon name="search"></s-icon>
<s-icon name="menu"></s-icon>
<s-icon name="arrow_back"></s-icon>
<s-icon name="arrow_forward"></s-icon>
<s-icon name="arrow_upward"></s-icon>
<s-icon name="arrow_downward"></s-icon>
<s-icon name="arrow_drop_up"></s-icon>
<s-icon name="arrow_drop_down"></s-icon>
<s-icon name="arrow_drop_left"></s-icon>
<s-icon name="arrow_drop_right"></s-icon>
<s-icon name="more_vert"></s-icon>
<s-icon name="more_horiz"></s-icon>
<s-icon name="close"></s-icon>
<s-icon name="done"></s-icon>
<s-icon name="chevron_up"></s-icon>
<s-icon name="chevron_down"></s-icon>
<s-icon name="chevron_left"></s-icon>
<s-icon name="chevron_right"></s-icon>
<s-icon name="light_mode"></s-icon>
<s-icon name="dark_mode"></s-icon>
<s-icon name="star"></s-icon>
<s-icon name="favorite"></s-icon>
```

使用 color 设置颜色

```html preview
<s-icon name="home" style="color:rgb(43, 133, 43)"></s-icon>
<s-icon name="home" style="color:rgb(161, 53, 129)"></s-icon>
```

加载图标或者在内部填充 SVG 图标。

```html preview
<s-icon src="/images/sentiment_neutral.svg"></s-icon>
<s-icon>
  <svg viewBox="0 -960 960 960">
    <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path>
  </svg>
</s-icon>
```

> [!INFO]
> 如果目标文件的后缀为 `.svg` 则会请求使用fetch该源文件，因此它支持定义颜色，反之将会使用 `<img />` 来渲染从而不支持定义颜色。

大多数组件都支持直接使用 SVG 作为插槽而不需要嵌套 Icon。

可以在 [图标库](/resource/icon) 中获取 SVG 图标 、或者使用 [阿里巴巴矢量图标库](https://www.iconfont.cn)。

---

## 属性

| 名称 | 类型     | 默认值 | 同步 | 介绍        |
| ---- | ------- | ------ | --- | ----------- |
| name | string  | none   | 是  | 自带图标名称 |
| src  | string  |        | 否  | 图标路径     |

---

## 事件

| 名称  | 参数   | 冒泡 | 可取消 | 介绍             |
| ----- |------ |------|------ |----------------- |
| load  | Event | 否   | 否    | src 加载完成后触发 |
| error | Event | 否   | 否    | src 加载错误后触发 |