/**
 * 统一管理pinia文件
 */
import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(persist)

export default pinia
