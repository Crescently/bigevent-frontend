import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'
import { userStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

//全局路由拦截
router.beforeEach((to) => {
  const store = userStore()
  if (!store.token && to.path !== '/login') {
    console.log('请求被拦截')
    return '/login'
  }
  return true
})
export default router
