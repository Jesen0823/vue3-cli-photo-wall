# TopBar 组件修复计划

## 问题分析

通过检查 [TopBar.vue](file:///f:\Vue\vue_projects\vue3-cli-photo-wall\src\components\TopBar.vue) 文件，发现了以下布局问题：

1. **Logo 没有在左边**：`.top-bar` 使用了 `justify-content: center`，导致所有内容都居中显示
2. **Menu 内容漂浮在外部**：`.menu` 缺少 flex 布局样式
3. **User 内容没有正常展示**：
   - `.user-head` 有拼写错误：`widows: 36px` 应该是 `width: 36px`
   - 缺少必要的样式设置

## 修复方案

### 需要修改的文件
- [TopBar.vue](file:///f:\Vue\vue_projects\vue3-cli-photo-wall\src\components\TopBar.vue)

### 具体修改步骤

1. **调整 `.top-bar` 的 flex 布局**
   - 将 `justify-content: center` 改为 `justify-content: space-between`
   - 这样可以让 logo 居左，menu 居中，user 居右

2. **为 `.menu` 添加 flex 布局样式**
   - 添加 `display: flex`
   - 添加 `align-items: center`
   - 设置合适的间距

3. **修复 `.user-head` 的问题**
   - 修正 `widows: 36px` 为 `width: 36px`
   - 为 `.user` 添加 flex 布局样式
   - 确保 user 头像正常显示

## 预期效果

修复后，TopBar 组件将实现：
- Logo 在左侧显示
- Menu 在中间水平排列
- User 头像在右侧正常显示
- 所有内容都在顶部栏内部，不会漂浮到外部