import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

/**
 * 配置说明
 * icon 图标名称，对应src/icon/svg下的图标名字
 * hidden 是否隐藏不显示
 * meta 路由相关信息 ： stitle为边栏折叠时显示， noCache是否加入到路由的缓存列表里， istab 是否为页面内的tab切换
 */

export default {
  path: '/consignor',
  component: Layout,
  redirect: '/consignor/baseInfo',
  name: '货主管理',
  icon: 'gongsiguanli',
  memberType: 'AF00101',
  children: [
    // 基本信息
    {
      path: '/consignor/baseInfo', icon: 'QQ', name: '账号管理', component: _import('consignor/baseInfo/index'), redirect: '/consignor/baseInfo/index', meta: { role: ['admin'], title: '账号管理', istab: true, noCache: false },
      children: [
        {
          path: '/baseInfo/authentication', icon: 'QQ', name: '完善实名认证', component: _import('consignor/baseInfo/authentication/index'), meta: { role: ['admin'], title: '完善实名认证', noCache: false }
        },
        {
          path: '/changePassword', icon: 'QQ', name: '修改登录密码', component: _import('changePassword'), meta: { role: ['admin'], title: '修改登录密码', noCache: false }
        }
      ]
    },
    // 订单管理
    {
      path: '/consignor/order', icon: 'QQ', name: '订单管理', component: _import('carrier/order/index'), redirect: '/order/manage', meta: { role: ['admin'], title: '订单管理', istab: true, noCache: false },
      children: [
        {
          path: '/order/create', icon: 'QQ', name: '创建订单', component: _import('carrier/order/create/index'), meta: { role: ['admin'], title: '创建订单', noCache: false }
        },
        {
          path: '/order/manage', icon: 'QQ', name: '订单跟踪', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '订单跟踪', noCache: false }
        },
        {
          path: '/order/detail', icon: 'QQ', hidden: true, name: '订单详情', component: _import('carrier/order/detail/index'), meta: { role: ['admin'], title: '订单详情', noCache: false }
        },

        {
          path: '/order/rateInfo', icon: 'QQ', hidden: true, name: '评价详情', component: _import('consignor/order/rateInfo/index'), meta: { role: ['admin'], title: '评价详情', noCache: false }
        },

        {
          path: '/complaintsInfo/index', icon: 'QQ', hidden: true, name: '投诉详情', component: _import('complaintsInfo/index'), meta: { role: ['admin'], title: '投诉详情', istab: true, noCache: false }
        }
      ]
    },
    {
      path: '/order/rate', icon: 'QQ', name: '评价管理', component: _import('consignor/order/rate/index'), meta: { role: ['admin'], title: '评价管理', noCache: false }
    },
    {
      path: '/order/complaints', icon: 'QQ', name: '投诉管理', component: _import('consignor/order/complaints/index'), meta: { role: ['admin'], title: '投诉管理', noCache: false }
    },
    // 货源信息管理
    {
      path: '/consignor/cargoInfo', icon: 'QQ', name: '货源管理', component: _import('consignor/cargoInfo/index'), redirect: '/cargoInfo/manage', meta: { role: ['admin'], title: '货源管理', istab: true, noCache: false },
      children: [
        {
          path: '/cargoInfo/create', icon: 'QQ', name: '发布货源', component: _import('carrier/order/create/index'), meta: { role: ['admin'], title: '发布货源信息', noCache: false }
        },
        {
          path: '/cargoInfo/manage', icon: 'QQ', name: '管理货源', component: _import('carrier/cargoInfo/manage/index'), meta: { role: ['admin'], title: '管理货源信息', noCache: false }
        }
      ]
    },
    // 我的收藏
    {
      path: '/consignor/collection', icon: 'QQ', hidden: true, name: '我的收藏', component: _import('consignor/collection/index'), redirect: '/collection/logistics', meta: { role: ['admin'], title: '我的收藏', istab: true, noCache: false },
      children: [
        {
          path: '/collection/logistics', icon: 'QQ', name: '物流公司收藏', component: _import('consignor/collection/logistics/index'), meta: { role: ['admin'], title: '物流公司收藏', noCache: false }
        },
        {
          path: '/collection/LTL', icon: 'QQ', name: '零担专线收藏', component: _import('consignor/collection/LTL/index'), meta: { role: ['admin'], title: '零担专线收藏', noCache: false }
        }
      ]
    }
  ]
}
