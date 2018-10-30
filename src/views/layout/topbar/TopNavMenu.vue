<template>
  <div class="page-top-nav">
    <el-menu 
      mode="horizontal" 
      :default-active="current"
      :router="true">
      <el-menu-item  index="/">
        <a :href="$const.INDEXURL" target="_blank">返回首页</a>
      </el-menu-item>   
        <el-menu-item  index="" v-if="LoginInfo.memberType == 'AF00107'">
            <a :href="carrierHref" target="_blank">我的官网</a>
        </el-menu-item>
        <el-menu-item  index="" v-if="LoginInfo.memberType == 'AF00107' || LoginInfo.memberType == 'AF00101'">
            <a :href="$const.INDEXURL+'/plus/list.php?tid=3'" target="_blank">找车源</a>
        </el-menu-item>
        <el-menu-item key="4" index="" v-if="LoginInfo.memberType == 'AF00102'">
            <a :href="$const.INDEXURL+'/plus/list.php?tid=2'" target="_blank">找货源</a>
        </el-menu-item>
        <el-menu-item key="4" index="" v-if="LoginInfo.memberType == 'AF00107' || LoginInfo.memberType == 'AF00101'">
            <a :href="$const.INDEXURL+'/plus/list.php?tid=2'" target="_blank">找专线</a>
        </el-menu-item>
      <!-- <template v-for="(menu, index) in permission_routers">
         <el-menu-item :key="index" :index="menu.path" v-if="!menu.hidden">
          <icon-svg v-if="menu.icon" :icon-class="menu.icon" /> {{menu.name}}
        </el-menu-item>
      </template> -->
      </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLogin } from '@/utils/auth.js'

export default {
  name: 'TopNavMenu',
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  data() {
    return {
      current: '',
      prevPath: '',
      LoginInfo: '',
      carrierHref: ''
    }
  },
  watch: {
    $route() {
      this.setNavHightlight()
      this.getLoginInfo()
    }
  },
  mounted() {
    this.setNavHightlight()
    this.getLoginInfo()
  },
  methods: {
    /**
     * 设置与当前页匹配的菜单高亮
     */
    setNavHightlight() {
      const find = this.permission_routers.filter(route => {
        return route.path !== '/' && this.$route.path.indexOf(route.path) === 0
      })
      const current = find[0] || this.$route
      this.current = current.path
      if (this.prevPath !== this.current) {
        this.prevPath = this.current
        // this.$store.dispatch('GenerateSidebarRoutes', current.name)
      }
    },
    getLoginInfo() {
      this.LoginInfo = getLogin()
      this.carrierHref = this.$const.INDEXURL + '/member/' + this.LoginInfo.mobile + '.html'
      console.log(this.LoginInfo)
    }
  }
}
</script>


<style lang="scss">
@import "src/styles/variate.scss";
  .page-top-nav{
    .el-menu--horizontal{
      border-bottom: none;
    }
    .el-menu{
      background: rgb(0,32,57);
    }
  }
 .page-top-nav .el-menu-item{
    height: $topNavHeight;
    line-height: $topNavHeight;
    color: #fff;
    font-size: $topNavFontSize;

    a{
      display: block;
      height: 100%;
      width: 100%;
      text-align: center;
      line-height: 54px;
    }

    &.is-active{
      background: #2a2f32;
      border-bottom: none;
    }

    .svg-icon{
      margin-right: 0;
      vertical-align: -4px;
      font-size: 1.2em;
    }

    &:hover{
      background: #05375D !important;
      a{
        color: #fff;
      }
    }
  }
  .page-top-nav .el-submenu>.el-menu{
    top: $topNavHeight + 2px;
  }
</style>
