import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + (process.env.NODE_ENV === 'development' ? 'development' : 'production'))

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
      path: '/carrier/baseInfo', icon: 'zhanghaogl', name: '账号管理', component: _import('carrier/baseInfo/index'), redirect: '/carrier/baseInfo/index', meta: { role: ['admin'], title: '账号管理', istab: true, noCache: false },
      children: [
        {
          path: '/baseInfo/authentication', icon: 'QQ', name: '完善实名认证', component: _import('carrier/baseInfo/authentication/index'), meta: { role: ['admin'], title: '完善实名认证', noCache: false }
        },
        {
          path: '/changePassword', icon: 'QQ', name: '修改登录密码', component: _import('changePassword'), meta: { role: ['admin'], title: '修改登录密码', noCache: false }
        }

      ]
    },

    // 订单管理
    {
      path: '/carrier/order', icon: 'dingdangl', name: '订单管理', component: _import('carrier/order/index'), redirect: '/order/manage', meta: { role: ['admin'], title: '订单管理', istab: true, noCache: false },
      children: [
        {
          path: '/order/create', icon: 'QQ', name: '创建订单', component: _import('carrier/order/create/index'), meta: { role: ['admin'], title: '创建订单', noCache: false }
        },
        {
          path: '/order/detail', icon: 'QQ', hidden: true, name: '订单详情', component: _import('carrier/order/detail/index'), meta: { role: ['admin'], title: '订单详情', noCache: false }
        },

        {
          path: '/order/rateInfo/carrier', icon: 'QQ', hidden: true, name: '评价详情', component: _import('carrier/order/rateInfo/index'), meta: { role: ['admin'], title: '评价详情', noCache: false }
        },
        {
          path: '/order/rateInfo', icon: 'QQ', hidden: true, name: '评价详情2', component: _import('consignor/order/rateInfo/index'), meta: { role: ['admin'], title: '评价详情2', noCache: false }
        },

        /* {
          path: '/order/track', redirect: '/order/manage', icon: 'QQ', name: '订单跟踪', component: _import('carrier/order/index'), meta: { role: ['admin'], title: '订单跟踪', noCache: false, istab: true },
          children: [
            {
              path: '/order/manage', icon: 'QQ', name: '我创建的订单', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '我创建的订单', noCache: false }
            },
            {
              path: '/order/manage/carrier', icon: 'QQ', name: '我承运的订单', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '我承运的订单', noCache: false }
            }
          ]
        }, */

        {
          path: '/order/manage', icon: 'QQ', name: '我创建的订单', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '跟踪创建的订单', noCache: false }
        },
        {
          path: '/order/manage/carrier', icon: 'QQ', name: '我承运的订单', component: _import('carrier/order/manage/index'), meta: { role: ['admin'], title: '跟踪承运的订单', noCache: false }
        },

        {
          path: '/order/rateInfoplant', hidden: true, icon: 'QQ', name: '平台评价', component: _import('carrier/order/rateInfoplant/index'), meta: { role: ['admin'], title: '平台评价', noCache: false }
        },

        {

          path: '/complaintsInfo/index', hidden: true, icon: 'QQ', name: '投诉详情', component: _import('complaintsInfo/index'), meta: { role: ['admin'], title: '投诉详情', istab: true, noCache: false }
        }
      ]
    },
    {
      path: '/order/rate', icon: 'pingjiagl', name: '评价管理', component: _import('carrier/order/rate/index'), meta: { role: ['admin'], title: '评价管理', noCache: false }
    },
    {
      path: '/order/complaints', icon: 'tousugl', name: '投诉管理', component: _import('carrier/order/complaints/index'), meta: { role: ['admin'], title: '投诉管理', noCache: false }
    },
    // 物流公司、专线管理
    {
      path: '/carrier/logistics/group', icon: 'wangdiangl', name: '网点管理', component: _import('carrier/logistics/index'), redirect: '/logistics/manageGroup', meta: { role: ['admin'], title: '网点管理', istab: true, noCache: false },
      children: [
        {
          path: '/logistics/createGroup', icon: 'QQ', name: '发布我的网点', component: _import('carrier/logistics/createGroup/index'), meta: { role: ['admin'], title: '发布我的网点', noCache: false }
        },
        {
          path: '/logistics/manageGroup', icon: 'QQ', name: '管理我的网点', component: _import('carrier/logistics/manageGroup/index'), meta: { role: ['admin'], title: '管理我的网点', noCache: false }
        }
      ]
    },
    {
      path: '/carrier/logistics', icon: 'xianlugl', name: '线路管理', component: _import('carrier/logistics/index'), redirect: '/logistics/manage', meta: { role: ['admin'], title: '线路管理', istab: true, noCache: false },
      children: [
        {
          path: '/logistics/create', icon: 'QQ', name: '发布物流专线', component: _import('carrier/logistics/create/index'), meta: { role: ['admin'], title: '发布物流专线', noCache: false }
        },
        {
          path: '/logistics/manage', icon: 'QQ', name: '管理物流专线', component: _import('carrier/logistics/manage/index'), meta: { role: ['admin'], title: '管理物流专线', noCache: false }
        }
      ]
    },
    // 货源信息管理
    {
      path: '/carrier/cargoInfo', icon: 'huoyuangl', name: '货源管理', component: _import('carrier/cargoInfo/index'), redirect: '/carrier/cargoInfo/manage', meta: { role: ['admin'], title: '货源管理', istab: true, noCache: false },
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
      path: '/carrier/collection', hidden: true, icon: 'QQ', name: '我的收藏', component: _import('carrier/collection/index'), redirect: '/collection/resource', meta: { role: ['admin'], title: '我的收藏', istab: true, noCache: false },
      children: [
        {
          path: '/collection/resource', icon: 'QQ', name: '资源收藏', component: _import('carrier/collection/resource/index'), meta: { role: ['admin'], title: '资源收藏', noCache: false }
        }
      ]
    },
    {
      path: '/member', icon: 'wzgl', name: '网站管理', component: _import('member/index'), redirect: '/member/manage/26', meta: { role: ['admin'], title: '网站管理', istab: true, noCache: false },
      children: [
        {
          path: '/member/add/26', icon: 'QQ', name: '发布公司形象', component: _import('member/detail'), meta: { role: ['admin'], title: '发布公司形象', noCache: false, url: '/member/archives_do.php?dopost=addArc&channelid=26' }
        },
        {
          path: '/member/manage/26', icon: 'QQ', name: '管理公司形象', component: _import('member/detail'), meta: { role: ['admin'], title: '管理公司形象', noCache: false, url: '/member/content_list.php?channelid=26' }
        },
        {
          path: '/member/add/27', icon: 'QQ', name: '发布资质证照', component: _import('member/detail'), meta: { role: ['admin'], title: '发布资质证照', noCache: false, url: '/member/archives_add.php?channelid=27' }
        },
        {
          path: '/member/manage/27', icon: 'QQ', name: '管理资质证照', component: _import('member/detail'), meta: { role: ['admin'], title: '管理资质证照', noCache: false, url: '/member/content_list.php?channelid=27' }
        },
        {
          path: '/member/add/28', icon: 'QQ', name: '发布荣誉证书', component: _import('member/detail'), meta: { role: ['admin'], title: '发布荣誉证书', noCache: false, url: '/member/archives_add.php?channelid=28' }
        },
        {
          path: '/member/manage/28', icon: 'QQ', name: '管理荣誉证书', component: _import('member/detail'), meta: { role: ['admin'], title: '管理荣誉证书', noCache: false, url: '/member/content_list.php?channelid=28' }
        },
        {
          path: '/member/add/29', icon: 'QQ', name: '发布公司动态', component: _import('member/detail'), meta: { role: ['admin'], title: '发布公司动态', noCache: false, url: '/member/archives_add.php?channelid=29' }
        },
        {
          path: '/member/manage/29', icon: 'QQ', name: '管理公司动态', component: _import('member/detail'), meta: { role: ['admin'], title: '管理公司动态', noCache: false, url: '/member/content_list.php?channelid=29' }
        },
        {
          path: '/member/add/30', icon: 'QQ', name: '发布招商加盟', component: _import('member/detail'), meta: { role: ['admin'], title: '发布招商加盟', noCache: false, url: '/member/archives_add.php?channelid=30' }
        },
        {
          path: '/member/manage/30', icon: 'QQ', name: '管理招商加盟', component: _import('member/detail'), meta: { role: ['admin'], title: '管理招商加盟', noCache: false, url: '/member/content_list.php?channelid=30' }
        },
        {
          path: '/member/add/31', icon: 'QQ', name: '发布公司轮播图', component: _import('member/detail'), meta: { role: ['admin'], title: '发布公司轮播图', noCache: false, url: '/member/archives_add.php?channelid=31' }
        },
        {
          path: '/member/manage/31', icon: 'QQ', name: '管理公司轮播图', component: _import('member/detail'), meta: { role: ['admin'], title: '管理公司轮播图', noCache: false, url: '/member/content_list.php?channelid=31' }
        },
        {
          path: '/member/add/34', icon: 'QQ', name: '发布行业新闻', component: _import('member/detail'), meta: { role: ['admin'], title: '发布行业新闻', noCache: false, url: '/member/archives_add.php?channelid=34' }
        },
        {
          path: '/member/manage/34', icon: 'QQ', name: '管理行业新闻', component: _import('member/detail'), meta: { role: ['admin'], title: '管理行业新闻', noCache: false, url: '/member/content_list.php?channelid=34' }
        }
      ]
    }
  ]
}
