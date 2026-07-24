# Ripple

你可以将该组件添加到任意元素内来添加波纹效果，但请注意，你必须为父元素或祖先元素设置 CSS `position` 不为 `static`，因为它依赖 `position` 进行定位。

```html preview
<div style="position: relative; height: 100px;border: solid 1px #ddd">
  <s-ripple></s-ripple>
</div>
```

## 延迟

使用 `delay` 属性，你可以定义延迟时间，以毫秒为单位（仅触屏设备生效），在延迟时间内如果触屏滑动，动画将被取消。

```html preview
<div style="position: relative; height: 100px;border: solid 1px #ddd">
  <s-ripple delay="200"></s-ripple>
</div>
```

用户的触屏很可能是要滚动页面，而不是触发点击事件，这使得触屏时播放波纹动画可能会显得很突兀，因此你可以在可滚动的元素上定义 `--s-ripple-delay` 来设置所有波纹延迟时间。  

```html
<div style="overflow: auto; --s-ripple-delay: 50;">
  <s-ripple></s-ripple>
  <s-ripple></s-ripple>
  <s-ripple></s-ripple>
</div>
```

> 所有依赖该组件的其他组件，都可以使用该方式来设置延迟，例如 `s-button` 组件。

## 在 A 标签使用

```html preview
<a href="http://baidu.com/xxxx" style="position: relative;">
  Back Home
  <s-ripple></s-ripple>
</a>
```

---

## 属性

| 名称          | 类型      | 默认值  | 同步 | 说明                                                                                                   |
| ------------- | --------- | ------- | ---- | ------------------------------------------------------------------------------------------------------ |
| disabled      | `boolean` | `false` | √    | 禁用波纹的                                                                                             |
| disabledHover | `boolean` | `false` | √    | 禁用悬停的                                                                                             |
| parentDepth   | `number`  | `-1`    | ×    | 父级层数，该属性会设置在**祖先元素第几层**触发。如果组件作为其他组件的插槽插入，会查找插槽内的祖先元素 |
| delay         | `number`  | `0`     | √    | 延迟时间，单位为毫秒                                                                                   |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| open   | Event | ×    | ×      | 波纹打开时触发     |
| close  | Event | ×    | ×      | 波纹关闭时触发     |
| opened | Event | ×    | ×      | 波纹打开完成时触发 |
| closed | Event | ×    | ×      | 波纹关闭完成时触发 |

## HTML 标记属性

| 名称    | 说明                           |
| ------- | ------------------------------ |
| pressed | 按下时设置（在容器上设置）     |
| hover   | 鼠标移入时设置（在容器上设置） |

## 样式变量

| 名称                      | 说明                                                            |
| ------------------------- | --------------------------------------------------------------- |
| --s-ripple-disabled       | 该 CSS 变量和 `disabled` 属性一致，区别是该变量优先级更高       |
| --s-ripple-disabled-hover | 该 CSS 变量和 `disabled-hover` 属性一致，区别是该变量优先级更高 |
| --s-ripple-delay          | 该 CSS 变量和 `delay` 属性一致，区别是该变量优先级更高          |
| --s-ripple-opacity        | 波纹不透明度，默认为 0.1                                        |
| --s-ripple-color          | 波纹颜色，默认情况下使用 color 颜色                             |
| --s-ripple-hover-opacity  | 悬停不透明度，默认为 0.08                                       |
