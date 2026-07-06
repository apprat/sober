# base-slider

该组件是 v2 最强大的组件之一，它允许你创建各种类型的滑块，如音量、进度条、音调、亮度、时间轴等等，同时也建议你使用该组件去封装自定义滑块。  
如果你库的开发者，你也可以按需引入的方式引入该组件去封装自己的滑块。

```html preview
<s-base-slider></s-base-slider>
```

## 模式

设置 `mode` 属性来设置不同滑块；`reversed`：反向滑块，`range`：范围滑块。

```html preview
<s-base-slider mode="reversed"></s-base-slider>
<s-base-slider mode="range"></s-base-slider>
```

## 变体

设置 `variant` 属性为 `segmented` 定义分段式的变体。

```html preview
<s-base-slider variant="segmented"></s-base-slider>
<s-base-slider variant="segmented" mode="reversed"></s-base-slider>
<s-base-slider variant="segmented" mode="range"></s-base-slider>
```

## 竖向

设置 `orientation` 属性为 `vertical` 定义垂直滑块，滑块会转为行内块元素（不再占据一行）。

```html preview
<s-base-slider orientation="vertical"></s-base-slider>
<s-base-slider orientation="vertical" mode="reversed" ></s-base-slider>
<s-base-slider orientation="vertical" mode="range"></s-base-slider>
```

## 间隔

设置 `step` 属性来设置滑块的间隔，或者使用 `stepMarks` 属性来设置间隔值（优先级更高）。

```html preview
<s-base-slider step="10" end="50" min="20" max="200"></s-base-slider>
<s-base-slider stepMarks="50,60,70,80,90" end="50"></s-base-slider>
```

## 滑动模式

设置 `slidingMode` 属性为 `all` 或者 `all-cumulative`，点击滑块任意位置都会触发滑动。

```html preview
<s-base-slider slidingMode="all"></s-base-slider>
<s-base-slider slidingMode="all-cumulative"></s-base-slider>
```

设置 `slidingMode` 属性后，可以同时启用属性 `touchScrollPriority` ，在触屏设备上会优先响应滚动（上下滑动时不会触发滑动）。

```html preview
<s-base-slider touchScrollPriority slidingMode="all"></s-base-slider>
```

## 自定义样式

使用组件的插槽和 CSS 样式，你可以用很少的代码创建自定义滑块，下面是一些示例。

### 音量操作滑块

```vue preview
<style scoped>
  .volume-slider{
    height: 150px;
    width: 64px;
    border-radius: 32px;
    overflow: hidden;
    position: relative;
    --s-base-slider-thumb-size: 0px;
  }
  .volume-slider::part(track-end),
  .volume-slider::part(track-fill){
    width: 100%;
    border-radius: 0;
  }
  .volume-slider:focus-visible{
    outline-offset: 2px;
    outline: 3px solid var(--s-color-primary);
  }
  .volume-slider:focus-visible::part(thumb-end){
    outline: none;
  }
  .light-icon{
    width: 24px;
    height: 24px;
    fill: currentColor;
    position: absolute;
    bottom: 20px;
    color: var(--s-color-on-primary);
  }
</style>
<template>
  <!--亮度操作滑块-->
  <s-base-slider class="volume-slider" orientation="vertical" slidingMode="all-cumulative">
    <s-icon name="light_mode" class="light-icon"></s-icon>
  </s-base-slider>
  <!--音量操作滑块-->
  <s-base-slider class="volume-slider" orientation="vertical" slidingMode="all-cumulative" end="70">
    <svg viewBox="0 -960 960 960" class="light-icon">
      <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"></path>
    </svg>
  </s-base-slider>
</template>
```

### 音乐播放器进度条

```vue preview
<style scoped>
  .player-slider{
    --s-base-slider-thumb-size: 14px;
  }
  .player-slider>.time{
    position: absolute;
    bottom: 24px;
    font-size: 12px;
    padding: 6px 8px;
    font-family: system-ui;
    border-radius: 16px;
    font-weight: 600;
    transform: scale(.5);
    line-height: 1;
    opacity: 0;
    transform-origin: bottom;
    transition-property: transform, opacity;
    transition-duration: var(--s-motion-duration-short4);
    background: var(--s-color-inverse-surface);
    color: var(--s-color-inverse-on-surface);
  }
  .player-slider[sliding]>.time{
    transform: scale(1);
    opacity: 1;
  }
</style>
<template>
  <s-base-slider class="player-slider" slidingMode="all-cumulative" end="60" max="180" oninput="this.querySelector('.time').innerText = `${Math.floor(this.end/60).toString().padStart(2,'0')}:${(this.end%60).toString().padStart(2,'0')}`">
    <!--时间-->
    <div class="time" slot="thumb-end">01:00</div>
  </s-base-slider>
</template>
```

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-base-slider name="tag" defaultEnd="50"></s-base-slider>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称                | 类型                       | 默认值     | 同步 | 说明                                                                                        |
| ------------------- | -------------------------- | ---------- | ---- | ------------------------------------------------------------------------------------------- |
| mode                | single, reversed, range    | single     | √    | 模式，single=单选选择，reversed=反向单选择,range=范围选择                                   |
| slidingMode         | thumb, all, all-cumulative | thumb      | √    | 滑动模式，thumb=仅指示器滑动，all=所有滑动，all-cumulative=所有滑动且累计值                 |
| variant             | standard, segmented        | standard   | √    | 变体                                                                                        |
| orientation         | horizontal, vertical       | horizontal | √    | 方向                                                                                        |
| touchScrollPriority | boolean                    | false      | √    | 触屏滚动优先，启用该属性时会在触屏设备上优先执行滚动                                        |
| stepMarks           | string                     | ''         | ×    | 步进标记，使用 `,` 分割，例如：`20,30,50`(不需要提供最大值和最小值)，滑块时只会在标记上切换 |
| name                | string                     | ''         | √    | 名称，表单提交时的 `key` 值                                                                 |
| step                | number                     | 1          | ×    | 步进，请确保能被 (max - min) 整除                                                           |
| min                 | number                     | 0          | ×    | 最小值                                                                                      |
| max                 | number                     | 100        | ×    | 最大值                                                                                      |
| start               | number                     | 0          | ×    | 开始值（仅mode=range模式生效）                                                              |
| end                 | number                     | 50         | ×    | 结束值（单滑块或反向单滑块模式下，该值用于设置进度）                                        |
| defaultStart        | number                     | 0          | ×    | 默认开始值，表单重置时的默认值，仅表单重置时生效                                            |
| defaultEnd          | number                     | 0          | ×    | 默认结束值，表单重置时的默认值，仅表单重置时生效                                            |

## 事件

| 名称       | 参数                                   | 冒泡 | 可取消 | 说明                     |
| ---------- | -------------------------------------- | ---- | ------ | ------------------------ |
| input      | Event                                  | ×    | ×      | 值发生改变后触发         |
| change     | Event                                  | ×    | ×      | 值发生改变后，松手时触发 |
| pressstart | CustomEvent<{ name: 'start' \| 'end' } | ×    | ×      | 按下指示器时触发         |
| pressend   | CustomEvent<{ name: 'start' \| 'end' } | ×    | ×      | 松开指示器时触发         |
| hoverstart | CustomEvent<{ name: 'start' \| 'end' } | ×    | ×      | 鼠标移入指示器时触发     |
| hoverend   | CustomEvent<{ name: 'start' \| 'end' } | ×    | ×      | 鼠标移出指示器时触发     |

## 插槽

| 名称        | 说明                                 |
| ----------- | ------------------------------------ |
| 匿名        | 自定义内容，浮动在顶层               |
| middle      | 中层（在 track 之上，在 thumb 之下） |
| low         | 底层（在 track 之下）                |
| track-start | 轨道开始                             |
| track-end   | 轨道结束                             |
| track-fill  | 轨道填充                             |
| thumb-start | 指示器开始                           |
| thumb-end   | 指示器结束                           |

## 方法

`.keydown(key)` 执行键盘按键。

- `key`：`string` 键盘按下的键。
- `return`：`boolean` 如果成功触发滑块变更，返回值为 true，否则为 false。

## CSS 样式变量

| 名称                                  | 说明                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| --s-base-slider-gap                   | 间距（仅变体为 `segmented` 时有效）                                  |
| --s-base-slider-track-edge-offset     | 轨道边界偏移，设置该变量可控制距离边界偏移距离                       |
| --s-base-slider-thumb-size            | 指示器大小                                                           |
| --s-base-slider-thumb-width           | 指示器宽度                                                           |
| --s-base-slider-thumb-height          | 指示器高度                                                           |
| --s-base-slider-thumb-start-width     | thumb-start 指示器宽度                                               |
| --s-base-slider-thumb-start-height    | thumb-start 指示器高度                                               |
| --s-base-slider-thumb-end-width       | thumb-end 指示器宽度                                                 |
| --s-base-slider-thumb-end-height      | thumb-end 指示器高度                                                 |
| --s-base-slider-sliding-mode          | 该 CSS 变量和 `slidingMode` 属性一致，区别是该变量优先级更高         |
| --s-base-slider-touch-scroll-priority | 该 CSS 变量和 `touchScrollPriority` 属性一致，区别是该变量优先级更高 |

> 注意：CSS 变量参与了尺寸的计算，你应该优先使用 CSS 变量来调整组件样式，如果直接使用 ::part() 选择器去调整尺寸，除非你明确知道你在做什么，否则可能会尺寸计算异常。

## HTML 标记属性

| 名称          | 说明                       |
| ------------- | -------------------------- |
| pressed       | 按下时设置                 |
| hover         | 鼠标移入时设置             |
| sliding       | 滑动时设置                 |
| start-pressed | start-thumb 按下时设置     |
| end-pressed   | end-thumb 按下时设置       |
| start-hover   | start-thumb 鼠标移入时设置 |
| end-hover     | end-thumb  鼠标移入时设置  |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `⬆️⬇️⬅️➡️` 键调整值。
