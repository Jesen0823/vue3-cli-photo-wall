<template>
  <Transition name="viewer-slide">
    <div v-if="visible" class="photo-viewer" @click="handleClose">
      <div class="bg"></div>
      <button class="btn-prev" @click.stop="handlePrev">
        <ArrowLeftBold class="icon" />
      </button>
      <div class="image-wrapper" @click.stop>
        <img 
          ref="imageRef"
          :src="currentImage" 
          class="photo-img" 
          :class="{ 'scrollable': isScrollable }"
          @load="onImageLoad"
        />
        <div v-if="isScrollable" class="scroll-hint">
          <ChevronUp class="hint-icon" />
          <span>滚动查看完整图片</span>
        </div>
      </div>
      <button class="btn-next" @click.stop="handleNext">
        <ArrowRightBold class="icon" />
      </button>
      <button class="btn-close" @click.stop="handleClose">
        <X class="icon" />
      </button>
      <div class="image-info">
        <span>{{ currentIndex + 1 }} / {{ totalImages }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { ArrowLeftBold, ArrowRightBold, X, ChevronUp } from '@element-plus/icons-vue'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const imageRef = ref(null)
    const currentIndex = ref(0)
    const imageLoaded = ref(false)
    const imageNaturalHeight = ref(0)
    const imageNaturalWidth = ref(0)

    const totalImages = computed(() => props.images.length || 1)

    const currentImage = computed(() => {
      if (props.images.length > 0) {
        return require(`@/../static/photo-${props.images[currentIndex.value] + 1}.webp`)
      }
      return require(`@/../static/photo-7.webp`)
    })

    const isScrollable = computed(() => {
      if (!imageLoaded.value) return false
      return imageNaturalHeight.value > window.innerHeight * 0.9
    })

    const handlePrev = () => {
      if (totalImages.value > 1) {
        currentIndex.value = currentIndex.value > 0 
          ? currentIndex.value - 1 
          : totalImages.value - 1
      }
    }

    const handleNext = () => {
      if (totalImages.value > 1) {
        currentIndex.value = currentIndex.value < totalImages.value - 1 
          ? currentIndex.value + 1 
          : 0
      }
    }

    const handleClose = () => {
      props.$emit('close')
    }

    const onImageLoad = () => {
      if (imageRef.value) {
        imageNaturalHeight.value = imageRef.value.naturalHeight
        imageNaturalWidth.value = imageRef.value.naturalWidth
        imageLoaded.value = true
      }
    }

    watch(() => props.visible, (val) => {
      if (val) {
        currentIndex.value = props.initialIndex
        imageLoaded.value = false
      }
    })

    watch(() => currentIndex.value, () => {
      imageLoaded.value = false
    })

    return {
      imageRef,
      currentIndex,
      totalImages,
      currentImage,
      isScrollable,
      handlePrev,
      handleNext,
      handleClose,
      onImageLoad,
      ArrowLeftBold,
      ArrowRightBold,
      X,
      ChevronUp
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-viewer {
  width: calc(100% - 360px);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;

  .bg {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
  }

  .image-wrapper {
    position: relative;
    z-index: 1;
    max-width: 95%;
    max-height: 95vh;
    overflow: auto;
    cursor: default;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .photo-img {
    display: block;
    max-width: 100%;
    max-height: 95vh;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &.scrollable {
      max-height: none;
      width: auto;
      max-width: 100%;
    }

    &:hover {
      transform: scale(1.01);
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: #fff;
    font-size: 12px;
    animation: bounce 2s infinite;

    .hint-icon {
      width: 16px;
      height: 16px;
    }
  }

  .btn-prev,
  .btn-next {
    position: absolute;
    z-index: 2;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    .icon {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }

  .btn-prev {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-next {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-close {
    position: absolute;
    z-index: 2;
    top: 20px;
    right: 380px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .icon {
      width: 20px;
      height: 20px;
      color: #fff;
    }
  }

  .image-info {
    position: absolute;
    z-index: 2;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 16px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: #fff;
    font-size: 13px;
  }
}

@keyframes bounce {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }
}

.viewer-slide-enter-active,
.viewer-slide-leave-active {
  transition: all 0.3s ease;
}

.viewer-slide-enter-from,
.viewer-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.viewer-slide-enter-to,
.viewer-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
