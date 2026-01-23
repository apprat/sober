# Icon Button

图标按钮帮助用户只需点击一次即可执行操作。

```html preview
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>

<s-icon-button>
  <!--使用 svg-->
  <svg viewBox="0 -960 960 960">
    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path>
  </svg>
</s-icon-button>

<s-icon-button> 
  <!--使用其他组件-->
  <s-loading></s-loading>
</s-icon-button>

<s-icon-button> 
  <!--使用其他组件-->
  <s-circular-progress indeterminate></s-circular-progress>
</s-icon-button>

<s-icon-button> 
  S
</s-icon-button>
```

## 变体

设置 `variant` 来设置不同的变体：`standard`、`filled`、`tonal`、`outlined`。

```html preview
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<s-icon-button variant="filled">
  <s-icon name="star"></s-icon>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button variant="outlined">
  <s-icon name="favorite"></s-icon>
</s-icon-button>
```

## 禁用

设置 `disabled` 来禁用按钮。

```html preview
<s-icon-button disabled> 
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button disabled variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button disabled variant="tonal"> 
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button disabled variant="outlined">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

## 复选框

设置 `type` 属性为 `checkbox`，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件。

```html preview
<s-icon-button type="checkbox" checked>
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button type="checkbox" checked variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button type="checkbox" checked variant="tonal">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button type="checkbox" checked variant="outlined">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

## 尺寸

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `width`、`height` 来更精确的定义按钮尺寸） 。

```html preview
<s-icon-button size="extra-small" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button size="small" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button size="medium" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button size="large" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>

<s-icon-button size="extra-large" variant="filled">
  <s-icon name="home"></s-icon>
</s-icon-button>
```

## 宽度

设置 `width` 属性来设置更宽或者更窄的按钮，适用于一些较宽或较窄的图标。

```html preview
<s-icon-button variant="filled" width="wide">
  <s-icon name="more_horiz"></s-icon>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon name="star"></s-icon>
</s-icon-button>

<s-icon-button variant="outlined" width="narrow">
  <s-icon name="more_vert"></s-icon>
</s-icon-button><br>
```

## 角标

使用 `badge` 组件来设置图标按钮的角标。

```html preview
<s-icon-button variant="filled">
  <s-icon name="star"></s-icon>
  <s-badge></s-badge>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon name="home"></s-icon>
  <s-badge>6</s-badge>
</s-icon-button>

<s-icon-button variant="outlined">
  <s-icon name="favorite"></s-icon>
  <s-badge>99</s-badge>
</s-icon-button>
```

## 预览

```html preview-only
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>
<hr>
variant =
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-icon-button').variant=this.textContent" checked>standard</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-icon-button').variant=this.textContent">filled</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-icon-button').variant=this.textContent">tonal</s-radio>
<s-radio name="button-variant" onchange="this.parentElement.querySelector('s-icon-button').variant=this.textContent">outlined</s-radio>
<hr>
size =
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-icon-button').size=this.textContent" checked>small</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-icon-button').size=this.textContent">extra-small</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-icon-button').size=this.textContent">medium</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-icon-button').size=this.textContent">large</s-radio>
<s-radio name="button-size" onchange="this.parentElement.querySelector('s-icon-button').size=this.textContent">extra-large</s-radio>
<hr>
width =
<s-radio name="button-width" onchange="this.parentElement.querySelector('s-icon-button').width=this.textContent" checked>default</s-radio>
<s-radio name="button-width" onchange="this.parentElement.querySelector('s-icon-button').width=this.textContent">narrow</s-radio>
<s-radio name="button-width" onchange="this.parentElement.querySelector('s-icon-button').width=this.textContent">wide</s-radio>
<hr>
type =
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-icon-button').type=this.textContent" checked>button</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-icon-button').type=this.textContent">checkbox</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-icon-button').type=this.textContent">reset</s-radio>
<s-radio name="button-type" onchange="this.parentElement.querySelector('s-icon-button').type=this.textContent">submit</s-radio>
<hr>
disabled =
<s-checkbox onchange="this.parentElement.querySelector('s-icon-button').disabled=this.checked"></s-checkbox>
```

## 表单支持

该组件可以作为表单元素使用，可以作为复选框、表单重置、提交按钮。

```html preview
<form action="/link" method="get">
  选择标签：
  <s-icon-button name="tag" type="checkbox" value="star">
    <s-icon name="star"></s-icon>
  </s-icon-button>
  <s-icon-button name="tag" type="checkbox" value="home"">
    <s-icon name="home"></s-icon>
  </s-icon-button>
  <s-icon-button name="tag" type="checkbox" value="favorite" defualtChecked checked>
    <s-icon name="favorite"></s-icon> 
  </s-icon-button>
  <hr>
  <s-icon-button type="reset" variant="outlined">
    <s-icon name="close"></s-icon>
    <s-tooltip>重置</s-tooltip>
  </s-icon-button>
  <s-icon-button type="submit" variant="filled">
    <s-icon name="done"></s-icon>
    <s-tooltip>提交</s-tooltip>
  </s-icon-button>
</form>
```

---

## 属性

| 名称           | 类型                                           | 默认值      | 同步 | 说明                                               |
| -------------- | ---------------------------------------------- | ----------- | ---- | -------------------------------------------------- |
| variant        | standard, filled, tonal, outlined              | standard    | √    | 变体                                               |
| size           | extra-small, small, medium, large, extra-large | medium      | √    | 尺寸                                               |
| width          | default, narrow, wide                          | default     | √    | 宽度，wide=较宽的，narrow=较窄的                   |
| type           | icon-button, checkbox, reset, submit           | icon-button | √    | 类型，支持将组件作为复选框，提交按钮，或者重置按钮 |
| disabled       | boolean                                        | false       | √    | 禁用的                                             |
| checked        | boolean                                        | false       | √    | 选中的                                             |
| defualtChecked | boolean                                        | false       | √    | 默认选中，表单重置时的默认值，仅表单重置时生效     |
| name           | string                                         |             | ×    | 名称，表单提交时的 `key` 值                        |
| value          | string                                         |             | ×    | 值，表单提交时有效                                 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称 | 说明                                                       |
| ---- | ---------------------------------------------------------- |
| 匿名 | 图标，默认支持 svg, s-icon, s-loading, s-circular-progress |

## HTML 标记属性

| 名称          | 说明           |
| ------------- | -------------- |
| pressed       | 按下时设置     |
| hovered       | 鼠标移入时设置 |

> 标记属性在一些情况下被设置到 HTML 属性上，以便于外部定义样式。

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

- [Ripple](./ripple.md)
