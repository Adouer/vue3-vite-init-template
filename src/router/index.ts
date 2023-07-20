//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { useUserStore } from '@/store/modules/user'
//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 校验是否登录
const islogined = () => {
  const userStore = useUserStore()
  return !(userStore.token === '' || userStore.token === null)
}
// 拦截没有权限权限和未登录用户
router.beforeEach((to, form, next) => {
  if (to.meta.requiresAuth && !islogined()) {
    next('/login') // 如果需要登录且用户未登录，则重定向到登录页
  } else {
    next() // 否则，允许继续访问路由
  }
})

export default router
