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
    <div>{{ sIndex }}</div>
  </div>
</template>

<script>
import { wllTitleType, categorys } from '@/utils/data'
export default {
  data() {
    return {
      wllTitleType,
      categorys,
      id: 0,
      sIndex: 0
    }
  },
  methods: {
    changeTab(index) {
      this.sIndex = index
    }
  }
}
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
    gap: 8px;
    margin-top: 40px;
  }
  .label {
    padding: 0px 14px;
    line-height: 28px;
    color: @gray-2;
  }
  .slabel {
    padding: 0px 14px;
    line-height: 28px;
    color: @gray-2;
    border: 1px solid rgba(32, 32, 32, 1);
    border-radius: 14px;
  }
}
</style>
