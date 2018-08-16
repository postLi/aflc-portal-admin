<template>
  <div class="sidebar-container">
    <!--     <div class="sidebar-userinfo clearfix">
        <img :src="avatar" alt="">
        <span>{{ name }}</span><br><span>{{ company }}</span>
      </div> -->
      <!-- <SidebarMenuSearch :searchItem="sidebarRouters" /> -->
      <!-- <sidebar-item ref="sidebaritem" :routes='sidebarRouters'></sidebar-item> -->
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="item in sidebarRouters">
          <el-menu-item v-if="!item.children" :index="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航222</span>
          </template>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
      <div class="nologin">
        <a href="http://192.168.1.157:9528/?nologin=1">
        <el-button size="large" type="primary">TMS系统</el-button></a><br>
        <a href="http://192.168.1.24:9526/?nologin=1"><el-button size="large" type="success">运力中心</el-button></a><br>
        <a href="http://192.168.1.170/member/content_list.php?channelid=1"><el-button size="large" type="warning">官网系统</el-button></a>
      </div>
      <div @mouseover="showSubnav" @mouseout="hideSubnav" class="subNavWrapper"></div>
       <!-- <iframe src="http://192.168.1.170/member/autologin.php" frameborder="0" style="width:0;height:0;"></iframe> -->
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarMenuSearch from './SidebarMenuSearch'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger, SidebarMenuSearch },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ])
  },
  mounted() {
    console.log('1111111:', this.sidebarRouters)
  },
  methods: {
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
  background: #42485B;
  border-radius: 0;
  padding-bottom: 146px;

  .el-menu{
    border-right: 0;
    background: #333744;
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
  margin-top: 10px;
  text-align: center;
  .el-button{
    width: 150px;
    margin-bottom: 10px;
  }
}

</style>
