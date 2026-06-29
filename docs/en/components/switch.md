# Switch

The switch is used to turn on or turn off the selection of items.

```html preview
<s-switch></s-switch>
<s-switch checked></s-switch>
```

Custom Icon

```html preview
<s-switch>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

## Disable

```html preview
<s-switch disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked disabled>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

## Read-only

Set the `readOnly` property to make it read-only.

```html preview
<s-switch readOnly>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
<s-switch checked readOnly>
  <s-icon name="close" slot="unselected"></s-icon>
  <s-icon name="done" slot="selected"></s-icon>
</s-switch>
```

## Custom Style

Custom size

```html preview
<s-switch style="width: 42px"></s-switch>
```

## Form support

This component can be used as a form element.

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  Select tags:
  <label> Java <s-switch name="tag" value="java"></s-switch> </label>
  <label> Rust <s-switch name="tag" value="rust"></s-switch> </label>
  <label> Python <s-switch name="tag" value="python" checked defualtChecked></s-switch> </label>
  <hr>
  <s-button type="reset" variant="outlined"> Reset Form </s-button>
  <s-button type="submit"> Submit Results </s-button>
</form>
```

> Please note that if you use the `v-model.lazy` syntax sugar in `Vue`, you must explicitly set `type="checkbox"` in the template.

---

## Attributes

| Name           | Type    | Default | Sync | Description                                       |
| -------------- | ------- | ------- | ---- | ------------------------------------------------- |
| disabled       | boolean | false   | √    | Disabled                                          |
| readOnly       | boolean | false   | √    | Read-only                                         |
| checked        | boolean | false   | √    | checked                                           |
| defualtChecked | boolean | false   | √    | Default checked, default value when form is reset |
| name           | string  | ''      | √    | Name, the `key` value when submitting the form    |
| value          | string  | ''      | ×    | Value, valid when submitting the form             |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                         |
| ------ | --------- | ------ | ---------- | ----------------------------------- |
| change | Event     | ×      | ×          | Emitted when the change is selected |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.
