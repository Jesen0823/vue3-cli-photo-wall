const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  // 原有默认配置：对第三方依赖进行 Babel 转译，确保兼容性
  transpileDependencies: true,

  // Webpack缓存配置（指向F盘）
  configureWebpack: {
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(
        'F:/custom_cache/vue_temp_cache/vue3-cli-photo-wall'
      )
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    }
  },

  // 生产环境优化
  productionSourceMap: false,
  outputDir: 'dist',
  assetsDir: 'static',

  // 开发服务器配置（避免与React端口冲突）
  devServer: {
    // port: 8082, // 自定义端口，防止和其他Vue项目冲突
    open: true, // 启动项目后自动打开浏览器
    // host: '0.0.0.0' // 允许局域网访问
    proxy: {
      '^/api': {
        // target: 'http://152.136.185.210:5000',
        // target: 'http://127.0.0.1:9000',
        target: 'http://127.0.0.1:3001',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },

  // ESLint 配置：开发环境开启，生产环境关闭
  lintOnSave: process.env.NODE_ENV === 'development',

  // CSS 配置：生产环境不生成 SourceMap
  css: {
    sourceMap: process.env.NODE_ENV === 'development'
  },

  // 部署基础路径（根据实际部署情况调整）
  publicPath: './',

  // HTML 模板配置
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE || '照片墙'
      return args
    })
  },

  // 全局引入./src/styles/common.less
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/common.less')]
    }
  }
})
