# Carousel

轮播图。

```html preview
<s-carousel>
  <div style="background: #936d6d"></div>
  <div style="background: #6d936f"></div>
  <div style="background: #856d93"></div>
</s-carousel>
```

---

## 属性

| 名称     | 类型     | 默认值 | 是否同步 | 介绍                                |
| -------- | ------- | ------ | ------- | ----------------------------------- |
| value    | string  |        | 否      | 选中的值，需 item 同时设置 value 属性 |
| duration | number  | 4000   | 否      | 切换间隔，单位毫秒                    |
| autoplay | boolean | false  | 否      | 是否自动播放                         |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变化后触发 |

---

## 原型

```ts
class Carousel extends HTMLElement {
  //子项目
  readonly options: CarouselItem[] = []
  //当前选中下标
  readonly selectedIndex: number = -1
  //切换上一个
  readonly togglePrevious(): void
  //切换下一个
  readonly toggleNext(): void
}
```

---

## CSS 变量

| 名称                 | 介绍       |
| -------------------- | --------- |
| --s-elevation-level1 | 指示器阴影 |