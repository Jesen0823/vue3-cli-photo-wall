import axios from 'axios'

const request = axios.create({
  baseURL: '/api',  // 参考vue.config.js对api的配置
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 添加 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default request