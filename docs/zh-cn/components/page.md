# page

该组件用于创建主题页面，它和 `<div>` 类似，大多数情况下我们都建议你使用它来作为根元素。

```html preview block
<s-page style="padding: 16px">
  <s-button> Button </s-button>
  <s-button variant="outlined"> Button </s-button>
  <s-checkbox></s-checkbox>
</s-page>
```

## 主题模式

你可以使用 `theme` 属性来设置主题模式（暗色或亮色），默认为 `auto` 跟随系统。  

固定亮色：

```html preview block
<s-page theme="light" style="padding: 16px">
  <s-button> Button </s-button>
  <s-button variant="outlined"> Button </s-button>
  <s-checkbox></s-checkbox>
</s-page>
```

固定暗色：

```html preview block
<s-page theme="dark" style="padding: 16px">
  <s-button> Button </s-button>
  <s-button variant="outlined"> Button </s-button>
  <s-checkbox></s-checkbox>
</s-page>
```

## 动态切换主题

调用 `.toggle(theme, anchor)` 方法，你可以动态切换主题模式，和直接设置 `theme` 属性相比它增加了一个全屏的过渡动画。

```html preview block
<s-page style="padding: 16px" id="test-page">
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggle('auto', this)" checked> Auto </s-radio>
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggle('light', this)"> Light </s-radio>
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggle('dark', this)"> Dark </s-radio>
</s-page>
```

## 主题生成

如果你希望自定义主题，请查看[主题](../get-started/theme.md)文档。

---

## 属性

| 名称  | 类型              | 默认值                       | 同步 | 说明                                                            |
| ----- | ----------------- | ---------------------------- | ---- | --------------------------------------------------------------- |
| theme | auto, light, dark | auto                         | ×    | 主题模式                                                        |
| media | string            | (prefers-color-scheme: dark) | ×    | 媒体查询，系统主题处于深色，设置该属性可控制 `theme` 的切换时机 |

## 插槽

| 名称 | 说明     |
| ---- | -------- |
| 匿名 | 任意内容 |

## 方法

`.toggleTheme(theme, anchor): Promise<Animation | undefined>` 切换主题模式，如果存在过渡动画，则返回该动画对象。

- `theme`：`light | dark | auto` 目标模式。
- `anchor`：`HTMLElement` 可选，描点元素，动画以描点为中心执行。

## HTML 标记属性

| 名称 | 说明           |
| ---- | -------------- |
| dark | 暗色模式时设置 |
