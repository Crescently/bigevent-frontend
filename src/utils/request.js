import { userStore } from '@/stores/user'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'


// 'http://big-event-vue-api-t.itheima.net'
const baseURL = 'http://localhost:8081'

const instance = axios.create({
  baseURL,
  timeout: 100000
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const store = userStore()
    if (store.token) {
      config.headers.Authorization = store.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage({ message: res.data.msg ? res.data.msg : '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage({
      message: err.response.data.msg ? err.response.data.msg : '服务异常',
      type: 'error'
    })
    console.log(err)
    if (err.response?.status === 401) {
      router.push('/login').then(() => {
        console.log('跳转成功')
      })
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
