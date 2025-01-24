# 更新日志

#### 1.0.6 (2025-01-20)

- 添加：对 Solidjs 的 JSX Typescript 类型支持。
- 新增：Field 新增 `--field-padding-top`、`--field-padding-bottom`、`--field-padding-left`、`--field-padding-right` 私有CSS变量。
- 新增：TextField 组件新增 `--text-field-padding-top`、`--text-field-padding-bottom`、`--text-field-padding-left`、`--text-field-padding-right` 私有CSS变量。
- 修复: [#33](https://github.com/apprat/sober/issues/33)

#### 1.0.4 (2025-01-07)

- 更新编译方式，体积减少。

#### 1.0.1 (2025-01-01)

- 新增：Page 组件 `toggle()` 方法返回值新增为 `Promise<Animation | void>` 以便于监听变更完成和动画完成。
- 修复：Picker、MenuItem、PopMenuItem 组件 `start`、`end` 插槽始终被设置颜色的问题。

#### 1.0.0 (2024-12-30)

- 这是 v1.0.0 的第一个版本，它的意义是稳定 api 并作为长期支持版本。
- 新增：Tooltip `align` 属性新增 `left` 和 `right` 对齐方式。

#### 0.8.0 (2024-12-25)

- 更新：BottomSheet、Dialog、Picker、Popup、Snackbar、Tooltip 组件支持 **top-layer** 渲染，显示时始终处于顶层，不再受父级和层级影响。
- 新增：BottomSheet、Dialog、组件新增 `showed` 属性，用于控制显隐。
- 新增：Divider 组件新增匿名插槽。
- 新增：FAB 组件新增 `disabled` 属性，用于设置禁用。
- 新增：Tooltip 组件新增 `align` 属性，用于设置默认对齐方式。
- 变更：BottomSheet、Dialog、组件 `dismiss` 和 `dismissed` 事件名称变更为 `close` 和 `closed`。
- 变更：Drawer、Picker、Popup 组件 `dismiss()` 方法名称变更为 `close()`。
- 变更：Field 组件 `view` 插槽变更为匿名插槽，`labelFixed` 属性变更为 `fixed`。
- 变更：Icon 组件 `type` 属性变更为 `name`。
- 变更：Popup 组件 `show()`、`toggle()` 方法参数发生了变更。
- 移除：BottomSheet、Dialog、组件移除 `show()`、`dismiss()`、`toggle()` 方法。

#### 0.7.2 (2024-12-02)

- 修复：TextField 在 Edge 浏览器中显示清除按钮和密码显示按钮。
- 新增：Page 组件新增 `change` 事件，在模式改变时触发，新增 `isDark` 只读属性，返回是否为暗色模式。

#### 0.7.1 (2024-11-30)

- 修复：Carousel 高度问题已修复，现在它会根据宽度自适应高度。
- 支持：Icon 的 src 属性支持加载其他类型图像。
- 新增：FAB 新增 `hidden` 属性，用于隐藏 FAB。

#### 0.7.0 (2024-11-28)

- 修改：Snackbar 的静态方法 `show` 变更为 `builder`。
- 修改：BottomSheet 的静态方法 `show` 变更为 `builder`。
- 修改：Dialog 的静态方法 `show` 变更为 `builder`。
- 重写：Carousel 进行了重写，现在它有全新的属性和外观。
- 新增：Icon 新增 `src` 属性和相关事件，用于加载 svg 图标。
- 修复：修复 Table 宽度问题，Table 现在默认支持滚动。