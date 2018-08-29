<template>
  <div class="sidebar-container">
    <!--     <div class="sidebar-userinfo clearfix">
        <img :src="avatar" alt="">
        <span>{{ name }}</span><br><span>{{ company }}</span>
      </div> -->
      <!-- <SidebarMenuSearch :searchItem="sidebarRouters" /> -->
      <!-- <sidebar-item ref="sidebaritem" :routes='sidebarRouters'></sidebar-item> -->
      <el-menu
        class="el-menu-vertical-sidebar"
        :default-active="$route.path"
        router
        ref="sidebarmenu"
        @open="setLastPath"
        @select="getCurrentPath"
        unique-opened
        text-color="rgba(255,255,255,0.65)">
        <template v-if="!item.hidden" v-for="(item,index) in sidebarRouters">
          <el-menu-item :key="index" v-if="!item.children" :index="item.path">
            <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="item.path">
            <template slot="title">
              <icon-svg v-if='item.icon' :icon-class="item.icon" />
              <span>{{item.meta.title}}</span>
            </template>
            <template v-if="!item2.hidden" v-for="(item2,index2) in item.children">
              <el-menu-item :key="index2" v-if="!item2.children" :index="item2.path">
                <!-- <icon-svg v-if='item2.icon' :icon-class="item2.icon" />  -->
                <span slot="title">{{item2.meta.title}}</span>
              </el-menu-item>
              <el-submenu v-else :key="index2" :index="item2.path">
                <template slot="title">{{item2.meta.title}}</template>
                <el-menu-item v-if="!item3.hidden" v-for="(item3,index3) in item2.children" :key="index3" :index="item3.path"><span slot="title">{{item3.meta.title}}</span></el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>

        </template>
      </el-menu>
      <div class="nologin" v-if="otherinfo.rolesIdList[0] === 'AF00107' && otherinfo.isOpenTms === '1'">
        <!-- <a target="_blank" :href="'http://www.28tms.cn/?from=aflc&access_token='+token"> -->
        <a target="_blank" :href="'http://192.168.1.188:9528/?from=aflc&access_token='+token">
        <el-button size="large" type="primary">TMS系统</el-button></a><br>
        <!-- < target="_blank"a href="http://192.168.1.24:9526/?nologin=1"><el-button size="large" type="success">运力中心</el-button></a><br> -->
        <!-- <a target="_blank" :href="'http://192.168.1.170/member/loginbytoken.php?access_token='+token"><el-button size="large" type="warning">官网系统</el-button></a> -->
        <a target="_blank" href="/"><el-button size="large" type="warning">官网系统</el-button></a>
      </div>
      <div @mouseover="showSubnav" @mouseout="hideSubnav" class="subNavWrapper"></div>
    <!-- 当从28tms过来且是物流商时加载 -->
       <iframe  v-if="shouldLogin" :src="'http://192.168.1.170/member/loginbytoken.php?access_token='+token" frameborder="0" style="width:0;height:0;"></iframe>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarMenuSearch from './SidebarMenuSearch'
import Hamburger from '@/components/Hamburger'
import { getToken } from '@/utils/auth'

export default {
  components: { SidebarItem, Hamburger, SidebarMenuSearch },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ]),
    shouldLogin() {
      return this.otherinfo.rolesIdList[0] === 'AF00107' && this.otherinfo.loginType === 'sso'
    }
  },
  watch: {
    '$route.path'(newVal, oldVal) {

    }
  },
  data() {
    return {
      token: '',
      loginaflc: false
    }
  },
  mounted() {
    this.token = getToken()
    this.eventBus.$on('loginmenhu', token => {
      this.loginaflc = true
    })
  },
  methods: {
    setLastPath(index) {
      console.log('setLastPath:', index)
    },
    getCurrentPath(index, path) {
      if (this.lastindex) {
         // 关闭前一个展开的
        this.$refs['sidebarmenu'].close(this.lastindex)
      }
      this.lastindex = path[0]
      console.log('getCurrentPath:', index, path)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    showSubnav() {
      this.$refs.sidebaritem.clearTimer()
    },
    hideSubnav() {
      this.$refs.sidebaritem.hideSubNav()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
@import "src/styles/mixin.scss";

 .sidebar-menu{
 
  overflow-y: auto;
  overflow-x: visible;
  width: 100%;

  @include hiddenScrollBar;

  .router-link-exact-active{
    .el-menu-item{
      color: #20a0ff;
    }
  }
}
.sidebar-container{
  min-height: 100%;
  padding-top: 0px;
  background: rgb(0,32,57);
  border-radius: 0;
  padding-bottom: 146px;

  .el-menu{
    border-right: 0;
    background: rgb(0,32,57);
  }

  .el-submenu .el-menu-item{
    min-width: 100%;
  }

  .el-submenu .el-menu{
    background: #00152a;
  }

  .el-submenu.is-opened .el-submenu__title{
    box-shadow: 0px 4px 4px 0px 
		rgba(0, 0, 0, 0.5);

    span{
      color: #fff;
    }
  }

  .is-active,.el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover{
    //background: #000b17;
    background: transparent;
    color: #fff !important;
  }
  .el-submenu.is-active{
    background: transparent;
  }

  .sidebar-userinfo{
    margin-top: -40px;
    margin-bottom: 15px;
    img{
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 5px;
      
    }
    span{
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #eee;
      line-height: 20px;
    }
  }

  .hamburger-container{
    position: absolute;
    top: 40px;
    right: 10px;
  }

  .subNavWrapper{
    display: none;
    position: absolute;
    left: 100%;
    max-height: 100%;
    overflow: auto;
  }
}
.nologin{
  position: fixed;
  width: 190px;
  height: 100px;
  background: rgb(0,32,57);
  left: 0;
  bottom: 0;
  margin-top: 10px;
  text-align: center;
  .el-button{
    width: 190px;
    height: 50px;
    background-color: rgb(0,32,56);
    border: 4px solid #000;
    border-top-color: rgb(5,55,93);
    border-right-color: rgb(5,55,93);
    border-left-color: rgb(5,21,39);
    border-bottom-color: rgb(5,21,39);
    opacity: 0.65;
    border-radius: 0;
    font-size: 16px;
    color: rgba(255,255,255,.65);

    &:hover{
      opacity: 1;
    }
  }
}

</style>
