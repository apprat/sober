# 概述

用于在多个选项卡之间进行切换的组件，支持多种样式和交互模式，该组件由 `<s-tab>` 和 `<s-tab-item>` 两个组件组成。

```html preview
<s-tab>
  <s-tab-item>Tab 1</s-tab-item>
  <s-tab-item selected>Tab 2</s-tab-item>
  <s-tab-item>Tab 3</s-tab-item>
</s-tab>
```

```html preview
<s-tab>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    <s-tooltip>主页</s-tooltip>
  </s-tab-item>
  <s-tab-item selected>
    <s-icon slot="icon" name="star"></s-icon>
    <s-tooltip>收藏</s-tooltip>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-tooltip>喜欢</s-tooltip>
  </s-tab-item>
</s-tab>
```

```html preview
<s-tab>
  <s-tab-item>
    <s-icon name="home"></s-icon>
    Home
  </s-tab-item>
  <s-tab-item selected>
    <s-icon name="star"></s-icon>
    Search
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item>
    <s-icon name="close"></s-icon>
    User
    <s-badge>99</s-badge>
  </s-tab-item>
</s-tab>
```

```html preview
<s-tab>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    Home
  </s-tab-item>
  <s-tab-item selected>
    <s-icon slot="icon" name="star"></s-icon>
    Search
    <s-badge slot="badge"></s-badge>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    Users
    <s-badge slot="badge">99</s-badge>
  </s-tab-item>
  <s-tab-item disabled>
    <s-icon slot="icon" name="home"></s-icon>
    Auth
    <s-badge slot="badge">99</s-badge>
  </s-tab-item>
</s-tab>
```

## 变体

通过 `variant` 属性设置选项卡变体。

```html preview
<s-tab variant="secondary">
  <s-tab-item>Tab 1</s-tab-item>
  <s-tab-item selected>Tab 2</s-tab-item>
  <s-tab-item>Tab 3</s-tab-item>
  <s-tab-item>Tab 4</s-tab-item>
  <s-tab-item>Tab 5</s-tab-item>
</s-tab>
<s-tab variant="segmented">
  <s-tab-item>Tab 1</s-tab-item>
  <s-tab-item selected>Tab 2</s-tab-item>
  <s-tab-item>Tab 3</s-tab-item>
  <s-tab-item>Tab 4</s-tab-item>
  <s-tab-item>Tab 5</s-tab-item>
</s-tab>
```

## 固定模式

通过 mode 属性设置模式，在 `fixed` 模式下，选项卡会均分容器宽度且不支持滚动：

```html preview
<s-tab mode="fixed">
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    Tab 1
  </s-tab-item>
  <s-tab-item selected>
    <s-icon slot="icon" name="star"></s-icon>
    Tab 2
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    Tab 3
  </s-tab-item>
</s-tab>
```

## 多选支持

通过 `multiple` 属性允许多选，设置该属性后，`value` 需要用逗号分隔多个值：。

```html preview
<s-tab value="tab2,tab3" multiple>
  <s-tab-item value="tab1">Tab 1</s-tab-item>
  <s-tab-item value="tab2">Tab 2</s-tab-item>
  <s-tab-item value="tab3">Tab 2</s-tab-item>
</s-tab>
```

## 设置方向

通过 `orientation` 属性设置方向。

```html preview
<s-tab orientation="vertical">
  <s-tab-item>
    <s-icon name="home"></s-icon>
    Tab 1
  </s-tab-item>
  <s-tab-item selected>
    <s-icon name="star"></s-icon>
    Tab 2
  </s-tab-item>
  <s-tab-item>
    <s-icon name="dark_mode"></s-icon>
    Tab 3
  </s-tab-item>
</s-tab>
```

---

## 属性

| 名称                    | 类型                          | 默认值     | 同步 | 说明                                  |
| ----------------------- | ----------------------------- | ---------- | ---- | ------------------------------------- |
| value                   | string                        |            | ×    | 选中的值（多选时使用 `,` 分割多个值） |
| multiple                | boolean                       | false      | √    | 多选的                                |
| mode                    | scrollable, fixed             | scrollable | √    | 模式，scrollable=滚动，fixed=固定     |
| variant                 | primary, secondary, segmented | primary    | √    | 变体，standard=标准，segmented=分割的 |
| orientation             | horizontal, vertical          | horizontal | √    | 方向，horizontal=横向，vertical=竖向  |
| selectedIndex `只读`    | number                        | -1         |      | 当前选中下标                          |
| selectedIndexAll `只读` | number[]                      | []         |      | 当前多选下标数组(多选时)              |
| selectedOptions `只读`  | TabItem[]                     | []         |      | 选中的子项目                          |
| options `只读`          | TabItem[]                     | []         |      | 子项目                                |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| change | Event | ×    | ×      | 选中发生变化后触发 |

## 插槽

| 名称 | 说明                                    |
| ---- | --------------------------------------- |
| 匿名 | 放置 TabItem 子元素，也可以放置其他内容 |

---

## TabItem

该组件仅作为 `Tab` 的子元素使用，单独使用时只是普通容器。

## TabItem 属性

| 名称     | 类型    | 默认值 | 同步 | 说明                                    |
| -------- | ------- | ------ | ---- | --------------------------------------- |
| value    | string  |        | ×    | 任意值，该值提供给 `Tab` 组件选中时使用 |
| selected | boolean | false  | √    | 选中的                                  |
| disabled | boolean | false  | √    | 禁用的                                  |

## TabItem 插槽

| 名称  | 说明                                               |
| ----- | -------------------------------------------------- |
| 匿名  | 文本，图标等任意内容                               |
| icon  | 图标，如果同时存在其他任意内容，组件会使用竖向布局 |
| badge | 徽标，使用该插槽时徽标会浮动显示                   |

## 依赖

- [Ripple](./ripple.md)
