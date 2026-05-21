<template>
  <div class="photo-card">
    <img
      class="photo-img"
      :src="require(`@/../static/photo-${photo.imgUrl + 1}.webp`)"
    />
    <div class="card-top">
      <span class="time">{{ photo.moment }}</span>
      <span class="label"># {{ categorys[photo.type][photo.label] }}</span>
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
          <span class="count">{{ photo.comment }}</span>
        </button>
      </div>
      <span class="author">{{ photo.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Star, ChatLineRound } from '@element-plus/icons-vue'
import { categorys, cardColor } from '@/utils/data'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    photo: {
      default: {}
    }
  },
  setup() {
    const isLiked = ref(false)
    const likeCount = ref(20)

    const toggleLike = () => {
      isLiked.value = !isLiked.value
      likeCount.value += isLiked.value ? 1 : -1
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
.photo-card {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: rgba(252, 175, 162, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .photo-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  .card-top {
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .time {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 0, 0, 0.4);
      padding: 3px 8px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }

    .label {
      font-size: 10px;
      color: @primary-color;
      background: rgba(255, 255, 255, 0.9);
      padding: 3px 8px;
      border-radius: 10px;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }
  }

  .card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    backdrop-filter: blur(4px);

    .actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }

      .icon {
        width: 14px;
        height: 14px;
        color: rgba(255, 255, 255, 0.9);
        transition: color 0.2s;
        display: inline-block;
      }

      .count {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.9);
      }

      &.liked {
        .icon {
          color: #ff6b6b;
        }

        .count {
          color: #ff6b6b;
        }
      }

      &.comment-btn {
        .icon {
          color: rgba(99, 102, 241, 0.9);
        }

        &:hover .icon {
          color: rgba(99, 102, 241, 1);
        }
      }
    }

    .author {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }
  }
}
</style>
