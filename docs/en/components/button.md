# Button

Buttons, which display most operations in the UI.

```html preview
<s-button>
  <s-icon name="star" slot="start"></s-icon>
  Button
  <s-icon name="close" slot="end"></s-icon>
</s-button>

<s-button>
  <s-loading slot="start"></s-loading>
  Button
  <s-circular-progress slot="end" indeterminate></s-circular-progress>
</s-button>
```

## Variants

Set `variant` to configure different variants: `filled`, `elevated`, `tonal`, `outlined`, `text`.

```html preview
<s-button variant="filled"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="elevated"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="tonal"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="outlined"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button variant="text"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

## Disable

Set `disabled` to disable the button.

```html preview
<s-button disabled> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="elevated"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="tonal"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="outlined"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button disabled variant="text"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

## Checkbox

Set the `type` attribute to `checkbox`, and the button will allow selection. You can also set the `checked` attribute to enable default selection. When selected or unselected, the `change` event will be triggered.

```html preview
<s-button type="checkbox" checked> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="elevated"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="tonal"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="outlined"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>

<s-button type="checkbox" checked variant="text"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-button>
```

## Dimensions

Set the `size` property to configure the button size.

```html preview
<s-button size="extra-small"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="small"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="medium"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="large"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>

<s-button size="extra-large"> <!-- [!code highlight] -->
  <s-icon name="star" slot="start"></s-icon>
  button
</s-button>
```

## Custom Style

You can set styles like using regular elements, or reference styles with classes, or set it to `display: flex` to fill the container.

```html preview
<s-button style="background-color: #278d1e; display: flex;"> 
  <s-icon name="done" slot="start"></s-icon>
  full width
  <s-icon name="close" slot="end"></s-icon>
  <s-tooltip>Hint</s-tooltip>
</s-button>
```

## Form support

This component can be used as a form element, functioning as a checkbox (`type=checkbox`), a form reset button (`type=reset`), or a submit button (`type=submit`).

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  Select tags:
  <s-button name="tag" type="checkbox" value="java"> Java </s-button>
  <s-button name="tag" type="checkbox" value="rust"> Rust </s-button>
  <s-button name="tag" type="checkbox" value="python" checked defualtChecked> Python </s-button>
  <hr>
  <s-button type="reset" variant="outlined"> Reset Form </s-button>
  <s-button type="submit"> Submit Results </s-button>
</form>
```

---

## Attributes

| Name           | Type                                           | Default | Sync | Description                                                                                                                               |
| -------------- | ---------------------------------------------- | ------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| variant        | filled, elevated, tonal, outlined, text        | filled  | √    | Variant                                                                                                                                   |
| size           | small, extra-small, medium, large, extra-large | small   | √    | Size                                                                                                                                      |
| type           | button, checkbox, reset, submit                | button  | √    | Type, supports using the component as a checkbox, submit button, or reset button                                                          |
| disabled       | boolean                                        | false   | √    | Disabled                                                                                                                                  |
| checked        | boolean                                        | false   | √    | Checked                                                                                                                                   |
| name           | string                                         | ''      | √    | Name, the `key` value when submitting the form                                                                                            |
| defualtChecked | boolean                                        | false   | ×    | Indicates whether the item is checked by default. It is the default value when the form is reset and only takes effect during form reset. |
| value          | string                                         | ''      | ×    | Value, valid when submitting the form                                                                                                     |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                         |
| ------ | --------- | ------ | ---------- | ----------------------------------- |
| change | Event     | ×      | ×          | Emitted when the change is selected |

## Slot

| Name      | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| Anonymous | Button text                                                            |
| start     | Start, supports svg, s-icon, s-loading, s-circular-progress by default |
| end       | End, supports svg, s-icon, s-loading, s-circular-progress by default   |

## HTML Tag Attributes

| Name    | Description                 |
| ------- | --------------------------- |
| pressed | Set when pressed            |
| hover   | Set when the mouse moves in |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.

## Dependencies

When this component is introduced, the following components will be automatically introduced:

- [Ripple](./ripple.md)
