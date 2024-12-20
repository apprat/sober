# Menu

菜单是一个列表。

```html preview
<s-menu style="max-width: 280px">
  <div slot="label">控制台</div>
  <s-menu-item checked="true">
    <s-icon slot="start" name="home"></s-icon>
    选项1
  </s-menu-item>
  <s-menu-item>
    <s-icon slot="start" name="search"></s-icon>
    选项2
    <s-icon slot="end" name="add"></s-icon>
  </s-menu-item>
  <s-menu-item>
    <s-icon slot="start" name="light_mode"></s-icon>
    选项3
  </s-menu-item>
  <s-menu-item>
    <s-icon slot="start" name="favorite"></s-icon>
    选项4
    <s-menu slot="menu">
      <s-menu-item> 选项1 </s-menu-item>
      <s-menu-item> 选项2 </s-menu-item>
    </s-menu>
  </s-menu-item>
  <s-menu-item>
    <s-icon slot="start" name="add"></s-icon>
    选项5
  </s-menu-item>
</s-menu>
<s-menu style="max-width: 280px">
  <div slot="label">其他</div>
  <s-menu-item> 选项6 </s-menu-item>
  <s-menu-item> 选项7 </s-menu-item>
</s-menu>
```

---


## 插槽

| 名称  | 介绍   |
| ----- | ----- |
| label | 标签  |

---

## CSS 变量

| 名称                         | 介绍         |
| ---------------------------- | ----------- |
| --s-color-on-surface         | 文本颜色     |
| --s-color-surface-variant    | 分割线颜色   |
| --s-color-on-surface-variant | 标签文本颜色 |

---

## Menu Item

该组件仅作为 Menu 的子组件，不可单独使用。

## 子属性

| 名称    | 类型     | 默认值 | 同步 | 介绍         |
| ------- | ------- | ------ | --- | ------------ |
| checked | boolean | false  | 是  | 是否选中      |
| folded  | boolean | true   | 是  | 是否折叠子菜单 |

---

## 子插槽

| 名称   | 介绍                            |
| ------ | ------------------------------- |
| start  | 开始位置插槽，默认支持 svg、icon |
| end    | 开始位置插槽，默认支持同 start   |
| menu   | 子菜单                         |

---

## 子 CSS 变量

| 名称                             | 介绍                       |
| -------------------------------- | ------------------------- |
| --s-color-secondary-container    | 选中背景色                 |
| --s-color-on-secondary-container | 选中前景色                 |
| --s-color-on-surface-variant     | 子菜单切换图标颜色/svg 颜色 |
| --s-color-surface-container-high | 子菜单背景颜色             |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)
- [Fold](./fold)