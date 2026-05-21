<template>
  <div class="card-detail">
    <div class="top-btn">
      <p class="top-des">该条日记有违社区规定？</p>
      <p class="top-report">去举报</p>
    </div>
    <NoteCard class="card" :note="objData"></NoteCard>
    <div class="form">
      <textarea class="tar" placeholder="请输入评论..."></textarea>
      <div class="form-bottom">
        <input class="uname" placeholder="输入签名" />
        <TitleButton class="sub" size="small" status="cprimary"
          >提交</TitleButton
        >
      </div>
    </div>
    <p class="cmt-title">评论 {{ objData.comment }}</p>

    <div class="cmt-list">
      <template v-for="(cmt, i) in mockCmtList.data" :key="cmt.id">
        <CommentItem :comment="cmt" :index="i"></CommentItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import NoteCard from './NoteCard.vue'
import TitleButton from './TitleButton.vue'
import { commentList as mockCmtList } from '@/../mock/index.js'
import CommentItem from './CommentItem.vue'

const props = defineProps({
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

<style lang="less" scoped>
.card-detail {
  width: 100%;
  display: flex;
  flex-direction: column;

  .top-btn {
    display: flex;
    flex-direction: row;
    padding: 8px 12px;
    align-content: center;
    cursor: pointer;

    .top-des {
      font-size: 14px;
    }

    .top-report {
      font-size: 14px;
      color: @warning-color;
    }
  }

  .card {
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .tar {
      width: 100%;
      height: 68px;
      border-radius: 4px;
      resize: none;
      margin-top: 8px;
      box-sizing: border-box;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.3);
    }
    .form-bottom {
      display: flex;
      width: 100%;
      margin-top: 12px;
      background: none;
      gap: 12px;
      margin-bottom: 12px;
      .uname {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.3);
      }
      .sub {
      }
    }
  }

  .cmt-title {
    font-weight: 600;
    padding: 12px 0;
  }

  .cmt-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
