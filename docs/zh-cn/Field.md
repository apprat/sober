# Field

该组件是一个容器，没有事件和行为，它使用纯 CSS 实现提供给其他组件使用，当然你也可以使用它来自定义布局。

```html preview
<s-field>
  <div slot="label">请选择内容</div>
  <div> ... </div>
</s-field>

<s-field focused="true">
  <div slot="label">请选择内容</div>
  <div> ... </div>
</s-field>
```

---

## 属性

| 名称    | 类型     | 默认值 | 同步 | 介绍        |
| ------- | ------- | ------ | --- | ----------- |
| focused | boolean | false  | 是  | 是否聚焦     |
| fixed   | boolean | false  | 是  | 是否固定标签 |

---

## 插槽

| 名称  | 介绍    |
| ----- | ------ |
| start | 开始   |
| end   | 结束   |

---

## CSS 变量

| 名称                         | 介绍                 |
| ---------------------------- | ------------------- |
| --field-padding              | `私有` 内边距        |
| --field-padding-top          | `私有` 顶部内边距    |
| --field-padding-bottom       | `私有` 底部内边距    |
| --field-padding-left         | `私有` 左内边距      |
| --field-padding-right        | `私有` 右内边距      |
| --field-border-radius        | `私有` 边框圆角      |
| --field-border-width         | `私有` 边框宽度      |
| --field-border-color         | `私有` 边框颜色      |
| --field-focused-border-width | `私有` 聚焦边框宽度   |