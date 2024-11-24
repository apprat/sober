# Appbar

应用栏。

```html preview
<s-appbar>
  <!--左侧菜单按钮-->
  <s-icon-button slot="navigation">
    <s-icon type="menu"></s-icon>
  </s-icon-button>
  <!--标题-->
  <div slot="headline"> Title </div>
  <!--右侧操作按钮-->
  <s-icon-button slot="action">
    <s-icon type="search"></s-icon>
  </s-icon-button>
</s-appbar>
```

你可以嵌套该组件，内部的 appbar 会居中并且设置一个最大宽度，默认为 **1280px**。

```html preview
<s-appbar>
  <s-appbar>
    <!--左侧菜单按钮-->
    <s-icon-button slot="navigation">
      <s-icon type="menu"></s-icon>
    </s-icon-button>
    <!--标题-->
    <div slot="headline"> Title </div>
    <!--右侧操作按钮-->
    <s-icon-button slot="action">
      <s-icon type="search"></s-icon>
    </s-icon-button>
  </s-appbar>
</s-appbar>
```

在屏幕宽度小于 **768px** 时，它的高度会变为 **56px**，所以你可能需要处理一些布局。

```css
@media(max-width: 768px){
  div {
    height: calc(100% - 56px);
  }
}
```

---

## 插槽

| 名称       | 介绍                   |
| ---------- | --------------------- |
| navigation | 导航按钮               |
| logo       | Logo 默认支持 svg      |
| headline   | 标题                  |
| search     | 搜索框 默认支持 search |
| action     | 操作按钮              |

---

## CSS 变量

| 名称                        | 介绍          |
| --------------------------- | ------------ |
| --s-color-surface-container | 背景颜色      |
| --s-color-primary           | Logo 颜色     |
| --s-color-on-surface        | 标题颜色      |
| --s-color-surface           | 搜索框背景颜色 |