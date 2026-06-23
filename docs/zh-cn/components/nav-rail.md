# NavRail

导航轨道

```html preview block
<s-nav-rail>
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="star"></s-icon>
    <s-badge>99</s-badge>
    <div slot="text"> 帮助 </div>
  </s-nav-rail-item>
  <s-divider></s-divider>
  <label>其他</label>
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <s-badge>99</s-badge>
    <div slot="text"> 帮助 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <div slot="text"> 协议 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="star"></s-icon>
    <div slot="text"> 关于 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

纯文本

```html preview block
<s-nav-rail>
  <s-nav-rail-item>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
  <s-divider></s-divider>
  <label>其他</label>
  <s-nav-rail-item>
    <s-badge>99</s-badge>
    <div slot="text"> 帮助 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <div slot="text"> 协议 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <div slot="text"> 关于 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

纯图标+工具提示

```html preview block
<s-nav-rail>
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <s-tooltip gravity="right"> 首页 </s-tooltip>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <s-tooltip gravity="right"> 发现 </s-tooltip>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <s-tooltip gravity="right"> 我的 </s-tooltip>
  </s-nav-rail-item>
  <s-divider></s-divider>
  <s-nav-rail-item>
    <s-icon slot="icon" name="star"></s-icon>
    <s-badge>99</s-badge>
    <s-tooltip gravity="right"> 帮助 </s-tooltip>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-tooltip gravity="right"> 协议 </s-tooltip>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-tooltip gravity="right"> 帮助 </s-tooltip>
  </s-nav-rail-item>
</s-nav-rail>
```

## 设置选中

你可以使用以下两种方式来设置选中。

在 `s-nav-rail-item` 上设置 `selected` 属性来设置选中。  

```html preview
<s-nav-rail>
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected> <!-- [!code highlight] -->
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

在 `s-nav-rail` 上设置 `value` 属性，然后在 `s-nav-rail-item` 上设置相同的 `value` 值来设置选中。

```html preview
<s-nav-rail value="a2"> <!-- [!code highlight] -->
  <s-nav-rail-item value="a1">
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item value="a2"> <!-- [!code highlight] -->
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item value="a3">
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

## 模式

默认情况下，带有图标+文本的 `s-nav-rail-item` 会根据**窗口比例**选择尽可能折叠或是横向展示（横屏或竖屏）。  

固定展开：

```html preview
<s-nav-rail mode="expanded"> <!-- [!code highlight] -->
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

固定折叠：

```html preview
<s-nav-rail mode="collapsed"> <!-- [!code highlight] -->
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

## 子轨道和插槽

使用 `action` 插槽放置操作，使用 `sub-rail` 插槽放置子轨道

```html preview block
<s-nav-rail>
  <s-nav-rail-item>
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item selected>
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item>
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
  <s-divider></s-divider>
  <s-nav-rail-item selectable="false" onbeforechange="this.querySelector('s-radio').click()">
    <s-icon slot="icon" name="done"></s-icon>
    <div slot="text"> 开启 </div>
    <s-radio name="nav-radio" slot="action" readonly></s-radio>
  </s-nav-rail-item>
    <s-nav-rail-item selectable="false" onbeforechange="this.querySelector('s-radio').click()">
    <s-icon slot="icon" name="close"></s-icon>
    <div slot="text"> 关闭 </div>
    <s-radio name="nav-radio" slot="action" readonly></s-radio>
  </s-nav-rail-item>
  <s-divider></s-divider>
  <label>多选</label>
  <s-nav-rail-item selectable="false" onbeforechange="this.querySelector('s-checkbox').click()">
    <s-icon slot="icon" name="light_mode"></s-icon>
    <div slot="text"> 启用 </div>
    <s-checkbox slot="action" readonly></s-checkbox>
  </s-nav-rail-item>
  <s-nav-rail-item selectable="false">
    <s-icon slot="icon" name="star"></s-icon>
    <div slot="text"> 更多 </div>
    <!--子轨道-->
    <s-nav-rail slot="sub-rail">
      <s-nav-rail-item>
        <s-icon slot="icon" name="home"></s-icon>
        <div slot="text"> 首页 </div>
      </s-nav-rail-item>
      <s-nav-rail-item selected>
        <s-icon slot="icon" name="light_mode"></s-icon>
        <s-badge></s-badge>
        <div slot="text"> 发现 </div>
      </s-nav-rail-item>
      <s-nav-rail-item>
        <s-icon slot="icon" name="favorite"></s-icon>
        <s-badge>3</s-badge>
        <div slot="text"> 我的 </div>
      </s-nav-rail-item>
    </s-nav-rail>
  </s-nav-rail-item>
</s-nav-rail>
```

## 多选支持

设置 `multiple` 属性，即可开启多选功能。  
如果在 `s-nav-rail` 设置 `value` 来选中，需要使用 `,` 分割多个值。  
你可以通过 `.selectedIndexes` 获取当前选中的下标合集，也可以通过 `.selectedItems` 获取当前选中的元素合集。

```html preview
<s-nav-rail multiple value="a1,a2" onchange="console.log('selected', this.selectedIndexes)"> <!-- [!code highlight] -->
  <s-nav-rail-item value="a1"> <!-- [!code highlight] -->
    <s-icon slot="icon" name="home"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-rail-item>
  <s-nav-rail-item value="a2"> <!-- [!code highlight] -->
    <s-icon slot="icon" name="light_mode"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-rail-item>
  <s-nav-rail-item value="a3">
    <s-icon slot="icon" name="favorite"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-rail-item>
</s-nav-rail>
```

## 表单支持

该组件支持表单，你需要在为 `s-nav-rail` 设置一个唯一的 `name` 属性作为表单的键，在 `s-nav-rail-item` 设置 `value` 属性作为表单的提交值。  

```html preview
<form method="get" action="http://coolaf.com/tool/params">
  <s-nav-rail name="navigation" value="a1,a2" defaultValue="a1,a2" multiple> <!-- [!code highlight] -->
    <s-nav-rail-item value="a1"> 
      <s-icon slot="icon" name="home"></s-icon>
      <div slot="text"> 首页 </div>
    </s-nav-rail-item>
    <s-nav-rail-item value="a2"> 
      <s-icon slot="icon" name="light_mode"></s-icon>
      <div slot="text"> 发现 </div>
    </s-nav-rail-item>
    <s-nav-rail-item value="a3"> 
      <s-icon slot="icon" name="favorite"></s-icon>
      <div slot="text"> 我的 </div>
    </s-nav-rail-item>
  </s-nav-rail>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交 </s-button>
</form>
```

---

## 属性

| 名称                   | 类型                      | 默认值                  | 同步 | 说明                                                       |
| ---------------------- | ------------------------- | ----------------------- | ---- | ---------------------------------------------------------- |
| name                   | string                    |                         | ×    | 提交表单时使用的 name 属性                                 |
| value                  | string                    |                         | ×    | 选中的值（多选时使用 `,` 分割多个值）                      |
| defaultValue           | string                    |                         | ×    | 默认选中值（仅表单重置时会设置，同 `value` 属性）          |
| multiple               | boolean                   | false                   | √    | 多选的                                                     |
| selectable             | boolean                   | true                    | √    | 可选中的，禁用该属性点击时不会再选中                       |
| mode                   | auto, collapsed, expanded | auto                    | ×    | 模式，auto=自动，collapsed=折叠，expanded=展开             |
| media                  | string                    | (orientation: portrait) | ×    | 媒体查询，屏幕处于纵向，设置该属性可控制 `mode` 的切换时机 |
| items `只读`           | NavigationRail[]          | []                      |      | 所有子元素                                                 |
| selectedItems `只读`   | NavigationRail[]          | []                      |      | 选中的子元素                                               |
| selectedIndex `只读`   | number                    | -1                      |      | 当前选中下标                                               |
| selectedIndexes `只读` | number[]                  | []                      |      | 当前多选下标数组                                           |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| change | Event | ×    | ×      | 选中发生变化后触发 |

## 插槽

| 名称  | 说明                                               |
| ----- | -------------------------------------------------- |
| 匿名  | 放置 NavigationRailItem 子元素，也可以放置其他内容 |
| start | 开头位置                                           |
| end   | 结束位置                                           |

## HTML 标记属性

| 名称      | 说明         |
| --------- | ------------ |
| collapsed | 折叠时时设置 |

---

## NavRailItem

该组件仅作为 `NavRail` 的子元素使用，单独使用时只是普通容器。

## Item 属性

| 名称       | 类型    | 默认值 | 同步 | 说明                                 |
| ---------- | ------- | ------ | ---- | ------------------------------------ |
| value      | string  |        | ×    | 表单提交或选中的值                   |
| selected   | boolean | false  | √    | 选中的                               |
| selectable | boolean | true   | √    | 可选中的，禁用该属性点击时不会再选中 |

## Item 事件

| 名称  | 参数  | 冒泡 | 可取消 | 说明               |
| ----- | ----- | ---- | ------ | ------------------ |
| input | Event | ×    | ×      | 点击元素选中后触发 |

## Item 插槽

| 名称        | 说明                        |
| ----------- | --------------------------- |
| 匿名        | 支持 s-badge, s-tooltip 等  |
| icon        | 图标                        |
| text        | 文本                        |
| action      | 操作（支持checkbox、radio） |
| toggle-icon | 折叠切换按钮图标            |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件

## 依赖

- [Ripple](./ripple.md)
