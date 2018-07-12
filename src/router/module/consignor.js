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
  redirect: '/consignor/groupManage',
  name: '车主管理',
  icon: 'gongsiguanli',
  children: [
    // 基本信息
    {
      path: '/finance/accountsPayable', icon: 'QQ', name: '基本信息管理', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '基本信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '完善实名认证', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '完善实名认证', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '修改登录密码', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '修改登录密码', noCache: false }
        }
      ]
    },
    // 订单管理
    {
      path: '/finance/accountsPayable', icon: 'QQ', name: '订单管理', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '订单管理', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '创建订单', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '创建订单', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '运单跟踪', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '运单跟踪', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '评价管理', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '评价管理', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '投诉管理', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '投诉管理', noCache: false }
        }
      ]
    },
    // 货源信息管理
    {
      path: '/finance/accountsPayable', icon: 'QQ', name: '货源信息管理', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '货源信息管理', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '发布货源', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '发布货源', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '管理货源', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '管理货源', noCache: false }
        }
      ]
    },
    // 我的收藏
    {
      path: '/finance/accountsPayable', icon: 'QQ', name: '我的收藏', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '我的收藏', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '物流公司收藏', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '物流公司收藏', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '零担专线收藏', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '零担专线收藏', noCache: false }
        }
      ]
    }
  ]
 }