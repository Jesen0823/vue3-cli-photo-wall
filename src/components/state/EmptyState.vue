<template>
  <div v-if="show" class="state-empty">
    <img :src="icon || defaultIcon" :alt="text" />
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import defaultIcon from '@/assets/images/icon_blank.png'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '暂无数据'
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.state-empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  gap: 16px;

  img {
    width: 80px;
    height: 80px;
    opacity: 0.6;
  }

  p {
    font-size: 16px;
    color: @gray-3;
    margin: 0;
  }
}
</style>
