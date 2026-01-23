# page

该组件用于创建主题页面，它和 `<div>` 类似，大多数情况下我们都建议你使用它来作为根元素。

```html preview
<s-page style="padding: 16px">
  <s-button> Button </s-button>
  <s-button variant="outlined"> Button </s-button>
  <s-checkbox></s-checkbox>
</s-page>
```

## 主题模式

你可以使用 `theme` 属性来设置主题模式，可选值有 `light`、`dark`、`auto`。

```html preview
<s-page theme="dark" style="padding: 16px">
  <s-button> Button </s-button>
  <s-button variant="outlined"> Button </s-button>
  <s-checkbox></s-checkbox>
</s-page>
```

## 动态切换

调用 `.toggleTheme(theme, anchor)` 方法，你可以动态切换主题模式，和直接设置 `theme` 属性相比它增加了一个全屏的过渡动画。

```html preview
<s-page style="padding: 16px" id="test-page">
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggleTheme('light', this)" checked> Light </s-radio>
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggleTheme('dark', this)"> Dark </s-radio>
  <s-radio name="toggle" onchange="document.querySelector('#test-page').toggleTheme('auto', this)"> Auto </s-radio>
</s-page>
```

## 主题生成

如果你希望自定义主题，请查看[主题](../get-started/theme.md)文档。

---

## 属性

| 名称          | 类型              | 默认值 | 同步 | 说明             |
| ------------- | ----------------- | ------ | ---- | ---------------- |
| theme         | light, dark, auto | light  | ×    | 主题模式         |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                                 |
| ------ | ----- | ---- | ------ | ------------------------------------ |
| change | Event | ×    | ×      | 模式变化后触发（仅 auto 模式时有效） |

## 插槽

| 名称 | 说明     |
| ---- | -------- |
| 匿名 | 任意内容 |

## 方法

`.toggleTheme(theme, anchor)` 切换主题模式。

- `theme`：`light | dark | auto` 目标模式。
- `anchor`：`HTMLElement` 可选，描点元素，动画以描点为中心执行。
- `return`：`Promise<Animation | undefined>` 如果存在过渡动画，则返回该动画对象，否则返回 `undefined`。

## HTML 标记属性

| 名称 | 说明           |
| ---- | -------------- |
| dark | 暗色模式时设置 |
