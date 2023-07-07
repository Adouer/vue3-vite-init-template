//定义用户相关数据的ts类型

// 用户相关
export namespace User {
  //用户登录接口携带参数的ts类型
  export interface LoginFormData {
    username: string
    password: string
  }

  //定义全部接口返回数据都拥有ts类型
  export interface LoginResponseData {
    token: string
    code: number
    data: string
  }
}
