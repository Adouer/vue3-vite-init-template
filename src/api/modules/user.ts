//统一管理咱们项目用户相关的接口
import http from '@/api'
import type { User } from '../type'
//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/auth/authenticate',
  REGISTER_URL = '/auth/register',
  USERINFO_URL = 'user/list',
  LOGOUT_URL = '/logout',
}
//登录接口
export const reqLogin = (data: User.LoginFormData) =>
  http.post<any, User.userInfoReponseData>(API.LOGIN_URL, data)
//注册接口
export const reqRegister = (data: User.LoginFormData) =>
  http.post<any, User.userInfoReponseData>(API.REGISTER_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  http.get<void, User.userInfoReponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => http.post<any, any>(API.LOGOUT_URL)
