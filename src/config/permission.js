/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  authentication,
  loginInterception,
  progressBar,
  recordRoute,
  routesWhiteList,
} from '@/config'
import { closePage } from '@/api/device'

//顶部进度条
VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})

router.beforeResolve(async (to, from, next) => {
  closePage()
  if (progressBar) VabProgress.start()

  const hasPermissions =
    store.getters['user/permissions'] &&
    store.getters['user/permissions'].length > 0
  if (hasPermissions) {
    next()
  } else {
    try {
      let permissions
      // if (!loginInterception) {
      //settings.js loginInterception为false时，创建虚拟权限
      await store.dispatch('user/setPermissions', ['admin'])
      permissions = ['admin']
      // } else {
      //   permissions = await store.dispatch('user/getUserInfo')
      // }

      let accessRoutes = []
      if (authentication === 'intelligence') {
        accessRoutes = await store.dispatch('routes/setRoutes', permissions)
      } else if (authentication === 'all') {
        accessRoutes = await store.dispatch('routes/setAllRoutes')
      }
      router.addRoutes(accessRoutes)
      next({ ...to, replace: true })
    } catch {
      await store.dispatch('user/resetAccessToken')
      if (progressBar) VabProgress.done()
    }
  }
})
router.afterEach(() => {
  if (progressBar) VabProgress.done()
})
