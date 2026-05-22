<template>
  <div class="top-bar">
    <div class="logo">
      <img class="logo-img" src="@/assets/images/comicfury.svg" />
      <p class="logo-name">相册日记</p>
    </div>
    <div class="menu">
      <title-button
        size="base"
        :status="id === 0 ? 'cprimary' : 'primary'"
        @click="tabChange(0)"
        >日记墙</title-button
      >
      <title-button
        size="base"
        :status="id === 1 ? 'cprimary' : 'primary'"
        @click="tabChange(1)"
        >照片墙</title-button
      >
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TitleButton from './TitleButton.vue'

const router = useRouter()
const route = useRoute()

const id = computed(() => {
  return parseInt(route.query.id || '0', 10)
})

const tabChange = (tabId) => {
  if (id() === tabId) return
  router.push({
    query: { id: tabId }
  })
}
</script>

<style lang="less" scoped>
@import '@/styles/common.less';

.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  .logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .logo-name {
      font-size: 20px;
      font-weight: 600;
      color: @gray-1;
      padding-left: 10px;
    }

    .logo-img {
      width: 36px;
      height: 36px;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;
  }

  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    .user-head {
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(
        180deg,
        #b0e4f0 20%,
        #1e85e2 60%,
        #de344f 20%
      );
    }
  }
}
</style>
