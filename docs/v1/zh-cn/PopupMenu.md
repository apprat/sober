# PopupMenu

弹出式菜单。

```html preview
<s-popup-menu>
  <s-button slot="trigger">菜单</s-button>
  <s-popup-menu-item>选项1</s-popup-menu-item>
  <s-popup-menu-item>选项2</s-popup-menu-item>
  <s-popup-menu-item>选项3</s-popup-menu-item>
  <s-popup-menu-item>选项4</s-popup-menu-item>
  <s-popup-menu-item>选项5</s-popup-menu-item>
</s-popup-menu>
```

子菜单和更复杂的布局。

```html preview
<s-popup-menu>
  <s-button slot="trigger">菜单</s-button>
  <s-popup-menu-item>播放</s-popup-menu-item>
  <s-popup-menu-item>播放相似单曲</s-popup-menu-item>
  <s-popup-menu-item>我喜欢</s-popup-menu-item>
  <s-popup-menu group="start">
    <s-popup-menu-item slot="trigger">
      添加到
      <s-icon slot="end" name="arrow_drop_right"></s-icon>
    </s-popup-menu-item>
    <s-popup-menu-item>试听列表</s-popup-menu-item>
    <s-popup-menu-item>添加到新歌单</s-popup-menu-item>
  </s-popup-menu>
  <s-popup-menu group="end">
    <s-popup-menu-item slot="trigger">
      更换音质
      <s-icon slot="end" name="arrow_drop_right"></s-icon>
    </s-popup-menu-item>
    <s-popup-menu-item>标准品质</s-popup-menu-item>
    <s-popup-menu-item>HQ高品质</s-popup-menu-item>
    <s-popup-menu-item>SQ无损品质</s-popup-menu-item>
  </s-popup-menu>
  <s-popup-menu-item>查看评论(520)</s-popup-menu-item>
  <s-popup-menu>
    <s-popup-menu-item slot="trigger">
      删除
      <s-icon slot="end" name="arrow_drop_right"></s-icon>
    </s-popup-menu-item>
    <s-popup-menu-item>删除</s-popup-menu-item>
    <s-popup-menu-item>删除(包括文件)</s-popup-menu-item>
  </s-popup-menu>
  <s-popup-menu>
    <s-popup-menu-item slot="trigger">
      更多操作
      <s-icon slot="end" name="arrow_drop_right"></s-icon>
    </s-popup-menu-item>
    <s-popup-menu-item>复制歌曲信息</s-popup-menu-item>
    <s-popup-menu-item>查看文件信息</s-popup-menu-item>
    <s-popup-menu-item>取消匹配歌曲</s-popup-menu-item>
  </s-popup-menu>
</s-popup-menu>
```

---

## 属性

| 名称  | 类型        | 默认值 | 同步 | 介绍 |
| ----- | ---------- | ------ | --- | ---- |
| group | start, end |        | 是  | 分组 |

---

## 原型

```ts
import { Popup } from 'sober'

class PopupMenu extends Popup implements Props {} 
```

---

## 插槽

| 名称     | 介绍     |
| -------- | ------- |
| trigger  | 触发器   |

---

# Popup Menu Item

该组件仅作为 Popup Menu 的子组件，单独使用时没有效果。

---

## 子插槽

| 名称   | 介绍                             |
| ------ | ------------------------------- |
| start  |  开始位置插槽，默认支持 svg、icon |
| end    |  开始位置插槽，默认支持同 start   |

---

## 依赖

该组件被导入时会自动导入以下组件：

- [Popup](./popup)
- [Ripple](./ripple)