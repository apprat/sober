# Icon

组件本身没有内置任何图标，直接使用它只会显示一个<s-icon></s-icon>图标，它的作用是承载一个 `svg` 图标、或者作为字体图标的容器。

```html preview
<s-icon></s-icon>
<s-icon>
  <svg viewBox="0 -960 960 960"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path></svg>
</s-icon>
<s-icon src="/images/search.svg"></s-icon>
```

## 图标库

我们推荐你使用 [**ms-icon**](/resources/ms-icon) 图标库，你可以在 [Material Symbols 图标](/resources/icons) 或者 [https://fonts.google.com/icons](https://fonts.google.com/icons) 中查看所有图标列表。

```vue preview
<script>
import 'ms-icon/home'
import 'ms-icon/home-fill'
import 'ms-icon/add'
</script>
<template>
  <ms-icon name="home" />
  <ms-icon name="home-fill" />
  <s-icon-button variant="outlined">
    <ms-icon name="add"></ms-icon>
  </s-icon-button>
</template>
```

你也可以使用字体图标。

```vue preview
<template>
  <s-icon>home</s-icon>
  <s-icon>star</s-icon>
  <s-icon>settings</s-icon>
  <s-icon>file_export</s-icon>
  <s-icon>mode_fan</s-icon>
  <s-icon fill>home</s-icon>
  <s-icon fill>star</s-icon>
  <s-icon fill>settings</s-icon>
  <s-icon fill>file_export</s-icon>
  <s-icon fill>mode_fan</s-icon>
</template>
<style scoped>
  @font-face {
    font-family: 'Material Symbols Outlined';
    src: url('ms-icon/outlined.woff2') format('woff2');
  }
  s-icon{
    width: 1em;
    font-family: 'Material Symbols Outlined';
    line-height: 1;
    letter-spacing: normal;
    white-space: nowrap;
    word-wrap: normal;
    vertical-align: middle;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  s-icon[fill]{
    font-variation-settings: "FILL" 1;
  }
</style>
```

如果你需要 Rounded(圆角) 和 Sharp(菱角) 风格图标，你也可以引入它们，但不推荐三种风格全部引入，体积较大。

```css
@font-face {
  font-family: 'Material Symbols Rounded';
  src: url('ms-icon/rounded.woff2') format('woff2');
}
@font-face {
  font-family: 'Material Symbols Sharp';
  src: url('ms-icon/sharp.woff2') format('woff2');
}
```

## 其他组件中使用

如果你使用了 `svg`，并且在其他组件中使用，你并不需要使用该组件去包装一层，所有组件都直接支持 `svg`

```html preview
<s-icon-button variant="outlined">
  <svg viewBox="0 -960 960 960">
    <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path>
  </svg>
</s-icon-button>
```

## 自定义样式

设置颜色和尺寸

```html preview
<s-icon name="home" style="color: #336699; width: 48px;">
  <svg viewBox="0 -960 960 960">
    <path d="M480-440Zm346-240q0-78-54-132t-132-54v-54q100 0 170 70t70 170h-54Zm-106 0q0-33-23.5-56.5T640-760v-54q55 0 93.5 39t40.5 95h-54ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240v80H395l-73 80H160v480h640v-440h80v440q0 33-23.5 56.5T800-120H160Zm320-140q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z"></path>
  </svg>
</s-icon>
```

---

## 属性

| 名称 | 类型     | 默认值 | 同步 | 说明                              |
| ---- | -------- | ------ | ---- | --------------------------------- |
| src  | `string` | `''`   | ×    | 图标路径，注意使用 svg 时无法跨域 |

## 插槽

| 名称 | 说明                     |
| ---- | ------------------------ |
| 匿名 | `svg` 图标或字体图标文本 |
