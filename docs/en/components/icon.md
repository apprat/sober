# Icon

Icon is a container. For volume considerations, this component comes with some icons, and you can use the `name` attribute to specify an icon

```html preview
<s-icon name="home"></s-icon>
<s-icon name="add"></s-icon>
<s-icon name="search"></s-icon>
<s-icon name="menu"></s-icon>
<s-icon name="arrow_back"></s-icon>
<s-icon name="arrow_forward"></s-icon>
<s-icon name="arrow_upward"></s-icon>
<s-icon name="arrow_downward"></s-icon>
<s-icon name="arrow_drop_up"></s-icon>
<s-icon name="arrow_drop_down"></s-icon>
<s-icon name="arrow_drop_left"></s-icon>
<s-icon name="arrow_drop_right"></s-icon>
<s-icon name="more_vert"></s-icon>
<s-icon name="more_horiz"></s-icon>
<s-icon name="close"></s-icon>
<s-icon name="done"></s-icon>
<s-icon name="chevron_up"></s-icon>
<s-icon name="chevron_down"></s-icon>
<s-icon name="chevron_left"></s-icon>
<s-icon name="chevron_right"></s-icon>
<s-icon name="light_mode"></s-icon>
<s-icon name="dark_mode"></s-icon>
<s-icon name="star"></s-icon>
<s-icon name="favorite"></s-icon>
```

## Custom Icons

You can load an icon using `src`, or place an SVG icon inside.

```html preview
<s-icon src="/images/search.svg"></s-icon>

<s-icon>
  <svg viewBox="0 -960 960 960">
    <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path>
  </svg>
</s-icon>
```

## Usage in other components

If you use `svg`, you don't need to wrap it with a component, as other components support direct use of the `svg` slot;

```html preview
<s-icon-button>
  <svg viewBox="0 -960 960 960">
    <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path>
  </svg>
</s-icon-button>
```

## Custom Style

Set color and size

```html preview
<s-icon name="home" style="color: #336699; width: 48px;"></s-icon>
```

## Using third-party icon libraries

Using third-party icon libraries, such as `react-material-icon-svg`, is quite straightforward

```js
import CheckboxMarkedIcon from 'react-material-icon-svg/dist/CheckboxMarked'

function App() {
  return (
    <s-icon>
      <CheckboxMarkedIcon />
    </s-icon>
  )
}
```

---

## Attributes

| Name | Type   | Default Value | Synchronization | Description                                                      |
| ---- | ------ | ------------- | --------------- | ---------------------------------------------------------------- |
| name | string | none          | √               | Name                                                             |
| src  | string | ''            | ×               | Icon path, note that cross-domain is not possible when using svg |

## Event

| Name  | Parameter  | Bubble | Cancelable | Description                                      |
| ----- | ---------- | ------ | ---------- | ------------------------------------------------ |
| load  | Event      | ×      | ×          | Emitted when the icon setting src is successful. |
| error | ErrorEvent | ×      | ×          | Emitted when the icon setting src fails          |

## Slot

| Name      | Description |
| --------- | ----------- |
| Anonymous | svg icon    |
