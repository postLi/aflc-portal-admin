<template>
  <div class="manage-orderinfo page-main">
    <div class="list-tab-title clearfix">
      <span :class="{'active': component === item.name}" @click="component = item.name" v-for="(item,index) in tabs" :key="index">{{item.title + '(' + item.num + ')'}}</span>
    </div>
    <div class="list-tab-content">
      <keep-alive>
        <component :key="component" :listtype="component" :isCarrier="isCarrier" v-bind:is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import all from './all'
import chengyun from './all'
import tihuo from './all'
import fahuo from './all'
import shouhuo from './all'
import pingjia from './all'
import wancheng from './all'
import quxiao from './all'
/* import chengyun from './chengyun'
import tihuo from './tihuo'
import fahuo from './fahuo'
import shouhuo from './shouhuo'
import pingjia from './pingjia'
import wancheng from './wancheng'
import quxiao from './quxiao' */
import * as ReqApi from '@/api/carrier/manage'

export default {
  components: {
    all,
    chengyun,
    tihuo,
    fahuo,
    shouhuo,
    pingjia,
    wancheng,
    quxiao
  },
  created() {
    if (this.$route.path.indexOf('carrier/order/manage') !== -1) {
      this.isCarrier = true
    }
    const isOwner = this.$route.path.indexOf('owner') !== -1
    ReqApi.getOrderListCount(this.otherinfo.userToken, {
      releaseOrCarrier: isOwner ? '1' : '2',
      queryType: '1'
    }).then(data => {
      this.tabs.forEach(el => {
        if (data[el.type]) {
          el.num = data[el.type]
          el.num = el.num > 99 ? '99+' : el.num
        }
      })
    })
  },
  data() {
    return {
      tabs: [{
        title: '所有订单',
        name: 'all',
        type: 'AF03701',
        num: 0
      }, {
        title: '待承运',
        name: 'chengyun',
        type: 'AF03702',
        num: 0
      }, {
        title: '待提货',
        name: 'tihuo',
        type: 'AF03703',
        num: 0
      }, {
        title: '待发货',
        name: 'fahuo',
        type: 'AF03704',
        num: 0
      }, {
        title: '待收货',
        name: 'shouhuo',
        type: 'AF03705',
        num: 0
      }, {
        title: '已完成',
        name: 'wancheng',
        type: 'AF03707',
        num: 0
      }, {
        title: '已取消',
        name: 'quxiao',
        type: 'AF03708',
        num: 0
      }],
      component: 'all',
      isCarrier: false
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
