# rating

评分组件

```html preview
<s-rating></s-rating>
```

反向的评分

```html preview
<s-rating reversed></s-rating>
```

只读模式和禁用模式

```html preview
<s-rating readonly></s-rating>
<s-rating disabled></s-rating>
```

## 自定义显示

### 自定义图标

```html preview
<s-rating>
  <s-icon name="favorite" slot="track"></s-icon>
  <s-icon name="favorite" slot="track"></s-icon>
  <s-icon name="favorite" slot="track"></s-icon>
  <s-icon name="favorite" slot="track"></s-icon>
  <s-icon name="favorite" slot="track"></s-icon>
  <s-icon name="favorite" slot="fill"></s-icon>
  <s-icon name="favorite" slot="fill"></s-icon>
  <s-icon name="favorite" slot="fill"></s-icon>
  <s-icon name="favorite" slot="fill"></s-icon>
  <s-icon name="favorite" slot="fill"></s-icon>
</s-rating>
```

### 使用文本

```html preview
<s-rating>
  <span slot="track">ABCDE</span>
  <span slot="fill">ABCDE</span>
</s-rating>
```

---

## 属性

| 名称     | 类型    | 默认值 | 同步 | 说明                              |
| -------- | ------- | ------ | ---- | --------------------------------- |
| disabled | boolean | false  | ✔️ | 禁用的                            |
| readOnly | boolean | false  | ✔️ | 只读的                            |
| reversed | boolean | false  | ✔️ | 反向的                            |
| value    | number  | 5      | ✔️ | 值                                |
| step     | number  | 1      | ✔️ | 步进，请确保能被 (max - min) 整除 |
| max      | number  | 10     | ✔️ | 最大值                            |
| min      | number  | 0      | ✔️ | 最小值                            |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                         |
| ------ | ----- | ---- | ------ | ---------------------------- |
| input  | Event | ✖️ | ✖️   | 值发生改变后触发             |
| change | Event | ✖️ | ✖️   | 值发生改变后，失去焦点时触发 |

---

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| track | 轨道，默认支持 svg, icon |
| fill  | 填充，默认支持 svg, icon |

---

## HTML 属性

| 名称    | 说明             |
| ------- | ---------------- |
| pressed | 在按下时设置     |
| hovered | 在鼠标移入时设置 |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

---

## 依赖

- [BaseSlider](./base-slider.md)
