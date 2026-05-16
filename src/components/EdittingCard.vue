<template>
  <div class="editting-card">
    <div class="card-main" :style="{ background: props.sColor }">
      <textarea class="tar" placeholder="请输入内容"></textarea>
      <input class="uname" type="text" placeholder="昵称" />
    </div>
    <div class="label-list">
      <h4>选择标签</h4>
      <div class="list">
        <p
          v-for="(e, index) in categorys[props.id]"
          :key="index"
          @click="selectedLabel = index"
          :class="['label-e', { 'sel-label-e': index === selectedLabel }]"
        >
          {{ e }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { categorys } from '@/utils/data'

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: 0
  },
  sColorValue: {
    type: Number,
    default: 0
  },
  sColor: {
    type: String,
    default: ''
  }
})

const selectedLabel = ref(0)

console.log(props.sColorValue, props.sColor)
</script>

<style lang="less" scoped>
.editting-card {
  display: flex;
  flex-direction: column;
  width: 100%;

  .card-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    .tar {
      background: fade(@gray-2, 5%);
      width: 100%;
      height: 180px;
      border-radius: 8px;
      resize: none;
      box-sizing: border-box;
      font-size: 16px;
      border: none;
    }
    .uname {
      width: 100%;
      margin-top: 12px;
      margin-bottom: 8px;
      background: none;
      box-sizing: border-box;
      border: #fff 1px solid;
      line-height: 28px;
    }
  }

  .label-list {
    display: flex;
    flex-direction: column;
    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      .label-e {
        font-size: 14px;
        padding: 2px 10px;
        border-radius: 20px;
        border: #ebebeb 1px solid;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      }
      .sel-label-e {
        background: @primary-color;
        border-radius: 20px;
      }
    }
  }
}
</style>
