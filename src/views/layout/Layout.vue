<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="navbar-wrapper">
        <navbar></navbar>
    </div>

    <div class="main-container">
      <div class="sidebar-wrapper">
        <sidebar></sidebar>
      </div>
      <div class="main-container-wrap">
          <app-main :key="theRefreshKey"></app-main>
      </div>
    </div>
    <LockScreen></LockScreen>

  </div>
</template>


<script>
import { objectMerge2 } from '@/utils/'
import LockScreen from '@/components/LockScreen/index'
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    LockScreen
  },
  data() {
    return {
      theRefreshKey: '',
      orderid: '',
      orderobj: {
        orderid: '',
        batchid: '',
        preid: '',
        ordernum: 1,
        batchobj: {}
      },
      showDetail: false,
      showCreate: false,
      showDetailVisible: false,
      showCreateVisible: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted() {
    this.eventBus.$on('showOrderDetail', (orderid) => {
          // 避免重复触发的事件
      if (!this.showDetailVisible) {
        console.log('showOrderDetail:', orderid)
        this.orderid = orderid || ''
        this.showDetail = true
        this.showDetailVisible = true
      }
    })
    this.eventBus.$on('hideOrderDetail', (orderid) => {
      this.showDetailVisible = false
    })
      // 如果传过来orderid，表示修改该订单
    this.eventBus.$on('showCreateOrder', (orderobj) => {
          // 避免重复触发的事件
      if (!this.showCreateVisible) {
        const data = objectMerge2(this._orderobj, orderobj)
        console.log('showCreateOrder:', orderobj, data)
        this.orderobj = data
        this.showCreate = true
        this.showCreateVisible = true
      }
    })
    this.eventBus.$on('hideCreateOrder', (orderid) => {
      this.showCreateVisible = false
    })
    // 用来替换当前路由
    // 调用方式类似：
    // this.eventBus.$emit('replaceCurrentView', '/operation/order/transfer')
    this.eventBus.$on('replaceCurrentView', (route) => {
      const lastRoute = this.$route
      route = typeof route === 'string' ? { 'path': route } : route
      this.$router.replace(route, () => {
        this.$store.dispatch('delVisitedViews', lastRoute)
      })
    })
    this._orderobj = objectMerge2({}, this.orderobj)
  },
  methods: {
    refreshKey() {
      this.theRefreshKey = Math.random()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    @import "src/styles/variate.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        background: #f2f2f2;
        height: 100%;
        &.hideSidebar {
            .main-container {

            }
            .sidebar-wrapper{
                width: $hideSidebarWidth;
                .el-submenu__icon-arrow{
                    display: none;
                }
                .el-menu--collapse {
                    width: $hideSidebarWidth;
                }
                .svg-icon{
                    display: block;
                }
            }
            .sidebar-userinfo, .sidebar-menu-search{
                display: none;
            }
            .sidebar-container{
                padding-top: 80px;
            }
        }
        .sidebar-wrapper {
          width: 168px;
          position: fixed;
          height: 100%;
          padding-top: 50px;
          bottom: 0;
          left: 0;
          z-index: 1001;
          transition: all .1s ease-out;
          box-sizing: border-box;
            /*width: $sidebarWidth;
            float: left;
            bottom: 0;
            left: 0;
            z-index: 1001;
            transition: all .1s ease-out;
            box-sizing: border-box;*/
        }
        .sidebar-container {
            transition: all .1s ease-out;
            position: relative;
            height: 100%;
            width: 100%;
        }
        .main-container {
            margin: 0 auto;
            min-width: 1200px;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            display: flex;
            min-height: 100%;
        }
        .main-container-wrap{

          height: 100%;
          transition: all .1s ease-out;
          margin-left: 168px;
          box-sizing: border-box;
          padding-top: 55px;
          position: relative;



            float: left;
            flex: 1;
            overflow: auto;
        }
        .navbar-wrapper{
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 50px;
          line-height: 50px;
          border-radius: 0!important;
          background: #373d41;
          z-index: 1009;
          min-width: 1180px;
            /*width: 100%;
            height: $topNavHeight;
            line-height: $topNavHeight;
            border-radius: 0px !important;
            background: rgb(0,32,57);
            min-width: 1200px;*/
        }
    }
</style>
<style lang="scss">
.showDetailPop{
    height: 100%;

    .el-dialog{
        height: 90%;
        display: flex;
        flex-direction: column;
        top: 5%;
    }


    .el-dialog__body{
        padding:5px 10px 10px;
        overflow: auto;
        flex: 1;
    }
}
</style>
