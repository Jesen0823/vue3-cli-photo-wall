<template>
  <div v-if="show" class="state-no-more">
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '没有更多了~'
  }
})
</script>

<style lang="less" scoped>
.state-no-more {
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;

  p {
    font-size: 16px;
    color: @gray-3;
    margin: 0;
  }
}
</style>
