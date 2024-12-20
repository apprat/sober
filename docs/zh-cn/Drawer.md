# Drawer

左中右侧的抽屉组件。

```html preview
<s-drawer style="height: 320px" id="drawer">
  <div slot="start"> 1 </div>
  <div>
    2
  </div>
  <div slot="end"> 3 </div>
</s-drawer>
```

```html preview
<s-button onclick="document.querySelector('#drawer').toggle()"> 切换左抽屉 </s-button>
<s-button onclick="document.querySelector('#drawer').toggle('end')"> 切换右抽屉 </s-button>
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
  //显示抽屉 slot=插槽，默认为start
  readonly show(slot?: SlotName): void
  //隐藏抽屉
  readonly close(slot?: SlotName): void
  //显示或隐藏抽屉
  readonly toggle(slot?: SlotName): void
}
```

---

## CSS 变量

| 名称                             | 介绍              |
| -------------------------------- | ---------------- |
| --s-color-background             | 背景颜色          |
| --s-color-scrim                  | 背景蒙版颜色       |
| --s-color-surface-container-low  | 抽屉背景颜色       |
| --s-color-surface-container-high | 抽屉边框颜色       |
| --s-elevation-level3             | 折叠模式下抽屉阴影 |