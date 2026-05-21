<template>
  <div class="foot-bar">
    <div class="foot-left">
      <div class="logo">
        <img class="logo-img" src="@/assets/images/comicfury.svg" />
        <p class="logo-name">相册日记</p>
      </div>
      <p class="top-p1">
        相册日记是一款开源免费的生活记事平台，用户可以记录生活片段，所思所想，集文案、照片、交友为一体。
      </p>
      <p class="top-p2">
        相册日记未来将适配Android/IOS/小程序平台，还将开启更多有趣的功能，敬请期待！
      </p>
      <p class="top-p3">
        <span>声明</span
        ><span
          >&nbsp;&nbsp;备案/许可证聘ICP备19032886号&nbsp;&nbsp;备案/许可证沪ICP备19011899号</span
        >
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
      <div class="pay">
        <div class="right-inner">
          <img src="@/assets/images/qr-f.png" />
          <p>微信支付</p>
        </div>
        <div class="right-inner">
          <img src="@/assets/images/qr-f.png" />
          <p>银联支付</p>
        </div>
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
  width: 100%;
  min-height: 230px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: @gray-1;
  padding: 40px 60px;
  box-sizing: border-box;

  .foot-left {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo-img {
        width: 48px;
        height: 48px;
      }

      .logo-name {
        color: @gray-10;
        font-size: 24px;
        font-weight: 600;
      }
    }

    .top-p1,
    .top-p2 {
      font-size: 14px;
      color: @gray-3;
      line-height: 1.6;
      max-width: 400px;
    }

    .top-p3 {
      font-size: 12px;
      color: @gray-3;
      display: flex;
      gap: 16px;
      margin-top: 8px;
    }
  }

  .link {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: @gray-10;
    }

    .line-inner {
      display: flex;
      flex-direction: column;
      gap: 12px;

      a {
        color: @gray-3;
        font-size: 14px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .foot-right {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: @gray-10;
    }

    .pay {
      display: flex;
      gap: 24px;

      .right-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          background: @gray-10;
          padding: 4px;
        }

        p {
          color: @gray-3;
          font-size: 14px;
          margin: 0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .foot-bar {
    flex-direction: column;
    gap: 32px;
    padding: 30px 24px;

    .foot-left .top-p1,
    .foot-left .top-p2 {
      max-width: 100%;
    }
  }
}
</style>
