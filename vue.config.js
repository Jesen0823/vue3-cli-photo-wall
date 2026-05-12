const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  // 原有默认配置：对第三方依赖进行 Babel 转译，确保兼容性
  transpileDependencies: true,

  // Webpack缓存配置（指向F盘）
  configureWebpack: {
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(
        "F:/custom_cache/vue_temp_cache/vue3-cli-photo-wall"
      ),
    },
  },

  // 生产环境优化
  productionSourceMap: false,
  outputDir: "dist",
  assetsDir: "static",

  // 开发服务器配置（避免与React端口冲突）
  devServer: {
    port: 8080,
    open: true,
    host: "0.0.0.0",
  },

  // ESLint 配置：开发环境开启，生产环境关闭
  lintOnSave: process.env.NODE_ENV === "development",

  // CSS 配置：生产环境不生成 SourceMap
  css: {
    sourceMap: process.env.NODE_ENV === "development",
  },

  // 部署基础路径（根据实际部署情况调整）
  publicPath: "/",
});
