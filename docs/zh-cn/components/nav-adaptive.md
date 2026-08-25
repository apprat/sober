# NavAdaptive

自适应导航栏，它会监听自身宽度在“完整显示”、“仅显示图标”、“折叠”三种模式中切换。

```html preview
<s-nav-adaptive>
  <s-nav-adaptive-item selected>
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 动态 </div>
    <s-badge></s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 发现 </div>
    <s-badge>3</s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 帮助 </div>
    <s-badge>99</s-badge>
  </s-nav-adaptive-item>
  <s-icon-button slot="action">
    <s-icon></s-icon>
  </s-icon-button>
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
</s-nav-adaptive>
```

纯文本

```html preview
<s-nav-adaptive>
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
  <s-nav-adaptive-item selected>
    <div slot="text"> 首页 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <div slot="text"> 动态 </div>
    <s-badge></s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <div slot="text"> 发现 </div>
    <s-badge>3</s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <div slot="text"> 帮助 </div>
    <s-badge>99</s-badge>
  </s-nav-adaptive-item>
</s-nav-adaptive>
```

纯图标+工具提示

```html preview
<s-nav-adaptive>
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
  <s-nav-adaptive-item selected>
    <s-icon slot="icon"></s-icon>
    <s-tooltip> 首页 </s-tooltip>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <s-tooltip> 动态 </s-tooltip>
    <s-badge></s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <s-tooltip> 发现 </s-tooltip>
    <s-badge>3</s-badge>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <s-tooltip> 帮助 </s-tooltip>
    <s-badge>99</s-badge>
  </s-nav-adaptive-item>
</s-nav-adaptive>
```

在 [AppBar](./app-bar.md) 组件中使用。

```html preview
<s-app-bar>
  <s-icon-button slot="nav">
    <s-icon></s-icon>
  </s-icon-button>
  <span slot="title"> Material Sober </span>
  <s-nav-adaptive>
    <s-icon-button slot="toggle" width="narrow"> 
      <s-icon></s-icon>
      <s-tooltip> 更多 </s-tooltip>
    </s-icon-button>
    <s-nav-adaptive-item selected>
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 首页 </div>
    </s-nav-adaptive-item>
    <s-nav-adaptive-item>
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 动态 </div>
      <s-badge></s-badge>
    </s-nav-adaptive-item>
    <s-nav-adaptive-item>
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 发现 </div>
      <s-badge>3</s-badge>
    </s-nav-adaptive-item>
    <s-nav-adaptive-item>
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 帮助 </div>
      <s-badge>99</s-badge>
    </s-nav-adaptive-item>
  </s-nav-adaptive>
</s-app-bar>
```

## 设置选中

你可以使用以下两种方式来设置选中。

在 `s-nav-adaptive-item` 上设置 `selected` 属性来设置选中。  

```html preview
<s-nav-adaptive>
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item selected> <!-- [!code highlight] -->
    <s-icon slot="icon"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item>
    <s-icon slot="icon"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-adaptive-item>
</s-nav-adaptive>
```

在 `s-nav-adaptive` 上设置 `value` 属性，然后在 `s-nav-adaptive-item` 上设置相同的 `value` 值来设置选中。

```html preview
<s-nav-adaptive value="a2"> <!-- [!code highlight] -->
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
  <s-nav-adaptive-item value="a1">
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item value="a2"> <!-- [!code highlight] -->
    <s-icon slot="icon"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item value="a3">
    <s-icon slot="icon"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-adaptive-item>
</s-nav-adaptive>
```

## 多选支持

设置 `multiple` 属性，即可开启多选功能。  
如果在 `s-nav-adaptive` 设置 `value` 来选中，需要使用 `,` 分割多个值。  
你可以通过 `.selectedIndexes` 获取当前选中的下标合集，也可以通过 `.selectedItems` 获取当前选中的元素合集。

```html preview
<s-nav-adaptive multiple value="a1,a2" onchange="console.log('selected', this.selectedIndexes)"> <!-- [!code highlight] -->
  <s-icon-button slot="toggle" width="narrow"> 
    <s-icon></s-icon>
    <s-tooltip> 更多 </s-tooltip>
  </s-icon-button>
  <s-nav-adaptive-item value="a1"> <!-- [!code highlight] -->
    <s-icon slot="icon"></s-icon>
    <div slot="text"> 首页 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item value="a2"> <!-- [!code highlight] -->
    <s-icon slot="icon"></s-icon>
    <s-badge></s-badge>
    <div slot="text"> 发现 </div>
  </s-nav-adaptive-item>
  <s-nav-adaptive-item value="a3">
    <s-icon slot="icon"></s-icon>
    <s-badge>3</s-badge>
    <div slot="text"> 我的 </div>
  </s-nav-adaptive-item>
</s-nav-adaptive>
```

## 表单支持

该组件支持表单，你需要在为 `s-nav-adaptive` 设置一个唯一的 `name` 属性作为表单的键，在 `s-nav-adaptive-item` 设置 `value` 属性作为表单的提交值。  

```html preview
<form method="get" action="http://coolaf.com/tool/params">
  <s-nav-adaptive name="navigation" value="a1,a2" defaultValue="a1,a2" multiple> <!-- [!code highlight] -->
    <s-icon-button slot="toggle" width="narrow"> 
      <s-icon></s-icon>
      <s-tooltip> 更多 </s-tooltip>
    </s-icon-button>
    <s-nav-adaptive-item value="a1"> 
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 首页 </div>
    </s-nav-adaptive-item>
    <s-nav-adaptive-item value="a2"> 
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 发现 </div>
    </s-nav-adaptive-item>
    <s-nav-adaptive-item value="a3"> 
      <s-icon slot="icon"></s-icon>
      <div slot="text"> 我的 </div>
    </s-nav-adaptive-item>
  </s-nav-adaptive>
  <hr>
  <s-button type="reset" variant="outlined"> 重置 </s-button>
  <s-button type="submit"> 提交 </s-button>
</form>
```

---

## 属性

| 名称                   | 类型                       | 默认值 | 同步 | 说明                                              |
| ---------------------- | -------------------------- | ------ | ---- | ------------------------------------------------- |
| name                   | string                     | ""     | ×    | 提交表单时使用的 name 属性                        |
| value                  | string                     | ""     | ×    | 选中的值（多选时使用 `,` 分割多个值）             |
| defaultValue           | string                     | ""     | ×    | 默认选中值（仅表单重置时会设置，同 `value` 属性） |
| multiple               | boolean                    | false  | √    | 多选的                                            |
| selectable             | boolean                    | true   | √    | 可选中的，禁用该属性点击时不会再选中              |
| items `只读`           | NavigationResponsiveItem[] | []     |      | 所有子元素                                        |
| selectedItems `只读`   | NavigationResponsiveItem[] | []     |      | 选中的子元素                                      |
| selectedIndex `只读`   | number                     | -1     |      | 当前选中下标                                      |
| selectedIndexes `只读` | number[]                   | []     |      | 当前多选下标数组                                  |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明               |
| ------ | ----- | ---- | ------ | ------------------ |
| change | Event | ×    | ×      | 选中发生变化后触发 |

## 插槽

| 名称 | 说明                        |
| ---- | --------------------------- |
| 匿名 | NavigationResponsive 子元素 |

## HTML 标记属性

| 名称      | 说明             |
| --------- | ---------------- |
| icon-only | 仅显示图标时设置 |
| collapsed | 折叠时设置       |

---

## NavAdaptiveItem

该组件仅作为 `NavAdaptive` 的子元素使用，单独使用时只是普通容器。

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

| 名称 | 说明                       |
| ---- | -------------------------- |
| 匿名 | 支持 s-badge, s-tooltip 等 |
| icon | 图标                       |
| text | 文本                       |

---

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件

## 依赖

- [Ripple](./ripple.md)
