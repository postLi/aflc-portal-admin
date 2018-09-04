import router from './router'
import store from './store'
import { eventBus } from '@/eventBus'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, removeToken, setToken, getUserInfo, getLogin } from '@/utils/auth' // 验权
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
  const param = getLogin() || {}
  /* must call `next` */
  NProgress.start()
  // 如果链接带有token信息，则将其保存
  // 会覆盖原有的token
  if (to.query.access_token) {
    // 从门户过来
    // 从tms过来
    const logintype = to.query.login_type ? 'FeLogin' : 'FeLogin2'
    store.dispatch(logintype, {
      login_type: to.query.login_type,
      access_token: to.query.access_token,
      login_mobile: to.query.login_mobile
    }).then((data) => {
      if (logintype === 'FeLogin2') {
        const roles = data.data.rolesIdList
        // eventBus.$emit('loginmenhu', to.query.access_token)
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          router.addRoutes(store.getters.addRouters)
          next({
            path: to.fullPath.replace(/([&|?])(login_type=[^&]*&?)/g, '$1').replace(/([&|?])(access_token=[^&]*&?)/g, '$1').replace(/([&|?])(login_mobile=[^&]*&?)/g, '$1').replace(/\?$/, '')
          })
        })
      } else {
        next({
          path: to.fullPath.replace(/([&|?])(login_type=[^&]*&?)/g, '$1').replace(/([&|?])(access_token=[^&]*&?)/g, '$1').replace(/([&|?])(login_mobile=[^&]*&?)/g, '$1').replace(/\?$/, '')
        })
      }

      // console.log('load Token:', getToken(), to.fullPath.replace(/([&|?])(tmstoken=[^&]*&?)/, '$1').replace(/\?$/, ''))
    }).catch(err => {
      if (param.loginType === 'sso') {
        store.dispatch('login2tms')
      } else {
        // 跳转到登录页
        location.href = 'http://192.168.1.170/member/index_do.php?fmdo=login&dopost=exit&nexturl=../member/login.php'
      }
    })
  } else if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有当前角色权限信息，则请求获取
      if (store.getters.roles.length === 0) {
        const access_token = getToken()

        store.dispatch(param.loginType === 'sso' ? 'FeLogin2' : 'GetInfo', {
          access_token
        }).then(res => {
          const roles = res.data.rolesIdList
          const data = res.data
          const urlboj = { ...to }
          // 如果是未认证状态则强制跳转到认证页面
          /* if (data.authStatus === 'AF0010401') {
            urlboj = { path: '/baseInfo/authentication', replace: true }
          } */
          console.log('roles:', roles)
          // AF0010401
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...urlboj, replace: true })
          })
        }).catch(() => {
          removeToken()
          if (param.loginType === 'sso') {
            store.dispatch('login2tms')
          } else {
            // 跳转到登录页
            location.href = 'http://192.168.1.170/member/index_do.php?fmdo=login&dopost=exit&nexturl=../member/login.php'
          }

          /* next({ path: '/login', query: {
            // 删除settoken，避免重复循环
            tourl: to.fullPath.replace(/([&|?])(settoken=[^&]*&?)/, '$1')
          }}) */
        })
      } else {
        const data = getUserInfo()
        // 如果是未认证状态则强制跳转到认证页面
        /* if (data.authStatus === 'AF0010401' && to.path.indexOf('/baseInfo/authentication') === -1) {
          console.log('data data:1')
          if (from.path.indexOf('/baseInfo/authentication') === -1) {
            next({ path: '/baseInfo/authentication', replace: true })
          } else {
            next(false)
            NProgress.done()
          }
        } else {
          console.log('data data:2')
          next()
        } */

        next()
        const title = to.meta.title || to.name || ''
        // window.document.title = (title ? title + ' - ' : '') + '会员中心'
        window.document.title = '会员中心'
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (param.loginType === 'sso') {
        store.dispatch('login2tms')
      } else {
        // 跳转到登录页
        next({ path: '/login', query: {
            tourl: to.fullPath
          }})
        // location.href = 'http://192.168.1.170/member/index_do.php?fmdo=login&dopost=exit&nexturl=../member/login.php'
      }
      /* next({ path: '/login', query: {
        tourl: to.fullPath
      }}) */
      // location.href = 'http://192.168.1.170/member/index_do.php?fmdo=login&dopost=exit&nexturl=../member/login.php'
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
