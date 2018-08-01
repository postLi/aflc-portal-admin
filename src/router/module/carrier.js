import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

/**
 * 配置说明
 * icon 图标名称，对应src/icon/svg下的图标名字
 * hidden 是否隐藏不显示
 * meta 路由相关信息 ： stitle为边栏折叠时显示， noCache是否加入到路由的缓存列表里， istab 是否为页面内的tab切换
 */

export default {
  path: '/carrier',
  component: Layout,
  redirect: '/carrier/baseInfo',
  name: '物流公司',
  icon: 'gongsiguanli',
  memberType: 'AF00107',
  children: [
    // 基本信息
    {
      path: '/carrier/baseInfo', icon: 'QQ', name: '基本信息管理', component: _import('carrier/baseInfo/index'), redirect: '/carrier/baseInfo/index', meta: { role: ['admin'], title: '基本信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/carrier/baseInfo/authentication', icon: 'QQ', name: '完善实名认证', component: _import('carrier/baseInfo/authentication/index'), meta: { role: ['admin'], title: '完善实名认证', noCache: false }
        },
        {
          path: '/changePassword', icon: 'QQ', name: '修改登录密码', component: _import('changePassword'), meta: { role: ['admin'], title: '修改登录密码', noCache: false }
        }

      ]
    },
    // 订单管理
    {
      path: '/carrier/order', icon: 'QQ', name: '订单管理', component: _import('carrier/order/index'), redirect: '/carrier/order/manage', meta: { role: ['admin'], title: '订单管理', istab: true, noCache: false },
      children: [
        {
          path: '/carrier/order/manage', icon: 'QQ', name: '全部订单', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '全部订单', noCache: false }
        },
        {
          path: '/carrier/order/create', icon: 'QQ', name: '创建订单', component: _import('carrier/order/create/index'), meta: { role: ['admin'], title: '创建订单', noCache: false }
        },
        {
          path: '/carrier/order/track', icon: 'QQ', name: '运单跟踪', component: _import('carrier/order/track/index'), meta: { role: ['admin'], title: '运单跟踪', noCache: false }
        },
        {
          path: '/carrier/order/rate', icon: 'QQ', name: '评价管理', component: _import('carrier/order/rate/index'), meta: { role: ['admin'], title: '评价管理', noCache: false }
        },
        {
            path: '/carrier/order/rateInfo', icon: 'QQ', name: '评价详情', component: _import('carrier/order/rateInfo/index'), meta: { role: ['admin'], title: '评价详情', noCache: false }
          },
          {
            path: '/carrier/order/rateInfoplant', icon: 'QQ', name: '平台评价', component: _import('carrier/order/rateInfoplant/index'), meta: { role: ['admin'], title: '平台评价', noCache: false }
          },
        {
          path: '/carrier/order/complaints', icon: 'QQ', name: '投诉管理', component: _import('carrier/order/complaints/index'), meta: { role: ['admin'], title: '投诉管理', noCache: false }
        },
        {

          path: '/complaintsInfo/index', icon: 'QQ', name: '投诉详情', component: _import('complaintsInfo/index'), meta: { role: ['admin'], title: '投诉详情', istab: true, noCache: false }
        }
      ]
    },
    // 物流公司、专线管理
    {
      path: '/carrier/logistics', icon: 'QQ', name: '物流公司、专线管理', component: _import('carrier/logistics/index'), redirect: '/carrier/logistics/line', meta: { role: ['admin'], title: '网点专线管理', istab: true, noCache: false },
      children: [
        {
          path: '/carrier/logistics/createGroup', icon: 'QQ', name: '发布我的网点', component: _import('carrier/logistics/createGroup/index'), meta: { role: ['admin'], title: '发布我的网点', noCache: false }
        },
        {
          path: '/carrier/logistics/manageGroup', icon: 'QQ', name: '管理我的网点', component: _import('carrier/logistics/manageGroup/index'), meta: { role: ['admin'], title: '管理我的网点', noCache: false }
        },
        {
          path: '/carrier/logistics/create', icon: 'QQ', name: '发布物流专线', component: _import('carrier/logistics/create/index'), meta: { role: ['admin'], title: '发布物流专线', noCache: false }
        },
        {
          path: '/carrier/logistics/manage', icon: 'QQ', name: '管理我的专线', component: _import('carrier/logistics/manage/index'), meta: { role: ['admin'], title: '管理我的专线', noCache: false }
        }
      ]
    },
    // 货源信息管理
    {
      path: '/carrier/cargoInfo', icon: 'QQ', name: '货源信息管理', component: _import('carrier/cargoInfo/index'), redirect: '/carrier/cargoInfo/manage', meta: { role: ['admin'], title: '货源信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/carrier/cargoInfo/create', icon: 'QQ', name: '发布货源', component: _import('carrier/cargoInfo/create/index'), meta: { role: ['admin'], title: '发布货源', noCache: false }
        },
        {
          path: '/carrier/cargoInfo/manage', icon: 'QQ', name: '管理货源', component: _import('carrier/cargoInfo/manage/index'), meta: { role: ['admin'], title: '管理货源', noCache: false }
        }
      ]
    },
    // 我的收藏
    {
      path: '/carrier/collection', icon: 'QQ', name: '我的收藏', component: _import('carrier/collection/index'), redirect: '/carrier/collection/resource', meta: { role: ['admin'], title: '我的收藏', istab: true, noCache: false },
      children: [
        {
          path: '/carrier/collection/resource', icon: 'QQ', name: '资源收藏', component: _import('carrier/collection/resource/index'), meta: { role: ['admin'], title: '资源收藏', noCache: false }
        }
      ]
    }
  ]
}
