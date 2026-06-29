# SplitButton

The split button opens a menu, providing users with more options related to the operation.

```html preview
<s-split-button>
  <s-icon name="star" slot="start"></s-icon>
  label
</s-split-button>
```

## Variants

Set `variant` to configure different variants: `filled`, `elevated`, `tonal`, `outlined`.

```html preview
<s-split-button variant="filled">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="tonal">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>
```

## Disable

Set `disabled` to disable the button.

```html preview
<s-split-button disabled> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="elevated">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="tonal"> 
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>

<s-split-button disabled variant="outlined">
  <s-icon name="star" slot="start"></s-icon>
  Button
</s-split-button>
```

## Using slots

Use slots to place other components. The `svg` and `s-icon` of the `toggle-icon` slot will rotate `-180` degrees when toggled.

```html preview
<s-split-button>
  <s-icon name="star" slot="start"></s-icon>
  label
  <s-icon name="arrow_downward" slot="toggle-icon"></s-icon>
  <s-tooltip slot="toggle" parentDepth="1">Expand</s-tooltip>
</s-split-button>
```

## Dimensions

Set the `size` property to configure the button size (you can also set the CSS style `height` to define the button height more precisely).

```html preview
<s-split-button size="extra-small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="small"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="medium"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>

<s-split-button size="extra-large"> 
  <s-icon name="star" slot="start"></s-icon>
  button
</s-split-button>
```

---

## Attributes

| Name     | Type                                           | Default | Sync | Description |
| -------- | ---------------------------------------------- | ------- | ---- | ----------- |
| variant  | filled, elevated, tonal, outlined              | filled  | √    | Variant     |
| size     | small, extra-small, medium, large, extra-large | small   | √    | 尺寸        |
| disabled | boolean                                        | false   | √    | Disabled    |
| checked  | boolean                                        | false   | √    | checked     |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                                |
| ------ | --------- | ------ | ---------- | ------------------------------------------ |
| toggle | Event     | ×      | ×          | Emitted after the toggle button is clicked |

## Slot

| Name        | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| Anonymous   | Button text                                                               |
| start       | Start, supports svg, s-icon, s-loading, s-spinner by default              |
| end         | End, supports svg, s-icon, s-loading, s-spinner by default                |
| toggle      | Toggle button content                                                     |
| toggle-icon | Toggle button icon, supports svg, s-icon, s-loading, s-spinner by default |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.

## Dependencies

When this component is introduced, the following components will be automatically imported:

- [Ripple](./ripple.md)
