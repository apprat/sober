# Drawer

左中右侧的抽屉组件。

```html preview
<s-drawer style="height: 320px" id="drawer">
  <div slot="start"></div>
  <s-appbar>
    <s-icon-button slot="navigation" onclick="document.querySelector('#drawer').toggle()">
      <s-icon name="menu"></s-icon>
    </s-icon-button>
    <div slot="headline"> Title </div>
    <s-icon-button slot="action" onclick="document.querySelector('#drawer').toggle('end')">
      <s-icon name="arrow_back"></s-icon>
    </s-icon-button>
  </s-appbar>
  <s-scroll-view style="display: flex; justify-content: center; align-items: center;">
    hello world
  </s-scroll-view>
  <div slot="end"></div>
</s-drawer>
```
---

## 插槽
 
| 名称   | 介绍          |
| ------ | ------------ |
| start  |  左侧位置插槽 |
| end    |  右侧位置插槽 |

---

## 原型

```ts
type SlotName = 'start' | 'end'

class Drawer extends HTMLElement {
  //显示抽屉 slot=插槽，folded=是否仅折叠
  readonly show(slot?: SlotName, folded?: boolean): void
  //隐藏抽屉
  readonly close(slot?: SlotName, folded?: boolean)): void
  //显示或隐藏抽屉
  readonly toggle(slot?: SlotName, folded?: boolean)): void
}
```