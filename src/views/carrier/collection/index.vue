<!--<template>-->
  <!--<router-view></router-view>-->
<!--</template>-->

<template>
  <div class="manage-orderinfo page-main">
    <div class="list-tab-title clearfix">
      <span :class="{'active': component === item.name}" @click="component = item.name" v-for="(item,index) in tabs" :key="index">{{item.title + '(' + item.num + ')'}}</span>
    </div>
    <div class="list-tab-content">
      <keep-alive>
        <component :key="component" :listtype="component"  v-bind:is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import allSupplyl from './collIndex/supply'
  import spacialLine from './collIndex/supply'
  import physicalDis from './collIndex/supply'
  import carSoure from './collIndex/supply'
  import * as ReqApi from '@/api/carrier/manage'

  export default {
    components: {
      allSupplyl,
      spacialLine,
      physicalDis,
      carSoure
    },
    created() {
      this.getCount()
    },
    mounted() {
      this.eventBus.$on('updateListCount', () => {
        // this.getCount()
      })
    },
    data() {
      return {
        tabs: [{
          title: '货源收藏',
          name: 'allSupplyl',
          type: 'AF03701',
          num: 0
        }, {
          title: '专线收藏',
          name: 'spacialLine',
          type: 'AF03702',
          num: 0
        }, {
          title: '物流公司收藏',
          name: 'physicalDis',
          type: 'AF03703',
          num: 0
        }, {
          title: '车源收藏',
          name: 'carSoure',
          type: 'AF03704',
          num: 0
        }],
        component: 'allSupplyl',
        isCarrier: false
      }
    },
    methods: {
      getCount() {
        if (this.$route.path.indexOf('/carrier/collection') !== -1) {
          this.isCarrier = true
          // console.log(this.isCarrier,' this.isCarrier');
        }
        const isOwner = !this.isCarrier
        ReqApi.getOrderListCount(this.otherinfo.userToken, {
          releaseOrCarrier: isOwner ? '1' : '2',
          queryType: '1'
        }).then(data => {
          this.tabs.forEach(el => {

            // if (data[el.type]) {
            el.num = data[el.type] || 0
            el.num = el.num > 99 ? '99+' : el.num
            // }
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .list-tab-title{
    height: 74px;
    background: #fff;
    padding: 0 20px;
    span{
      float: left;
      height: 74px;
      line-height: 74px;
      width: 14.2%;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid #fff;
      color: #aaa;
      position: relative;

      &.active{
        color: #000;
        border-bottom-color: #0d91e9;

        &:hover{
          background: #fff;
          border-bottom-color: #0d91e9;
        }
      }

      &:before{
        content: "";
        position: absolute;
        width: 2px;
        height: 31px;
        top: 21px;
        right: 0;
        background: #ccc;
      }

      &:last-child{
        &:before{
          display: none;
        }
      }

      &:hover{
        background: #eee;
        border-bottom-color: #eee;
      }
    }
  }
  .manage-orderinfo{
    .el-table{
      font-size: 12px;
    }
  }
</style>

