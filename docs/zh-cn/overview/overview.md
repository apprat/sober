# 概述

**Sober** ([如何发音？](/audio/sober.mp3)) 是基于 [Material 3 Expressive](https://m3.material.io) 设计体系的 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components) UI 组件库，适合需要同时适配三端（桌面、平板、移动端）的网站。

- **自适应**：无需任何配置，所有组件均自动响应桌面、平板、移动端等不同设备。
- **跨框架**：兼容所有前端框架或后端渲染。
- **零依赖**：不依赖任何第三方库，体积极小。
- **多语言**：支持所有语言（取决于浏览器支持的语言数量）。
- **TypeScript**：提供完整的类型定义文件。
- **与其他库同时使用**：非侵入性设计，可以和任何 UI 库一起使用。
- **自定义样式**：所有组件均支持完全自定义样式。

## NPM 安装

如果你使用 **Webpack**、**Vite** 等构建工具，我们更推荐你使用 **npm** 包安装方式、或者 **pnpm** 等安装方式。

```shell
npm i sober
```

### 完全引入

```js
import 'sober'
```

### 按需引入示例

```js
import 'sober/button'
import 'sober/checkbox'
```

> 如果你希望按需引入，请查看[按需引入](/overview/on-demand-import.md)详细文档。

## 直接在浏览器中使用

该方式会引入所有打包压缩过的组件，并且创建全局变量 `sober` 可供调用。

```html
<script src="https://unpkg.com/sober/dist/sober.min.js"></script>
```

或者使用在浏览器 **ES Module** 方式引入，该方式和 **npm** 使用方式一致。

```html
<script type="module">
  import 'https://unpkg.com/sober/dist/main.js'
</script>
```

<s-button v-on:click="$router.push('/components')">安装完毕，现在开始</s-button>

---

### 社区

- QQ交流群 [315014446](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=FnDFafEZBleaRTVni5WW428we-q6P038&authKey=j6gtmWnQqNLd%2FonmfMhRG99Zk9Dy1yfOrYe7Ln7rDLdx5Y0%2FgP5ERhLgSbrxU07I&noverify=0&group_code=315014446)

### 开源许可

**Sober** 使用 [MIT license](https://github.com/unreal-space/sober/blob/main/LICENSE) 许可证书。
