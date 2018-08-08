import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, removeToken, setToken } from '@/utils/auth' // 验权
/* import fetch from '@/utils/fetch'

function loginCms() {
  const form = new FormData()
  form.append('fmdo', 'login')
  form.append('dopost', 'login')
  form.append('gourl', 'http://192.168.1.170/member/content_list.php?channelid=1')

  form.append('userType', 'aflc-5')
  form.append('userid', '13088888881')
  form.append('pwd', '123456')
  form.append('vdcode', '99999')

  return fetch.request({
    url: 'http://192.168.1.170/member/index_do.php',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    data: form
  })
}
loginCms() */

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  /* must call `next` */
  NProgress.start()
  // 如果链接带有token信息，则将其保存
  // 会覆盖原有的token
  if (to.query.settoken) {
    store.dispatch('FeLogin', to.query.settoken).then(() => {
      next({
        path: to.fullPath.replace(/([&|?])(settoken=[^&]*&?)/, '$1').replace(/\?$/, '')
      })
      console.log('load Token:', getToken(), to.fullPath.replace(/([&|?])(settoken=[^&]*&?)/, '$1').replace(/\?$/, ''))
    })
  } else if (to.query.nologin) {
    store.dispatch('Login', {
      'accNum': 'aflc-5',
      'username': '13088888886|aflc-5',
      'password': '123456',
      'memberType': 'AF00107',
      'mobile': '13088888886'
    }).then(() => {
      next({
        path: '/'
      })
    })
  } else if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有当前角色权限信息，则请求获取
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.rolesIdList
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          removeToken()
          next({ path: '/login', query: {
            // 删除settoken，避免重复循环
            tourl: to.fullPath.replace(/([&|?])(settoken=[^&]*&?)/, '$1')
          }})
        })
      } else {
        const title = to.meta.title || to.name || ''
        window.document.title = (title ? title + ' - ' : '') + '会员中心'
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login', query: {
        tourl: to.fullPath
      }})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
