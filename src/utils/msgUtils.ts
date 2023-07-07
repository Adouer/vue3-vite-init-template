export const MsgUtils = {
  // 根据状态码封装错误信息
  getMsg(status: number) {
    let msg = ''
    switch (status) {
      case 401:
        msg = 'TOKEN过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '网络出现问题'
        break
    }
    return msg
  },
}
