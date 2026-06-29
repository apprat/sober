# Ripple

You can add this component to any element to add a ripple effect, but please note that you must set the CSS `position` of the parent or ancestor element to something other than `static`, as it relies on `position` for positioning.

```html preview
<div style="position: relative; height: 100px;border: solid 1px #ddd">
  <s-ripple></s-ripple>
</div>
```

## Delay

Using the `delay` attribute, you can define a delay time in milliseconds (only effective on touchscreen devices). If the touchscreen is scrolled within this delay time, the animation will be canceled.

```html preview
<div style="position: relative; height: 100px;border: solid 1px #ddd">
  <s-ripple delay="200"></s-ripple>
</div>
```

Users are likely to scroll the page when touching the screen, rather than triggering click events. This makes the ripple animation appear abrupt when triggered by touch. Therefore, you can define `--s-ripple-delay` on scrollable elements to set the delay time for all ripples.

```html
<div style="overflow: auto; --s-ripple-delay: 50;">
  <s-ripple></s-ripple>
  <s-ripple></s-ripple>
  <s-ripple></s-ripple>
</div>
```

All other components that depend on this component can use this method to set the delay, such as the `s-button` component.

---

## Attributes

| Name          | Type    | Default | Sync | Description                                                                                                                                                                                                                    |
| ------------- | ------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| disabled      | boolean | false   | √    | Disables ripples                                                                                                                                                                                                               |
| disabledHover | boolean | false   | √    | Disables hovering                                                                                                                                                                                                              |
| parentDepth   | number  | -1      | ×    | Parent depth, this attribute sets the level at which triggering occurs within the ancestor elements. If the component is inserted as a slot within another component, it will search for the ancestor elements within the slot |
| delay         | number  | 0       | √    | Delay time, in milliseconds                                                                                                                                                                                                    |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                              |
| ------ | --------- | ------ | ---------- | ---------------------------------------- |
| open   | Event     | ×      | ×          | Emitted when the ripple is opened        |
| close  | Event     | ×      | ×          | Emitted when the ripple is closed.       |
| opened | Event     | ×      | ×          | Emitted when the ripple is fully opened. |
| closed | Event     | ×      | ×          | Emitted when the ripple is closed.       |

## HTML tag attributes

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| pressed | Set when pressed (set on container)                |
| hover   | Set when the mouse moves in (set on the container) |

## Style variables

| Name                      | Description                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| --s-ripple-disabled       | This CSS variable is consistent with the `disabled` attribute, but the difference is that this variable has higher priority.         |
| --s-ripple-disabled-hover | This CSS variable is consistent with the `disabled-hover` property, with the difference being that this variable has higher priority |
| --s-ripple-delay          | This CSS variable is consistent with the `delay` property, but the difference is that this variable has higher priority.             |
| --s-ripple-opacity        | Ripple opacity, default is 0.1                                                                                                       |
| --s-ripple-color          | Ripple color, defaults to the color specified by `color`                                                                             |
| --s-ripple-hover-opacity  | Hover opacity, default is 0.08                                                                                                       |
