# Page-View

如果你使用过 Android 的 `ViewPager` 组件，或者 Flutter 的 `PageView` 组件，那么 `Page-View` 组件应该不会陌生。  

```html preview
<s-page-view loop>
  <div style="background:rgb(73, 80, 87)">1</div>
  <div style="background:rgb(150, 97, 97)">2</div>
  <div style="background:rgb(54, 111, 32)">3</div>
  <div style="background:rgb(101, 71, 132)">4</div>
</s-page-view>
```

```html preview
<s-page-view onscrollchange="console.log(event)">
  <div style="background:rgb(73, 80, 87)">1</div>
  <div style="background:rgb(150, 97, 97)">2</div>
</s-page-view>
```
