<template>
  <div class="radio-circle-group" role="radiogroup">
    <slot />
  </div>
</template>

<script>
import { provide, ref, watch } from 'vue'

export default {
  name: 'RadioCircleGroup',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue)

    // 同步外部v-model变化
    watch(
      () => props.modelValue,
      (newVal) => {
        internalValue.value = newVal
      }
    )

    // 向子组件注入状态和方法
    provide('radioGroup', {
      value: internalValue,
      disabled: props.disabled,
      updateValue: (val, color) => {
        if (props.disabled) return
        internalValue.value = val
        emit('update:modelValue', val)
        // 同时返回value和color，调用方可直接取color使用
        emit('change', { value: val, color: color })
      }
    })

    return { internalValue }
  }
}
</script>

<style lang="less" scoped>
.radio-circle-group {
  display: flex;
  flex-direction: row;
  gap: 12px; // 圆形之间的垂直间距
}
</style>
