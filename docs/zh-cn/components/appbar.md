# appbar

应用栏，常用于顶部导航。

```html preview
<s-appbar>
  <s-icon-button slot="nav">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <span slot="title">Material 3</span>
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
    <s-tooltip>搜索</s-tooltip>
  </s-icon-button>
</s-appbar>
```

使用更多插槽

```html preview
<s-appbar>
  <s-icon-button slot="nav">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <svg viewBox="0 0 1024 1024" slot="logo">
    <path d="M913.4 757.4c-105-16-113-31.4-113-31.4 21.6-129.8-45.4-294.2-154.8-383.2-145.6-118.4-367-32.4-539.4-212.4-40.2-42-16.8 471 199 665.4 157.8 142 343.6 98.4 394.6 75.2 46.2-21.2 78.6-59.8 78.6-59.8 84.2 26 125.8 24.4 125.8 24.4C933.8 839.2 948.8 762.8 913.4 757.4zM721.2 766.2c-276.4-81.8-484.2-369-484.2-369s182.4 215.4 504 320.4C741.4 733.8 731.8 757 721.2 766.2z"></path>
  </svg>
  <span slot="title">Material 3</span>
  <span slot="subtitle">Google M3 Expressive</span>
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
    <s-tooltip>搜索</s-tooltip>
  </s-icon-button>
</s-appbar>
```

## 变体

设置属性 `variant` 使用变体。

```html preview
<s-appbar variant="primary">
  <s-icon-button slot="nav">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <svg viewBox="0 0 1024 1024" slot="logo">
    <path d="M913.4 757.4c-105-16-113-31.4-113-31.4 21.6-129.8-45.4-294.2-154.8-383.2-145.6-118.4-367-32.4-539.4-212.4-40.2-42-16.8 471 199 665.4 157.8 142 343.6 98.4 394.6 75.2 46.2-21.2 78.6-59.8 78.6-59.8 84.2 26 125.8 24.4 125.8 24.4C933.8 839.2 948.8 762.8 913.4 757.4zM721.2 766.2c-276.4-81.8-484.2-369-484.2-369s182.4 215.4 504 320.4C741.4 733.8 731.8 757 721.2 766.2z"></path>
  </svg>
  <span slot="title">Material 3</span>
  <span slot="subtitle">Google M3 Expressive</span>
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
    <s-tooltip>搜索</s-tooltip>
  </s-icon-button>
</s-appbar>
```

## 尺寸

设置属性 `size` 定义尺寸，默认为 `auto` 它会根据**窗口宽高比例**选择 `small` 或者 `medium`，你也可以设置该属性固定尺寸。

```html preview
<s-appbar size="small">
  <s-icon-button slot="nav">
    <s-icon name="menu"></s-icon>
  </s-icon-button>
  <span slot="title">Material 3</span>
  <s-icon-button slot="action">
    <s-icon name="search"></s-icon>
    <s-tooltip>搜索</s-tooltip>
  </s-icon-button>
</s-appbar>
```

---

## 属性

| 名称    | 类型                | 默认值  | 同步 | 说明                                                         |
| ------- | ------------------- | ------- | ---- | ------------------------------------------------------------ |
| variant | surface, primary    | surface | √    | 变体                                                         |
| size    | auto, medium, small | auto    | √    | 尺寸，默认为 auto 会根据窗口宽高比例自动为 small 或者 medium |

---

## 插槽

| 名称     | 说明                        |
| -------- | --------------------------- |
| 匿名     | 自定义内容                  |
| nav      | 导航按钮                    |
| logo     | Logo 图标，支持 svg, s-icon |
| title    | 标题                        |
| subtitle | 副标题                      |
| action   | 操作按钮                    |
| start    | 开头                        |
| end      | 结尾                        |
