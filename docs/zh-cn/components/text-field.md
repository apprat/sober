# TextField

单行文本输入框

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本"></s-text-field>
```

## 使用插槽

可以使用 `start` 和 `end` 插槽来添加任意内容。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本">
  <s-icon slot="start"></s-icon>
  <s-icon slot="end"></s-icon>
</s-text-field>

<s-text-field label="请输入内容..." placeholder="请输入文本">
  <s-icon-button slot="start">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
  <s-icon-button slot="end">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
</s-text-field>

<s-text-field label="请输入内容..." placeholder="请输入文本">
  <s-button slot="start" variant="text"> 点击我 </s-button>
  <s-button slot="end" variant="text"> 点击我 </s-button>
</s-text-field>
```

## 帮助文本

可以将任意内容作为帮助文本。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本">
  请输入错误信息
</s-text-field>
```

## 清空按钮

设置 `showClear` 属性，即可使输入框可清空。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" showClear value="你好"></s-text-field>
```

## 计数器

设置 `showCount` 显示计数器。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" showClear showCount value="This is My TextArea"></s-text-field>
```

可以同时设置 `maxLength` 属性，来限制输入框的长度。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" showClear showCount maxLength="100" value="This is My TextArea"></s-text-field>
```

## 错误框

设置 `showError` 显示错误框。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" showError value="userName">
  用户名称已存在
</s-text-field>
```

## 密码输入框

设置 `type="password"` 显示密码输入框，设置 `showPasswordToggle` 显示密码切换按钮。

```html preview
<s-text-field label="请输入密码" type="password" showPasswordToggle></s-text-field>
```

## 浮点数输入框

设置 `type="number"` 显示浮点数输入框，会仅允许输入 `0‑9`、`+`、`‑`、`.`、`e`、`E`，注意如果输入不合法，`value` 将返回空字符，设置 `showNumberSpin` 显示数值切换按钮。

```html preview
<s-text-field label="请输入数字" type="number" showNumberSpin></s-text-field>
```

## 搜索框

设置 `type="search"` 显示搜索框，设置 `showSearch` 显示搜索按钮。

```html preview
<s-text-field label="请输入关键字" type="search" showSearch onsearch="alert('搜索')"></s-text-field>
```

## 只读和禁用

设置 `disabled` 禁用输入框，设置 `readOnly` 输入框为只读。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" disabled value="userName"></s-text-field>
<s-text-field label="请输入内容..." placeholder="请输入文本" readOnly value="userName"></s-text-field>
```

## 尺寸

可以使用 `size` 属性定义输入框尺寸，除了默认值 `medium`，还可以设置为 `small`、`large`。

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" size="small">
  <s-icon slot="start"></s-icon>
  <s-icon slot="end"></s-icon>
</s-text-field>
<s-text-field label="请输入内容..." placeholder="请输入文本" size="small">
  <s-icon-button slot="start" size="extra-small">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
  <s-icon-button slot="end" size="extra-small">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
</s-text-field>
<s-text-field label="请输入内容..." placeholder="请输入文本" size="small">
  <s-button slot="start" variant="text" size="extra-small"> 点击我 </s-button>
  <s-button slot="end" variant="text" size="extra-small"> 点击我 </s-button>
</s-text-field>
<hr>
```

```html preview
<s-text-field label="请输入内容..." placeholder="请输入文本" size="large">
  <s-icon slot="start"></s-icon>
  <s-icon slot="end"></s-icon>
</s-text-field>
<s-text-field label="请输入内容..." placeholder="请输入文本" size="large">
  <s-icon-button slot="start">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
  <s-icon-button slot="end">
    <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path></svg>
  </s-icon-button>
</s-text-field>
<s-text-field label="请输入内容..." placeholder="请输入文本" size="large">
  <s-button slot="start" variant="text"> 点击我 </s-button>
  <s-button slot="end" variant="text"> 点击我 </s-button>
</s-text-field>
<hr>
```

## 自定义样式

你可以通过 CSS 变量来自定义输入框的尺寸或样式。

```vue preview
<template>
  <s-text-field label="请输入内容..." placeholder="请输入文本" class="text-field"></s-text-field>
</template>
<style scoped>
.text-field {
  --s-text-field-padding-left: 24px;
  --s-text-field-padding-right: 24px;
  --s-text-field-border-radius: 24px;
}
</style>
```

## 表单支持

该组件支持表单。

```html preview
<form action="http://coolaf.com/tool/params" method="get"> 
  <s-text-field label="请输入内容..." placeholder="请输入文本" name="text"></s-text-field>
    <s-button type="reset" variant="outlined">重置</s-button>
  <s-button type="submit">提交</s-button>
</form>
```

---

## 属性

| 名称               | 类型                                                   | 默认值   | 同步 | 说明                                           |
| ------------------ | ------------------------------------------------------ | -------- | ---- | ---------------------------------------------- |
| type               | `text`, `password`, `number`, `search`, `email`, `tel` | `text`   | √    | 输入框类型                                     |
| size               | `small`, `medium`, `large`                             | `medium` | √    | 尺寸                                           |
| disabled           | `boolean`                                              | `false`  | √    | 禁用的                                         |
| readOnly           | `boolean`                                              | `false`  | √    | 只读的                                         |
| showError          | `boolean`                                              | `false`  | √    | 显示错误框                                     |
| showClear          | `boolean`                                              | `false`  | √    | 显示清空按钮                                   |
| showCount          | `boolean`                                              | `false`  | √    | 显示字数统计                                   |
| showPasswordToggle | `boolean`                                              | `false`  | √    | 显示密码切换按钮（需要设置 `type="password"`） |
| showNumberSpin     | `boolean`                                              | `false`  | √    | 显示数字切换按钮（需要设置 `type="number"`）   |
| showSearch         | `boolean`                                              | `false`  | √    | 显示搜索按钮（需要设置 `type="search"`）       |
| name               | `string`                                               | `''`     | √    | 名称，表单提交时的 `key` 值                    |
| autoComplete       | `string`                                               | `off`    | ×    | 自动补全，同原生                               |
| inputMode          | `string`                                               | `''`     | ×    | 输入模式，同原生                               |
| defaultValue       | `string`                                               | `''`     | ×    | 默认值，表单重置时的默认值                     |
| value              | `string`                                               | `''`     | ×    | 值                                             |
| label              | `string`                                               | `''`     | ×    | 浮动标签                                       |
| placeholder        | `string`                                               | `''`     | ×    | 占位提示，同原生                               |
| maxLength          | `string`                                               | `-1`     | ×    | 最大长度                                       |

## 事件

| 名称   | 参数       | 冒泡 | 可取消 | 说明                   |
| ------ | ---------- | ---- | ------ | ---------------------- |
| input  | InputEvent | ×    | ×      | 输入变更时触发         |
| change | Event      | ×    | ×      | 输入变更丢失焦点后触发 |
| search | Event      | ×    | ×      | 搜索按钮按下后触发     |

## 插槽

| 名称  | 说明                                                                                           |
| ----- | ---------------------------------------------------------------------------------------------- |
| 匿名  | 提示文本                                                                                       |
| start | 开始，默认支持 `.icon`, `svg`, `s-icon`, `s-loading`, `s-spinner`, `s-button`, `s-icon-button` |
| end   | 结束，默认支持同 start                                                                         |

## CSS 样式变量

| 名称                                      | 说明                               |
| ----------------------------------------- | ---------------------------------- |
| --s-text-field-label-gap                  | Label的间距                        |
| --s-text-field-padding                    | 内间距，仅支持单数值，控制左右方向 |
| --s-text-field-padding-right              | 右侧内间距                         |
| --s-text-field-padding-left               | 左侧内间距                         |
| --s-text-field-border-color               | 边框颜色                           |
| --s-text-field-border-color-focused       | 边框聚焦颜色                       |
| --s-text-field-border-width               | 边框宽度                           |
| --s-text-field-border-width-focused       | 聚焦的边框宽度                     |
| --s-text-field-border-radius              | 圆角，仅支持单数值，控制四个方向   |
| --s-text-field-border-top-left-radius     | 左上角圆角                         |
| --s-text-field-border-top-right-radius    | 右上角圆角                         |
| --s-text-field-border-bottom-left-radius  | 左下角圆角                         |
| --s-text-field-border-bottom-right-radius | 右下角圆角                         |

> 注意：CSS 变量参与了尺寸的计算，你应该优先使用 CSS 变量来调整组件样式，如果直接使用 ::part() 选择器去调整尺寸，除非你明确知道你在做什么，否则可能会尺寸计算异常。

## 键盘快捷键

使用 `Tab` 键切换焦点，使用 `Space` 或者 `Enter` 键触发点击事件。

## 依赖

该组件在被引入时会自动引入以下组件：

- [Ripple](./ripple.md)
