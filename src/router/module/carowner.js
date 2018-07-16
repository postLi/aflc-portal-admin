import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

/**
 * 配置说明
 * icon 图标名称，对应src/icon/svg下的图标名字
 * hidden 是否隐藏不显示
 * meta 路由相关信息 ： stitle为边栏折叠时显示， noCache是否加入到路由的缓存列表里， istab 是否为页面内的tab切换
 */

export default {
  path: '/carowner',
  component: Layout,
  redirect: '/carowner/baseInfo',
  name: '车主管理',
  icon: 'gongsiguanli',
  // 用户类型
  memberType: 'AF00101',
  children: [
    // 基本信息
    {
      path: '/carowner/baseInfo', icon: 'QQ', name: '基本信息管理', component: _import('carowner/baseInfo/index'), redirect: '/carowner/baseInfo/index', meta: { role: ['admin'], title: '基本信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/carowner/baseInfo/authentication', icon: 'QQ', name: '完善实名认证', component: _import('carowner/baseInfo/authentication/index'), meta: { role: ['admin'], title: '完善实名认证', noCache: false }
        },
        {
          path: '/changePassword', icon: 'QQ', name: '修改登录密码', component: _import('changePassword'), meta: { role: ['admin'], title: '修改登录密码', noCache: false }
        }
      ]
    },
    // 车源信息管理
    {
      path: '/carowner/carinfo', icon: 'QQ', name: '车源信息管理', component: _import('carowner/carinfo/index'), redirect: '/carowner/carinfo/create', meta: { role: ['admin'], title: '车源信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/carowner/carinfo/create', icon: 'QQ', name: '发布车源', component: _import('carowner/carinfo/create'), meta: { role: ['admin'], title: '发布车源', noCache: false }
        },
        {
          path: '/carowner/carinfo/manage', icon: 'QQ', name: '管理车源', component: _import('carowner/carinfo/manage'), meta: { role: ['admin'], title: '管理车源', noCache: false }
        }
      ]
    }
  ]
}
