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


您的理解完全正确！Vue 的 **Composition API（composable）** 和 React 的 **自定义 Hooks** 在设计理念和使用方式上确实非常相似，但也存在一些关键区别。下面从多个角度详细对比：

## Vue 的 **Composition API（composable）** 和 React 的 **自定义 Hooks** 在设计理念和使用方式

### 1. **设计理念一致：逻辑复用**
两者的核心目的都是为了**提取组件中的可复用逻辑**，避免重复代码。

**React 自定义 Hooks 示例**：
```javascript
// useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}
```

**Vue Composable 示例**：
```javascript
// useFetch.js
import { ref, onMounted } from 'vue';

function useFetch(url) {
  const data = ref(null);
  const loading = ref(true);
  
  onMounted(() => {
    fetch(url)
      .then(res => res.json())
      .then(result => {
        data.value = result;
        loading.value = false;
      });
  });
  
  return { data, loading };
}
```

### 2. **使用方式相似**
都通过函数调用在组件中引入逻辑：

**React 组件中使用**：
```jsx
function MyComponent() {
  const { data, loading } = useFetch('/api/data');
  // ...
}
```

**Vue 组件中使用**：
```javascript
import { useFetch } from '@/composables/useFetch';

function MyComponent() {
  const { data, loading } = useFetch('/api/data');
  // ...
}
```

### 3. **都依赖框架的响应式系统**
两者都必须在组件上下文中调用，依赖各自框架的响应式机制（React 的 `useState`/`useEffect` vs Vue 的 `ref`/`onMounted`）。

---

## Vue 的 **Composition API（composable）** 和 React 的 **自定义 Hooks**

| 维度 | React 自定义 Hooks | Vue Composables |
|------|-------------------|-----------------|
| **调用时机** | 必须在组件顶层调用，遵循 Hooks 规则 | 可在组件任意位置调用（建议在 `setup()` 中） |
| **响应式实现** | 通过闭包和 `useState`/`useReducer` 实现 | 通过 `ref`/`reactive` 的 Proxy 代理实现 |
| **生命周期** | 依赖 `useEffect`/`useLayoutEffect` 模拟 | 提供专用的生命周期钩子（`onMounted`/`onUnmounted` 等） |
| **数据更新** | 通过 `setState` 触发重新渲染 | 自动响应式追踪，修改 `.value` 即可 |
| **类型推断** | TypeScript 支持较好 | TypeScript 支持更完善（Vue 3.4+） |
| **逻辑边界** | 通过闭包隔离，每次调用创建独立副本 | 通过响应式系统隔离，天然支持跨组件共享 |

### 关键差异详解

#### 1. **响应式机制差异**

**React Hooks**：基于闭包实现，每次渲染都会重新执行函数体，依赖 `useState` 返回的 setter 来触发更新。

```javascript
// React - 需要显式调用 setCount
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

**Vue Composables**：基于 ES6 Proxy 实现，直接修改 `ref.value` 即可触发响应式更新。

```javascript
// Vue - 直接修改 .value 即可
import { ref } from 'vue';

function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  return { count, increment };
}
```

#### 2. **生命周期处理**

**React**：需要在 `useEffect` 中手动管理副作用：
```javascript
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer); // 清理函数
}, []);
```

**Vue**：提供专用的生命周期钩子，更直观：
```javascript
onMounted(() => {
  const timer = setInterval(...);
  onUnmounted(() => clearInterval(timer));
});
```

#### 3. **调用规则**

**React Hooks** 必须遵循严格的调用规则：
- 只能在组件顶层调用
- 不能在循环、条件语句中调用
- 必须按顺序调用

**Vue Composables** 则更加灵活：
- 可以在任意位置调用
- 可以有条件地调用
- 没有严格的顺序要求

---

## 三、项目中的应用建议

提取 composable 是一个很好的实践：

### 推荐方案：抽取 `useWall.js`

```javascript
// src/composables/useWall.js
import { ref } from 'vue';
import request from '@/utils/request'; // 假设您有封装的请求工具

export function useWall() {
  const loading = ref(false);
  const error = ref(null);

  const insertWall = async (data) => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await request.post('/insertWall', data);
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getWallList = async (params) => {
    // 其他墙相关的 API 调用...
  };

  return {
    loading,
    error,
    insertWall,
    getWallList
  };
}
```

### 在 `WallMessage.vue` 中使用

```javascript
import { useWall } from '@/composables/useWall';

const { loading, error, insertWall } = useWall();

const handleNewWall = async (data) => {
  try {
    const result = await insertWall(data);
    noteList.value.unshift(data); // 更新列表
    handleModalClose(); // 关闭弹窗
  } catch (err) {
    console.error('提交失败:', error.value);
    // 可以显示错误提示给用户
  }
};
```

---

## 四、总结

| 对比项 | React Hooks | Vue Composables |
|--------|-------------|-----------------|
| **本质** | 基于闭包的状态管理模式 | 基于 Proxy 的响应式组合函数 |
| **复用性** | 高 | 高 |
| **灵活性** | 受 Hooks 规则限制 | 更灵活自由 |
| **学习曲线** | 需要理解闭包和渲染机制 | 需要理解响应式原理 |
| **在您项目中的价值** | - | ✅ 推荐使用，符合 Vue 3 最佳实践 |
