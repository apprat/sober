# Icon

Icon 是一个容器，直接使用它只会显示一个圆形图标。

```html preview
<s-icon></s-icon>
```

在内部放置 `svg` 图标，或者设置 `src` 属性加载一个图标（注意链接跨域情况下加载 `svg` 不支持定义颜色）。

```html preview
<s-icon>
  <svg viewBox="0 -960 960 960"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"></path></svg>
</s-icon>

<s-icon src="/images/search.svg"></s-icon>
```

## 字体图标

图标组件默认并不捆绑任何字体图标，你可以使用 `@font-face` 来引入字体图标，然后将 `s-icon` 作为图标的容器使用（注意这种方式需要你使用 `font-size` 来调整大小）。

```vue preview
<template>
  <s-icon>dentistry</s-icon>
  <s-icon fill style="font-size: 48px">dentistry</s-icon>
</template>
<style scoped>
  @font-face {
    font-family: 'Material Symbols Outlined';
    src: url(/fonts/icon-dentistry.woff2) format('woff2');
  }
  s-icon{
    width: 1em;
    font-family: 'Material Symbols Outlined';
    font-variation-settings: "FILL" 0;
  }
  s-icon[fill]{
    font-variation-settings: "FILL" 1;
  }
</style>
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

## 使用第三方图标库

使用第三方图标库非常简单，例如 `react-material-icon-svg`，使用组件包裹即可。

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

## 属性

| 名称 | 类型     | 默认值 | 同步 | 说明                              |
| ---- | -------- | ------ | ---- | --------------------------------- |
| src  | `string` | `''`   | ×    | 图标路径，注意使用 svg 时无法跨域 |

## 插槽

| 名称 | 说明                     |
| ---- | ------------------------ |
| 匿名 | `svg` 图标或字体图标文本 |
