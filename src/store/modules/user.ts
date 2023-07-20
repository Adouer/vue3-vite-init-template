//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout, reqRegister } from '@/api/modules/user'
import type { User } from '@/api/type'
import type { UserState } from '@/store/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

//创建用户小仓库
export const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      username: '',
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录
    async userLogin(formData: User.LoginFormData) {
      try {
        // 登录方法
        const userInfoReponseData: User.userInfoReponseData = await reqLogin(formData);

        let token = userInfoReponseData.data.jwt;
        // store中存数据
        this.token = token;
        // 浏览器存token
        SET_TOKEN(token);
        return true;
      } catch (error) {
        // 发生网络异常等错误
        REMOVE_TOKEN();
        this.token = '';
        return false;
      }
    },
    //注册
    async userRegister(formData: User.LoginFormData) {
      try {
        // 注册方法
        const userInfoReponseData: User.userInfoReponseData = await reqRegister(formData);
        return true;
      } catch (error) {
        // 发生网络异常等错误
        return false;
      }
    },
    //获取用户信息方法
    async getUserInfo() { },
    //退出登录
    async userLogout() {
      try {
        this.token = '';
        this.username = '';
        REMOVE_TOKEN();
        return true;
      } catch (error) {
        // 发生网络异常等错误
        return false;
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
