import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/interface/user.js'

// 用户模块
export const userStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (newToken) => (token.value = newToken) // 设置 token
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }

    const setUser = (loginUser) => {
      user.value = loginUser
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true // 持久化
  }
)
