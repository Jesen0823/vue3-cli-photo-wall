<template>
  <Transition name="modal-slide">
    <div v-if="visible" class="editor-modal">
      <div class="modal-header">
        <p class="modal-name">{{ props.title }}</p>
        <Close
          style="width: 24px; height: 24px"
          class="icon"
          @click="closeModal"
        />
      </div>
      <div class="content-area">
        <slot name="create" :close="closeModal"></slot>
        <slot name="detail" :close="closeModal"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '标题'
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeEvent'])

const closeModal = () => {
  emit('closeEvent')
}
</script>

<style lang="less" scoped>
.editor-modal {
  width: 360px;
  height: calc(100vh - 52px);
  position: fixed;
  padding: 8px 20px 0;
  right: 0;
  top: 52px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.modal-header {
  display: flex;
  padding: 12px 16px 0 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .modal-name {
    font-size: 18px;
    font-weight: 500;
  }

  .icon {
    position: fixed;
    right: 8px;
    cursor: pointer;
    color: @gray-2;
    transition: color 0.2s;

    &:hover {
      color: @gray-1;
    }
  }
}

.content-area {
  width: 100%;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.modal-slide-enter-to,
.modal-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
