# Chip

纸片。

```html preview
<s-chip>Chip1</s-chip>
<s-chip type="filled-tonal">Chip2</s-chip>
<s-chip type="elevated">
  Chip3
  <!--操作按钮-->
  <s-icon-button slot="action">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-chip>
```

---

## 属性

| 名称      | 类型                              | 默认值   | 同步 | 介绍       |
| --------- | -------------------------------- | -------- | --- | ---------- |
| type      | outlined, elevated, filled-tonal | outlined | 是  | 样式        |
| clickable | boolean                          | false    | 是  | 是否启用点击 |

---

## 插槽

| 名称   | 介绍                                       |
| ------ | ------------------------------------------ |
| start  | 开始位置插槽，默认支持 svg、icon             |
| end    | 开始位置插槽，默认支持同 start               |
| action | 操作插槽，默认支持 icon、icon-button、button |

---

## CSS 变量

| 名称                             | 介绍                 |
| -------------------------------- | -------------------- |
| --s-color-color-outline          | outlined 边框颜色     |
| --s-color-secondary-container    | filled-tonal 背景颜色 |
| --s-color-on-secondary-container | filled-tonal 前景颜色 |
| --s-elevation-level1             | outlined 阴影         |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)