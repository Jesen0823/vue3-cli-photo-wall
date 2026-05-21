<template>
  <div class="wall-message">
    <p class="title">{{ wllTitleType[tabId].name }}</p>
    <p class="slogan">{{ wllTitleType[tabId].slogan }}</p>
    <div class="label-list">
      <template v-for="(item, index) in categorys[tabId]" :key="item">
        <p
          :class="sIndex === index ? 'slabel' : 'label'"
          @click="changeCategory(index)"
        >
          {{ item }}
        </p>
      </template>
    </div>
    <!-- 日记列表 -->
    <div class="journal-list" v-show="tabId === 0">
      <template v-for="(item, index) in noteList" :key="item.id">
        <note-card
          :class="[
            'grid-item',
            { 'grid-item-selected': selectedCardIndex === index }
          ]"
          :note="item"
          @click="openDetailModal(item, index)"
        ></note-card>
      </template>
    </div>
    <!-- 照片列表 -->
    <div class="photo-list" v-show="tabId === 1">
      <template v-for="(item, index) in photoList" :key="item.id">
        <PhotoCard
          :class="[
            'grid-item',
            { 'grid-item-selected': selectedCardIndex === index }
          ]"
          :photo="item"
          @click="openDetailModal(item, index)"
        ></PhotoCard>
      </template>
    </div>
    <div
      v-if="!isModalVisible"
      class="addBtn"
      @click="openCreateModal"
      :style="{
        bottom: addBottom + 'px'
      }"
    >
      <DocumentAdd style="width: 28px; height: 28px" class="icon" />
    </div>
    <editor-modal
      :title="modalTitle"
      :visible="isModalVisible"
      @close-event="handleModalClose"
    >
      <template #create="{ close }">
        <EdittingCard v-if="modalMode === 'create'" :id="id" :close="close" />
      </template>
      <template #detail="{ close }">
        <CardDetail
          v-if="modalMode === 'detail'"
          :id="id"
          :close="close"
          :objData="selectedCardData"
        />
      </template>
    </editor-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import { wllTitleType, categorys } from '@/utils/data'
import {
  noteList as mockNoteList,
  photoList as mockPhotoList
} from '@/../mock/index.js'
import { DocumentAdd } from '@element-plus/icons-vue'
import EditorModal from '@/components/EditorModal.vue'
import EdittingCard from '@/components/EdittingCard.vue'
import CardDetail from '@/components/CardDetail.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(0)
const sIndex = ref(0)
const noteList = ref(mockNoteList.data || [])
const photoList = mockPhotoList.data
const addBottom = ref(30)
const modalTitle = ref('新建卡片')
const isModalVisible = ref(false)
const selectedCardIndex = ref(-1)
const modalMode = ref('create') // 'create' | 'detail'
const selectedCardData = ref(null)

let animationFrameId = null

const changeCategory = (index) => {
  sIndex.value = index
}

const openCreateModal = () => {
  modalMode.value = 'create'
  selectedCardData.value = null
  selectedCardIndex.value = -1
  modalTitle.value = '新建卡片'
  isModalVisible.value = true
}

const openDetailModal = (cardData, index) => {
  modalMode.value = 'detail'
  selectedCardData.value = cardData
  selectedCardIndex.value = index
  modalTitle.value = '卡片详情'
  isModalVisible.value = true
}

const tabId = computed(() => {
  return parseInt(route.query.id || '0', 10)
})

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
      addBottom.value = scrollTop + clientHeight + 260 - scrollHeight
    } else {
      addBottom.value = 28
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
    font-family: 'JiaaizaoFont';
    padding-top: 48px;
    padding-bottom: 8px;
    font-size: 56px;
    color: @primary-color;
    box-shadow: rgba(255, 255, 255, 0.3);
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

  .journal-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-top: 30px;
    width: 100%;
    max-width: 1400px;
    padding: 10px 20px 48px;
    box-sizing: border-box;
  }

  .photo-list {
    columns: 5;
    column-gap: 12px;
    margin-top: 30px;
    width: 100%;
    max-width: 1400px;
    padding: 10px 20px 48px;
    box-sizing: border-box;
  }

  .grid-item {
    width: 100%;
    break-inside: avoid;
    margin-bottom: 12px;
  }

  .grid-item-selected {
    width: 100%;
    border: 2px solid @primary-color;
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
