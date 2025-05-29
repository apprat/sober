# Appbar

应用栏，该组件在自身宽度小于 `1024px` 时使用更窄的高度。

```html preview
<s-appbar>
  <!--左侧菜单按钮-->
  <s-icon-button slot="navigation">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <!--标题-->
  <div slot="headline"> Title </div>
  <!--搜索框-->
  <s-search slot="search" placeholder="搜索关键字..."></s-search>
  <!--右侧操作按钮-->
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
  </s-icon-button>
</s-appbar>
```

---

## 插槽

| 名称         | 介绍                   |
| ------------ | --------------------- |
| navigation   | 导航按钮               |
| logo         | Logo 默认支持 svg      |
| headline     | 标题                   |
| search       | 搜索框 默认支持 search  |
| action       | 操作按钮               |