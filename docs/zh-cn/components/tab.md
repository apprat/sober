# Tab

用于在多个选项卡之间进行切换。

```html preview
<s-tab>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>
```

纯文本

```html preview
<s-tab>
  <s-tab-item>
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item>
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item>
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>
```

纯图标+工具提示

```html preview
<s-tab>
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    <s-tooltip> 选项卡1 </s-tooltip>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <s-tooltip> 选项卡2 </s-tooltip>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <s-tooltip> 选项卡3 </s-tooltip>
  </s-tab-item>
</s-tab>
```

## 方向

设置 `orientation` 属性为 `vertical` 启用竖向布局。

```html preview
<s-tab orientation="vertical"> <!-- [!code highlight] -->
  <s-tab-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>
```

## 设置选中

你可以使用以下两种方式来设置选中。

1. 在 `s-tab-item` 上设置 `selected` 属性来设置选中。  
2. 在 `s-tab` 上设置 `value` 属性，然后在 `s-tab-item` 上设置相同的 `value` 值来设置选中。

```html preview
<s-tab>
  <s-tab-item>
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item selected> <!-- [!code highlight] -->
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item>
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>

<s-tab value="a2"> <!-- [!code highlight] -->
  <s-tab-item value="a1">
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item value="a2"> <!-- [!code highlight] -->
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item value="a3">
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>
```

## 多选支持

设置 `multiple` 属性，即可开启多选功能。  
如果在 `s-tab` 设置 `value` 来选中，需要使用 `,` 分割多个值。  
你可以通过 `.selectedIndexes` 获取当前选中的下标合集，也可以通过 `.selectedItems` 获取当前选中的元素合集。

```html preview
<s-tab multiple value="a1,a2"> <!-- [!code highlight] -->
  <s-tab-item value="a1"> <!-- [!code highlight] -->
    <div slot="text"> 选项卡1 </div>
  </s-tab-item>
  <s-tab-item value="a2"> <!-- [!code highlight] -->
    <div slot="text"> 选项卡2 </div>
    <s-badge></s-badge>
  </s-tab-item>
  <s-tab-item value="a3">
    <div slot="text"> 选项卡3 </div>
    <s-badge>3</s-badge>
  </s-tab-item>
</s-tab>
```

## 表单支持

该组件支持表单，你可以在为 `s-tab` 设置一个 `name` 唯一的属性。  

```html preview
<form method="get" action="http://coolaf.com/tool/params">
  <s-tab multiple name="tab" value="a1,a2" defaultValue="a1,a2"> <!-- [!code highlight] -->
    <s-tab-item value="a1"> <!-- [!code highlight] -->
      <div slot="text"> 选项卡1 </div>
    </s-tab-item>
    <s-tab-item value="a2"> <!-- [!code highlight] -->
      <div slot="text"> 选项卡2 </div>
      <s-badge></s-badge>
    </s-tab-item>
    <s-tab-item value="a3">
      <div slot="text"> 选项卡3 </div>
      <s-badge>3</s-badge>
    </s-tab-item>
  </s-tab>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交 </s-button>
</form>
```

---

## 属性

| 名称                   | 类型                       | 默认值     | 同步 | 说明                                                                            |
| ---------------------- | -------------------------- | ---------- | ---- | ------------------------------------------------------------------------------- |
| name                   | string                     |            | ×    | 提交表单时使用的 name 属性                                                      |
| value                  | string                     |            | ×    | 选中的值（多选时使用 `,` 分割多个值），该值的优先级高于子元素的 `selected` 属性 |
| defaultValue           | string                     |            | ×    | 默认选中值（仅表单重置时会设置，同 `value` 属性）                               |
| multiple               | boolean                    | false      | √    | 多选的                                                                          |
| orientation            | horizontal, vertical       | horizontal | √    | 组件方向，horizontal=横向，vertical=竖向                                        |
| itemsOrientation       | auto, horizontal, vertical | auto       | √    | 子元素方向，auto=自动，horizontal=横向，vertical=竖向                           |
| items `只读`           | TabItem[]                  | []         |      | 所有子元素                                                                      |
| selectedItems `只读`   | TabItem[]                  | []         |      | 选中的子元素                                                                    |
| selectedIndex `只读`   | number                     | -1         |      | 当前选中下标                                                                    |
| selectedIndexes `只读` | number[]                   | []         |      | 当前多选下标数组                                                                |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| change | Event | ×    | ×      | 选中发生变化后触发 |

## 插槽

| 名称 | 说明                                    |
| ---- | --------------------------------------- |
| 匿名 | 放置 TabItem 子元素，也可以放置其他内容 |

---

## TabItem

该组件仅作为 `Tab` 的子元素使用，单独使用时只是普通容器。

## TabItem 属性

| 名称        | 类型                       | 默认值 | 同步 | 说明                                                |
| ----------- | -------------------------- | ------ | ---- | --------------------------------------------------- |
| value       | string                     |        | ×    | 任意值，该值提供给 `Tab` 组件选中时使用             |
| selected    | boolean                    | false  | √    | 选中的                                              |
| disabled    | boolean                    | false  | √    | 禁用的                                              |
| orientation | auto, horizontal, vertical | auto   | √    | 布局方向，auto=自动，horizontal=横向，vertical=竖向 |

## TabItem 插槽

| 名称  | 说明                                               |
| ----- | -------------------------------------------------- |
| 匿名  | 文本，图标等任意内容                               |
| icon  | 图标，如果同时存在其他任意内容，组件会使用竖向布局 |
| badge | 徽标，使用该插槽时徽标会浮动显示                   |

## 依赖

- [Ripple](./ripple.md)
