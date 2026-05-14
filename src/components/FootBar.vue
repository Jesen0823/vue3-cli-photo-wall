<template>
  <div class="foot-bar">
    <div class="foot-left">
      <div class="logo">
        <img class="logo-img" src="@/assets/images/comicfury.svg" />
        <p class="logo-name">相册日记</p>
      </div>
      <p class="top-p1">
        呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </p>
      <p class="top-p2">
        呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </p>
      <p class="top-p3">
        <span>十三点</span><span>许可证号哈哈哈哈好的9900</span>
      </p>
    </div>

    <div class="link">
      <p class="title">链接</p>
      <div class="line-inner">
        <a href="www.xxx.com" target="_blank">相册日记</a>
        <a href="www.xxx.com" target="_blank">github</a>
      </div>
    </div>

    <div class="foot-right">
      <p class="title">打赏</p>
      <div class="right-inner">
        <img src="@/assets/images/comicfury.svg" />
        <p>微信支付</p>
      </div>
      <div class="right-inner">
        <img src="@/assets/images/comicfury.svg" />
        <p>银联支付</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.foot-bar {
  widows: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  background: @gray-1;
  padding: 24px;

  .foot-left {
    .logo {
      .logo-img {
        width: 60px;
        height: 60px;
      }
      .logo-name {
        color: @gray-10;
        font-family: 'Courier New', Courier, monospace;
        font-size: 24px;
      }
    }
  }
  .foot-right {
    display: flex;
    flex-direction: row;
    .right-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 16px;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
