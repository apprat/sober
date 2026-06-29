# IconButton

Icon buttons help users perform operations with just one click.

```html preview
<s-icon-button> 
  <s-icon name="star"></s-icon>
</s-icon-button>

<s-icon-button>
  <!-- Use svg -->
  <svg viewBox="0 -960 960 960">
    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path>
  </svg>
</s-icon-button>

<s-icon-button> 
  <!-- Use other components -->
  <s-loading></s-loading>
</s-icon-button>

<s-icon-button> 
  <!-- Use other components -->
  <s-spinner indeterminate></s-spinner>
</s-icon-button>

<s-icon-button> 
  S
</s-icon-button>
```

## Variants

Set `variant` to configure different variants: `standard`, `filled`, `tonal`, `outlined`.

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

## Disable

Set `disabled` to disable the button.

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

## Checkbox

Set the `type` attribute to `checkbox`, and the button will allow selection. You can also set the `checked` attribute to enable default selection. When selected or deselected, the `change` event will be triggered.

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

## Dimensions

Set the `size` property to configure the button size (alternatively, you can set CSS styles such as `width` and `height` to define the button size more precisely).

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

## Width

Set the `width` property to configure a wider or narrower button, which is suitable for some wider or narrower icons.

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

## Corner marker

Use the `badge` component to set the corner label of the icon button.

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

## Form support

This component can be used as a form element, functioning as a checkbox, form reset, or submit button.

```html preview block
<form action="http://coolaf.com/tool/params" method="get">
  Select tags:
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
    <s-tooltip>Reset</s-tooltip>
  </s-icon-button>
  <s-icon-button type="submit" variant="filled">
    <s-icon name="done"></s-icon>
    <s-tooltip>Submit</s-tooltip>
  </s-icon-button>
</form>
```

---

## Attributes

| Name           | Type                                           | Default Value | Sync | Description                                                                                                                                     |
| -------------- | ---------------------------------------------- | ------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| variant        | standard, filled, tonal, outlined              | standard      | √    | Variant                                                                                                                                         |
| size           | extra-small, small, medium, large, extra-large | medium        | √    | Size                                                                                                                                            |
| width          | default, narrow, wide                          | default       | √    | Width, wide=relatively wide, narrow=relatively narrow                                                                                           |
| type           | icon-button, checkbox, reset, submit           | icon-button   | √    | Type, supports using the component as a checkbox, submit button, or reset button                                                                |
| disabled       | boolean                                        | false         | √    | Disabled                                                                                                                                        |
| checked        | boolean                                        | false         | √    | Checked                                                                                                                                         |
| defualtChecked | boolean                                        | false         | √    | Indicates whether the item is checked by default. This is the default value when the form is reset, and it only takes effect during form reset. |
| name           | string                                         | ''            | √    | Name, the `key` value when submitting the form                                                                                                  |
| value          | string                                         | ''            | ×    | Value, valid when submitting the form                                                                                                           |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                         |
| ------ | --------- | ------ | ---------- | ----------------------------------- |
| change | Event     | ×      | ×          | Emitted when the change is selected |

## Slot

| Name      | Description                                                 |
| --------- | ----------------------------------------------------------- |
| Anonymous | Icon, supports svg, s-icon, s-loading, s-spinner by default |

## HTML tag attributes

| Name    | Description                    |
| ------- | ------------------------------ |
| pressed | Set when pressed               |
| hover   | Set when the mouse hovers over |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.

## Dependency

- [Ripple](./ripple.md)
