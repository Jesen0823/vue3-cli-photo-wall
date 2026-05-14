<template>
  <button :class="[size, status]" class="title-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      default: 'base'
    },
    status: {
      default: 'primary'
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
}
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;
  line-height: 48px;
}

.base {
  min-width: 80px;
  height: 36px;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 36px;
}

.small {
  min-width: 72px;
  height: 32px;
  border-radius: 20px;
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
</style>
