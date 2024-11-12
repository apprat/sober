# Navigation

用于在屏幕底部显示或左侧显示的导航栏。

```html preview
<s-navigation>
  <s-navigation-item selected="true">
    <s-icon type="add" slot="icon"></s-icon>
    <div slot="text">Item 1</div>
    <s-badge slot="badge"></s-badge>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon type="search" slot="icon"></s-icon>
    <div slot="text">Item 2</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon type="dark_mode" slot="icon"></s-icon>
    <div slot="text">Item 3</div>
    <s-badge slot="badge">99</s-badge>
  </s-navigation-item>
</s-navigation>
```

设置 `mode` 为导轨模式.

```html preview
<s-navigation mode="rail">
  <s-navigation-item selected="true">
    <s-icon type="add" slot="icon"></s-icon>
    <div slot="text">Item 1</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon type="search" slot="icon"></s-icon>
    <div slot="text">Item 2</div>
  </s-navigation-item>
  <s-navigation-item>
    <s-icon type="dark_mode" slot="icon"></s-icon>
    <div slot="text">Item 3</div>
  </s-navigation-item>
</s-navigation>
```

---

## 属性

| 名称  | 类型          | 默认值 | 是否同步 | 介绍                                |
| ----- | ------------ | ------ | ------- | ----------------------------------- |
| value | string       |        | 否      | 选中的值，需 item 同时设置 value 属性 |
| mode  | bottom, rail | bottom | 是      | 模式                                |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class Navigation extends HTMLElement {
  //子项目
  readonly options: NavigationItem[] = []
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
| --s-elevation-level2         | 默认阴影 |

---

# Navigation Item

该组件仅作为 Navigation 的子组件，不可单独使用。

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

| 名称                          | 介绍            |
| ----------------------------- | -------------- |
| --s-color-primary             | 选中文本图标颜色 |
| --s-color-secondary-container | 图标容器背景颜色 |