<template>
  <div class="card-detail">
    <div class="top-btn">
      <p class="top-des">该条日记有违社区规定？</p>
      <p class="top-report">去举报</p>
    </div>
    <NoteCard
      class="card"
      :note="objData"
      @request-card-like="handleCardLike"
    ></NoteCard>
    <div class="form">
      <textarea
        class="tar"
        placeholder="请输入评论..."
        v-model="inpuCmt"
      ></textarea>
      <div class="form-bottom">
        <input class="uname" placeholder="输入签名" v-model="inputName" />
        <TitleButton
          class="sub"
          size="small"
          status="cprimary"
          @click="handleClickSubmit"
          :disabled="canSubmit"
          >提交</TitleButton
        >
      </div>
    </div>
    <p class="cmt-title">评论 {{ objData.comment }}</p>

    <div class="cmt-list" v-if="cmtStatusData">
      <template v-for="(cmt, i) in commentList" :key="cmt.id">
        <CommentItem :comment="cmt" :index="i"></CommentItem>
      </template>
    </div>
    <p
      class="more-cmt"
      :class="{ disabled: !hasMoreData }"
      @click="loadMoreComment"
      v-if="showMoreLoad"
    >
      {{ moreCmtText }}
    </p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted, watch } from 'vue'
import NoteCard from './NoteCard.vue'
import TitleButton from './TitleButton.vue'
// import { commentList as mockCmtList } from '@/../mock/index.js'
import CommentItem from './CommentItem.vue'
import { useAppStore } from '@/store'
import { findCommentPage } from '@/api/request'
//import { submitCmtTestData } from '@/test/testData'

const props = defineProps({
  tabId: {
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
const inpuCmt = ref('')
const inputName = ref('')
const canSubmit = computed(() => {
  return inpuCmt.value.length === 0 || inputName.value.length === 0
})

const cmtStatusData = ref(false)
const commentList = ref([])
const moreCmtText = ref('-- 加载更多 --')
const showMoreLoad = ref(false)
const hasMoreData = ref(false)
let currentPage = 1
const pageSize = 8
const appStore = useAppStore()
const emit = defineEmits(['submitNewCmt', 'reqCardLike'])

onMounted(() => {
  fetchCommentList(currentPage)
})

//卡片发生变化
watch(
  () => props.objData,
  (val) => {
    if (val) {
      currentPage = 1
      commentList.value = []
      hasMoreData.value = false
      cmtStatusData.value = false
      showMoreLoad.value = false
      fetchCommentList(currentPage)
    }
  }
)

const handleClickSubmit = () => {
  const param = {
    wallId: props.objData.id,
    userId: appStore.getters.getUserIp,
    imgUrl: props.objData.imgUrl,
    comment: inpuCmt.value,
    name: inputName.value,
    moment: new Date()
  }
  emit('submitNewCmt', param)
  
  //生成测试
  //submitCmtTestData(props.objData.id)
}

const handleCardLike = (param) => {
  emit('reqCardLike', param)
}

const loadMoreComment = () => {
  if (moreCmtText.value === '没有更多了~') return
  fetchCommentList(currentPage)
}

// 获取评论
const fetchCommentList = async (page) => {
  const param = {
    page: page,
    pageSize: pageSize,
    id: props.objData.id
  }

  try {
    const res = await findCommentPage(param)
    console.log('commentList,res:', res)
    if (!res.message || res.message.length === 0) {
      console.log('commentList,error:', '没有评论')
    } else {
      commentList.value = commentList.value.concat(res.message)
      cmtStatusData.value = true
      showMoreLoad.value = true
      // 本次请求得到数据条数等于页大小，才可能有下一页
      if (res.message.length === pageSize) {
        currentPage++
        hasMoreData.value = true
      } else {
        moreCmtText.value = '没有更多了~'
        hasMoreData.value = false
      }
    }
  } catch (error) {
    console.log('commentList,error:', error)
  }
}
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
  .more-cmt {
    width: 100%;
    padding: 16px 20px;
    text-align: center;
    color: @gray-2;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
      color: @gray-4;
    }
  }
}
</style>
