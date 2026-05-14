import { App } from 'vue'
import registerElementIcon from '@/utils/register-element-icon'

export function registerApp(app: App): void {
  // 全局引入组件
  registerElementIcon(app)
}
