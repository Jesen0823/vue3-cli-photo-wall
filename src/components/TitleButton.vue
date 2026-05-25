<template>
  <button
    :class="[size, status, { disabled: disabled }]"
    class="title-button"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'base'
    },
    status: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.title-button {
  text-align: center;
  border: none;
  cursor: pointer;
}
.max {
  min-width: 100px;
  height: 40px;
  border-radius: 20px;
  padding: 0 24px;
  line-height: 40px;
}

.base {
  min-width: 80px;
  height: 36px;
  border-radius: 18px;
  padding: 0 20px;
  line-height: 36px;
}

.small {
  min-width: 72px;
  height: 32px;
  border-radius: 16px;
  padding: 0 20px;
  line-height: 32px;
}

.primary {
  background: @gray-1;
  color: @gray-10;
}
.secondary {
  background: @gray-10;
  color: @gray-1;
  border: 1px solid @gray-1;
}

.cprimary {
  background: @primary-color;
  color: @gray-10;
  font-weight: 600;
}

.csecondary {
  background: @gray-10;
  color: @gray-1;
}

.title-button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  filter: grayscale(100%);
}

.title-button.disabled.primary {
  background: @gray-4;
  color: @gray-10;
}

.title-button.disabled.secondary {
  background: @gray-5;
  color: @gray-1;
  border-color: @gray-5;
}

.title-button.disabled.cprimary {
  background: @gray-4;
  color: @gray-10;
}

.title-button.disabled.csecondary {
  background: @gray-5;
  color: @gray-1;
}
</style>
