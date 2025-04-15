# Card

卡片容器，可以设置样式。

```html preview
<s-card clickable="true">
  <div slot="image"></div>
  <div slot="headline">Headline</div>
  <div slot="subhead">Subhead</div>
  <div slot="text">Cards are often used for grid lists, which provide click effects</div>
  <s-button slot="action" type="filled-tonal">Action</s-button>
  <s-button slot="action">Action</s-button>
</s-card>
```

设置 `type` 来设置不同样式。

```html preview
<s-card type="filled" clickable="true">
  <div slot="image"></div>
  <div slot="headline">Headline</div>
  <div slot="subhead">Subhead</div>
  <div slot="text">Cards are often used for grid lists, which provide click effects</div>
  <s-button slot="action" type="outlined">Action</s-button>
  <s-button slot="action">Action</s-button>
</s-card>

<s-card type="outlined" clickable="true">
  <div slot="image"></div>
  <div slot="headline">Headline</div>
  <div slot="subhead">Subhead</div>
  <div slot="text">Cards are often used for grid lists, which provide click effects</div>
  <s-button slot="action" type="filled-tonal">Action</s-button>
  <s-button slot="action">Action</s-button>
</s-card>
```

你可以当做普通容器一样使用。

```html preview
<s-card style="display: block; max-width: none; padding: 24px">
  Card
</s-card>
```

---

## 属性

| 名称      | 类型                        | 默认值   | 同步 | 介绍            |
| --------- | -------------------------- | -------- | --- | -------------- |
| type      | elevated, filled, outlined | elevated | 是  | 样式            |
| clickable | boolean                    | false    | 是  | 是否启用单击效果 |

---

## 插槽

| 名称     | 介绍                     |
| -------- | ------------------------ |
| start    | 开始位置                  |
| end      | 结束位置                  |
| image    | 图像                     |
| headline | 标题                     |
| subhead  | 副标题                   |
| text     | 文本                     |
| action   | 操作按钮，默认支持 button |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)