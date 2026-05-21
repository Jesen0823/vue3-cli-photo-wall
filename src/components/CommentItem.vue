<template>
  <div class="cmt-item">
    <div
      class="head"
      :style="{ background: avatorList[index % avatorList.length] }"
    ></div>
    <div class="item-node">
      <div class="info">
        <p class="u-name">{{ comment.name }}</p>
        <p class="time">{{ comment.moment }}</p>
      </div>
      <div class="cmt">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { avatorList } from '@/utils/data'
import { defineProps } from 'vue'
defineProps({
  comment: {
    type: Object,
    default: undefined
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="less" scoped>
.cmt-item {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .head {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .item-node {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    flex: 1;
    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      .u-name {
        font-weight: 600;
        font-size: 14px;
        color: @gray-1;
      }
      .time {
        font-size: 12px;
        padding-left: 12px;
        color: @gray-2;
      }
    }
    .cmt {
      font-size: 14px;
      color: @gray-1;
      line-height: 1.5;
      margin-top: 6px;
      text-align: left;
    }
  }
}
</style>
