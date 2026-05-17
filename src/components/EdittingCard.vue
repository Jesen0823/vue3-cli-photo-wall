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
          class="label-e"
          :style="{
            background: index === selectedLabel ? '#3b73f0' : '#ebebeb',
            color: index === selectedLabel ? '#fff' : '#202020'
          }"
        >
          {{ e }}
        </p>
      </div>
    </div>
    <div class="text-info">
      <h4 class="title">免责声明</h4>
      <p class="info">
        相册日记，主要用来分享日记，记录故事与日常。请勿上传有违反国家法律规定的内容，勿要上传以下内容，一经发现，立刻封号处理。<br />
        <br />
        1、反对宪法所确定的基本原则的； <br />
        2、危害国家安全泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
        3、损害国家荣誉和利益的；<br />
        4、煸动民族仇恨、民族歧视，破坏民族团结的；<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的，<br />
        7、散布淫移、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的<br />
        8、悔等或者他人，侵害他人合法权益的，<br />
        9、含有法律、行政法规禁止的其他内容的信息
      </p>
    </div>

    <div class="footer">
      <TitleButton class="footer-cancel" size="max" status="primary"
        >放弃</TitleButton
      >
      <TitleButton class="footer-submit" size="max" status="cprimary"
        >提交</TitleButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { categorys } from '@/utils/data'
import TitleButton from './TitleButton.vue'

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
        color: @gray-1;
        padding: 2px 10px;
        background: #ebebeb;
        border-radius: 20px;
        border: #ebebeb 1px solid;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .text-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 220px;
    overflow-y: auto;
    padding: 8px 0;
    padding-bottom: 80px;

    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 3px;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .info {
      font-size: 12px;
      color: @gray-2;
      margin: 0;
      line-height: 1.6;
    }
  }
  .footer {
    display: flex;
    width: calc(100% + 40px);
    position: fixed;
    padding: 12px 20px;
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: -20px;
    gap: 12px;
    bottom: 0;
    left: auto;
    right: 0;
    justify-content: stretch;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 100;
    box-sizing: border-box;
    max-width: 360px;
    border-radius: 0;
    box-shadow: none;

    .footer-submit,
    .footer-cancel {
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-submit {
      flex: 2;
    }
  }
}
</style>
