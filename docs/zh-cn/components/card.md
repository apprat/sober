# card

卡片可以容纳任意内容，所有插槽都是可选的。

```html preview
<s-card>
  <s-avatar slot="header-avatar">U</s-avatar>
  <div slot="header-title">Header Title</div>
  <div slot="header-subtitle">Header SubTitle</div>
  <s-icon-button slot="header-action" width="narrow"> 
    <s-icon name="more_vert"></s-icon>
  </s-icon-button>
  <div slot="media"></div>
  <div slot="title">Title</div>
  <div slot="subtitle">subTitle</div>
  <div slot="text">Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. </div>
  <s-button slot="action" variant="outlined">
    Secondary
  </s-button>
  <s-button slot="action">
    Primary
  </s-button>
</s-card>
```

## 变体

设置 `variant` 来设置不同的变体：`elevated`、`filled`、`outlined`。

```html preview
<s-card variant="outlined">
  <s-avatar slot="header-avatar">U</s-avatar>
  <div slot="header-title">Header Title</div>
  <div slot="header-subtitle">Header SubTitle</div>
  <s-icon-button slot="header-action" width="narrow"> 
    <s-icon name="more_vert"></s-icon>
  </s-icon-button>
  <div slot="media"></div>
  <div slot="title">Title</div>
  <div slot="subtitle">subTitle</div>
  <div slot="text">Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. </div>
  <s-button slot="action" variant="outlined">
    Secondary
  </s-button>
  <s-button slot="action">
    Primary
  </s-button>
</s-card>
<s-card variant="filled">
  <s-avatar slot="header-avatar">U</s-avatar>
  <div slot="header-title">Header Title</div>
  <div slot="header-subtitle">Header SubTitle</div>
  <s-icon-button slot="header-action" width="narrow"> 
    <s-icon name="more_vert"></s-icon>
  </s-icon-button>
  <div slot="media"></div>
  <div slot="title">Title</div>
  <div slot="subtitle">subTitle</div>
  <div slot="text">Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. </div>
  <s-button slot="action" variant="outlined">
    Secondary
  </s-button>
  <s-button slot="action">
    Primary
  </s-button>
</s-card>
```

## 可交互的

设置 `clickable` 属性为纸片增加交互。

```html preview
<s-card clickable>
  <s-avatar slot="header-avatar">U</s-avatar>
  <div slot="header-title">Header Title</div>
  <div slot="header-subtitle">Header SubTitle</div>
  <s-icon-button slot="header-action" width="narrow"> 
    <s-icon name="more_vert"></s-icon>
  </s-icon-button>
  <div slot="media"></div>
  <div slot="title">Title</div>
  <div slot="subtitle">subTitle</div>
  <div slot="text">Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. </div>
  <s-button slot="action" variant="outlined">
    Secondary
  </s-button>
  <s-button slot="action">
    Primary
  </s-button>
</s-card>
```

---

## 属性

| 名称      | 类型                             | 默认值     | 同步 | 说明     |
| --------- | -------------------------------- | ---------- | ---- | -------- |
| variant   | `elevated`, `filled`, `outlined` | `elevated` | √    | 变体     |
| clickable | `boolean`                        | `false`    | √    | 可交互的 |
| disabled  | `boolean`                        | `false`    | √    | 禁用的   |

## 插槽

| 名称            | 说明             |
| --------------- | ---------------- |
| 匿名            | 自定义内容       |
| header-avatar   | 卡片头部头像     |
| header-title    | 卡片头部标题     |
| header-subtitle | 卡片头部副标题   |
| header-action   | 卡片头部操作按钮 |
| title           | 卡片标题         |
| subtitle        | 卡片副标题       |
| text            | 卡片文本         |
| media           | 卡片媒体         |
| action          | 卡片操作按钮     |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hover   | 鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
