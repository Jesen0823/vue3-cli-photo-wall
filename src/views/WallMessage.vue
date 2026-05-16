<template>
  <div class="wall-message">
    <p class="title">{{ wllTitleType[id].name }}</p>
    <p class="slogan">{{ wllTitleType[id].slogan }}</p>
    <div class="label-list">
      <template v-for="(item, index) in categorys[id]" :key="item">
        <p
          :class="sIndex === index ? 'slabel' : 'label'"
          @click="changeTab(index)"
        >
          {{ item }}
        </p>
      </template>
    </div>
    <div class="card-list">
      <template v-for="item in noteList" :key="item.id">
        <note-card class="grid-item" :note="item"></note-card>
      </template>
    </div>
    <div
      class="addBtn"
      @click="openModal"
      :style="{
        bottom: addButtom + 'px'
      }"
    >
      <DocumentAdd style="width: 28px; height: 28px" class="icon" />
    </div>
    <editor-modal
      :title="modalTitle"
      :visible="isModalVisible"
      @close-event="handleModalClose"
    ></editor-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import { wllTitleType, categorys } from '@/utils/data'
import { noteList as mockNoteList } from '@/../mock/index.js'
import { DocumentAdd } from '@element-plus/icons-vue'
import EditorModal from '@/components/EditorModal.vue'

const id = ref(0)
const sIndex = ref(0)
const noteList = ref(mockNoteList.data || [])
const addButtom = ref(30)
const modalTitle = ref('写评论')
const isModalVisible = ref(false)

let animationFrameId = null

const changeTab = (index) => {
  sIndex.value = index
}

const openModal = () => {
  isModalVisible.value = true
}

const handleModalClose = () => {
  isModalVisible.value = false
}

const scrollEvent = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight

    if (scrollTop + clientHeight + 260 >= scrollHeight) {
      addButtom.value = scrollTop + clientHeight + 260 - scrollHeight
    } else {
      addButtom.value = 28
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', scrollEvent, true)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollEvent, true)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style lang="less" scoped>
.wall-message {
  width: 100%;
  min-height: 700px;
  padding-top: 52px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .title {
    padding-top: 48px;
    padding-bottom: 8px;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }

  .slogan {
    color: @gray-2;
    text-align: center;
  }

  .label-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 40px;
  }

  .label {
    padding: 0px 14px;
    line-height: 28px;
    color: @gray-2;
    cursor: pointer;
  }

  .slabel {
    padding: 0px 14px;
    line-height: 28px;
    color: @gray-2;
    border: 1px solid rgba(32, 32, 32, 1);
    border-radius: 14px;
    cursor: pointer;
  }

  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-top: 30px;
    width: 100%;
    max-width: 1400px;
    padding: 10px 20px 48px;
    box-sizing: border-box;
  }

  .grid-item {
    width: 100%;
  }

  .addBtn {
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: fade(@gray-2, 88%);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 28px;
    transition: all 0.2s ease;
    cursor: pointer;
    z-index: 100;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
    }

    .icon {
      color: @gray-10;
    }
  }
}

@media (max-width: 1200px) {
  .card-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    max-width: 1100px;
  }
}

@media (max-width: 992px) {
  .card-list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
    padding-top: 32px;
  }

  .card-list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
    padding: 0 16px 48px;
    max-width: 100%;
  }

  .addBtn {
    width: 48px;
    height: 48px;
    right: 16px;
    bottom: 24px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
  }

  .card-list {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 12px 48px;
  }
}
</style>
