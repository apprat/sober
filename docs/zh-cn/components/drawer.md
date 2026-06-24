# drawer

抽屉，该组件提供左右抽屉和中心主要视图。

```html preview block
<s-drawer style="height: 500px" endOpen="false">
  <div slot="start"> </div>
  <s-app-bar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 Start</s-tooltip>
    </s-icon-button>
    <span slot="title">Drawer</span>
    <s-icon-button onclick="this.closest('s-drawer').toggle('end')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 End</s-tooltip>
    </s-icon-button>
  </s-app-bar>
  <div slot="end"></div>
</s-drawer>
```

## 模式

设置 `mode` 属性，可以设置抽屉固定显示模式，默认值为 `auto` 它会自动切换下列两种模式。

标准（standard）：

```html preview block
<s-drawer style="height: 500px" mode="standard" endOpen="false">
  <div slot="start"> </div>
  <s-app-bar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 Start</s-tooltip>
    </s-icon-button>
    <span slot="title">Drawer</span>
    <s-icon-button onclick="this.closest('s-drawer').toggle('end')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 End</s-tooltip>
    </s-icon-button>
  </s-app-bar>
  <div slot="end"> </div>
</s-drawer>
```

模态（modal）：

```html preview block
<s-drawer style="height: 500px" mode="modal" endModalOpen>
  <div slot="start"> </div>
  <s-app-bar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 Start</s-tooltip>
    </s-icon-button>
    <span slot="title">Drawer</span>
    <s-icon-button onclick="this.closest('s-drawer').toggle('end')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 End</s-tooltip>
    </s-icon-button>
  </s-app-bar>
  <div slot="end"> </div>
</s-drawer>
```

## 媒体查询

默认情况下（`mode=auto`），组件会自动切换为 `standard` 或 `modal`，你可以通过自定义 `media` 的值来改变这一行为。

```html preview block
<s-drawer style="height: 500px" endOpen="false" media="(max-width: 1024px)">
  <div slot="start"> </div>
  <s-app-bar>
    <s-icon-button slot="nav" onclick="this.closest('s-drawer').toggle('start')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 Start</s-tooltip>
    </s-icon-button>
    <span slot="title">Drawer</span>
    <s-icon-button onclick="this.closest('s-drawer').toggle('end')">
      <s-icon name="menu"></s-icon>
      <s-tooltip>切换抽屉 End</s-tooltip>
    </s-icon-button>
  </s-app-bar>
  <div slot="end"> </div>
</s-drawer>
```

---

## 属性

| 名称           | 类型                  | 默认值                  | 同步 | 说明                                                       |
| -------------- | --------------------- | ----------------------- | ---- | ---------------------------------------------------------- |
| mode           | auto, standard, modal | auto                    | ×    | 模式，auto=自动，standard=标准，modal=模态框               |
| startOpen      | boolean               | true                    | √    | 标准 start 抽屉展开的                                      |
| endOpen        | boolean               | true                    | √    | 标准 end 抽屉展开的                                        |
| startModalOpen | boolean               | false                   | √    | 模态 start 抽屉展开的                                      |
| endModalOpen   | boolean               | false                   | √    | 模态 end 抽屉展开的                                        |
| media          | string                | (orientation: portrait) | ×    | 媒体查询，屏幕处于纵向，设置该属性可控制 `mode` 的切换时机 |

## 插槽

| 名称  | 说明     |
| ----- | -------- |
| 匿名  | 主要视图 |
| start | 左侧抽屉 |
| end   | 右侧抽屉 |

## HTML 标记属性

| 名称  | 说明         |
| ----- | ------------ |
| modal | 模态框时设置 |

## 方法

`.toggle(slot, mode): void` 切换抽屉，建议调用该方法去切换抽屉的展开和关闭。

- `slot`：`start | end` 抽屉。
- `mode`：`auto | standard | modal` 可选，默认为 `auto`。

`.getMode(): standard | modal` 获取模式。
