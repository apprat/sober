# tooltip

工具提示，在支持鼠标的设备上通过鼠标悬停触发提示信息，在触屏设备上通过长按触发

```html preview
<s-button>
  text
  <s-tooltip> 测试文本 </s-tooltip>
</s-button>
```

## 位置

默认情况下，该组件会寻找合适的位置显示，你无需关心它的出现位置，但是你依旧可以设置 `gravity` 属性默认位置，它只会影响在空间足够显示的情况下的显示位置，如果空间不足，则会自动调整显示位置

```html preview
<s-button>
  top
  <s-tooltip gravity="top"> <!-- [!code highlight] -->
    测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本
  </s-tooltip>
</s-button>
<s-button>
  bottom
  <s-tooltip gravity="bottom"> <!-- [!code highlight] -->
    测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本
  </s-tooltip>
</s-button>
<s-button>
  left
  <s-tooltip gravity="left"> <!-- [!code highlight] -->
    测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本
  </s-tooltip>
</s-button>
<s-button>
  right
  <s-tooltip gravity="right"> <!-- [!code highlight] -->
    测试文本 测试文本<br>测试文本 测试文本<br>测试文本 测试文本
  </s-tooltip>
</s-button>
```

自定义样式

```html preview
<s-button>
  text
  <s-tooltip style="background: #184591; color: #fff; border: solid 2px #269c17; padding: 8px 12px; border-radius: 20px"> 测试文本 </s-tooltip>
</s-button>
```

## 在其他组件中使用

如果你在其他组件插槽中使用，可以设置 `parentDepth` 属性来指定一个层级，在第几层插槽的祖先元素中触发。

```html preview
<s-alert collapsed>
  <div slot="title"> 遣悲怀三首·其二 </div>
  昔日戏言身后意，今朝都到眼前来
  <!--设置插槽和层级-->
  <svg viewBox="0 -960 960 960" slot="toggle-icon"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"></path></svg>
  <s-tooltip slot="toggle-icon" parentDepth="1"> <!-- [!code highlight] -->
    提示信息
  </s-tooltip>
</s-alert>
```

---

## 属性

| 名称        | 类型                            | 默认值 | 同步 | 介绍                                                                                                   |
| ----------- | ------------------------------- | ------ | ---- | ------------------------------------------------------------------------------------------------------ |
| disabled    | boolean                         | false  | √    | 禁用的，设置该属性后不再主动触发显示                                                                   |
| parentDepth | number                          | -1     | ×    | 父级层数，该属性会设置在**祖先元素第几层**触发。如果组件作为其他组件的插槽插入，会查找插槽内的祖先元素 |
| gravity     | auto, top, bottom,  left, right | auto   | √    | 显示位置，该属性只影响默认位置，在屏幕无法完整显示时会自动调整显示方向                                 |

---

## 事件

| 名称              | 参数  | 冒泡 | 可取消 | 说明                                                                             |
| ----------------- | ----- | ---- | ------ | -------------------------------------------------------------------------------- |
| open              | Event | ×    | ×      | 打开时触发                                                                       |
| close             | Event | ×    | ×      | 关闭时触发                                                                       |
| opened            | Event | ×    | ×      | 打开完成时触发(动画结束)                                                         |
| closed            | Event | ×    | ×      | 关闭时完成触发(动画结束)                                                         |
| s-top-layer-open  | Event | √    | ×      | 打开时触发，如果你希望自定义的元素保持最高的层级，可依赖该事件会冒泡的特性去设置 |
| s-top-layer-close | Event | √    | ×      | 打开时触发，如果你希望自定义的元素保持最高的层级，可依赖该事件会冒泡的特性去设置 |

---

## CSS 样式变量

| 名称                 | 说明                                                      |
| -------------------- | --------------------------------------------------------- |
| --s-tooltip-disabled | 该 CSS 变量和 `disabled` 属性一致，区别是该变量优先级更高 |
| --s-tooltip-gravity  | 该 CSS 变量和 `gravity` 属性一致，区别是该变量优先级更高  |
