# Avatar

头像。

```html preview
<s-avatar>US</s-avatar>
<s-avatar>
  <s-icon name="home"></s-icon>
</s-avatar>
<s-avatar src="/images/avatar.jpg"></s-avatar>
```

使用 `badge` 插槽。

```html preview
<s-avatar>
  US
  <s-badge slot="badge"></s-badge>
</s-avatar>
<s-avatar>
  <s-icon name="home"></s-icon>
  <s-badge slot="badge">99</s-badge>
</s-avatar>
<s-avatar src="/images/avatar.jpg">
  <s-badge slot="badge">8</s-badge>
</s-avatar>
```

---

## 属性

| 名称 | 类型     | 默认值 | 同步 | 介绍        |
| ---- | ------- | ------ | --- | ----------- |
| src  | string  |        | 否  | 图像路径     |

---

## 事件

| 名称  | 参数   | 冒泡 | 可取消 | 介绍             |
| ----- |------ |------|------ |----------------- |
| load  | Event | 否   | 否    | src 加载完成后触发 |
| error | Event | 否   | 否    | src 加载错误后触发 |

---

## 插槽

| 名称  | 介绍  |
| ----- | ---- |
| badge | 徽标 |