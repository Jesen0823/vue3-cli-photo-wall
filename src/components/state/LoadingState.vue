<template>
  <div v-if="show" class="state-loading">
    <div ref="lottieContainer" class="lottie-container"></div>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, defineProps } from 'vue'
import Lottie from 'lottie-web'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '加载中1...'
  },
  animationData: {
    type: Object,
    required: true
  }
})

const lottieContainer = ref(null)
let lottieAnimation = null

const initAnimation = () => {
  if (!lottieContainer.value || lottieAnimation) return

  lottieAnimation = Lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: props.animationData
  })
}

const destroyAnimation = () => {
  if (lottieAnimation) {
    lottieAnimation.destroy()
    lottieAnimation = null
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(initAnimation, 50)
    } else {
      destroyAnimation()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  destroyAnimation()
})
</script>

<style lang="less" scoped>
.state-loading {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  gap: 12px;

  .lottie-container {
    width: 120px;
    height: 120px;
  }

  p {
    font-size: 16px;
    color: @gray-3;
    margin: 0;
  }
}
</style>
