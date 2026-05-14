<template>
  <div class="icon-demo">
    <h2>Element Plus Icons 示例</h2>

    <!-- 直接使用图标组件 -->
    <div class="icon-group">
      <Search class="icon" />
      <Edit class="icon" />
      <Delete class="icon" />
      <Plus class="icon" />
      <User class="icon" />
    </div>

    <!-- 自定义颜色和大小 -->
    <div class="icon-group">
      <Search class="icon custom-color" :size="32" />
      <Edit class="icon" style="font-size: 24px; color: green" />
    </div>
  </div>
</template>

<script setup>
// 按需导入需要的图标
import { Search, Edit, Delete, Plus, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.icon-group {
  display: flex;
  gap: 16px;
  margin: 20px 0;
}

.icon {
  font-size: 20px;
  color: #3b73f0;
  cursor: pointer;
  transition: color 0.2s;
}

.icon:hover {
  color: #1e4cd1;
}

.custom-color {
  color: #f56c6c;
}
</style>
