<template>
  <div>卡片详情{{ id }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  id: {
    type: Number,
    required: true,
    default: 0
  },
  close: {
    type: Function,
    required: true
  },
  objData: {
    type: Object,
    default: undefined
  }
})
</script>

<style lang="scss" scoped></style>
