# vue3-cli-photo-wall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
vue3-cli-photo-wall
├─ .browserslistrc
├─ .editorconfig
├─ .eslintrc.js
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc
├─ babel.config.js
├─ commitlint.config.js
├─ jsconfig.json
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  └─ views
│     ├─ AboutView.vue
│     └─ HomeView.vue
└─ vue.config.js

```

## 响应式网格布局

### 当前最主流的响应式方案

**1. CSS Grid `auto-fit` + `minmax()`（推荐）**
这是目前最优雅的响应式网格方案，无需 JavaScript 监听 resize 事件。

**2. Tailwind CSS 响应式类**
使用 `sm:`、`md:`、`lg:` 等前缀实现响应式。

**3. CSS 媒体查询**
传统方案，通过 `@media` 断点控制不同屏幕尺寸的样式。

**4. CSS Container Queries（新规范）**
最新的容器查询规范，可以根据父容器大小响应。

### 实现方案

我使用了 **CSS Grid + 媒体查询** 的组合方案：

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  max-width: 1400px;
}
```

**工作原理**：
- `auto-fit`：自动填充列数，创建尽可能多的列
- `minmax(260px, 1fr)`：每列最小 260px，最大均分剩余空间
- 当窗口变小时，列数自动减少

### 断点设置

| 屏幕宽度 | 列数 | 标题字号 |
|---------|------|---------|
| > 1200px | 4-5列 | 56px |
| 992-1200px | 3-4列 | 56px |
| 768-992px | 2-3列 | 56px |
| 480-768px | 2列 | 36px |
| < 480px | 1列 | 28px |

### 额外优化

- 标签列表添加了 `flex-wrap: wrap` 支持换行
- 卡片列表设置了 `max-width` 防止在超大屏幕上过度拉伸