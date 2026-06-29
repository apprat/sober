# Radio

Radio buttons allow users to select one option from a set of options. (A unique `name` needs to be set as a grouping to enable radio selection.).

```html preview
<s-radio name="group">Male</s-radio>
<s-radio name="group">Female</s-radio>
<s-radio name="group">Unknown</s-radio>
```

## Disable

Set the `disabled` attribute to disable the radio button.

```html preview
<s-radio disabled></s-radio>
<s-radio disabled checked></s-radio>
```

## Read-only

Set the `readOnly` property to make the checkbox read-only.

```html preview
<s-radio readOnly></s-radio>
<s-radio readOnly checked></s-radio>
```

When using the `v-model` syntax in the **Vue** framework, the `name` attribute can be omitted.

```vue preview
<template>
  <s-radio value="male" v-model.lazy="group" type="radio">Male</s-radio>
  <s-radio value="female" v-model.lazy="group" type="radio">Female</s-radio>
  <s-radio value="unknown" v-model.lazy="group" type="radio">Unknown</s-radio>
  Currently selected: {{ group }}
</template>
<script setup>
  import { ref } from 'vue'
  const group = ref('male')
</script>
```

## Custom Style

Customize icons and styles

```html preview
<s-radio name="group2">
  <s-icon name="star" slot="unchecked"></s-icon>
  <svg viewBox="0 -960 960 960" slot="checked">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></path>
  </svg>
</s-radio>
<s-radio name="group2" style="color: #009688" checked></s-radio>
<s-radio name="group2" style="color:rgb(212, 162, 35); height: 56px"></s-radio>
```

If you need to set the color before and after selection separately, you can use CSS selectors;

```vue preview
<style scoped>
  .radio{
    color: #336699;
  }
  .radio[checked]{
    color: #009688;
  }
</style>
<template>
  <s-radio class="radio" name="other">Other A</s-radio>
  <s-radio class="radio" name="other">Other B</s-radio>
</template>
```

## Form support

This component can be used as a form element.

```html preview
<form action="http://coolaf.com/tool/params" method="get">
  Select tags:
  <s-radio name="tag" value="java"> Java </s-radio>
  <s-radio name="tag" value="rust"> Rust </s-radio>
  <s-radio name="tag" value="python" defualtChecked checked> Python </s-radio>
  <hr>
  <s-button type="reset" variant="outlined"> Reset </s-button>
  <s-button type="submit"> Submit Results </s-button>
</form>
```

> Please note that if you use the `v-model.lazy` syntax sugar in `Vue`, you must explicitly set `type=radio` in the template.

---

## Attributes

| Name           | Type    | Default | Sync | Description                                       |
| -------------- | ------- | ------- | ---- | ------------------------------------------------- |
| readOnly       | boolean | false   | √    | Read-only                                         |
| disabled       | boolean | false   | √    | Disabled                                          |
| checked        | boolean | false   | √    | checked                                           |
| defualtChecked | boolean | false   | √    | default checked, default value when form is reset |
| value          | string  | ''      | ×    | Value, valid when submitting the form             |
| name           | string  | ''      | √    | Name, the `key` value when submitting the form    |

## Event

| Name   | Parameter | Bubble | Cancelable | Description                         |
| ------ | --------- | ------ | ---------- | ----------------------------------- |
| change | Event     | ×      | ×          | Emitted when the change is selected |

## Slot

| Name      | Description |
| --------- | ----------- |
| Anonymous | Text        |

## HTML tag attributes

| Name    | Description                 |
| ------- | --------------------------- |
| pressed | Set when pressed            |
| hover   | Set when the mouse moves in |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.
