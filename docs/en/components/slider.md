# Slider

The slider component allows users to select a value within a set range of numerical values. If you require a high degree of customization in terms of style, we recommend using the [BaseSlider](./base-slider.md) component.

```html preview
<s-slider></s-slider>
```

## Pattern

Set the `mode` property to configure different sliders; `reversed`: reverse slider, `range`: range slider.

```html preview
<s-slider mode="reversed" end="80"></s-slider>
<s-slider mode="range" end="80"></s-slider>
```

## Disable

Set `disabled` to disable the slider.

```html preview
<s-slider disabled></s-slider>
<s-slider disabled mode="range"></s-slider>
```

## Read-only

Setting the `readOnly` property will make the slider read-only.

```html preview
<s-slider readOnly></s-slider>
<s-slider readOnly mode="range"></s-slider>
```

## Display value

Setting the `showShow` property slider will display the current value.

```html preview
<s-slider showValue></s-slider>
<s-slider showValue mode="range"></s-slider>
```

Listen to the `formatvalue` event to format tag values.

```html preview
<s-slider mode="range" showValue onformatvalue="event.detail.format((v) => `No.${v}`)"></s-slider>
```

## Vertical

Setting the `orientation` property to `vertical` defines a vertical slider, which will be converted into an inline block element (no longer occupying a full line).

```html preview
<s-slider orientation="vertical" value="30"></s-slider>
<s-slider orientation="vertical" mode="reversed" value="30"></s-slider>
<s-slider orientation="vertical" mode="range"></s-slider>
```

## Interval

Set the `step` attribute to configure the interval of the slider, or use the `stepMarks` attribute to set the interval values (with higher priority).

```html preview
<s-slider step="10"></s-slider>
<s-slider stepMarks="50,60,70,80,90" end="50"></s-slider>
```

## Scale segmentation

Set `showDivisions` to display tick divisions.

```html preview
<s-slider showDivisions showValue step="10"></s-slider>
<s-slider showDivisions showValue step="10" mode="reversed"></s-slider>
<s-slider showDivisions showValue step="10" mode="range"></s-slider>
```

Set the `stepMarks` property to customize the interval values.

```html preview
<s-slider showDivisions showValue stepMarks="30,40,50,60" mode="range"></s-slider>
```

## Dimensions

Set `size` to change the slider size.

```html preview
<s-slider size="extra-small"></s-slider>
<s-slider size="small"></s-slider>
<s-slider size="medium"></s-slider>
<s-slider size="large"></s-slider>
<s-slider size="extra-large"></s-slider>
```

## Sliding mode

Set the `slidingMode` property to `all` or `all-cumulative`, and clicking anywhere on the slider will trigger sliding.

```html preview
<s-slider slidingMode="all"></s-slider>
<s-slider slidingMode="all-cumulative"></s-slider>
```

## Form support

This component can be used as a form element.

```html preview
<form action="http://coolaf.com/tool/params" method="get">
 Select tags:
 <s-slider name="tag" defaultEnd="50" mode="range"></s-slider>
 <hr>
 <s-button type="reset" variant="outlined"> Reset Form </s-button>
 <s-button type="submit"> Submit Results </s-button>
</form>
```

---

## Attributes

| Name                | Type                                           | Default     | Sync | Description                                                                                                                                                            |
| ------------------- | ---------------------------------------------- | ----------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size                | small, extra-small, medium, large, extra-large | extra-small | √    | 尺寸                                                                                                                                                                   |
| mode                | single, reversed, range                        | single      | √    | mode, single=single selection, reversed=reversed single selection, range=range selection                                                                               |
| slidingMode         | thumb, all, all-cumulative                     | thumb       | √    | Sliding mode, thumb=only indicator sliding, all=all sliding, all-cumulative=all sliding and cumulative value                                                           |
| orientation         | horizontal, vertical                           | horizontal  | √    | direction                                                                                                                                                              |
| disabled            | boolean                                        | false       | √    | Disabled                                                                                                                                                               |
| readOnly            | boolean                                        | false       | √    | Read-only                                                                                                                                                              |
| clickable           | boolean                                        | true        | √    | clickable                                                                                                                                                              |
| touchScrollPriority | boolean                                        | false       | √    | Touch screen scroll priority. When this attribute is enabled, scrolling will be prioritized on touch screen devices.                                                   |
| showValue           | boolean                                        | false       | √    | Display value. When this attribute is enabled, the slider will display the current value                                                                               |
| showDivisions       | boolean                                        | false       | √    | Whether to display tick divisions. When this attribute is enabled, the slider will display tick divisions, which can be used in conjunction with `step` or `stepMarks` |
| stepMarks           | string                                         | ''          | ×    | Step marks, separated by ,, for example: `20,30,50` (no need to provide maximum and minimum values), the slider will only switch between the marks                     |
| step                | number                                         | 1           | ×    | Step, please ensure it can be divided by (max - min)                                                                                                                   |
| min                 | number                                         | 0           | ×    | Minimum value                                                                                                                                                          |
| max                 | number                                         | 100         | ×    | maximum value                                                                                                                                                          |
| value               | number                                         | 50          | ×    | Current value (value of single slider)                                                                                                                                 |
| start               | number                                         | 0           | ×    | Start value (the start value for range selection when `mode=range`)                                                                                                    |
| end                 | number                                         | 50          | ×    | End value (the end value selected by `mode=range`)                                                                                                                     |
| name                | string                                         | ''          | √    | Name, the `key` value when submitting the form                                                                                                                         |
| defaultValue        | number                                         | 50          | ×    | Default value, the default value when the form is reset, only takes effect when the form is reset                                                                      |
| defaultStart        | number                                         | 0           | ×    | Default start value (only valid in `mode=range` mode), default value when the form is reset, only takes effect when the form is reset                                  |
| defaulttEnd         | number                                         | 0           | ×    | Default end value (only valid in `mode=range` mode), default value when the form is reset, only takes effect when the form is reset                                    |

## Event

| Name        | Parameter                                                                                 | Bubble | Cancelable | Description                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------ |
| input       | Event                                                                                     | ×      | ×          | Emitted when the value changes                                                                   |
| change      | Event                                                                                     | ×      | ×          | Emitted when the value changes and the focus is lost.                                            |
| formatvalue | CustomEvent<{ format: (fn: (value: number, type?: 'start' \| 'end') => string) => void }> | ×      | ×          | Emitted when formatting the value. You can format the `label` by calling `event.detail.format()` |

## CSS Style Variables

| Name                           | Description                |
| ------------------------------ | -------------------------- |
| --s-slider-size                | Slider size                |
| --s-slider-track-size          | Slider track size          |
| --s_slider-track-border-radius | slider track corner radius |
| --s-slider-thumb-size          | Slider thumb size          |

> Note: CSS variables are involved in the calculation of dimensions. You should prioritize using CSS variables to adjust component styles. If you directly use the ::part() selector to adjust dimensions, unless you know exactly what you are doing, there may be abnormalities in the dimension calculation.

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `⬆️⬇️⬅️➡️` keys to adjust values.
