# Appbar

应用栏。

```html preview
<s-appbar>
  <!--左侧菜单按钮-->
  <s-icon-button slot="navigation">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <!--标题-->
  <div slot="headline"> Title </div>
  <!--右侧操作按钮-->
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
  </s-icon-button>
</s-appbar>
```

你可以嵌套该组件，内部的 appbar 会居中并且设置一个最大宽度。

```html preview
<s-appbar>
  <s-appbar>
    <!--左侧菜单按钮-->
    <s-icon-button slot="navigation">
      <s-icon name="menu"></s-icon>
    </s-icon-button>
    <!--标题-->
    <div slot="headline"> Title </div>
    <!--右侧操作按钮-->
    <s-icon-button slot="action">
      <s-icon name="search"></s-icon>
    </s-icon-button>
  </s-appbar>
</s-appbar>
```

---

## 插槽

| 名称       | 介绍                   |
| ---------- | --------------------- |
| navigation | 导航按钮               |
| logo       | Logo 默认支持 svg      |
| headline   | 标题                   |
| search     | 搜索框 默认支持 search  |
| action     | 操作按钮               |

---

## CSS 变量

| 名称                        | 介绍          |
| --------------------------- | ------------ |
| --s-color-surface-container | 背景颜色      |
| --s-color-primary           | Logo 颜色     |
| --s-color-on-surface        | 标题颜色      |
| --s-color-surface           | 搜索框背景颜色 |

---

## 原型

```ts
export class Appbar extends HTMLElement implements Props {
} 
```