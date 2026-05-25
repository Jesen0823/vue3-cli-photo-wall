## 事件冒泡机制

当点击卡片内部的图标按钮时，事件会向上冒泡到父组件，导致父组件的 `@click` 事件也被触发：

```
点击图标 → 冒泡到 NoteCard → 冒泡到父组件 WallMessage
```

## Vue 3 最权威的解决方案

### 方案一：使用 `.stop` 修饰符（推荐）

在子组件 `NoteCard.vue` 中为按钮的点击事件添加 `.stop` 修饰符：

```vue
<template>
  <div class="note-card">
    <h3>{{ note.title }}</h3>
    <p>{{ note.content }}</p>
    
    <!-- 点赞按钮：阻止事件冒泡 -->
    <button 
      class="action-btn"
      :class="{ liked: isLiked }"
      @click.stop="toggleLike"  <!-- ✅ 添加 .stop -->
    >
      <Like :size="16" />
    </button>
    
    <!-- 其他可能需要阻止冒泡的按钮 -->
    <button @click.stop="handleEdit">编辑</button>
    <button @click.stop="handleDelete">删除</button>
  </div>
</template>
```

**为什么推荐这种方式？**
- 在事件源头上阻止冒泡，符合单一职责原则
- 代码意图清晰，其他开发者一看就明白
- 符合 Vue 3 官方推荐的写法

---

### 方案二：在处理函数中调用 `stopPropagation()`

如果需要更复杂的逻辑控制：

```vue
<script setup>
const toggleLike = (event) => {
  event.stopPropagation()  // 阻止冒泡
  // 点赞逻辑
  isLiked.value = !isLiked.value
}
</script>
```

**适用场景**：
- 事件处理函数需要访问原生事件对象时
- 需要条件性阻止冒泡（如只在某种情况下阻止）

---

### 方案三：使用 `.self` 修饰符（适用于父组件）

在父组件 `WallMessage.vue` 中使用 `.self` 修饰符：

```vue
<note-card
  :note="item"
  @click.self="openDetailModal"  <!-- 只响应直接点击，不响应冒泡 -->
/>
```

**注意**：这只在点击卡片本身时触发，但问题在于：
- 事件仍然会从子元素冒泡到卡片元素
- `.self` 只检查 `event.target` 是否是当前元素
- 如果按钮在卡片内部，点击按钮时 `event.target` 是按钮，不会触发

**不推荐这种方式**，因为：
- `.self` 适用于整个卡片可点击的场景
- 但这里按钮本身不需要触发卡片详情

---

### 方案四：在 NoteCard 中声明 emits（Vue 3 最佳实践）

确保组件正确地发出事件，而不是依赖 DOM 事件冒泡：

```vue
<!-- NoteCard.vue -->
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['like', 'click'])

const toggleLike = (event) => {
  event.stopPropagation()  // 关键：阻止冒泡
  emit('like', { id: props.note.id })
}
</script>

<template>
  <div class="note-card">
    <div @click="emit('click', props.note)">  <!-- 卡片主体可点击 -->
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
    </div>
    
    <button @click.stop="toggleLike">
      <Like />
    </button>
  </div>
</template>
```

---

## 完整示例：NoteCard.vue

```vue
<template>
  <div class="note-card" @click="handleCardClick">
    <div class="card-content">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
    </div>
    
    <div class="card-actions">
      <button 
        class="action-btn"
        :class="{ liked: isLiked }"
        @click.stop="toggleLike"
      >
        <Like :size="16" />
        <span v-if="likeCount > 0">{{ likeCount }}</span>
      </button>
      
      <button 
        class="action-btn"
        @click.stop="handleShare"
      >
        <Share :size="16" />
      </button>
      
      <button 
        class="action-btn"
        @click.stop="handleMore"
      >
        <MoreHorizontal :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Like, Share, MoreHorizontal } from 'lucide-vue-next'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'like'])

const isLiked = ref(false)
const likeCount = ref(props.note.likeCount || 0)

const toggleLike = (event) => {
  event.stopPropagation()  // ✅ 阻止冒泡
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
  emit('like', { id: props.note.id, liked: isLiked.value })
}

const handleShare = (event) => {
  event.stopPropagation()
  // 分享逻辑
}

const handleMore = (event) => {
  event.stopPropagation()
  // 更多操作
}

const handleCardClick = () => {
  emit('click', props.note)
}
</script>

<style scoped>
.note-card {
  cursor: pointer;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  /* 按钮样式 */
}
</style>
```

---

## 父组件使用方式

```vue
<!-- WallMessage.vue -->
<template v-for="(item, index) in noteList" :key="item.id">
  <NoteCard
    :note="item"
    @click="openDetailModal(item)"
    @like="handleLike"
  />
</template>
```

---

## 总结对比

| 方案 | 推荐程度 | 适用场景 | 代码量 |
|------|---------|---------|--------|
| `.stop` 修饰符 | ⭐⭐⭐ 强烈推荐 | 按钮等独立交互元素 | 只需加 `.stop` |
| `stopPropagation()` | ⭐⭐ 推荐 | 需要访问事件对象 | 需添加参数 |
| `.self` 修饰符 | ⭐ 不推荐 | 整个元素可点击 | 可能不适用 |
| `defineEmits` | ⭐⭐ 推荐 | 规范化组件事件 | 需配置 |

**Vue 3 最权威的做法**：
> 在子组件中，使用 `.stop` 修饰符阻止按钮等独立交互元素的事件冒泡，这是 Vue 官方推荐的标准写法，符合关注点分离原则。