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
  </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue'
import { wllTitleType, categorys } from '@/utils/data'
import { noteList } from '@/../mock/index.js'

export default {
  data() {
    return {
      wllTitleType,
      categorys,
      id: 0,
      sIndex: 0,
      noteList: noteList.data || []
    }
  },
  components: {
    NoteCard
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
    flex-wrap: wrap;
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
    padding: 0 16px;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
  }

  .card-list {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 12px;
  }
}
</style>
