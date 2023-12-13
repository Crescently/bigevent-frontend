import request from '@/utils/request.js'

//用户注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

//用户登录
export const userLoginService = ({ username, password }) =>
  request.post('api/login', { username, password })

//获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

//更新用户信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

//上传头像
export const userUploadAvatarService = (avatar) => request.patch('/my/update/avatar', { avatar })

//更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
