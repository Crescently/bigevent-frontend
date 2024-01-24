import request from '@/utils/request.js'

//用户注册
export const userRegisterService = (data) => {
  const params = new URLSearchParams()
  for (let key in data) {
    params.append(key, data[key])
  }
  return request.post('/user/register', params)
}

//用户登录
export const userLoginService = (data) => {
  const params = new URLSearchParams()
  for (let key in data) {
    params.append(key, data[key])
  }
  return request.post('user/login', params)
}

//获取用户信息
export const userGetInfoService = () => request.get('/user/userInfo')

//更新用户信息
export const userUpdateInfoService = ({ id, nickname, email }) => request.put('/user/update', { id, nickname, email })

//上传头像
export const userUploadAvatarService = (avatarUrl) => {
  const params = new URLSearchParams()
  params.append('avatarUrl', avatarUrl)
  return request.patch('/user/updateAvatar', params)
}

//更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) => request.patch('/user/updatePwd', {
  old_pwd, new_pwd, re_pwd
})
