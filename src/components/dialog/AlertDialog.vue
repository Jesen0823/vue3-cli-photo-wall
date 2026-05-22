<template>
  <Transition name="alert">
    <div class="alert-dialog" v-if="show">
      <div class="alert-content" :class="'alert-' + actionType">
        <component :is="curIcon" class="alert-icon" />
        <span class="alert-text">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import {
  SuccessFilled,
  WarningFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'

const icons = {
  warn: WarningFilled,
  error: CircleCloseFilled,
  success: SuccessFilled
}

export default {
  name: 'alert-dialog',
  props: {
    message: {
      type: String,
      default: ''
    },
    actionType: {
      type: String, //error,warn,success
      default: 'warn',
      validator: (value) => ['error', 'warn', 'success'].includes(value)
    }
  },

  setup(props) {
    const show = ref(false)

    const curIcon = computed(() => {
      return icons[props.actionType] || CircleCloseFilled
    })

    onMounted(() => {
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 3000)
    })

    return {
      show,
      curIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-dialog {
  position: fixed;
  z-index: 9999;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-content {
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  min-width: 200px;
  max-width: 400px;
  gap: 10px;
}

.alert-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.alert-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

.alert-success {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;
  .alert-icon {
    color: #22c55e;
  }
  .alert-text {
    color: #166534;
  }
}

.alert-warn {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
  .alert-icon {
    color: #f59e0b;
  }
  .alert-text {
    color: #92400e;
  }
}

.alert-error {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  .alert-icon {
    color: #ef4444;
  }
  .alert-text {
    color: #991b1b;
  }
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.alert-enter-from {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
}

.alert-leave-to {
  transform: translateX(-50%) translateY(-10px);
  opacity: 0;
}

.alert-enter-to,
.alert-leave-from {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
</style>
