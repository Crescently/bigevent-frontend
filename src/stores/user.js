import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const userStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (newToken) => (token.value = newToken) // 设置 token
    const removeToken = () => {
      token.value = ''
    }

    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true // 持久化
  }
)
