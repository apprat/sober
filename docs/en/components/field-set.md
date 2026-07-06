# FieldSet

Field set, this component can be used as a container or form container.

```html preview
<s-field-set>
 <div slot="title">Wash Creek Sand·Who Thinks of the West Wind Alone When It's Cool? Only When It's Normal</div>
 <div>
 Who sings of the west wind alone bringing coolness, with rustling yellow leaves closing the sparse window, standing in contemplation of the past under the fading sun
 Don't let the wine disturb my deep spring sleep, gambling and book discussions can only waste the fragrance of tea. Back then, it was just an ordinary day
 </div>
</s-field-set>
```

Use slots.

```html preview
<s-field-set>
 <s-icon slot="start" name="star" style="margin-left: 8px"></s-icon>
 <div slot="title">Washing Stream Sand·Who Remembers the West Wind Alone is Cool</div>
 <div>
 Who sings of the west wind's solitary chill, as rustling yellow leaves close the sparse window, lost in thought over past events as the sun sets low
 Don't disturb my deep spring sleep with wine, and gambling over books can only waste the fragrance of tea. Back then, we thought it was just ordinary
 </div>
 <s-icon slot="end" name="star" style="margin-right: 8px"></s-icon>
</s-field-set>
```

Without a defined title, it is an ordinary container.

```html preview
<s-field-set>
 <div>
 Who can understand the coolness brought by the west wind alone? The rustling yellow leaves close the sparse window, and I stand under the fading sun, lost in thought of the past
 Don't let the wine disturb my deep spring sleep, gambling over books can only dissipate the fragrance of tea. Back then, it seemed just ordinary
 </div>
</s-field-set>
```

## Focus

Set the `focused` property to focus.

```html preview
<s-field-set focused>
 <div slot="title">Washing Stream Sand · Who Remembers the West Wind Alone is Cool</div>
 <div>
 "Washing Stream Sand · Who Remembers the West Wind Alone Feeling Cold"
 Who can feel the cool breeze of the west wind alone? The rustling yellow leaves close the sparse window, and I stand in the fading sun, pondering over the past
 Don't be disturbed by wine, for spring sleep is heavy. Gaming books can only dissipate the fragrance of spilled tea. Back then, it was just an ordinary day
 </div>
</s-field-set>
```

## Floating

Set `floating` to toggle to floating.

```html preview
<s-field-set floating>
 <div slot="title">Washing Stream Sand · Who Remembers the West Wind Blowing Alone</div>
</s-field-set>
<s-button onclick="this.previousElementSibling.floating=!this.previousElementSibling.floating"> Toggle </s-button>
```

## Custom Style

Customize border corners through CSS variables.

```vue preview
<style scoped>
 .field-set{
 --s-field-set-border-top-left-radius: 12px;
 --s-field-set-border-top-right-radius: 0px;
 --s-field-set-border-bottom-right-radius: 12px;
 --s-field-set-border-bottom-left-radius: 0px;
 }
</style>
<template>
 <s-field-set class="field-set">
 <div slot="title">Washing Stream Sand · Who Remembers the West Wind That Makes Me Feel Cold Alone</div>
 <div>
 Who can feel the coolness of the west wind alone? The rustling yellow leaves close the sparse window, and I stand in the fading sun, pondering over the past
 Don't disturb my deep spring sleep with wine, gambling and books can only waste the fragrance of tea. At that time, it seemed ordinary
 </div>
 </s-field-set>
</template>
```

---

## Attributes

| Name     | Type    | Default Value | Sync | Description |
| -------- | ------- | ------------- | ---- | ----------- |
| focused  | boolean | false         | √    | focused     |
| floating | boolean | false         | √    | Floating    |

## Slot

| Name      | Description    |
| --------- | -------------- |
| Anonymous | Custom content |
| title     | Title          |
| start     | Start          |
| end       | End            |

## CSS Style Variables

| Name                                     | Description                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| --s-field-set-title-gap                  | Title spacing                                                          |
| --s-field-set-padding                    | Internal padding, controls the top, bottom, left, and right directions |
| --s-field-set-padding-top                | Top internal padding                                                   |
| --s-field-set-padding-right              | Right inner padding                                                    |
| --s-field-set-padding-bottom             | Bottom inner padding                                                   |
| --s-field-set-padding-left               | Left inner padding                                                     |
| --s-field-set-border-width               | Border width                                                           |
| --s-field-set-border-focused-width       | Focused border width                                                   |
| --s-field-set-border-radius              | Rounded corners, controls four directions                              |
| --s-field-set-border-top-left-radius     | Top left corner rounded corner                                         |
| --s-field-set-border-top-right-radius    | Top right corner rounded corner                                        |
| --s-field-set-border-bottom-left-radius  | Bottom left corner radius                                              |
| --s-field-set-border-bottom-right-radius | Right bottom corner radius                                             |

> Note: CSS variables are involved in the calculation of dimensions. You should prioritize using CSS variables to adjust component styles. If you directly use the ::part() selector to adjust dimensions, unless you know exactly what you are doing, there may be abnormal dimension calculations.
