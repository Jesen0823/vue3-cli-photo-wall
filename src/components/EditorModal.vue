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
      <div class="color-panel">
        <RadioCircleGroup v-model="selectedValue" @change="handleColorSelect">
          <RadioCircleItem
            v-for="(item, index) in cardColor"
            :key="item"
            :value="index"
            :color="item"
          />
        </RadioCircleGroup>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { RadioCircleGroup, RadioCircleItem } from './radio-circle'
import { cardColor } from '@/utils/data'

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

const selectedValue = ref(0)
const selectedColor = ref(cardColor[0])

const handleColorSelect = ({ value, color }) => {
  selectedColor.value = color
  selectedValue.value = value
}

const closeModal = () => {
  emit('closeEvent')
}
</script>

<style lang="less" scoped>
.editor-modal {
  width: 360px;
  height: 100%;
  position: fixed;
  padding: 20px;
  right: 0;
  top: 52px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  padding: 12px 16px 12px 8px;
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

.color-panel {
  width: 100%;
  height: 56px;
  margin-top: 16px;
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
