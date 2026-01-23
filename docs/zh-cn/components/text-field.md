# text-field

```html preview
<s-text-field placeholder="请输入文本内容"></s-text-field>
```

使用 `label` 插槽显示浮动标签。  
浮动标签相比于 `placeholder` 有更好的用户体验，并且在长文本时会显示省略号，它不仅支持文本，还支持任意元素，例如图标。

```html preview
<s-text-field>
  <div slot="label">请输入文本内容</div>
</s-text-field>
```

设置 `type=multiline` 定义多行文本输入框，多行的文本输入框会自适应高度，你同时可以定义 `min-height` 和 `max-height` 来限制高度。

```html preview
<s-text-field type="multiline">
  <div slot="label">请输入文本内容</div>
</s-text-field>
```

除了多行文本输入框，`type` 还支持 `number`、`password`、`email` 、`tel`。

```html preview
<s-text-field type="number">
  <div slot="label">请输入数值</div>
</s-text-field>
<br>
<s-text-field type="password">
  <div slot="label">请输入密码</div>
</s-text-field>
<br>
<s-text-field type="email">
  <div slot="label">请输入邮箱</div>
</s-text-field>
<br>
<s-text-field type="tel">
  <div slot="label">请输入电话号码</div>
</s-text-field>
```

使用 `start` 和 `end` 插槽定义输入框的开始和结束内容，可使用 `s-icon` 或者 `svg` 或 `s-icon-button`。

```html preview
<s-text-field>
  <s-icon slot="start" name="search"></s-icon>
  <div slot="label">请输入文本内容</div>
  <s-icon-button slot="end">
    <s-icon name="close"></s-icon>
  </s-icon-button>
</s-text-field>
```

## 预览

```html preview-only
<s-text-field value="1234567890">
  <div slot="label">请输入文本内容</div>
</s-text-field>
<hr>
type =
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent" checked>text</s-radio>
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent">password</s-radio>
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent">number</s-radio>
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent">email</s-radio>
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent">tel</s-radio>
<s-radio name="text-field-type" onchange="this.parentElement.querySelector('s-text-field').type=this.textContent">multiline</s-radio>
<hr>
disabled =
<s-checkbox onchange="this.parentElement.querySelector('s-text-field').disabled=this.checked"></s-checkbox>
<hr>
readOnly =
<s-checkbox onchange="this.parentElement.querySelector('s-text-field').readOnly=this.checked"></s-checkbox>
<hr>
error =
<s-checkbox onchange="this.parentElement.querySelector('s-text-field').error=this.checked"></s-checkbox>
<hr>
value =
<s-checkbox onchange="this.parentElement.querySelector('s-text-field').value=this.checked?'1324567890':''" checked></s-checkbox>
```

---

## 自定义样式

该组件依赖 [Fieldset](./fieldset.md) 组件，所以它支持 [Fieldset](./fieldset.md) 组件的所有 CSS 变量。

---

## 表单支持

该组件可以作为表单元素使用。

```html preview
<form action="/link" method="get">
  <s-text-field name="username" defualtValue="admin" value="admin">
    <div slot="label">请输入账号</div>
  </s-text-field>
  <br>
  <s-text-field name="password" type="password" requiring="请填写密码">
    <div slot="label">请输入密码</div>
  </s-text-field>
  <hr>
  <s-button type="reset" variant="outlined"> 重置表单 </s-button>
  <s-button type="submit"> 提交结果 </s-button>
</form>
```

---

## 属性

| 名称         | 类型                                          | 默认值 | 同步 | 说明                                                       |
| ------------ | --------------------------------------------- | ------ | ---- | ---------------------------------------------------------- |
| type         | text, password, number, email, tel, multiline | text   | √    | 输入框类型，multiline=多行输入框，其他值同原生             |
| disabled     | boolean                                       | false  | √    | 禁用的                                                     |
| readOnly     | boolean                                       | false  | √    | 只读的                                                     |
| error        | boolean                                       | false  | √    | 错误状态的                                                 |
| name         | string                                        |        | √    | 名称，表单提交时的 `key` 值                                |
| requiring    | string                                        |        | ×    | 必填提示，设置该属性时，输入框必须填写，值为空时的提示文本 |
| autocomplete | string                                        | off    | ×    | 自动补全，同原生                                           |
| defualtValue | string                                        |        | ×    | 默认值，表单重置时的默认值                                 |
| pattern      | string                                        |        | ×    | 正则验证规则，在表单时生效                                 |
| value        | string                                        |        | ×    | 值                                                         |
| placeholder  | string                                        |        | ×    | 占位提示，同原生                                           |
| maxLength    | string                                        | -1     | ×    | 最大长度                                                   |
