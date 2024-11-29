# Carousel

轮播图。

```html preview
<s-carousel autoplay="true" style="max-width: 560px">
  <s-carousel-item selected="true" style="background-image: url('/images/carousel/0.jpg')"></s-carousel-item>
  <s-carousel-item style="background-image: url('/images/carousel/1.jpg')"></s-carousel-item>
  <s-carousel-item style="background-image: url('/images/carousel/2.jpg')"></s-carousel-item>
  <s-carousel-item style="background-image: url('/images/carousel/3.jpg')"></s-carousel-item>
  <s-carousel-item style="background-image: url('/images/carousel/4.jpg')"></s-carousel-item>
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

---

# Carousel Item

该组件仅作为 Carousel 的子组件，不可单独使用。

---

## 子属性

| 名称       | 类型     | 默认值 | 是否同步 | 介绍          |
| ---------- | ------- | ------ | ------- | ------------- |
| selected   | boolean | false  | 是      | 是否选中       |
| value      | string  |        | 否      | 值            |