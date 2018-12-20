<template>
  <div class="navbar clearfix">
    <div class="logo-panel">
      <router-link to="/"><img src="../../../assets/logo2.png" alt=""></router-link>
    </div>
    <TopNavMenu />
<!--     <router-link tag="div" class="pickClip" to="/order/pickClip"><icon-svg icon-class="tiaodanjia" />挑坕夹</router-link> -->
    <TopNavUser />
    <TopNavCreateOrder />
    <TopNavSearch />
  </div>

</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'
import TopNavSearch from './TopNavSearch'
import TopNavCreateOrder from './TopNavCreateOrder'

export default {
  components: {
    TopNavMenu,
    TopNavUser,
    TopNavSearch,
    TopNavCreateOrder
  },
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variate.scss";
    .navbar {
        background: rgb(0,32,57);
        border-radius: 0;
        min-width: 1200px;
        width: 100%;
        margin-left: auto;
        position: relative;
        margin-right: auto;

        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .page-top-nav{
          height: $topNavHeight;
          float: left;
          margin-left: 5px;
        }
    }

    .logo-panel{
      padding-left: 0;
      height: auto;
      float: left;
      height: $topNavHeight;


      a{
        line-height: $topNavHeight;
        display: block;
      }

      img{
        height: 52px;
        width: 65px;
        vertical-align: middle;
        margin-left: 20px;
      }
    }


    .pickClip{
      width: 110px;
      position: absolute;
      top: 0;
      right: 344px;
      height: $topNavHeight;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }
      .svg-icon{
        margin-right: 0px;
        font-size: 1.5em;
        vertical-align: middle;
      }
    }
</style>

