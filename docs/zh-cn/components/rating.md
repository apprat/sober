# rating

评分组件

```html preview
<s-rating></s-rating>
```

反向的评分

```html preview
<s-rating reversed></s-rating>
```

只读的

```html preview
<s-rating readonly></s-rating>
```

## 禁用

设置 `disabled` 属性，禁用组件。

```html preview
<s-rating disabled></s-rating>
```

## 自定义显示

自定义图标

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

使用文本

```html preview
<s-rating>
  <span slot="track">ABCDE</span>
  <span slot="fill">ABCDE</span>
</s-rating>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-rating name="star" defualtValue="5"></s-rating>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称         | 类型    | 默认值 | 同步 | 说明                                           |
| ------------ | ------- | ------ | ---- | ---------------------------------------------- |
| disabled     | boolean | false  | √    | 禁用的                                         |
| readOnly     | boolean | false  | √    | 只读的                                         |
| reversed     | boolean | false  | √    | 反向的                                         |
| value        | number  | 5      | √    | 值                                             |
| step         | number  | 1      | √    | 步进，请确保能被 (max - min) 整除              |
| max          | number  | 10     | √    | 最大值                                         |
| min          | number  | 0      | √    | 最小值                                         |
| name         | string  |        | ×    | 名称，表单提交时的 `key` 值                    |
| defualtValue | number  | 0      | ×    | 默认选中，表单重置时的默认值，仅表单重置时生效 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                         |
| ------ | ----- | ---- | ------ | ---------------------------- |
| input  | Event | ×    | ×      | 值发生改变后触发             |
| change | Event | ×    | ×      | 值发生改变后，失去焦点时触发 |

## 插槽

| 名称  | 说明                     |
| ----- | ------------------------ |
| track | 轨道，默认支持 svg, icon |
| fill  | 填充，默认支持 svg, icon |

## HTML 属性

| 名称    | 说明             |
| ------- | ---------------- |
| pressed | 在按下时设置     |
| hovered | 在鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `⬆️⬇️⬅️➡️` 键调整值。

## 依赖

该组件在被引入时会自动引入以下组件：

- [BaseSlider](./base-slider.md)
