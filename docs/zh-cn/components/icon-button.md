# IconButton

图标按钮帮助用户只需点击一次即可执行操作。

```html preview
<s-icon-button> 
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button>
  <!--使用 svg-->
  <svg viewBox="0 -960 960 960"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path></svg>
</s-icon-button>

<s-icon-button> 
  <s-loading></s-loading>
</s-icon-button>

<s-icon-button> 
  <s-spinner indeterminate></s-spinner>
</s-icon-button>

<s-icon-button> 
  S
</s-icon-button>
```

## 变体

设置 `variant` 来设置不同的变体：`standard`、`filled`、`tonal`、`outlined`。

```html preview
<s-icon-button> 
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button variant="outlined">
  <s-icon></s-icon>
</s-icon-button>
```

## 禁用

设置 `disabled` 来禁用按钮。

```html preview
<s-icon-button disabled> 
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button disabled variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button disabled variant="tonal"> 
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button disabled variant="outlined">
  <s-icon></s-icon>
</s-icon-button>
```

## 单选和复选框

设置 `type` 属性为 `checkbox` 或 `radio`，按钮会允许选中，同时你可以设置 `checked` 属性来默认选中，选中切换时触发 `change` 事件。

```html preview
<s-icon-button type="checkbox">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="checkbox" variant="filled">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="checkbox" variant="tonal">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="checkbox" variant="outlined">
  <s-icon></s-icon>
</s-icon-button>
<hr>
<s-icon-button type="radio" name="select">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="radio" name="select" variant="filled">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="radio" name="select" variant="tonal">
  <s-icon></s-icon>
</s-icon-button>
<s-icon-button type="radio" name="select" variant="outlined">
  <s-icon></s-icon>
</s-icon-button>
```

## 尺寸

设置 `size` 属性来设置按钮尺寸（你也可以设置 CSS 样式 `width`、`height` 来更精确的定义按钮尺寸） 。

```html preview
<s-icon-button size="extra-small" variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button size="small" variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button size="medium" variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button size="large" variant="filled">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button size="extra-large" variant="filled">
  <s-icon></s-icon>
</s-icon-button>
```

## 宽度

设置 `width` 属性来设置更宽或者更窄的按钮，适用于一些较宽或较窄的图标。

```html preview
<s-icon-button variant="filled" width="wide">
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon></s-icon>
</s-icon-button>

<s-icon-button variant="outlined" width="narrow">
  <s-icon></s-icon>
</s-icon-button><br>
```

## 角标

使用 `badge` 组件来设置图标按钮的角标。

```html preview
<s-icon-button variant="filled">
  <s-icon></s-icon>
  <s-badge></s-badge>
</s-icon-button>

<s-icon-button variant="tonal"> 
  <s-icon></s-icon>
  <s-badge>6</s-badge>
</s-icon-button>

<s-icon-button variant="outlined">
  <s-icon></s-icon>
  <s-badge>99</s-badge>
</s-icon-button>
```

## 表单支持

该组件可以作为表单元素使用，可以作为复选框、表单重置、提交按钮。

```html preview block
<form action="http://coolaf.com/tool/params" method="get">
  选择标签：
  <s-icon-button name="tag" type="checkbox" value="star">
    <s-icon></s-icon>
  </s-icon-button>
  <s-icon-button name="tag" type="checkbox" value="home">
    <s-icon></s-icon>
  </s-icon-button>
  <s-icon-button name="tag" type="checkbox" value="favorite" defaultChecked checked>
    <s-icon></s-icon> 
  </s-icon-button>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit" variant="filled"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称           | 类型                                                     | 默认值        | 同步 | 说明                                               |
| -------------- | -------------------------------------------------------- | ------------- | ---- | -------------------------------------------------- |
| variant        | `standard`, `filled`, `tonal`, `outlined`                | `standard`    | √    | 变体                                               |
| size           | `extra-small`, `small`, `medium`, `large`, `extra-large` | `medium`      | √    | 尺寸                                               |
| width          | `default`, `narrow`, `wide`                              | `default`     | √    | 宽度，`wide`=较宽的，`narrow`=较窄的               |
| type           | `icon-button`, `checkbox`, `radio`, `reset`, `submit`    | `icon-button` | √    | 类型，支持将组件作为复选框，提交按钮，或者重置按钮 |
| disabled       | `boolean`                                                | `false`       | √    | 禁用的                                             |
| checked        | `boolean`                                                | `false`       | √    | 选中的                                             |
| defaultChecked | `boolean`                                                | `false`       | √    | 默认选中，表单重置时的默认值，仅表单重置时生效     |
| name           | `string`                                                 | `''`          | √    | 名称，表单提交时的 `key` 值                        |
| value          | `string`                                                 | `''`          | ×    | 值，表单提交时有效                                 |

## 事件

| 名称   | 参数  | 冒泡 | 可取消 | 说明           |
| ------ | ----- | ---- | ------ | -------------- |
| change | Event | ×    | ×      | 选中变更时触发 |

## 插槽

| 名称 | 说明                                             |
| ---- | ------------------------------------------------ |
| 匿名 | 图标，默认支持 svg, s-icon, s-loading, s-spinner |

## HTML 标记属性

| 名称    | 说明           |
| ------- | -------------- |
| pressed | 按下时设置     |
| hover   | 鼠标移入时设置 |

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

- [Ripple](./ripple.md)
