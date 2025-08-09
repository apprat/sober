# base-slider

如果你需要自定义滑块，这是你的不二选择，该组件提供了极强大的自定义样式能力，可以帮助你完成大多数自定义样式需求。

```html preview
<s-base-slider></s-base-slider>
```

设置 `step` 属性来设置滑块的间隔。

```html preview
<s-base-slider step="5"></s-base-slider>
```

---

设置 `mode` 属性来设置不同滑块，`range` 范围（默认值）、`single` 单滑块、`single-reversed` 反向单滑块。  

```html preview
<s-base-slider mode="single" end="80"></s-base-slider>
<s-base-slider mode="single-reversed" end="80"></s-base-slider>
```

> 注意：在 `single` 和 `single-reversed` 模式下，`start` 属性无效，且返回值始终为 0，你只能用 `end` 属性来设置和获取值。

---

设置 `variant` 设置不同的变体，支持 `standard`（默认值）、`segmented` 分段式，同时你可以使用 CSS 变量 `--base-slider-gap` 设置间距。

```html preview
<s-base-slider variant="segmented"></s-base-slider>
<s-base-slider variant="segmented" mode="single"></s-base-slider>
<s-base-slider variant="segmented" mode="single-reversed"></s-base-slider>
```

---

设置 `orientation` 属性来设置滑块方向，`horizontal` 水平（默认值）、`vertical` 垂直。

```html preview
<s-base-slider orientation="vertical"></s-base-slider>
<s-base-slider orientation="vertical" mode="single" style="margin-left: 32px"></s-base-slider>
<s-base-slider orientation="vertical" mode="single-reversed" style="margin-left: 32px"></s-base-slider>
<s-base-slider orientation="vertical" variant="segmented"style="margin-left: 32px"></s-base-slider>
<s-base-slider orientation="vertical" variant="segmented" mode="single" style="margin-left: 32px"></s-base-slider>
<s-base-slider orientation="vertical" variant="segmented" mode="single-reversed" style="margin-left: 32px"></s-base-slider>
```

---

## 自定义样式

> 该组件支持强大的自定义样式能力，你可以使用 `::part` 选择器配合插槽来实现各种样式。

播放器进度条示例，包含了缓冲进度条、试听标记，在触屏移动时进度条加粗：

```html preview
<style>
  .player-slider{
    height: 6px;
    transition-property: height;
    --base-slider-thumb-size: 12px;
  }
  /**移动时设置滑块大小**/
  .player-slider[moving]{
    height: 10px;
    --base-slider-thumb-size: 18px;
  }
  /**轨道填充**/
  .player-slider::part(track-fill){
    border-radius: 6px 0 0 6px;
  }
  /**轨道结束**/
  .player-slider::part(track-end){
    border-radius: 0 6px 6px 0;
    background-color: var(--s-color-surface-container-high);
  }
  /**缓存进度条**/
  .player-slider>.buffer{
    background-color: var(--s-color-secondary-container);
    height: 100%;
    width: 50%;
    position: absolute;
    border-radius: 6px;
    left: 0;
  }
  /**标记**/
  .player-slider>.marker{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: currentColor;
    position: absolute;
    left: var(--left);
    transform: translateX(calc(var(--left) * -1));
  }
</style>
<s-base-slider class="player-slider" mode="single" max="360">
  <div class="buffer"></div>
  <div class="marker" style="--left: 30%"></div>
</s-base-slider>
```

自定义指示器大小，使用插槽放置任意布局：

```html preview
<style>
  .slider{
    --base-slider-thumb-size: 24px;
  }
  .slider::part(track-fill){
    background: linear-gradient(to right, blue, pink);
  }
  .slider::part(thumb-start),
  .slider::part(thumb-end){
    background: none;
  }
  .slider::part(thumb-start){
    border: solid 3px currentColor;
  }
</style>
<s-base-slider class="slider" variant="segmented">
  <s-icon name="star" slot="thumb-end"></s-icon>
</s-base-slider>
```

---

## 属性

| 名称        | 类型                           | 默认值     | 同步 | 说明                                           |
| ----------- | ------------------------------ | ---------- | ---- | ---------------------------------------------- |
| mode        | range, single, single-reversed | range      | ✔️ | 模式                                           |
| variant     | standard, segmented            | standard   | ✔️ | 变体                                           |
| orientation | horizontal, vertical           | horizontal | ✔️ | 方向                                           |
| disabled    | boolean                        | false      | ✔️ | 禁用的                                         |
| step        | number                         | 1          | ✖️ | 间隔                                           |
| min         | number                         | 0          | ✖️ | 最小值                                         |
| max         | number                         | 100        | ✖️ | 最大值                                         |
| start       | number                         | 0          | ✖️ | 开始值                                         |
| end         | number                         | 50         | ✖️ | 结束值（当设置为单滑块模式，该值用于设置进度） |

---

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明                         |
| ------ | ----- | ---- | ------ | ---------------------------- |
| input  | Event | ✖️ | ✖️   | 值发生改变后触发             |
| change | Event | ✖️ | ✖️   | 值发生改变后，失去焦点时触发 |

---

## 插槽

| 名称        | 说明       |
| ----------- | ---------- |
|             | 自定义内容 |
| track-start | 轨道开始   |
| track-end   | 轨道结束   |
| track-fill  | 轨道填充   |
| thumb-start | 指示器开始 |
| thumb-end   | 指示器结束 |

---

## 样式变量

| 名称                             | 说明                                                          |
| -------------------------------- | ------------------------------------------------------------- |
| --base-slider-gap                | 间距（仅变体为 `segmented` 时有效）                           |
| --base-slider-thumb-size         | 指示器大小                                                    |
| --base-slider-thumb-width        | 指示器宽度，默认使用 `--base-slider-thumb-size`               |
| --base-slider-thumb-height       | 指示器高度，默认使用 `--base-slider-thumb-size`               |
| --base-slider-thumb-start-width  | thumb-start 指示器宽度，默认使用 `--base-slider-thumb-width`  |
| --base-slider-thumb-start-height | thumb-start 指示器高度，默认使用 `--base-slider-thumb-height` |
| --base-slider-thumb-end-width    | thumb-end 指示器宽度，默认使用 `--base-slider-thumb-width`    |
| --base-slider-thumb-end-height   | thumb-end 指示器高度，默认使用 `--base-slider-thumb-height`   |

> 注意：CSS 变量参与了尺寸的计算，你应该优先使用 CSS 变量来调整组件样式，如果直接使用 ::part() 选择器去调整，除非你知道你在做什么。

---

## 标记属性

| 名称          | 说明                                                  |
| ------------- | ----------------------------------------------------- |
| pressed       | 按下时设置（与 `:active` 类似，但触屏设备上略有不同） |
| start-pressed | start-thumb 按下时设置                                |
| end-pressed   | end-thumb 按下时设置                                  |
| start-hovered | start-thumb 鼠标移入时设置                            |
| end-hovered   | end-thumb  鼠标移入时设置                             |
| moving        | 开始移动时设置                                        |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。
