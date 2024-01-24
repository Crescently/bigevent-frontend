import request from '@/utils/request'


//获取文章列表
export const artGetListService = (params) => request.get('/article', {params:params })

export const artPublishService = (data) => request.post('/article/add', data)


export const artGetDetailService = (id) => request.get('/article/info', { params: { id } })

export const artEditService = (data) => request.put('/article/info', data)

export const artDelService = (id) => request.delete('/article', { params: { id } })
