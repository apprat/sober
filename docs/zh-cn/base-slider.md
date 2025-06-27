# base-slider

如果你需要高度自定义滑块，这是你的不二选择。

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
<s-base-slider mode="single"></s-base-slider>
```

```html preview
<s-base-slider mode="single-reversed"></s-base-slider>
```

---

设置 `orientation` 属性来设置滑块方向，`horizontal` 水平（默认值）、`vertical` 垂直。

```html preview
<s-base-slider orientation="vertical"></s-base-slider>
```

---

设置 `variant` 设置不同的变体，支持 `standard`（默认值）、`segmented` 分段式

```html preview
<s-base-slider variant="segmented"></s-base-slider>
```

---

## 自定义样式

播放器进度条：

```html preview
<style>
  .player-slider{
    height: 6px;
    color: rgb(35, 163, 15);
    --base-slider-thumb-size: 0px;
  }
  .player-slider:is(:hover, [thumb-end-pressed]){
    --base-slider-thumb-size: 16px;
  }
  .player-slider::part(track-fill){
    border-radius: 4px 0 0 4px;
  }
  .player-slider::part(track-end){
    border-radius: 0 4px 4px 0;
    background-color: rgb(35, 163, 15, .2);
  }
</style>
<s-base-slider class="player-slider" mode="single" max="360"></s-base-slider>
```

---

## 属性

| 名称        | 类型                           | 默认值     | 同步 | 说明   |
| ----------- | ------------------------------ | ---------- | ---- | ------ |
| mode        | range, single, single-reversed | range      | ✔️ | 模式   |
| variant     | standard, segmented            | standard   | ✔️ | 变体   |
| orientation | horizontal, vertical           | horizontal | ✔️ | 方向   |
| disabled    | boolean                        | false      | ✔️ | 禁用的 |
| step        | number                         | 1          | ✖️ | 间隔   |
| min         | number                         | 0          | ✖️ | 最小值 |
| max         | number                         | 100        | ✖️ | 最大值 |
| start       | number                         | 0          | ✖️ | 开始值 |
| end         | number                         | 50         | ✖️ | 结束值 |
