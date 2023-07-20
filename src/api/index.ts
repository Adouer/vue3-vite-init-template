//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'
//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const http = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
})
//第二步:http实例添加请求与响应拦截器
http.interceptors.request.use(
  (config) => {
    //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    //返回config配置对象,headers属性请求头,经常给服务器端携带公共参数
    return config
  },
  (error) => {
    //失败回调:处理http网络错误的
    let message: string

    // 根据不同的错误类型设置 message 的值
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      message = error.response.data.message || '服务器错误'
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '网络错误，请检查您的网络连接或服务器状态'
    } else {
      // 在设置请求的过程中发生了错误
      message = '请求失败'
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    // 请求错误处理
    return Promise.reject(error)
  },
),
  //第三步:响应拦截器
  http.interceptors.response.use(
    (response) => {
      //成功回调
      return response
    },
    (error) => {
      //失败回调:处理http网络错误的
      let message: string
      //http状态码
      if (error.response) {
        // 添加此行
        const status = error.response.status
        switch (status) {
          case 401:
            message = '未授权'
            break
          case 403:
            message = '账号密码错误或无权访问'
            break
          case 404:
            message = '请求地址错误'
            break
          case 500:
            message = '服务器出现问题'
            break
          default:
            message = '网络出现问题'
            break
        }
      } else {
        message = '请求失败，请检查网络连接或服务器状态'
      }
      //提示错误信息
      ElMessage({
        type: 'error',
        message,
      })
      return Promise.reject(error)
    },
  )
//对外暴露
export default http
