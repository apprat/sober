# tooltip

工具提示，在支持鼠标的设备上通过鼠标悬停触发提示信息，在触屏设备上通过长按触发

```html preview
<s-button>
  text
  <s-tooltip> 测试文本 </s-tooltip>
</s-button>
```

---

默认情况下，该组件会寻找合适的位置显示，你无需关心它的出现位置，但是你依旧可以设置 `gravity` 属性默认位置，它只会影响在空间足够显示的情况下的显示位置，如果空间不足，则会自动调整显示位置

```html preview
<s-button>
  top
  <s-tooltip gravity="top"> 测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本 </s-tooltip>
</s-button>
<s-button>
  bottom
  <s-tooltip gravity="bottom"> 测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本 </s-tooltip>
</s-button>
<s-button>
  left
  <s-tooltip gravity="left"> 测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本 </s-tooltip>
</s-button>
<s-button>
  right
  <s-tooltip gravity="right"> 测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本 </s-tooltip>
</s-button>
```

自定义样式

```html preview
<s-button>
  text
  <s-tooltip style="background: red; color: #fff;padding: 8px 12px; border-radius: 20px"> 测试文本 </s-tooltip>
</s-button>
```

---

## 属性

| 名称     | 类型                     | 默认值 | 同步 | 介绍                                                                   |
| -------- | ------------------------ | ------ | ---- | ---------------------------------------------------------------------- |
| disabled | boolean                  | false  | ✔️ | 禁用的，设置该属性后不再主动触发显示                                   |
| gravity  | bottom, top, left, right | bottom | ✔️ | 显示位置，该属性只影响默认位置，在屏幕无法完整显示时会自动调整显示方向 |

---

## 事件

| 名称        | 参数  | 冒泡 | 可取消 | 说明                                                                             |
| ----------- | ----- | ---- | ------ | -------------------------------------------------------------------------------- |
| open        | Event | ✖️ | ✔️   | 打开时触发                                                                       |
| close       | Event | ✖️ | ✔️   | 关闭时触发                                                                       |
| opened      | Event | ✖️ | ✖️   | 打开完成时触发(动画结束)                                                         |
| closed      | Event | ✖️ | ✖️   | 关闭时完成触发(动画结束)                                                         |
| s-top-layer | Event | ✔️ | ✖️   | 打开时触发，如果你希望自定义的元素保持最高的层级，可依赖该事件会冒泡的特性去设置 |

---

## 原型

- `open(parent: HTMLElement)`： 显示， `parent` 定位元素，
- `close(parent: HTMLElement)`： 关闭，`parent` 定位元素。

---

## HTML 标记属性

| 名称           | 说明                          |
| -------------- | ----------------------------- |
| tooltip-opened | 在显示 tooltip 时设置（容器） |

> 一些组件使用了 Tooltip 组件，意味着它们触发时也会设置 HTML 属性，请注意查看依赖。

---

## CSS 样式变量

| 名称               | 说明                                                      |
| ------------------ | --------------------------------------------------------- |
| --s-tooltip-disabled | 该 CSS 变量和 `disabled` 属性一致，区别是该变量优先级更高 |
| --s-tooltip-gravity  | 该 CSS 变量和 `gravity` 属性一致，区别是该变量优先级更高  |
