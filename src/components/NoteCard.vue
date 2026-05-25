<template>
  <div class="note-card" :style="{ background: cardColor[note.color] }">
    <div class="card-top">
      <span class="time">{{ note.moment }}</span>
      <span class="label">{{ categorys[note.type][note.label] }}</span>
    </div>
    <div class="card-content">
      <p class="message">{{ note.message }}</p>
    </div>
    <div class="card-footer">
      <div class="actions">
        <button
          class="action-btn"
          :class="{ liked: isLiked }"
          @click.stop="toggleLike"
        >
          <Star class="icon" />
          <span class="count">{{ likeCount }}</span>
        </button>
        <button class="action-btn comment-btn">
          <ChatLineRound class="icon" />
          <span class="count">{{ note.comment }}</span>
        </button>
      </div>
      <span class="author">{{ note.name }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Star, ChatLineRound } from '@element-plus/icons-vue'
import { categorys, cardColor } from '@/utils/data'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    note: {
      default: {}
    }
  },
  emits: ['requestCardLike'],
  setup(props, { emit }) {
    console.log('note:', props.note)

    const isLiked = computed(() => {
      return props.note.islike[0].count > 0
    })

    const likeCount = computed(() => {
      return props.note.like[0].count
    })

    const toggleLike = () => {
      const param = {
        wallId: props.note.id,
        userId: props.note.userId,
        type: props.note.type,
        moment: new Date()
      }
      emit('requestCardLike', param)
      //isLiked.value = !isLiked.value
      //likeCount.value += isLiked.value ? 1 : -1
    }

    return {
      Star,
      ChatLineRound,
      isLiked,
      likeCount,
      toggleLike,
      categorys,
      cardColor
    }
  }
}
</script>

<style lang="less" scoped>
.note-card {
  height: 240px;
  background: rgba(252, 175, 162, 0.3);
  border-radius: 12px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .time {
      font-size: 14px;
      color: @gray-3;
    }

    .label {
      font-size: 12px;
      color: @primary-color;
      background: rgba(59, 115, 240, 0.1);
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 500;
    }
  }

  .card-content {
    flex: 1;
    overflow: hidden;

    .message {
      margin: 0;
      font-size: 16px;
      color: @gray-1;
      line-height: 1.7;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin-top: 8px;

    .actions {
      display: flex;
      gap: 16px;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.2s;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .icon {
        width: 16px;
        height: 16px;
        color: @gray-3;
        transition: color 0.2s;
        display: inline-block;
      }

      .count {
        font-size: 13px;
        color: @gray-3;
      }

      &.liked {
        .icon {
          color: #f56c6c;
        }

        .count {
          color: #f56c6c;
        }
      }

      &.comment-btn {
        .icon {
          color: @primary-color;
        }

        &:hover .icon {
          color: darken(@primary-color, 10%);
        }
      }
    }

    .author {
      font-size: 12px;
      color: @gray-2;
      font-weight: 500;
    }
  }
}
</style>
