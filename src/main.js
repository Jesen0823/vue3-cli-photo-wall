import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
import globalAlert from './plugins/global-alert'

const app = createApp(App)
registerApp(app)
app.use(store).use(router).use(globalAlert).mount('#app')
