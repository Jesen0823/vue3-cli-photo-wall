<template>
  <div class="state-display">
    <EmptyState :show="state === 'empty'" :text="emptyText" :icon="emptyIcon" />
    <LoadingState
      :show="state === 'loading'"
      :text="loadingText"
      :animationData="animationData"
    />
    <NoMoreState :show="state === 'noMore'" :text="noMoreText" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import EmptyState from './EmptyState.vue'
import LoadingState from './LoadingState.vue'
import NoMoreState from './NoMoreState.vue'

defineProps({
  state: {
    type: String,
    required: true,
    validator: (value) =>
      ['loading', 'empty', 'noMore', 'normal'].includes(value)
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  emptyIcon: {
    type: String,
    default: ''
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  noMoreText: {
    type: String,
    default: '没有更多了~'
  },
  animationData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.state-display {
  width: 100%;
}
</style>
