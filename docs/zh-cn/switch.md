# switch

开关用于打开或关闭项目的选择。

```html preview
<s-switch></s-switch>
<s-switch checked></s-switch>
```

自定义图标

```html preview
<s-switch>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

禁用

```html preview
<s-switch disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

自定义大小

```html preview
<s-switch style="width: 42px"></s-switch>
```

---

## 属性

| 名称          | 类型    | 默认值 | 同步 | 说明   |
| ------------- | ------- | ------ | ---- | ------ |
| disabled      | boolean | false  | ✔️ | 禁用的 |
| checked       | boolean | false  | ✔️ | 选中的 |
| value         | string  |        | ✖️ | 值     |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ✖️ | ✖️   | 选中变更时触发 |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [Ripple](./ripple.md)
