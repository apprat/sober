# Checkbox

A checkbox allows users to select one or multiple items from a list, or to toggle items on or off.

```html preview
<s-checkbox>I have read the user agreement</s-checkbox>
<s-checkbox checked></s-checkbox>
<s-checkbox indeterminate></s-checkbox>
```

## Disable

Set the `disabled` attribute to disable the checkbox.

```html preview
<s-checkbox disabled></s-checkbox>
<s-checkbox disabled checked></s-checkbox>
<s-checkbox disabled indeterminate></s-checkbox>
```

## Read-only

Set the `readOnly` property to make the checkbox read-only.

```html preview
<s-checkbox readOnly></s-checkbox>
<s-checkbox readOnly checked></s-checkbox>
<s-checkbox readOnly indeterminate></s-checkbox>
```

## Custom Style

Customize icons and styles

```html preview
<s-checkbox>
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-checkbox>

<s-checkbox style="color: #009688" checked></s-checkbox>
<s-checkbox style="color:rgb(212, 162, 35); height: 56px" checked></s-checkbox>
```

If you need to set the selected color individually, you can use CSS selectors;

```vue preview
<style>
  .checkbox[checked]{
    color: #009688;
  }
</style>
<template>
  <s-checkbox class="checkbox">I have read the user agreement</s-checkbox>
</template>
```

## Form support

This component can be used as a form element.

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  Select tags:
  <s-checkbox name="tag" value="java"> Java </s-checkbox>
  <s-checkbox name="tag" value="rust"> Rust </s-checkbox>
  <s-checkbox name="tag" value="python" defualtChecked checked> Python </s-checkbox>
  <hr>
  <s-button type="reset" variant="outlined"> Reset </s-button>
  <s-button type="submit"> Submit Results </s-button>
</form>
```

> Please note that if you use the `v-model.lazy` syntax sugar in `Vue`, you must explicitly set `type=checkbox` in the template.

---

## Attributes

| Name           | Type    | Default | Sync | Description                                                                                  |
| -------------- | ------- | ------- | ---- | -------------------------------------------------------------------------------------------- |
| disabled       | boolean | false   | √    | Disabled                                                                                     |
| indeterminate  | boolean | false   | √    | Unknown                                                                                      |
| readOnly       | boolean | false   | √    | Read-only                                                                                    |
| checked        | boolean | false   | √    | Checked                                                                                      |
| defualtChecked | boolean | false   | √    | Indicates whether the item is checked by default. The default value when resetting the form. |
| name           | string  | ''      | √    | Name, the `key` value when submitting the form                                               |
| value          | string  | ''      | ×    | Value, valid when submitting the form                                                        |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                         |
| ------ | --------- | ------ | ---------- | ----------------------------------- |
| change | Event     | ×      | ×          | Emitted when the change is selected |

## Slot

| Name      | Description |
| --------- | ----------- |
| Anonymous | Text        |

## HTML tag attributes

| Name    | Description                    |
| ------- | ------------------------------ |
| pressed | Set when pressed               |
| hover   | Set when the mouse hovers over |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.
