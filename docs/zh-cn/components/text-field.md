# TextField

输入框。

```html preview
<s-text-field placeholder="请输入用户名"></s-text-field>
```

使用 `label` 属性设置浮动标签，浮动标签在过长时会显示省略号。

```html preview
<s-text-field label="请输入文本内容"></s-text-field>
```

## 清空按钮

定义 `showClear` 属性来显示清空按钮，在输入内容不为空时会显示清空按钮。

```html preview
<s-text-field label="请输入文本内容" showClear value="点击清空"></s-text-field>
```

## 语音输入

定义 `showMic` 属性来显示语音输入按钮，在浏览器支持的情况下会显示语音输入按钮，你可以同时设置 `micLang` 属性指定语音识别语言，为空则使用系统语言。

```html preview
<s-text-field label="请输入文本内容" showMic type="multiline"></s-text-field>
```

## 字数统计

定义 `showCount`，同时 设置 `maxLength` 显示字数统计，字数统计会自动更新。

```html preview
<s-text-field label="请输入文本内容" showClear showCount maxLength="100"></s-text-field>
```

## 错误提示

使用 `showError` 显示错误提示，可以使用 `helper` 插槽定义错误提示内容。

```html preview
<s-text-field label="请输入文本内容" showError showCount maxLength="10">
  <div slot="helper">用户名格式错误</div>
</s-text-field>
```

## 类型

设置 `type` 为 `multiline` 设置多行文本输入框，多行的文本输入框会自适应高度，你同时可以定义 CSS `min-height` 和 `max-height` 来限制高度。

```html preview
<s-text-field type="multiline" label="请输入文本内容" style="max-height: 200px" value="暮色漫过老巷墙头，余晖轻搭青灰瓦檐。晚风卷着桂香掠过石阶，树下落着细碎花瓣。行人缓步归家，街边小店亮起暖黄灯光，碗筷轻碰声混着闲谈缓缓飘出。不必追赶喧嚣，只静静站一会儿，看流云慢慢移向远山。平凡细碎的温柔，藏在黄昏烟火里，抚平一日奔波的疲惫，心安便是人间好光景。"></s-text-field>
```

设置 `type` 为 `password` 定义密码输入框。

```html preview
<s-text-field type="password" label="请输入密码" autoComplete="new-password"></s-text-field>
```

同时设置 `showPasswordToggle` 属性来显示密码明文切换按钮。

```html preview
<s-text-field type="password" label="请输入密码" showPasswordToggle></s-text-field>
```

设置 `type` 为 `search` 定义搜索框，搜索框和默认值类似，但你可以同时定义 `showSearch` 显示搜索按钮，搜索按钮按下时触发 `search` 事件。

```html preview
<s-text-field type="search" label="请输入搜索关键字" showSearch onsearch="console.log('search...')"></s-text-field>
```

## 插槽

使用 `start` 和 `end` 插槽定义输入框的开始和结束内容，可使用 `s-icon` 或者 `svg` 或 `s-icon-button`。

```html preview
<s-text-field label="请输入文本内容">
  <s-icon slot="start" name="search"></s-icon>
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-text-field>
<hr>
<s-text-field label="请输入电话号码" type="number">
  <div slot="start">+ 86</div>
</s-text-field>
```

## 尺寸

该组件支持 `size` 属性，可选值有 `small`、`medium`(默认)、`large`。

```html preview
<s-text-field label="small" size="small" showClear></s-text-field>
<hr>
<s-text-field label="large" size="large" showClear></s-text-field>
```

---

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  <s-text-field label="请输入账号" name="username" defualtValue="admin" value="admin"></s-text-field>
  <hr>
  <s-text-field label="请输入密码" name="password" type="password" requiring="请填写密码"></s-text-field>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称               | 类型                                                  | 默认值 | 同步 | 说明                                              |
| ------------------ | ----------------------------------------------------- | ------ | ---- | ------------------------------------------------- |
| type               | text, password, number, search, email, tel, multiline | text   | √    | 输入框类型，multiline=多行输入框，其他值同原生    |
| size               | small, medium, large                                  | medium | √    | 尺寸                                              |
| disabled           | boolean                                               | false  | √    | 禁用的                                            |
| readOnly           | boolean                                               | false  | √    | 只读的                                            |
| showError          | boolean                                               | false  | √    | 显示错误框                                        |
| showClear          | boolean                                               | false  | √    | 显示清空按钮                                      |
| showCount          | boolean                                               | false  | √    | 显示字数统计（需要同时设置 `maxLength` 生效）     |
| showPasswordToggle | boolean                                               | false  | √    | 显示密码明文切换按钮，（仅 `type=password` 生效） |
| showNumberSpin     | boolean                                               | false  | √    | 显示数字切换按钮，（仅 `type=number` 生效）       |
| showSearch         | boolean                                               | false  | √    | 显示搜索按钮，（仅 `type=search` 生效）           |
| showMic            | boolean                                               | false  | √    | 显示语音输入按钮（需要浏览器同时支持生效）        |
| micLang            | string                                                | ''     | ×    | 语音输入语言，为空则使用系统语言）                |
| name               | string                                                | ''     | √    | 名称，表单提交时的 `key` 值                       |
| autoComplete       | string                                                | off    | ×    | 自动补全，同原生                                  |
| inputMode          | string                                                | ''     | ×    | 输入模式，同原生                                  |
| defaultValue       | string                                                | ''     | ×    | 默认值，表单重置时的默认值                        |
| value              | string                                                | ''     | ×    | 值                                                |
| label              | string                                                | ''     | ×    | 浮动标签                                          |
| placeholder        | string                                                | ''     | ×    | 占位提示，同原生                                  |
| maxLength          | string                                                | -1     | ×    | 最大长度                                          |
