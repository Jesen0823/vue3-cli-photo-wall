<template>
  <div class="editting-card">
    <div class="color-panel">
      <RadioCircleGroup v-model="selectedValue" @change="handleColorSelect">
        <RadioCircleItem
          v-for="(item, index) in cardColor"
          :key="item"
          :value="index"
          :color="item"
        />
      </RadioCircleGroup>
    </div>
    <div class="card-main" :style="{ background: selectedColor }">
      <textarea
        class="tar"
        placeholder="请输入内容"
        v-model="inputMessage"
      ></textarea>
      <input class="uname" type="text" placeholder="昵称" v-model="inputName" />
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
      <TitleButton
        class="footer-cancel"
        size="max"
        status="primary"
        @click="close"
        >放弃</TitleButton
      >
      <TitleButton
        class="footer-submit"
        size="max"
        status="cprimary"
        @click="handleClickSubmit"
        >提交</TitleButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { categorys, cardColor } from '@/utils/data'
import TitleButton from './TitleButton.vue'
import { RadioCircleGroup, RadioCircleItem } from './radio-circle'

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: 0
  },
  close: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['submitNewWall'])

const selectedLabel = ref(0)
const selectedValue = ref(0)
const selectedColor = ref(cardColor[0])
const inputMessage = ref('')
const inputName = ref('')

const handleColorSelect = ({ value, color }) => {
  selectedColor.value = color
  selectedValue.value = value
}

const handleClickSubmit = () => {
  const saveData = {
    type: props.id,
    message: inputMessage.value,
    name: inputName.value,
    userId: '0',
    moment: new Date(),
    label: selectedLabel.value,
    color: selectedValue.value,
    imgUrl: ''
  }
  console.log('save new:', saveData)
  emit('submitNewWall', saveData)
}
</script>

<style lang="less" scoped>
.editting-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 72px);

  .color-panel {
    width: 100%;
    height: 48px;
    margin-top: 8px;
  }

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
        transition: all 0.15s ease;

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

    .info {
      font-size: 12px;
      color: @gray-2;
      margin: 0;
      line-height: 1.6;
    }
  }

  .footer {
    display: flex;
    margin-top: auto;
    padding: 12px 0;
    gap: 12px;
    justify-content: stretch;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 100;
    box-sizing: border-box;

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
