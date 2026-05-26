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
      <template v-for="(item, index) in currentList" :key="item.id">
        <note-card
          :class="[
            'grid-item',
            { 'grid-item-selected': selectedCardIndex === index }
          ]"
          :note="item"
          @click="openDetailModal(tabId, item, index)"
          @request-card-like="handleReqCardLike"
        />
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
          @click="openDetailModal(tabId, item, index)"
        />
      </template>
    </div>

    <!-- 状态展示 -->
    <StateDisplay
      :state="wallData.state.value"
      :emptyText="'暂无数据'"
      :loadingText="'加载中2...'"
      :noMoreText="'没有更多了~'"
      :animationData="loadingAnimation"
      v-if="wallData.state.value !== 'normal'"
    />

    <div
      v-if="!isModalVisible"
      class="addBtn"
      @click="openCreateModal"
      :style="{ bottom: addBottom + 'px' }"
    >
      <DocumentAdd style="width: 28px; height: 28px" class="icon" />
    </div>

    <editor-modal
      :title="modalTitle"
      :visible="isModalVisible"
      @close-event="handleModalClose"
    >
      <template #create="{ close }">
        <EdittingCard
          v-if="modalMode === 'create'"
          :tabId="tabId"
          :close="close"
          @submit-new-wall="handleNewWall"
        />
      </template>
      <template #detail="{ close }">
        <CardDetail
          v-if="modalMode === 'detail'"
          :id="tabId"
          :close="close"
          :objData="selectedCardData"
          @submit-new-cmt="handleNewCmt"
          @req-card-like="handleReqCardLike"
        />
      </template>
    </editor-modal>

    <PhotoViewer
      :visible="isViewerVisable"
      :photo="selectedCardData"
      :images="getImages()"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { DocumentAdd } from '@element-plus/icons-vue'
import { useWallData } from '@/composables/useWallData'
import { StateDisplay } from '@/components/state'
import NoteCard from '@/components/NoteCard.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import EditorModal from '@/components/EditorModal.vue'
import EdittingCard from '@/components/EdittingCard.vue'
import CardDetail from '@/components/CardDetail.vue'
import PhotoViewer from '@/components/PhotoViewer.vue'
import { wllTitleType, categorys } from '@/utils/data'
import { photoList as mockPhotoList } from '@/../mock/index.js'
import {
  insertWallApi,
  insertCommentApi,
  insertFeedbackApi,
  findWallPage
} from '@/api/request'
import loading from '@/assets/images/lolitte_loading.json'
import useAppStore from '@/store'

const instance = getCurrentInstance()
const route = useRoute()
const appStore = useAppStore()

const tabId = computed(() => parseInt(route.query.id || '0', 10))

const sIndex = ref(0)
const selectedCardIndex = ref(-1)
const selectedCardData = ref(null)
const isModalVisible = ref(false)
const isViewerVisable = ref(false)
const modalMode = ref('create')
const modalTitle = ref('新建卡片')
const addBottom = ref(30)
const photoList = mockPhotoList.data
const loadingAnimation = loading

const wallData = useWallData()

const currentList = computed(() => {
  return wallData.getCategoryCache(sIndex.value).value
})

const showAlert = (type, msg) => {
  instance.appContext.config.globalProperties.$alertShow({
    typeAction: type,
    message: msg
  })
}

const changeCategory = async (index) => {
  if (sIndex.value === index) return

  sIndex.value = index
  handleModalClose()
  await wallData.switchCategory(index, fetchWallList)
}

const fetchWallList = async (categoryId, page) => {
  try {
    const param = {
      type: tabId.value,
      page: page,
      pageSize: wallData.pageSize,
      userId: appStore.getters.getUserIp,
      label: categoryId
    }

    const res = await findWallPage(param)

    if (page === 1) {
      wallData.updateCategoryData(categoryId, res.message || [], false)
    } else {
      wallData.updateCategoryData(categoryId, res.message || [], true)
    }

    if (!res.message || res.message.length === 0) {
      if (page === 1) {
        wallData.setEmpty()
      } else {
        wallData.setNoMore()
      }
    } else {
      wallData.setNormal()
      if (res.message.length < wallData.pageSize) {
        wallData.setNoMore()
      } else {
        wallData.incrementPage()
      }
    }
  } catch (error) {
    console.error('请求数据失败:', error)
    wallData.setEmpty()
  }
}

const openCreateModal = () => {
  modalMode.value = 'create'
  selectedCardData.value = null
  selectedCardIndex.value = -1
  modalTitle.value = '新建卡片'
  isModalVisible.value = true
}

const openDetailModal = (tabID, cardData, index) => {
  modalMode.value = 'detail'
  selectedCardData.value = cardData
  selectedCardIndex.value = index
  modalTitle.value = '卡片详情'
  isModalVisible.value = true
  isViewerVisable.value = tabID === 1
}

const handleNewWall = async (data) => {
  try {
    const result = await insertWallApi(data)
    console.log('handleNewWall:', result)
    if (result.code === 200) {
      handleModalClose()
      showAlert('success', '提交成功~')
      await wallData.refresh(fetchWallList)
    } else {
      showAlert('error', result.message)
    }
  } catch (error) {
    showAlert('error', '提交失败！')
    console.error('提交失败:', error)
  }
}

const handleNewCmt = async (data) => {
  try {
    const result = await insertCommentApi(data)
    if (result.code === 200) {
      showAlert('success', '评论成功~')
    } else {
      showAlert('error', result.message)
    }
  } catch (error) {
    showAlert('error', '评论失败！')
  }
}

const handleReqCardLike = async (data) => {
  try {
    const result = await insertFeedbackApi(data)
    if (result.code === 200) {
      showAlert('success', '点赞成功~')
    } else {
      showAlert('error', result.message)
    }
  } catch (error) {
    console.error('点赞失败:', error)
  }
}

const handleModalClose = () => {
  isModalVisible.value = false
  isViewerVisable.value = false
}

const getImages = () => {
  const currentImgUrl = selectedCardData.value?.imgUrl ?? 0
  const totalImages = 9
  const n = Math.floor(Math.random() * 5) + 1
  const imageList = new Set([currentImgUrl])

  while (imageList.size < n) {
    const randomIndex = Math.floor(Math.random() * totalImages)
    imageList.add(randomIndex)
  }

  return Array.from(imageList)
}

let animationFrameId = null

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
      if (wallData.state.value === 'normal') {
        wallData.loadMore(fetchWallList)
      }
    } else {
      addBottom.value = 28
    }
  })
}

onMounted(async () => {
  window.addEventListener('scroll', scrollEvent, true)
  await wallData.switchCategory(sIndex.value, fetchWallList)
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
  align-items: center;
  position: relative;

  .title {
    font-family: 'JiaaizaoFont';
    padding-top: 48px;
    padding-bottom: 8px;
    font-size: 56px;
    color: @primary-color;
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
    padding: 0 14px;
    line-height: 28px;
    color: @gray-2;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: @primary-color;
    }
  }

  .slabel {
    padding: 0 14px;
    line-height: 28px;
    color: @gray-2;
    border: 1px solid @gray-1;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 28px;
    transition: all 0.2s ease;
    cursor: pointer;
    z-index: 100;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
    }

    .icon {
      color: @gray-10;
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
    padding-top: 32px;
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
}
</style>
