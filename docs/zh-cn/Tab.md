# Tab

选项卡。

```html preview
<s-tab>
  <s-tab-item>
    <div slot="text">Item 1</div>
  </s-tab-item>
  <s-tab-item selected="true">
    <div slot="text">Item 2</div>
  </s-tab-item>
  <s-tab-item>
    <div slot="text">Item 3</div>
  </s-tab-item>
</s-tab>
```

> 你可以设置 **value** 来默认选中，也可以设置 item 的 **selected** 属性来默认选中。

使用插槽。

```html preview
<s-tab>
  <s-tab-item>
    <s-icon type="home" slot="icon"></s-icon>
    <div slot="text">Item 1</div>
    <s-badge slot="badge"></s-badge>
  </s-tab-item>
  <s-tab-item selected="true">
    <s-icon type="home" slot="icon"></s-icon>
    <div slot="text">Item 2</div>
  </s-tab-item>
  <s-tab-item>
    <s-icon type="home" slot="icon"></s-icon>
    <div slot="text">Item 3</div>
    <s-badge slot="badge">99</s-badge>
  </s-tab-item>
</s-tab>
```

设置 `mode` 来设置 **fixed** 模式，在这个模式下 item 会均分占据宽度，并且不再支持滚动。

```html preview
<s-tab mode="fixed">
  <s-tab-item>
    <div slot="text">Item 1</div>
  </s-tab-item>
  <s-tab-item selected="true">
    <div slot="text">Item 2</div>
  </s-tab-item>
  <s-tab-item>
    <div slot="text">Item 3</div>
  </s-tab-item>
</s-tab>
```


设置居中。

```html preview
<s-tab style="justify-content: center">
  <s-tab-item>
    <div slot="text">Item 1</div>
  </s-tab-item>
  <s-tab-item selected="true">
    <div slot="text">Item 2</div>
  </s-tab-item>
  <s-tab-item>
    <div slot="text">Item 3</div>
  </s-tab-item>
</s-tab>
```

---

## 属性

| 名称  | 类型               | 默认值     | 同步 | 介绍                                |
| ----- | ----------------- | ---------- | --- | ----------------------------------- |
| value | string            |            | 否  | 选中的值，需 item 同时设置 value 属性 |
| mode  | scrollable, fixed | scrollable | 是  | 模式                                |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class Tab extends HTMLElement {
  //子项目
  readonly options: TabItem[] = []
  //当前选中下标
  readonly selectedIndex: number = -1
}
```

---

## CSS 变量

| 名称                         | 介绍     |
| ---------------------------- | ------- |
| --s-color-surface            | 背景颜色 |
| --s-color-on-surface-variant | 文本颜色 |
| --s-color-surface-variant    | 边框颜色 |

---

# Tab Item

该组件仅作为 Tab 的子组件，不可单独使用。

---

## 子属性

| 名称     | 类型     | 默认值 | 是否同步 | 介绍          |
| -------- | ------- | ------ | ------- | ------------- |
| selected | boolean | false  | 是      | 是否选中       |
| value    | string  |        | 否      | 值            |

---

## 子插槽

| 名称  | 介绍                      |
| ----- | ------------------------ |
| text  | 文本                     |
| icon  | 图标，默认支持 svg、icon  |
| badge | 徽章                     |

---

## 子 CSS 变量

| 名称              | 介绍                  |
| ----------------- | -------------------- |
| --s-color-primary | 选中文本图标指示器颜色 |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)