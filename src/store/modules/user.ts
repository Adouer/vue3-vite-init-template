//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/modules/user'
import type { User } from '@/api/type'
import type { UserState } from '@/store/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { anyRoute, constantRoute } from '@/router/routes'

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      username: '',
    }
  },
  //异步|逻辑的地方
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUsername(username: string) {
      this.username = username
    },
    //用户登录的方法
    async userLogin(data: User.LoginFormData) {
      //登录请求
      const result: User.LoginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data
        //本地存储持久化存储一份
        SET_TOKEN(result.data)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        //登录失败错误的信息
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async getUserInfo() {},
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
