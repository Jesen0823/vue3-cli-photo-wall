import AlertWindow from '../components/dialog/alert-dialog'

export default {
  install(app) {
    console.log('plugin_object', 'install')
    // app.config.globalProperties.$name = 'yalon'
    // 全局挂载
    app.config.globalProperties.$alertShow = AlertWindow
  }
}
