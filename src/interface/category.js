import request from '@/utils/request.js'

export const artGetChannelsService = () => request.get('/category')

// 添加文章分类
export const artAddChannelService = (data) => request.post('/category', data)

// 编辑文章分类
export const artEditChannelService = (data) => request.put('/category', data)

// 删除文章分类
export const artDelChannelService = (id) => request.delete('/category', {params: {id}})