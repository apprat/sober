# FloatingActionButton

The Floating Action Button (FAB) assists users in performing primary actions.

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="secondary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tertiary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-primary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-secondary">
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-tertiary">
  <s-icon name="add"></s-icon>
</s-fab>
```

Use other components as slots.

```html preview
<s-fab>
  <s-loading></s-loading> <!-- [!code highlight] -->
</s-fab>
<s-fab>
  <s-spinner indeterminate></s-spinner> <!-- [!code highlight] -->
</s-fab>
```

## Disable

Set the `disabled` attribute to disable the button

```html preview
<s-fab disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="secondary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tertiary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-primary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-secondary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab variant="tonal-tertiary" disabled> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>
```

## Hidden

Set the `hidden` attribute to hide

```vue preview
<script setup>
  import { ref } from 'vue'

  const visible = ref(false)
</script>
<template>
  <s-fab :hidden="visible">
    <s-icon name="add"></s-icon>
  </s-fab>
  <s-button @click="visible=!visible">Toggle</s-button>
</template>
```

## Dimensions

Set the `size` property to change the button size.

```html preview
<s-fab>
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="medium"> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>

<s-fab size="large"> <!-- [!code highlight] -->
  <s-icon name="add"></s-icon>
</s-fab>
```

## Extension

Additional content can be added using text and `start` and `end` slots.

```html preview
<s-fab>
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
commit message
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>

<s-fab size="medium" variant="secondary">
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
commit message
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>

<s-fab size="large" variant="tertiary">
  <s-icon name="add" slot="start"></s-icon> <!-- [!code highlight] -->
commit message
  <s-icon name="done" slot="end"></s-icon> <!-- [!code highlight] -->
</s-fab>
```

---

## Attributes

| Name     | Type                                                                         | Default | Sync | Description |
| -------- | ---------------------------------------------------------------------------- | ------- | ---- | ----------- |
| variant  | primary, secondary, tertiary, tonal-primary, tonal-secondary, tonal-tertiary | primary | √    | Variant     |
| size     | small, medium, large                                                         | small   | √    | Size        |
| disabled | boolean                                                                      | false   | √    | Disabled    |
| hidden   | boolean                                                                      | false   | √    | Hidden      |

## Slot

| Name      | Description                                                  |
| --------- | ------------------------------------------------------------ |
| Anonymous | Button Text                                                  |
| start     | Start, supports svg, s-icon, s-loading, s-spinner by default |
| end       | End, supports svg, s-icon, s-loading, s-spinner by default   |

## HTML tag attributes

| Name    | Description                    |
| ------- | ------------------------------ |
| pressed | Set when pressed               |
| hover   | Set when the mouse hovers over |

## Keyboard Shortcuts

Use the `Tab` key to switch focus, and use the `Space` or `Enter` key to trigger a click event.

## Dependencies

When this component is introduced, the following components will be automatically imported:

- [Ripple](./ripple.md)
