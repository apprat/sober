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


> 当屏幕的宽度小于 `1200` 时，抽屉会切换为折叠模式，以便于腾出更多空间。

---

## 插槽
 
| 名称   | 介绍          |
| ------ | ------------ |
| start  |  左侧位置插槽 |
| end    |  右侧位置插槽 |

---

## 原型

```ts
class Drawer extends HTMLElement {
  //显示抽屉 slot=插槽，folded=是否仅折叠模式(默认自动)
  readonly show(slot?: 'start'|'end', folded?: boolean): void
  //显示或隐藏抽屉
  readonly toggle(slot?: 'start'|'end', folded?: boolean): void
  //隐藏抽屉
  readonly dismiss(slot?: 'start'|'end', folded?: boolean): void
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