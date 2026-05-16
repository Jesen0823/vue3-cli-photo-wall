<template>
  <label
    class="radio-circle-item"
    :class="{
      'is-checked': isChecked,
      'is-pressed': isPressed
    }"
    @click="handleClick"
  >
    <!-- 隐藏原生radio，保留语义和键盘操作能力 -->
    <input
      type="radio"
      class="radio-circle-input"
      :value="value"
      :checked="isChecked"
      :disabled="radioGroup.disabled || disabled"
      @change="handleChange"
    />

    <!-- 自定义彩色圆形 -->
    <span class="radio-circle" :style="{ backgroundColor: color }"></span>

    <!-- 可选文字标签 -->
    <span v-if="label" class="radio-circle-label">{{ label }}</span>
  </label>
</template>

<script>
import { inject, computed, ref } from 'vue'

export default {
  name: 'RadioCircleItem',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      required: true,
      description: '圆形填充颜色'
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const radioGroup = inject('radioGroup')
    const isPressed = ref(false) // 控制点击缩放动画

    // 计算当前项是否选中（仅相关值变化时重新计算）
    const isChecked = computed(() => {
      return radioGroup.value.value === props.value
    })

    // 处理鼠标点击
    const handleClick = () => {
      if (props.disabled || radioGroup.disabled) return

      // 触发150ms缩放动画
      isPressed.value = true
      setTimeout(() => {
        isPressed.value = false
      }, 150)

      radioGroup.updateValue(props.value, props.color)
    }

    // 处理键盘操作（方向键/空格键）
    const handleChange = () => {
      if (props.disabled || radioGroup.disabled) return
      radioGroup.updateValue(props.value, props.color)
    }

    return {
      radioGroup,
      isChecked,
      isPressed,
      handleClick,
      handleChange
    }
  }
}
</script>

<style lang="less" scoped>
.radio-circle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.radio-circle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.radio-circle {
  width: 24px; // 圆形直径
  height: 24px;
  border-radius: 50%;
  // 分离过渡属性，优化性能
  transition: box-shadow 0.2s ease, transform 0.15s ease-out;

  // 选中状态：紧贴圆形的2px蓝色外圈
  .is-checked & {
    box-shadow: 0 0 0 2px #1890ff;
  }

  // 点击状态：90%缩放效果
  .is-pressed & {
    transform: scale(0.9);
  }
}

.radio-circle-label {
  font-size: 14px;
  color: #333;
}
</style>
