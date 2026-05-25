import axios from 'axios'

const service = axios.create({
  baseURL: '/api', // 参考vue.config.js对api的配置
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log('request, error', error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject()
    }
  },
  (error) => {
    console.log('response, error', error)
    return Promise.reject()
  }
)

export default service
